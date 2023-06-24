import {useState} from "react";

/*
{ id: 1, description: "Passports", quantity: 2, packed: false },
{ id: 2, description: "Socks", quantity: 12, packed: false },
   */

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
    const handleCheckedItem = (id) => {
        setItems((items) => items.map((item) =>
            item.id === id ? {...item, packed: !item.packed} : item
        ));
    };

    return (
        <div className="app">
            <Logo/>
            <Form onAddItem={handleAddItem} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onCheckedItem={handleCheckedItem} />
            <Stats items={items} />
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

const PackingList = ({items, onDeleteItem, onCheckedItem}) => {
    const[sortBy, setSortBy] = useState("input");

    let sortedItems;
    if(sortBy === "input") sortedItems = items;
    if(sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if(sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {
                    sortedItems.map((item) => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onCheckedItem={onCheckedItem} />)
                }
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
            </div>
        </div>
    );
}

const Item = ({item, onDeleteItem, onCheckedItem}) => {

    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onCheckedItem(item.id)} />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

const Stats = ({items}) => {

    if(!items.length){
        return (
            <footer className="stats">
                <em>
                    Start adding some items in your packing list 🚀
                </em>
            </footer>
        );
    }
    const countItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round((packedItems/countItems) * 100);
    return (
        <footer className="stats">
            <em>
                { percentage === 100 ? 'You got everything! Ready to go. ✈' : `💼 You have ${countItems} items on your list, you already packed ${packedItems} (${percentage}%).`}
            </em>
        </footer>
    );
}

export default App;