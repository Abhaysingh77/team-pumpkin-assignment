import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.api";
import { enqueueSnackbar } from "notistack";
import { debounce } from "../../util/debounce";

export const UsersList = ({
  selectedUser,
  selectUser,
  toggleProfile,
  socket,
  messages,
}) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleSearch = (e) => {
    try {
      const searchString = e.target.value;
      if(searchString === ""){
        setFilteredUsers(users);
        return;
      }

      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredUsers(filtered);
  } catch (err) {
    console.log(err);
  }
};
const debouncedSearch = debounce(handleSearch, 500);
  

  useEffect(() => {
    socket.emit("user-online", userId);

    socket.on("online-users", (users) => {
      console.log("Updated online users:", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online-users");
    };
  }, [socket]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token);
        if (response) {
          setUsers(response.users);
          setFilteredUsers(response.users);
        } else {
          enqueueSnackbar(response.message || "Failed to fetch users", {
            variant: "error",
          });
        }
      } catch (err) {
        enqueueSnackbar("Error fetching users", { variant: "error" });
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-80 border-r border-[#D9DCE0]  flex flex-col">
      <div className="p-4 border-b border-[#D9DCE0]">
        <div className="flex items-center gap-2 mb-4">
          <div className="">
            <img
              src="/image 66.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="relative">
          <input
            onChange={debouncedSearch}
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-8 border border-[#D9DCE0] rounded-md"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-2 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user, index) => {
          if (user._id !== userId) {
            return (
              <div
                key={index}
                onClick={() => selectUser(user)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer ${
                  selectedUser?.id === user._id ? "bg-gray-100" : ""
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectUser(user);
                    toggleProfile();
                  }}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500">8:30 pm</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {messages.filter((msg) => msg.senderId === user._id)
                      .length + " Messages" || "No messages yet"}
                  </p>
                </div>
                {onlineUsers.includes(user._id) && (
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

UsersList.propTypes = {
  selectedUser: PropTypes.object,
  selectUser: PropTypes.func.isRequired,
  toggleProfile: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
};
