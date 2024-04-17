import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useShoppingContext } from "../context/ShoppingContext";

const NavBar = () => {
  const { openCart, cartQuantity } = useShoppingContext();
  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={"/"} as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to={"/about"} as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to={"/store"} as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        <Button
          onClick={() => openCart()}
          style={{
            position: "relative",
          }}
          aria-label="Add to cart"
          className="rounded-circle"
        >
          <MdOutlineShoppingCart
            style={{
              display: "flex",
              fontSize: "34px",
              color: "white",
            }}
          />
          
          <span
            style={{
              position: "absolute",
              top: 0,
              right: "-10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              backgroundColor: "red",
              zIndex: 1000,
            }}
          >
            {cartQuantity}
          </span>
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
