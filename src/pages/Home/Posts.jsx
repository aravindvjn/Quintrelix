import React, { useState } from "react";
import defalutProfile from "../../assets/defaultProfile.jpg";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ProfileView from "./Features/ProfileView";

const Posts = (props) => {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(Number(props.like));
  const [profileView,setProfileView] = useState(false)
  const likeHandler = () => {
    setLiked(() => {
      if (liked) {
        setLikedCount(likedCount - 1);
        return false;
      } else {
        setLikedCount(likedCount + 1);
        return true;
      }
    });
  };
  return (
    <div className="post-parent">
      {profileView && <ProfileView {...props} setProfileView={setProfileView}/>}
      <div className="post">
        <div className="flex" style={{cursor:'pointer'}} onClick={()=>{
          setProfileView(true)
        }}>
          <img
            src={props.ProfilePicture || defalutProfile}
            alt=""
            className="post-profile"
          /> 
          <p className="post-username">{props.username}</p>
        </div>
        <img src={props.urlData} alt="" className="post-img" />
        <p className="post-caption" style={{marginTop:'5px',marginBottom:'5px'}}>{props.caption}</p>
        <div className="flex gap-3 mb-2">
          {" "}
          {liked ? (
            <ThumbUpAltIcon
              onClick={likeHandler}
              sx={{ color: "white" }}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <ThumbUpOffAltIcon
              onClick={likeHandler}
              sx={{ color: "white" }}
              style={{ cursor: "pointer" }}
            />
          )}{" "}
          {/* <ChatBubbleOutlineIcon
            sx={{ color: "white" }}
            style={{ cursor: "pointer" }}
          />{" "} */}
        </div>
        {/* <p className="post-username">{likedCount} likes</p>
        <p className="view-comments">View all {props.comments} comment</p>
        <div className="flex-sb">
          <input
            type="text"
            placeholder="add comments..."
            className="input-add-comment"
          />
          <button className="post-comment">post</button>
        </div> */}
      </div>
    </div>
  );
};

export default Posts;
