import React from "react";
import defaultPic from '../../../assets/defaultProfile.jpg'

const ProfileView = ({ setProfileView, username, ProfilePicture }) => {
  return (
    <div
      className="edit-fixed-parent" 
      onClick={() => {
        setProfileView(false);
      }}
    >
      <div className="edit">
        <div className="flex">
          <img
            src={ProfilePicture || defaultPic}
            alt="profile picture"
            className="profile-pic" style={{width:'250px',height:'250px'}}
          />
        </div>
            <p style={{textAlign:'center',marginTop:'20px'}}>{username}</p>
      </div>
    </div>
  );
};

export default ProfileView;
