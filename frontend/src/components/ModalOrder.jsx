import { useState, useEffect } from "react";
import OrderServices from "../services/order.service";
import ProductServices from "../services/product.service";

const ModalOrder = ({ id }) => {
  const [order, setOrder] = useState(null);
  console.log(order);

  useEffect(() => {
    try {
      OrderServices.getOrderById(id).then((res) => {
        setOrder(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-3xl text-left">
          <h3 className="font-bold text-lg">Order details</h3>
          <div className="flex justify-between text-lg font-semibold mb-2">
            <h4>Products</h4>
            <h4>Total: {order?.total}</h4>
          </div>
          <div>
            {" "}
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.length > 0 &&
                  order.products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product.productId.image}
                              alt="Product image"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{product.productId.name}</td>
                      <td>{product.productId.price}฿</td>
                      <td>{product.quantity}</td>
                      <td>{product.productId.price * product.quantity}฿</td>
                    </tr>
                  ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <div className="flex justify-between flex-col items-start md:flex-row">
              <div className="w-1/2">
                {/* Left zone */}
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {order?.shipping?.name}
                </p>
                <p>
                  <span className="font-bold">Phone:</span>{" "}
                  {order?.shipping?.phone}
                </p>
                <p>
                  <span className="font-bold">Address:</span>{" "}
                  {order?.shipping?.address?.line1}
                </p>
              </div>
              <div className="w-1/2">
                {/* Right zone */}
                <p>
                  <span className="font-bold">City:</span>{" "}
                  {order?.shipping?.address?.city}
                </p>
                <p>
                  <span className="font-bold">Country:</span>{" "}
                  {order?.shipping?.address?.country}
                </p>
                <p>
                  <span className="font-bold">Postal code:</span>{" "}
                  {order?.shipping?.address?.postal_code}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-red text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalOrder;
