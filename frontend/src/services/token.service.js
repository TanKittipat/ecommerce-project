import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser(); // Make sure we are getting the user object correctly
  console.log(user.userInfo.token);

  return user ? user.userInfo.token : null; // Ensure the token is accessible and exists
};

const getUser = () => {
  const user = cookie.get("user"); // Get the user object from the cookie
  if (user) {
    return JSON.parse(user); // Parse the stringified user object
  }
  return null; // If user is not found, return null
};

const setUser = (user) => {
  cookie.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000), // Expires after 1 day
  });
};

const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

const TokenServices = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenServices;
