import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Profile from "./Profile";
import demo from "../../assets/demo.jpg";
import Chat from "./Chat";
import Development from "../Development/Development";
import Create from "./Create";
import Loading from '../Loading/Loading.jsx'
import Notifications from "./Features/Notifications";
import ChatWindow from "../Development/ChatWindow/ChatWindow";
import Search from "./Search/Search.jsx";

const HomePage = ({
  currentPage,
  postsFromFireBase,
  setCurrentPage,
  fetchUsersData,
  fetchFreindsData
}) => {
  useEffect(() => {
    // console.log("posts", postsFromFireBase);
    // console.log("users", fetchUsersData);
    // console.log("friends", fetchFreindsData);
  }, [postsFromFireBase, fetchUsersData,fetchFreindsData]);


  const [chatWith,setChatWith] = useState();
  return (
    <div className="home-page col-sm-6 col-10">
      {currentPage === "Profile" && (
        <Profile
          setCurrentPage={setCurrentPage}
          postsFromFireBase={postsFromFireBase}
          fetchUsersData={fetchUsersData}
          fetchFreindsData={fetchFreindsData}
        />
      )}
      {currentPage === "Notification" &&  (
        <Notifications />
      )}
      {currentPage === "Create" && <Create setCurrentPage={setCurrentPage} />}
      {currentPage === "Search" && <Search fetchUsersData={fetchUsersData} fetchFreindsData={fetchFreindsData} />}
      {currentPage === "Chats" && <Chat setCurrentPage={setCurrentPage} setChatWith={setChatWith} fetchUsersData={fetchUsersData} fetchFreindsData={fetchFreindsData}/>}
      {currentPage === "ChatWindow" && <ChatWindow chatWith={chatWith} />}
      {currentPage === "Home" && (
        <div className="container-sm">
          {postsFromFireBase ? (
            postsFromFireBase.map((post,index) => {
              const userID = fetchUsersData.filter((user) => {
                return post.userId === user.id;
              });
              // console.log("userID", userID[0]);
              return <Posts key={index} {...post} username={userID[0].username} ProfilePicture={userID[0].ProfilePicture} />;
            })
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
