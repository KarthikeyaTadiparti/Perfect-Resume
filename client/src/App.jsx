import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Resume from "./pages/Resume";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Demo from "./pages/Demo"
import AboutUs from "./pages/AboutUs";
function App() {
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    return (
        <Routes>
            <Route path="/demo" element={<Demo/>}></Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path="/aboutus" element={<AboutUs />}></Route>
                <Route path="/auth/login" element={<Login />}></Route>
                <Route path="/auth/signup" element={<Signup />}></Route>
                <Route element={<PrivateRoute UserInfo={UserInfo} />}>
                    <Route path="/resume" element={<Resume />}></Route>
                    <Route path="/resume/new" element={<Create />}></Route>
                    <Route path="/resume/:id" element={<Edit />}></Route>
                </Route>
            </Route>
            
        </Routes>
    );
}

export default App;
