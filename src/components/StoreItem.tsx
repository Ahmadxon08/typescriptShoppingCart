import { Button, Card, CardBody, CardImg, CardTitle } from "react-bootstrap";
import { formatCurrency } from "./../utilities/formatCurrency";
import { useShoppingContext } from "./../context/ShoppingContext";

type StoreItemProps = {
  id: number;
  title: string;
  price: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
};

export function StoreItem({ title, price, id, thumbnail }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingContext();
  const quantity = getItemQuantity(id);
  return (
    <Card
      style={{
        height: "500px",
        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
      }}
    >
      <CardImg
        variant="top"
        src={thumbnail}
        height="200px"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <CardBody className="d-flex flex-column">
        <CardTitle className="d-flex justify-content-between align-content-center mb-4">
          <span className="fs-3"> {title}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </CardTitle>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100 " onClick={() => increaseCartQuantity(id)}>
              add to Card
            </Button>
          ) : (
            <div
              className="d-flex align-content-center flex-column"
              style={{
                gap: ".5rem",
              }}
            >
              <div
                style={{
                  gap: ".5rem",
                }}
                className="d-flex align-content-center m-auto justfy-content-center"
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div className="d-flex align-content-center">
                  <span
                    className="
              fs-3"
                  >
                    {quantity}
                  </span>
                </div>

                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger "
                size="sm"
              >
                <span className="fs-5">Remove</span>
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
