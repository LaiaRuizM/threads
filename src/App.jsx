// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Feed from "./pages/feed";
import Feed from "./pages/feed";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
