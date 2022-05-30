import { useState,useEffect } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser, getRoles } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState([]);
    const [roleaff, setRoleaff] = useState([]);
    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        gender: null,
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: "",
        role: "" 
    });

    const handleChanges = (e) => {
        e.preventDefault();
        console.log(e.target.name,e.target.value)
        setUserData({ ...userData, [e.target.name]: e.target.value });
        console.log(userData);

    }
 useEffect (()=>{
    getRoles()
    .then(res => {setRole(res);
    })
            .catch(err => console.log(err));
              
},[]); 

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(userData);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
    };
  

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign Up</h1>
                <Form className="col-lg-8" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group controlId="forName" className="col-lg-8">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Ivan Ivanov" onChange={handleChanges} required />
                            <Form.Text muted>
                                The name can be your real one or a username.
                            </Form.Text>
                        </Form.Group>
                        {/* <Form.Group controlId="forLastName" className="col-lg-4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Ivanov" onChange={handleChanges} />
                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" defaultValue="Not specified" name="gender" onChange={handleChanges}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Not specified</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-8">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="+23055888999" onChange={handleChanges} required />
                            <Form.Text muted>
                                Phone Number should be a valid Maurice number.
                            </Form.Text>
                        </Form.Group>
                         <Form.Group as={Col} controlId="formGridGender" className="col-lg-4">
                            <Form.Label>Role *</Form.Label>
                            <Form.Control as="select" name="role"  onChange={handleChanges} required >
                            {role.map(role =>  <option key={role?._id} value={role?._id} onClick={()=>setRoleaff(role.permissions)}>{role.name}</option>  )
                                }
                                   
                            </Form.Control>
                        </Form.Group> 
                    </Form.Row>
{roleaff.includes("canTransporter") ? (
                    <Form.Row>
                        <Form.Group className="col-lg-8">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="+23055888999" onChange={handleChanges} required />
                            <Form.Text muted>
                                Phone Number should be a valid Maurice number.
                            </Form.Text>
                        </Form.Group>
                
                    </Form.Row>
             ):("")}
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ivan@gmail.com" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                            <Form.Text muted>
                                Your password must be 8-20 characters long
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Repeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Register;