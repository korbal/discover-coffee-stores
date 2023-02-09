import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

//a provider allow us to initialize all our state
const StoreProvider = ({ children }) => {
  //initializing shit that I want to share between pages. surround app component with it to make it available.
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    //giving context access to state and dispatch so that we can modify shit.
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
