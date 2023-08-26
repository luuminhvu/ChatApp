import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/authContext";
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="text-[#166dc1] text-decoration-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-messenger"
              viewBox="0 0 16 16"
            >
              <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
            </svg>
            <span>Messenger</span>
          </Link>
        </h2>
        <Nav>
          {user ? (
            <Stack direction="horizontal" gap={3}>
              <span
                style={{
                  color: "#166dc1",
                  textDecoration: "none",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {user.name}
              </span>
              <Link
                onClick={() => {
                  logoutUser();
                }}
                to="/login"
                style={{
                  color: "#166dc1",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Link>
            </Stack>
          ) : (
            <Stack direction="horizontal" gap={3}>
              <Link
                to="/login"
                style={{ color: "#166dc1", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ color: "#166dc1", textDecoration: "none" }}
              >
                Register
              </Link>
            </Stack>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
