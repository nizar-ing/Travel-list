import {useState} from "react";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/packing-list";
import Stats from "./components/stats";

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
    const handleClearList = () => {
        if(!items.length) return;
        const confirmed = window.confirm("Are you sure you want to delete all items?");
        if(confirmed) setItems([]);
    };

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onCheckedItem={handleCheckedItem} onClearList={handleClearList} />
            <Stats items={items} />
        </div>
    );
};

export default App;