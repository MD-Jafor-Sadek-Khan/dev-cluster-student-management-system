import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuUsers, LuLayoutList, LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux"; 
import { signOut } from "firebase/auth";
import { auth } from "../firebase";  
import { clearUser } from "../store/authSlice"; 

const SidePanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-72 h-screen bg-[#fffcfb] flex flex-col items-start">
      <div className="ml-16 text-2xl font-bold mb-5 text-[#f33823] mt-7">Dev Cluster</div>
      <div className="mt-28 flex flex-col flex-grow p-1 w-full">
        <div
          className={`mb-5 p-5 flex items-center rounded cursor-pointer ${selected === "/add-student" ? "bg-[#f33823]" : "bg-[#fffcfb]"}`}
          onClick={() => {
            setSelected("/add-student");
            navigate("/add-student");
          }}
        >
          <LuUsers className={`mr-2 h-6 w-6 ${selected === "/add-student" ? "text-white" : "text-black/60"}`} />
          <Link
            className={`text-base ${selected === "/add-student" ? "text-white" : "text-black/60"}`}
            to="/add-student"
          >
            Add Student
          </Link>
        </div>
        <div
          className={`mb-5 p-5 flex items-center rounded cursor-pointer ${selected === "/manage-students" ? "bg-[#f33823]" : "bg-[#fffcfb]"}`}
          onClick={() => {
            setSelected("/manage-students");
            navigate("/manage-students");
          }}
        >
          <LuLayoutList className={`mr-2 h-6 w-6 ${selected === "/manage-students" ? "text-white" : "text-black/60"}`} />
          <Link
            className={`text-base ${selected === "/manage-students" ? "text-white" : "text-black/60"}`}
            to="/manage-students"
          >
            Manage Students
          </Link>
        </div>
        <div
          className="mb-5 p-5 flex items-center rounded cursor-pointer bg-[#fffcfb]"
          onClick={handleLogout}
        >
          <LuLogOut className={`mr-2 h-6 w-6 ${selected === "/logout" ? "text-white" : "text-black/60"}`} />
          <Link
            className={`text-base ${selected === "/logout" ? "text-white" : "text-black/60"}`}
            to="#"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
