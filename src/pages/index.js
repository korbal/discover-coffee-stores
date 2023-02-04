import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "components/banner";
import Card from "components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import CoffeeStore from "./coffee-store/[id]";
import { fetchCoffeeStores } from "../lib/coffee-stores";

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
  const handleOnBannerBtnClick = () => {
    console.log("button click");
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
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt=""
            priority
          ></Image>

          {/* only render h2 if coffeeStores has a value */}
          {props.coffeeStores.length > 0 && (
            <>
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
                      href={`/coffee-store/${coffeeStore.fsq_id}`}
                      className={styles.card}
                      key={coffeeStore.fsq_id}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
