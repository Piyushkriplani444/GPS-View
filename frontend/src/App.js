import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
//import Navbar from "./components/Navbar";
import Register from "./components/Register";
import DetailPage from "./components/DetailPage";
function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element= {<Dashboard/> } />
        <Route  path="/detailpage" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>  
    );
}

export default App;