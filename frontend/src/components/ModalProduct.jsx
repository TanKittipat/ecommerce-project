import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductServices from "../services/product.service";

const ModalProduct = ({ id }) => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    file: null,
  });
  const [itemImage, setItemImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductServices.getProductById(id);
        const { data, status } = res;
        if (status === 200) {
          setItem({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            file: null, // reset file field (in case the product already has an image)
          });
          setItemImage(data.image); // Set the initial image
        }
      } catch (error) {
        Swal.fire({
          title: "Fetch product data",
          text: error?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("name", item.name);
      formData.set("description", item.description);
      formData.set("price", item.price);
      formData.set("category", item.category);

      if (item.file) {
        formData.set("file", item.file);
      }

      const res = await ProductServices.updateProduct(id, formData);
      const { status, message } = res;

      if (status === 200) {
        Swal.fire({
          title: "Success",
          text: message || "Update product successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        document.getElementById(id).close();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      Swal.fire({
        timer: 1500,
        title: "Update Product",
        text: error?.message,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setItem((item) => ({ ...item, file: e.target.files[0] }));
      const file = e.target.files[0];
      if (file) {
        setItemImage(URL.createObjectURL(file)); // Preview the image
      }
    } else {
      setItem((item) => ({ ...item, [name]: value }));
    }
  };

  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg">
            Update Product Name: {item?.name}
          </h3>
          <div>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Product name"
                className="input input-bordered w-full"
                required
                name="name"
                value={item.name}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Product description"
                required
                name="description"
                value={item.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                defaultValue={0}
                min={0}
                placeholder="Product price"
                className="input input-bordered w-full"
                required
                name="price"
                value={item.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Product category"
                className="input input-bordered w-full"
                required
                name="category"
                value={item.category}
                onChange={handleChange}
              />
            </div>

            {/* File */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="file-input file-input-bordered w-full"
              />
              {itemImage && (
                <div className="mt-2">
                  <img
                    src={itemImage}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-x-1 justify-between flex mt-6">
              <button
                onClick={() => {
                  setItem({
                    file: null,
                  });
                  document.getElementById(id).close();
                }}
                className="btn flex-1"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-success flex-1">
                Update Product
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ModalProduct;
