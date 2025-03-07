import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import CustomQuery from "./pages/CustomQuery";
import "./App.css"; 


import homeIcon from "./Sidebar/home.png";
import addIcon from "./Sidebar/add.png";
import updateIcon from "./Sidebar/update.png";
import deleteIcon from "./Sidebar/delete.png";
import customIcon from "./Sidebar/custom.png";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={homeIcon} alt="Library" className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={addIcon} alt="Add" className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/update" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={updateIcon} alt="Update" className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/delete" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={deleteIcon} alt="Delete" className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/custom-query" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={customIcon} alt="Custom Query" className="nav-icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/custom-query" element={<CustomQuery />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
