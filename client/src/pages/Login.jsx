import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../store/authContext";
const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, loginLoading } =
    useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row>
          <Col
            xs={6}
            style={{
              margin: "auto",
              justifyContent: "center",
              paddingTop: "10%",
              color: "#166dc1",
            }}
          >
            <Stack gap={3} className="">
              <h2 className="text-2xl text-center">Sign In</h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                {loginLoading ? "Loading..." : "Login"}
              </Button>
              {loginError && (
                <Alert variant="danger" className="text-center">
                  Error
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
