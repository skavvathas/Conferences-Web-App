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
import PaperExcel from "./pages/PaperExcel";
import PaperNew from "./pages/PaperNew";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UploadReviewers from "./pages/UploadReviewers";
import ReviewersExcel from "./pages/ReviewersExcel";
import ReviewersHand from "./pages/ReviewersHand";
import { useAuthContext } from "./hooks/useAuthContext";
import Conf from "./pages/Conf";

function App() {

  const {user} = useAuthContext(); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Select /> : <Navigate to="/home"/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/home"/>} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home"/>} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/conferences" element={user ? <Conferences /> : <Navigate to="/" />} />
        <Route path="/conferences/:acronym/:conferenceId" element={user ? <Conf /> : <Navigate to="/" />}/>
        <Route path="/viewconferences" element={user ? <ViewConferences /> : <Navigate to="/" />} />
        <Route path="/createconference" element={user ? <CreateConference /> : <Navigate to="/" />} />
        <Route path="/paper" element={user ? <Paper /> : <Navigate to="/" />} />
        <Route path="/about" element={user ? <About /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/uploadreviewers" element={user ? <UploadReviewers /> : <Navigate to="/" />} />
        <Route path="/addreviewersexcel/:id" element={user ? <ReviewersExcel /> : <Navigate to="/" />} />
        <Route path="/addreviewershand/:id" element={user ? <ReviewersHand /> : <Navigate to="/" />} />
        <Route path="/addpaper/:id" element={user ? <Paper /> : <Navigate to="/" />} />
        <Route path="/addpaperexcel/:id" element={user ? <PaperExcel /> : <Navigate to="/" />} />
        <Route path="/addpapernew/:id" element={user ? <PaperNew /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;