import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

const Modal = ({ name }) => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div>
      {/*
      How to use
      onClick={() => document.getElementById("login").showModal()}
       */}
      <dialog id={name} className="modal">
        <div className="modal-box">
          <div className="modal-action mt-2 ml-2 flex-col justify-center">
            <h3 className="text-xl font-bold">Please login</h3>
          </div>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* form section */}
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register(
                  "password",
                  { required: true },
                  { min: 6, max: 99 }
                )}
              />
              {/* Forgot password */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Submit btn */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-red text-white">
                Login
              </button>
            </div>
            {/* Sign up */}
            <p className="text-center my-2">
              Don't have an account?{" "}
              <a href="/signup" className="underline ml-1 text-red">
                Sign up now!
              </a>
            </p>
            {/* Providers icon */}
            <div className="space-x-3 flex justify-center items-center">
              <button className="btn rounded-full">
                <FaGoogle className="size-4" />
              </button>
              <button className="btn rounded-full">
                <FaFacebook className="size-4" />
              </button>
              <button className="btn rounded-full">
                <FaGithub className="size-4" />
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
