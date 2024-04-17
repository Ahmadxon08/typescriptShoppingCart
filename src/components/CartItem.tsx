import { useState, useEffect } from "react";
import axios from "axios";
import { useShoppingContext } from "../context/ShoppingContext";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number; // Savatdagi mahsulot miqdori
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingContext();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        const data = res?.data;
        setItem(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return null;
  }

  return (
    <Stack direction="horizontal" className="d-flex align-items-center" gap={3}>
      <img
        src={item.thumbnail}
        alt=""
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <div className=" d-flex flex-column align-item-center me-auto">
        <div className="d-flex  ">
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {" "}
            {item.title}
          </span>
          {quantity > 1 && (
            <span
              style={{
                fontSize: "22px",
                
                color:"red",
                fontWeight: "bold",
                marginLeft: "10px",

              }}
              className="text-muted"
            >
              {quantity}X
            </span>
          )}
        </div>
        <div>
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
          >
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
     
        color: "#231515",
        fontSize: "22px",
        fontWeight: "bold",
      }}>{formatCurrency(item.price * quantity)}</div>
      <Button
      style={{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        color: "white",
        fontSize: "32px",
        fontWeight: "bold",
        backgroundColor: "red",
        border:0,
  
      }}
        
       
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
