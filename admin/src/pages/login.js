import * as React from "react";
import { Context } from "../ContextStore";
import { useState, useContext } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import "./login.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const MyLoginPage = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const { setUserData } = useContext(Context);
  const login = useLogin();
  const notify = useNotify();
  const handleChanges = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login(user)
      .then((res) => {
        if (!res.error) {
          setUserData(res.user);
          history.push("/");
        } else {
          setLoading(false);
          setError(res.error.message);
          setAlertShow(true);
        }
      })
      .catch(() => notify("Your Not Admin ! "));
  };

  return (
    <>
      <div className="outer">
        <div className="inner">
          <h1 className="auth-heading">Sign In</h1>
          <Form onSubmit={submit}>
            {alertShow && (
              <Alert
                variant="danger"
                onClose={() => setAlertShow(false)}
                dismissible
              >
                <p>{error}</p>
              </Alert>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChanges}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChanges}
                required
              />
            </Form.Group>
            {loading ? (
              <Button className="col-lg-12 btnAuth" variant="dark" disabled>
                Please wait... <Spinner animation="border" />
              </Button>
            ) : (
              <Button
                variant="dark"
                className="btn btn-primary btn-block"
                type="submit"
              >
                Sign In
              </Button>
            )}
          </Form>
        </div>
      </div>
      <Notification />
    </>
  );
};

export default MyLoginPage;
