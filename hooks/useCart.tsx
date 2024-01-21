import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { createContext, useCallback, useContext, useState } from "react";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(10);
  const [cartProducts, SetCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    SetCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      return updatedCart;
    });
  }, []);
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};

/*
import { createContext, useContext, useState } from "react";

// Define the type of data that will be accessible within the context
type CartContextType = {
  cartTotalQty: number;
};


//Create a React Context to hold cart-related data
export const CartContext = createContext<CartContextType | null>(null);
// Initially, the context value is null until a provider supplies it


// Define interface for Props, though not currently used
interface Props {
  [propName: string]: any;
  // Allow any props to be passed to the provider
}


// Create a component that serves as the provider for the CartContext
// Provider component that makes cart data available to its children
export const CartContextProvider = (props: Props) => {

  // Use the useState hook to manage the state of cartTotalQty
  const [cartTotalQty, setCartTotalQty] = useState(0);


  // Create an object with the context value
  // Create the context value object
  const value = {
    cartTotalQty,
  };

  // Render the CartContext.Provider with the provided value and any additional props
  return <CartContext.Provider value={value} {...props} />;
  //Wrap children with the context provider 
};


// Create a custom hook to easily access the CartContext
// Hook to access cart data from within child components
export const useCart = () => {

  // Use the useContext hook to get the current context value
  // Retrieve the context value
  const context = useContext(CartContext);


  // If the context is null, throw an error indicating that useCart must be used within a CartContextProvider
  // Ensure the component is within a CartContextProvider
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  // Return the context value
  return context;
};

*/

//createContext: Used to create a React Context for sharing data across components.
//useContext: Used to consume the context value in child components.

// CartContextProvider:
// A component that makes cart data available to its children.
// Uses useState to manage the cartTotalQty state.
// Creates a value object with the cartTotalQty.
// Wraps its children with the CartContext.Provider passing the value.

// useCart Hook:
// A custom hook to access cart data from child components.
// Uses useContext to retrieve the context value.
// Throws an error if the context is not found, ensuring it's used within a CartContextProvider.
// Returns the context value, providing cart information to the component.
