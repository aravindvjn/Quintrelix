
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" exa  element={<Home />}/>
        <Route path="/auth"  element={<Auth />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
