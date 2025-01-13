import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Resume from "./pages/Resume";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Create from "./pages/Create";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center bg-background">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="/resume" element={<Resume />}></Route>
                    </Route>
                    <Route path="/auth/login" element={<Login />}></Route>
                    <Route path="/auth/signup" element={<Signup />}></Route>
                    <Route path="/create" element={<Create />}></Route>
                </Routes>
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
