const domain = "https://staybooking-en4e7mkwea-uw.a.run.app";

export const login = (credential) => {
  const loginUrl = `${domain}/auth/login`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential) => {
  const registerUrl = `${domain}/auth/register`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to register");
    }
  });
};

export const uploadPlan = () => {};

/**********test to fetch Places from Google *************/
export const fetchPlaces = (
  location = { lat: 34.0522, lng: -118.2437 },
  radius = 5000,
  type = "tourist_attraction"
) => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  return fetch(proxyUrl + googlePlacesUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    return response.json(); // Parse the JSON response
  });
};
/***********************************************************/
