import {useState} from "react";


const App = () => {
    const [items, setItems] = useState([]);

    const handleAddItem = (newItem) => {
        setItems((items) => [...items, newItem]);
    };
    const handleDeleteItem = (id) => {
        const exists = items.some(obj => obj.hasOwnProperty('id') && obj.id === id);
        if(!exists) return;
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
    };

    return (
        <div className="app">
            <Logo/>
            <Form onAddItem={handleAddItem} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} />
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

const PackingList = ({items, onDeleteItem}) => {
    return (
        <div className="list">
            <ul>
                {
                    items.map((item) => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />)
                }
            </ul>
        </div>
    );
}

const Item = ({item, onDeleteItem}) => {
    return (
        <li>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
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