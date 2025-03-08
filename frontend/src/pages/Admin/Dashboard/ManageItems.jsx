import useProduct from "../../../hooks/useProduct";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import Swal from "sweetalert2";
import ProductServices from "../../../services/product.service";
import ModalProduct from "../../../components/ModalProduct";

const ManageItems = () => {
  const [product, refetch] = useProduct();
  const handleDelete = async (id) => {
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
          const res = await ProductServices.deleteProduct(id);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Selected item has been deleted.",
              icon: "success",
              timer: 1500,
            });
            refetch();
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Delete Product",
        text: error?.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h1 className="text-2xl text-center my-4 font-bold">
        Product in this Store
      </h1>
      <table className="table">
        {/* head */}
        <thead className="bg-[#d6ccc2] text-white text-center">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center bg-white">
          {product.length > 0 ? (
            product.map((item, index) => (
              <tr key={index}>
                <td className="font-bold">{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-14 w-14">
                      <img src={item.image} alt="Product image" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <div className="space-x-2 flex">
                    <button
                      onClick={() =>
                        document.getElementById(item._id).showModal()
                      }
                      className="text-[#fca311] px-2 text-lg hover:scale-110 transition-transform duration-200"
                    >
                      <LuPencilLine />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red px-2 text-lg hover:scale-110 transition-transform duration-200"
                    >
                      <LuTrash2 />
                    </button>
                  </div>
                </td>
                <ModalProduct id={item._id} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No item in database
              </td>
            </tr>
          )}
        </tbody>
        {/* foot */}
        <tfoot className="text-center bg-white">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ManageItems;
