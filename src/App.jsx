
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth"  element={<Auth />}/>
        <Route exact path="/"  element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
