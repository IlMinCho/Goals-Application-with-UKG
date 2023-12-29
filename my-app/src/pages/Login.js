import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import logo from './login_logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

let fetching = false;
function Login() {
  const [show, setShow] = useState(false);
  const [incorrect,setIncorrect] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const cookies = new Cookies();
 
  useEffect(() => {
    const user = cookies.get("username")
    const pass = cookies.get("password")
    if (user && pass && !fetching){
      fetchUser(user, pass)
    }
  }, []);

  const onFormSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
    fetchUser(formDataObj.eid,formDataObj.password)
  }

  const fetchUser = async (username,password) => {
    fetching=true;
    const response = await fetch(
      "http://localhost:8000/auth",
      { 
        method: "POST",
        headers: { "content-type" : "application/json" },
        body: JSON.stringify({username: username, password: password})
      }
    )
    if (response.status === 404){
      setIncorrect(true);
    }
    else{
      cookies.set("username", username, { path: '/', maxAge: 3600});
      cookies.set("password", password, { path: '/', maxAge: 3600});
      response.json().then(d => {

      fetch("http://localhost:8000/employees/"+d.employee_id_company_id+"/managed-employees", {
      method: "GET",
      headers: { "content-type" : "application/json"},
    }).then( response => response.json()).then( managedUsers => {       
      
        fetch("http://localhost:8000/employees/"+d.manager_id, {
          method: "GET",
          headers: { "content-type" : "application/json"},
        }).then ( response => response.json()).then ( manager => {
        console.log("navigating to dashboard!");
        console.log(managedUsers);
        navigate('./Dashboard', 
          {state: {
            user: {
            firstname: d.first_name,
            lastname: d.last_name,
            id: d.id,
            employee_id: d.employee_id,
            email: d.email,
            companyid: d.company_id,
            companyname: d.company_name,
            title: d.position_title,
            mid: d.manager_id,
            goals: d.goals
            },
            managedUsers: managedUsers,
            manager: manager,
          } }
       )})});
      });
    }
  }


  return (
    <Container fluid style={{backgroundColor: '#30CEBB', minHeight: '100vh', minWidth: '100vh'}}>
      <Row>
        <Col className="d-flex align-items-center justify-content-start" style={{minHeight: '100vh'}}>
          <Image src={logo}/>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '25rem', height: '25rem',}}>
            <Card.Body>

              <Form onSubmit={onFormSubmit} style={{color: '#005151'}}>
                <Form.Group className="mb-2 ">
                  <Form.Label className="fw-bold fs-2">Username</Form.Label>
                  <Form.Control name="eid" className="form-control-lg" type="text" placeholder="Enter username" required/>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="fw-bold fs-2">Password</Form.Label>
                  <Form.Control name="password" className="form-control-lg" type="password" placeholder="Password" required/>
                </Form.Group>
                <div className="d-grid gap-5">
                  <Button className="btn-sm float-end border-0" style={{backgroundColor: '#53565A'}} onClick={handleShow}>
                    Forget Password
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Attention</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please contact the IT department for more information!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        OK
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Button className="btn-lg border-0" style={{backgroundColor: '#005151'}} type="submit">
                    Login
                  </Button>
                </div>
                {incorrect?"Your Username or Password was Incorrect":""}
              </Form>

            </Card.Body>
          </Card>
          
        </Col>
        <Button className="btn-sm border-0 bg-warning" type="submit" onClick={()=> navigate('./Dashboard',           {state: {
          user: {
            firstname: "Jim",
            lastname: "Johnson",
            id: 33,
            employee_id: 0,
            email: "jimjohnson@acme.com",
            companyid: 4,
            companyname: "acme",
            title: "middle manager",
            mid: 42,
            isManager: true,
            goals: []
            },
          managedUsers: [],
          manager: {
            firstname: "Tim",
            lastname: "Thompson",
            id: 42,
            employee_id: 0,
            email: "tim@acme.com",
            companyid: 4,
            companyname: "acme",
            title: "middle manager",
            mid: 9999,
            isManager: true,
            goals: []
            },
          } })}>
          Temporary Access
        </Button>
      </Row>

    </Container>
  );
};
  
export default Login;