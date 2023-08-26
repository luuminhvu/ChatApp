import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";
const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    registerLoading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registerUser}>
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
              <h2 className="text-2xl text-center">Sign Up</h2>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {registerLoading ? "Loading..." : "Register"}
              </Button>
              {registerError && (
                <Alert variant="danger" className="text-center">
                  {registerError}
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
