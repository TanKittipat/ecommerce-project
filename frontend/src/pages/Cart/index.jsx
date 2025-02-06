import useCart from "../../hooks/useCart";
import { ImBin2 } from "react-icons/im";
import CartServices from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  console.log(cart);

  const handleRemoveItem = async (id) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await CartServices.removeCartItem(id);
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: res.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleClearAllItems = async (email) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await CartServices.clearCartItems(email);
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: res.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% h-[61.5vh]">
        <div className="justify-end items-end flex p-2">
          <button
            className="btn btn-ghost text-red"
            onClick={() => handleClearAllItems(user?.email)}
          >
            Clear List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-red text-white">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={index}>
                    <td className="font-bold">{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.productImage} alt="Product image" />
                        </div>
                      </div>
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.productPrice}</td>
                    <td></td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red hover:scale-110 transition-transform duration-200"
                      >
                        <ImBin2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No item in cart
                  </td>
                </tr>
              )}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
