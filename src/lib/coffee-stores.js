const getUrlForCoffeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",

      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(
      "47.203629203293026%2C18.431814711868913",
      "coffee",
      6
    ),
    options
  );
  const data = await response.json();
  // since it's moved here in a separate file, need to be returned
  return data.results;

  console.log(data);
};

// "https://api.foursquare.com/v3/places/search?query=coffee&ll=47.203629203293026%2C18.431814711868913&limit=6";
