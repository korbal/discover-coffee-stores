import "@/styles/globals.css";
import { createContext, useReducer } from "react";
import { IBM_Plex_Sans } from "@next/font/google";

const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, latLong: action.payload.coffeeStores };
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

const ibm_font = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={ibm_font.className}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}
