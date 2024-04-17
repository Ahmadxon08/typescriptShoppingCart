import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { ShoppingProvider } from "./context/ShoppingContext";

const App = () => {
  return (
    <ShoppingProvider>
      <NavBar />
      <Container className="mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      
      </Container>
    </ShoppingProvider>
  );
};

export default App;
