import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate } from "react-router";

const AdminProtect = ({ children }) => {
  const { user, isLogin, getUser } = useContext(AuthContext);
  console.log(user);
  const userInfo = getUser();

  if (isLogin === false) {
    return (
      <div className="flex justify-center items-center content-center">
        <h3>Loading......</h3>
      </div>
    );
  }

  if (user && userInfo?.role === "admin") {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminProtect;
