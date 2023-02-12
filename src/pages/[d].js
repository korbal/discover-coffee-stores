import Head from "next/head";
import { useRouter } from "next/router";
import { render } from "react-dom";

const Dynamic = () => {
  const router = useRouter();
  const query = router.query.d;
  //console.log(router);
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      {query}
    </div>
  );
};

export default Dynamic;
