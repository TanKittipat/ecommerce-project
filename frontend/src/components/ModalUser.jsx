import { useState, useEffect } from "react";
import UserServices from "../services/user.service";
import Swal from "sweetalert2";

const ModalUser = ({ id }) => {
  const [user, setUser] = useState({ email: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        UserServices.getUserById(id).then((res) => {
          setUser(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      UserServices.updateUser(id, user).then((res) => {
        Swal.fire({
          icon: "success",
          title: "User updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(id).close();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">Update User: {user.email}</h3>
          <div>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="User Email"
                className="input input-bordered w-full"
                required
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="role"
                id="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="space-x-1 justify-between flex mt-6">
              <button
                onClick={() => {
                  document.getElementById(id).close();
                }}
                className="btn flex-1"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-success flex-1">
                Update User
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

export default ModalUser;
