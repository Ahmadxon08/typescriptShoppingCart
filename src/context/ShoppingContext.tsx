import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type CartItem = {
  id: number;
  quantity: number;
  title: string;
  price: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;

  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingContext = createContext<ShoppingCartContext>({
  openCart: () => {},
  closeCart: () => {},
  getItemQuantity: () => 0,
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  removeFromCart: () => {},
  cartQuantity: 0,
  cartItems: [],
});

export function useShoppingContext() {
  return useContext(ShoppingContext);
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export function ShoppingProvider({ children }: ShoppingCartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = items.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);

  function getItemQuantity(id: number) {
    return items.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartItems: items,
        cartQuantity,
        openCart,
        closeCart,
        removeFromCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingContext.Provider>
  );
}
