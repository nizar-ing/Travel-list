import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: false},
    {id: 3, description: "Charger", quantity: 1, packed: false}
];


const App = () => {
    const [items, setItems] = useState([
        {id: 1, description: "Passports", quantity: 2, packed: false},
        {id: 2, description: "Socks", quantity: 12, packed: false},
        {id: 3, description: "Charger", quantity: 1, packed: false}
    ]);

    const handleAddItem = (newItem) => {
        setItems((items) => [...items, newItem]);
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItem={handleAddItem} />
            <PackingList items={items} />
            <Stats />
        </div>
    );
};

const Logo = () => {
    return (
        <h1>🏝️ Far Away 🧳</h1>
    );
}

const Form = ({onAddItem}) => {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description) return;
        const newItem = {description, quantity, packed: false, id: Date.now()};
        onAddItem(newItem);
        setQuantity(1);
        setDescription("");
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {
                    Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                        <option value={num} key={num} onSelect={(e) => setQuantity(e.target.value)}>
                            {num}
                        </option>)
                    )
                }
            </select>
            <input type="text" placeholder="Item ..." value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    );
}

const PackingList = ({items}) => {
    return (
        <div className="list">
            <ul>
                {
                    items.map((item) => <Item key={item.id} item={item}/>)
                }
            </ul>
        </div>
    );
}

const Item = ({item}) => {
    return (
        <li>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

const Stats = () => {
    return (
        <footer className="stats">
            <em>
                💼 You have X items on your list, you already packed X (X%).
            </em>
        </footer>
    );
}

export default App;