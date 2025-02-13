import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate } from "react-router";

const UserLoginRedirect = ({ children }) => {
  const { user, isLogin } = useContext(AuthContext);
  console.log(user);

  if (!user && isLogin === true) {
    return <Navigate to="/" />;
  }
  return children;
};

export default UserLoginRedirect;
