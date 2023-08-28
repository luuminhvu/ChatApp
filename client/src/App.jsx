import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./store/authContext";
import { ChatContextProvider } from "./store/chatContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className="text-white">
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
