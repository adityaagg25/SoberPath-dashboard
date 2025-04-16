import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";

import { RiLogoutBoxFill } from "react-icons/ri";
import { TiUserAddOutline } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor, FaUserInjured } from "react-icons/fa6"; // Import an icon for patients and registering patients
import { MdAddModerator } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";

import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  const gotoPatientsPage = () => {
    navigateTo("/patients");
    setShow(!show);
  };
  const gotoRegisterPatient = () => {
    navigateTo("/patient/register");
    setShow(!show);
  };

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
      <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <div className="links">
          
          <TiHome onClick={gotoHomePage} />
          
          <FaUserInjured onClick={gotoPatientsPage} /> {/* New Patients Icon */}
          <TiUserAddOutline onClick={gotoRegisterPatient} /> {/* New Register Patient Icon */}
          {/* <MdAddModerator onClick={gotoAddNewAdmin} /> Re-add Add New Admin */}
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <RiUserAddFill onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;