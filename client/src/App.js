import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate,  useNavigate } from "react-router-dom"; // navigate is for the redirecting
import Home from "./pages/Home"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Select from "./pages/Select";
import Conferences from "./pages/Conferences";
import ViewConferences from "./pages/ViewConferences";
import CreateConference from "./pages/CreateConference";
import Paper from "./pages/Paper";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UploadReviewers from "./pages/UploadReviewers";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/viewconferences" element={<ViewConferences />} />
        <Route path="/createconference" element={<CreateConference />} />
        <Route path="/paper" element={<Paper />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadreviewers" element={<UploadReviewers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;