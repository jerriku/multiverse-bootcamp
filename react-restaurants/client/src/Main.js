import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMenu from './components/AddMenu';
import AddMenuItem from './components/AddMenuItem';
import AddRestaurant from './components/AddRestaurant';
import App from './components/App';
import EditMenu from './components/EditMenu';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/addrestaurant" element={<AddRestaurant />} />
                <Route path="/addmenu" element={<AddMenu />} />
                <Route path="/addmenuitem" element={<AddMenuItem />} />
                <Route path="/editmenu" element={<EditMenu />} />
            </Routes>
        </Router>
    );
}

export default Main;