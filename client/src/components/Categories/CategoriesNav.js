import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'

import { GiAlmond, GiCorn, GiOlive ,GiWheat, GiCoffeeBeans, GiPeanut} from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';


function CategoriesNav() {
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <Link to="/categories/all">
                <Button variant="dark" id="all"><TiSortAlphabetically />All</Button>{' '}
            </Link>
            <Link to="/categories/properties">
                <Button variant="dark" id="Olive"><GiOlive />Olive</Button>{' '}
            </Link>
            <Link to="/categories/auto">
                <Button variant="dark" id="Wheat"><GiWheat />Wheat</Button>{' '}
            </Link>
            <Link to="/categories/home">
                <Button variant="dark" id="Corn"><GiCorn/>Corn</Button>{' '}
            </Link>
            <Link to="/categories/clothes">
                <Button variant="dark" id="CoffeeBeans"><GiCoffeeBeans />CoffeeBeans</Button>{' '}
            </Link>
            <Link to="/categories/toys">
                <Button variant="dark" id="Peanut"><GiPeanut />Peanut</Button>{' '}
            </Link>
            <Link to="/categories/garden">
                <Button variant="dark" id="Almond"><GiAlmond />Almond</Button>{' '}
            </Link>
        </div>
    )
}

export default CategoriesNav;