import * as React from 'react';
import { Context } from '../ContextStore';
import { useState, useContext } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const MyLoginPage = ({ history }) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const { setUserData } = useContext(Context)
    const login = useLogin();
    const notify = useNotify();
    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const submit = e => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login(user)
        .then(res => {
            if(!res.error) {
                setUserData(res.user)
                history.push('/')
            }else {
                setLoading(false);
                setError(res.error.message);
                setAlertShow(true);
            }
        })
        .catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <ThemeProvider theme={createTheme(defaultTheme)}>
            <form onSubmit={submit}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                <input
                    name="email"
                    type="email"
                    onChange={handleChanges}
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChanges}
                />
                 {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign In</Button>
                    }
            </form>
            <Notification />
        </ThemeProvider>
    );
};

export default MyLoginPage;