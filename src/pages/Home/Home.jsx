import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import HomePage from "./HomePage";
import SideBar from "./SideBar";

import Request from "./Request";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext, FirebaseContext } from "../../firebase/context";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import ServerLoading from "../Loading/ServerLoading";
import Timer from "../Loading/Timer";
const Home = () => {
  const [fetchUsersData, setFetchUsersData] = useState([]);
  const [fetchFreindsData, setFetchFreindsData] = useState([]);
  const [postsFromFireBase, setPostsFromFireBase] = useState([]);
  const { user, setUser, setTheData } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [desktop, setDesktop] = useState(window.innerWidth > 576);
  const [currentPage, setCurrentPage] = useState("Home");
  const [serverLoading, setServerLoading] = useState(true);
  const [timer, SetTimer] = useState(false);
  const [count,setCount]=useState(true)
  window.addEventListener("resize", () => {
    setDesktop(window.innerWidth > 576 ? true : false);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      const userDocRef = doc(firestore, "users", currentUser.uid);
      onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          // console.log("Real-time updated data:", docSnap.data());
          setTheData(docSnap.data());
        } else {
          // console.log("No such document!");
        }
      });
    });

    async function fetchImages() {
      const usersCollection = collection(firestore, "images");
      const snapshot = await getDocs(usersCollection);
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostsFromFireBase(userList);
      // console.log("images datas", userList);
    }
    async function fetchUser() {
      const usersCollection = collection(firestore, "users");
      const snapshot = await getDocs(usersCollection);
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchUsersData(userList);
      // console.log("users datas", userList);
      if (count) {
        SetTimer(true);
        setServerLoading(false);
        setTimeout(() => {
          SetTimer(false);
          setCount(false)
        }, 5000);
      }
    }
    async function fetchFriends() {
      const usersCollection = collection(firestore, user.uid);
      const snapshot = await getDocs(usersCollection);
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFetchFreindsData(userList);
      // console.log("friends datas", userList);
    }
    fetchImages();
    fetchFriends();
    fetchUser();
    return () => unsubscribe();
  }, [currentPage]);
  return (
    <div className="home row">
      {timer && <Timer />}
      {serverLoading && <ServerLoading />}
      <SideBar user={user} desktop={desktop} setCurrentPage={setCurrentPage} />
      <HomePage
        currentPage={currentPage}
        postsFromFireBase={postsFromFireBase}
        setCurrentPage={setCurrentPage}
        fetchUsersData={fetchUsersData}
        fetchFreindsData={fetchFreindsData}
      />
      {desktop && <Request />}
    </div>
  );
};

export default Home;
