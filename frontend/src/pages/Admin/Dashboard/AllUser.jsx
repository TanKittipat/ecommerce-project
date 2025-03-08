import { useEffect, useState } from "react";
import UserServices from "../../../services/user.service";
import { MdDelete, MdEdit } from "react-icons/md";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold my-4">
        Manage users in this system
      </h1>
      <div className="overflow-x-auto">
        <table className="table text-center w-full">
          {/* head */}
          <thead className="bg-[#d6ccc2]">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td className="flex gap-3 justify-center items-center object-center">
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
                  <div className="gap-2 flex justify-center items-center object-center">
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
          <tfoot className="bg-white">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(users.length / itemsPerPage),
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

export default AllUser;
