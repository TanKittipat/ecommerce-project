import { useEffect, useState } from "react";
import UserServices from "../../../services/user.service";
import { MdDelete, MdEdit } from "react-icons/md";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  const changeRole = async (id) => {
    UserServices.getRoleById(id).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserServices.makeUser(id).then(() => {
          setUsers(
            users.map((user) => {
              if (user._id === id) {
                user.role = "user";
              }
              return user;
            })
          );
        });
      } else {
        UserServices.makeAdmin(id).then(() => {
          setUsers(
            users.map((user) => {
              if (user._id === id) {
                user.role = "admin";
              }
              return user;
            })
          );
        });
      }
    });
  };

  useEffect(() => {
    try {
      UserServices.getAllUsers().then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-center w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td className="flex gap-3">
                  <p>user</p>
                  <input
                    type="checkbox"
                    onClick={() => changeRole(user._id)}
                    className="toggle toggle-success"
                    checked={user.role === "admin"}
                  />
                  <p>admin</p>
                </td>
                <td>
                  <div className="gap-2 flex">
                    <button className="btn btn-warning">
                      <MdEdit />
                    </button>
                    <button className="btn btn-error">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
