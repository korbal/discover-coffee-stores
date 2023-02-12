import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  // photo api
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });

  // getting only the urls for all the photos and returning them
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.203629203293026%2C-79.431814711868913",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",

      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(
      //"43.203629203293026%2C-79.431814711868913",
      latLong,
      "coffee",
      limit
    ),
    options
  );
  const data = await response.json();
  // since it's moved here in a separate file, need to be returned
  //console.log("DATAGECI");
  //console.log(data);
  // going through each coffee store data and adding an imageurl to them, so that it can be displayed on the frontend.
  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address
        ? result.location.address.length > 0
          ? result.location.address
          : null
        : null,
      locality: result.location.locality,
      // if unsplash fails, the whole thing will fail. checking this so it goes through without image too
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};

// "https://api.foursquare.com/v3/places/search?query=coffee&ll=47.203629203293026%2C18.431814711868913&limit=6";
