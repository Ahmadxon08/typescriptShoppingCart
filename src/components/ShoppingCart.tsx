import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingContext } from "../context/ShoppingContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import axios from "axios"; // axios kutubxonasini yuklab olish

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingContext();
  const [item, setItem] = useState({}); 

  useEffect(() => {
    const fetchItem = async (id: number) => {
      // id ni olib kelish
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        const data = res?.data;
        setItem(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    // Agar savatchadagi biror mahsulotni bosib olish kerak bo'lsa, u id sini ko'rsatib berishimiz kerak
    const selectedItemId = 1; // Misol uchun, birinchi mahsulotni bosib olaylik
    fetchItem(selectedItemId); // id ni olib kelish
  }, [isOpen]); // useEffect ni isOpen ga bog'langan qilish

  // Savatdagi barcha mahsulotlarning umumiy narxini hisoblash
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      style={{
        width: "40%",
      }}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} quantity={item.quantity} />
          ))}
          <div className="d-flex align-content-center m-auto justfy-content-center">
            Total: {formatCurrency(total)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
