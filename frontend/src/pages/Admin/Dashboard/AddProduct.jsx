import { useState } from "react";
import ProductServices from "../../../services/product.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "file") {
      setProduct((product) => ({ ...product, [name]: e.target.files[0] }));
    } else {
      setProduct((product) => ({ ...product, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("name", product.name);
      data.set("description", product.description);
      data.set("price", product.price);
      data.set("category", product.category);
      data.set("file", product.file);
      console.log(data);

      const res = await ProductServices.addNewProduct(data);
      if (res.status === 200) {
        Swal.fire({
          title: "Add new Product",
          text: res?.data?.message,
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setProduct({
            name: "",
            description: "",
            price: 0,
            category: "",
            file: null,
          });
          navigate("/dashboard");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add new Product",
        text: error?.message,
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex justify-center items-center align-middle object-center h-screen">
      <div className="bg-base-100 p-14 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Add new Product</h1>
        <div className="w-96">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="product name"
              className="input input-bordered w-full"
              required
              name="name"
              value={product.name}
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
              placeholder="product description"
              required
              name="description"
              value={product.description}
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
              placeholder="product price"
              className="input input-bordered w-full"
              required
              name="price"
              value={product.price}
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
              placeholder="product category"
              className="input input-bordered w-full"
              required
              name="category"
              value={product.category}
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
              required
              className="file-input file-input-bordered w-full"
            />
          </div>
          {product.file && (
            <div className="w-full rounded-md mt-4">
              <img
                className="w-full rounded-md"
                src={URL.createObjectURL(product.file)}
                alt="preview"
              />
            </div>
          )}
        </div>
        <div className="space-x-1 justify-between flex mt-6">
          <button
            onClick={() => {
              setProduct({
                name: "",
                description: "",
                price: 0,
                category: "",
                file: null,
              });
              navigate("/dashboard");
            }}
            className="btn flex-1"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-success flex-1">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
