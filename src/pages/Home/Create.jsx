import React, { useContext, useState } from "react";
import { AuthContext, FirebaseContext } from "../../firebase/context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Create = ({setCurrentPage}) => {
  const navigate= useNavigate();
  const [uploadPercentage,setUploadPercentage] = useState();
  const [caption, setCaption] = useState("");
  const { app, auth, firestore, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  return (
    <div className="profile-div">
      
      <div className="create-div">
        {uploadPercentage && <p>{uploadPercentage}</p>}
      {image && (
        <img style={{objectFit:'cover',backgroundColor:'black',borderRadius:'5px'}}
          src={URL.createObjectURL(image)}
          width="200px"
          height="250px"
          alt=""
        />
      )}
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className="upload-input"
          accept=".jpg,.png"
          type="file"
        />
        <textarea className="caption-input" placeholder="Write a caption..." onChange={(e)=>{
          setCaption(e.target.value)
        }} />{" "}
        <button
          style={{ backgroundColor: "red",border:'1px solid white',borderRadius:'7px' }}
          onClick={() => {
            if (!image) {
              // console.log("No image selected");
              alert("No Image Selected")
              return;
            }

            const storage = getStorage();
            const dateName = image.name + new Date() + user.uid;
            const storageRef = ref(storage, `images/${dateName}`);

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
                setUploadPercentage("Upload is " + Math.floor(progress) + "% done");
              },
              (error) => {
                // console.error("Error during upload:", error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                  // console.log("File available at", url);
                  try {
                    await setDoc(doc(firestore, "images", dateName), {
                      urlData: url,
                      userId: user.uid,
                      ProfilePicture:user.photoURL,
                      createdAt: new Date(),
                      caption: caption,
                    });
                    setCurrentPage("Home")
                    navigate("/")
                    // console.log("URL added to Firestore");
                  } catch (e) {
                    // console.error("Error adding URL to Firestore:", e);
                  }
                });
              }
            );
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Create;
