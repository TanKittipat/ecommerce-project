import { useEffect, useState } from "react";
import OrderServices from "../../../services/order.service";
import { RiInfoCardLine, RiDeleteBin7Fill } from "react-icons/ri";
import { PiMagnifyingGlass } from "react-icons/pi";
import Swal from "sweetalert2";
import ModalOrder from "../../../components/ModalOrder";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  console.log(orders);
  const [search, setSearch] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    try {
      OrderServices.getOrders().then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateDeliveryStatus = (id, status) => {
    try {
      OrderServices.updateOrder(id, { delivery_status: status }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Delivery status updated successfully",
            timer: 1500,
            showConfirmButton: false,
          });
          setOrders(
            orders.map((order) =>
              order._id === id ? { ...order, delivery_status: status } : order
            )
          );
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteOrder = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c1121f",
        cancelButtonColor: "#e5e5e5",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await OrderServices.deleteOrder(id);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Order has been deleted.",
              icon: "success",
              timer: 1500,
            });
            setOrders(orders.filter((order) => order._id !== id));
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleSearch = () => {
    if (search === "") {
      return setFilteredOrders(orders);
    }
    const filtered = orders.filter((order) =>
      order.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-4 font-bold">Manage Orders</h1>
      {/* Search */}
      <div className="flex justify-center mt-6 mb-4 w-96 gap-2">
        <label className="input input-bordered flex items-center gap-2 w-10/12">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <PiMagnifyingGlass />
        </label>
        <button className="btn" onClick={handleSearch}>
          <PiMagnifyingGlass />
        </button>
      </div>
      <table className="table">
        {/* head */}
        <thead className="bg-[#d6ccc2] text-white text-center">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>Total</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center bg-white">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td className="w-72">{item.email}</td>
                <td>{item.total}</td>
                <td>
                  <div
                    className={`badge badge-outline ${
                      item.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {item.payment_status}
                  </div>
                </td>
                <td className="w-44">
                  <select
                    name="delivery_status"
                    value={item.delivery_status}
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) =>
                      handleUpdateDeliveryStatus(item._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      document.getElementById(item._id).showModal();
                    }}
                  >
                    <RiInfoCardLine />
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteOrder(item._id)}
                  >
                    <RiDeleteBin7Fill />
                  </button>
                </td>
                <ModalOrder id={item._id} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No order in database
              </td>
            </tr>
          )}
        </tbody>
        {/* foot */}
        <tfoot className="text-center bg-white">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>Total</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
      {/* Pagination */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredOrders.length / itemsPerPage),
        }).map((_, index) => (
          <button
            onClick={() => paginate(index + 1)}
            key={index}
            className={`mx-1 btn btn-ghost ${
              currentPage === index + 1 ? "bg-[#d6ccc2] text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
