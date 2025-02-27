import { useContext } from "react";
import StripeServices from "../services/stripe.service";
import { AuthContext } from "../contexts/auth.context";

const CheckOutBtn = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = async () => {
    StripeServices.createCheckOutSession({
      cart: cartItems,
      email: user.email,
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button className="btn bg-red text-white" onClick={handleCheckOut}>
      Proceed to Checkout
    </button>
  );
};

export default CheckOutBtn;
