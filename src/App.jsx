// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Header from "./components/Header";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ThreadPage from "./pages/ThreadPage";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Header /> */}
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/thread/:id" element={<ThreadPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
