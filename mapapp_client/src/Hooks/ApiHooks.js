const baseurl = "https://europe-west1-mapapp-b8e8c.cloudfunctions.net/api";

//login
const login = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseurl + "/login", fetchOptions);
    const json = await resp.json();
    if (!resp.ok) {
      console.log(json);
    }
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

//signup
const register = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseurl + "/signup", fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ":" + json.error);
    console.log(json);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};
// checking user
const checkingUser = async (token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
  };
  try {
    const response = await fetch(baseurl + "/user", fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    throw console.log(e.message);
  }
};
//post destination
const postDestination = async (inputs, token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseurl + `/destination`, fetchOptions);
    const json = await resp.json();

    console.log(json);
  } catch (e) {
    throw new Error(e.message);
  }
};

//GEt destinations information
const getDestinationInform = async (destinationId) => {
  try {
    const response = await fetch(baseurl + `/destination/${destinationId}`);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};
//post Attraction
const postAttraction = async (inputs, token, destinationId) => {
  console.log(destinationId);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ["Authorization"]: token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(
      baseurl + `/destination/${destinationId}/attraction`,
      fetchOptions
    );
    const json = await resp.json();

    console.log(json);
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  login,
  register,
  checkingUser,
  postDestination,
  getDestinationInform,
  postAttraction,
};
