import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import logo from "../../assets/LogoWhite.png";
import Qlogo from "../../assets/Qlogo.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SideBar = ({ user,desktop,setCurrentPage }) => {
  return (
    <div className="side-bar col-sm-3 col-2">
      <div className="side-bar-fixed col-sm-3 col-2">
        {desktop ? <img src={logo} alt="" /> : <img src={Qlogo} className="q-logo" />}
        <div className="side-bar-icons">
          <div onClick={()=>setCurrentPage("Home") }>
            <HomeIcon fontSize="medium" sx={{ color: "white" }} />
            <p>Home</p>
          </div>
          <div onClick={()=>setCurrentPage("Search") }>
          <SearchIcon fontSize="medium" sx={{ color: "white"  }} />
            <p>Search</p>
          </div>
          <div onClick={()=>setCurrentPage("Chats") }>
            <ChatBubbleOutlineIcon fontSize="medium" sx={{ color: "white" }} />
            <p>Chats</p>
          </div>
          <div onClick={()=>setCurrentPage("Notification") }>
            <NotificationsNoneIcon fontSize="medium" sx={{ color: "white" }} />
            <p>Notification</p>
          </div>
          <div onClick={()=>setCurrentPage("Create") }>
            <AddCircleOutlineIcon fontSize="medium" sx={{ color: "white" }} />
            <p>Create</p>
          </div>
          <div onClick={()=>setCurrentPage("Profile") }>
            <AccountCircleIcon fontSize="medium" sx={{ color: "white" }} />
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
