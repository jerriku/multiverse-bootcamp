import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
        <header className="restaurant-header">
        <h1> Restaurants </h1>
        <nav className="nav-bar">
            <ul className="nav-menu">
                <li className="nav-item"><Link to="/addrestaurant"><button>Add Restaurant</button></Link></li>
                <li className="nav-item"><Link to="/addmenu"><button>Add Menu</button></Link></li>
                <li className="nav-item"><Link to="/addmenuitem"><button>Add Menu Item</button></Link></li>
            </ul>
        </nav>
        </header>
        </>
    );
}