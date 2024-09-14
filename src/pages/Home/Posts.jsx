import React, { useState } from "react";
import demo from "../../assets/demo.jpg";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Posts = (props) => {
  const [liked, setLiked] = useState(false);
  const likeHandler = () => {
    setLiked(!liked);
  };
  return (
    <div className="post-parent">
      <div className="post">
        <div className="flex">
          <img src={demo} alt="" className="post-profile" />
          <p className="post-username">{props.username}</p>
        </div>
        <p className="post-caption">{props.caption}</p>
        <img src={demo} alt="" className="post-img" />
        <div className="flex gap-3 mb-2">
          {" "}
          {liked ? (
            <ThumbUpAltIcon
              onClick={likeHandler}
              sx={{ color: "white" }}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <ThumbUpOffAltIcon onClick={likeHandler} sx={{ color: "white" }} style={{cursor:'pointer'}} />
          )}{" "}
          <ChatBubbleOutlineIcon
            sx={{ color: "white" }}
            style={{ cursor: "pointer" }}
          />{" "}
        </div>
        <p className="post-username">{props.like} likes</p>
        <p className="view-comments">View all {props.comments} comments</p>
        <p className="add-comments">Add a comment..</p>
      </div>
    </div>
  );
};

export default Posts;
