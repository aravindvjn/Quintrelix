import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.jsx";
import "./index.css";
import { app, auth, firestore, storage } from "./firebase/firebase";
import ContextUser, { FirebaseContext } from "./firebase/context";


createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ app, auth, firestore, storage }}>
    <ContextUser>
      <App />
    </ContextUser>
  </FirebaseContext.Provider>
);
