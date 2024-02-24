import { Navbar, NavbarBrand } from "reactstrap";

const Header = ({ title }) => {

    return (
        <Navbar
            className="mb-2"
            color="light"
        >
            <NavbarBrand href="/">{title}</NavbarBrand>
        </Navbar>
    );
}

export default Header;