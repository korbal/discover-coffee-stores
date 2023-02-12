import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "components/banner";
import Card from "components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import CoffeeStore from "./coffee-store/[id]";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "hooks/use-track-location";
import { useEffect, useState, useContext } from "react";

//import { ACTION_TYPES, StoreContext } from "../store/store-context";
import { ACTION_TYPES, StoreContext } from "store/store-context";

// for SSG, this is how we bring in the data. coffeeStores is imported from a json, eventually from the backend. need to pass it to the component. moved the actual fetch to lib/coffee-stores.js for better readability
export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores: coffeeStores,
    }, // will be passed to the page component as props
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // for the dynamicly brought in places, we need a place to store them
  // const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  //console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    if (latLong) {
      const fetchData = async () => {
        //console.log({ latLong });
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          );
          const coffeeStores = await response.json();

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError("");
        } catch (error) {
          //console.log({ error });
          setCoffeeStoresError(error.message);
        }
      };
      fetchData();
    }
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt=""
            priority
          ></Image>

          {/* only render h2 if coffeeStores has a value */}
          {coffeeStores.length > 0 && (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Stores Near Me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                      key={coffeeStore.id}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* only render h2 if coffeeStores has a value */}
          {props.coffeeStores.length > 0 && (
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Toronto Coffee Stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                      key={coffeeStore.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
