import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
//     fallback: true, // can also be true or 'blocking'
//   };
// }

//constructing the paths from the json data dynamically. check above how it should look like.
export async function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  console.log(props);
  const router = useRouter();
  // this needs to be the first
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>

      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default CoffeeStore;
