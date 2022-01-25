import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function EditMenu() {
    const [items, setItems] = useState([]);
    const [menu, setMenu] = useState("");
    const [isMount, setIsMount] = useState(false);
    const [state, setState] = useState({ itemName: "", itemPrice: 0 });
    const menuId = useLocation().state.id;
    let itemNumber = 0;

    useEffect(() => {
        if(!isMount) {
            fetch(`http://localhost:8080/menus/${menuId}/menuitems`)
                .then(response => response.json())
                .then(response => {
                    setMenu(response.title);
                    setItems(response.items);
                    setIsMount(true);
                })
                .catch(error => error);
        }
    });

    function handleInputChange(event) {
        setState({ [event.target.name]: event.target.value });
    }

    function handleEdit(event) {
        event.preventDefault();
        const name = state.itemName;
        const price = state.itemName;
        const id = event.target.lastChild.value;

        const item = {
            name,
            price,
        }

        axios
            .patch(`menus/${menuId}/menuitems/${id}`, item)
            .then(() => {
                console.log('item edited');
                window.location.href = "/editmenu";
            })
            .catch(err => console.log(err.message));
    }

    function handleDeleteMenu(event) {
        event.preventDefault();
        const id = parseInt(event.target.value);

        axios
            .delete(`http://localhost:8080/menus/${id}`)
            .then(() => {
                console.log('menu deleted');
                document.getElementById(`${menu}-menu`).remove();
                window.location.href = "/";
            })
            .catch(err => console.log(err.message));
    }

    function handleDeleteItem(event) {
        event.preventDefault();
        const id = parseInt(event.target.value);
        
        axios
            .delete(`http://localhost:8080/menuitems/${id}`)
            .then(() => {
                console.log('item deleted');
                document.getElementById(`item-${id}`).remove();
                window.location.href = "/editmenu";
            })
            .catch(err => console.log(err.message));
    }

    return (
        <div id={`${menu}-menu`}>
            <h1>{menu} <span className="help-user">?</span></h1> <button value={menuId} onClick={handleDeleteMenu}>Delete Menu</button>
            {
                items.map(item => {
                    itemNumber++;
                    return (
                        <form id={`item-${item.id}`} onSubmit={handleEdit}>
                            <h2>Item {itemNumber}</h2> <br />
                            <label htmlFor="itemName">Item name:</label> <br />
                            <input className="item-input" name="itemName" placeholder={item.name} onChange={handleInputChange}/> <br />
                            <label htmlFor="itemPrice">Price:</label> <br />
                            <input className="item-input" name="itemPrice" placeholder={item.price} onChange={handleInputChange}/> <br />
                            <input type="submit" value="Submit Edit"/> <button value={item.id} onClick={handleDeleteItem}>Delete Item</button>
                        </form>
                    )
                })
            }
        </div>
    );
}

export default EditMenu;