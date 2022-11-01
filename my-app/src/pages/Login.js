import React, { useState } from 'react';
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


function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const onFormSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
    fetchGoals(formDataObj.id,formDataObj.password)
  }

  const fetchGoals = async (id,password) => {
    const response = await fetch("http://localhost:8000/auth?eid="+id+"&password="+password)
    if (response === null){console.log("TIMED OUT")}
    const data = await response.json()
    if (data !== null){
      navigate('./Dashboard', {goals: data.goals, user: data.user})
    }
    else{
      console.log("Date is null!")
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
              </Form>

            </Card.Body>
          </Card>
          
        </Col>
        <Button className="btn-sm border-0 bg-warning" type="submit" onClick={()=> navigate('./Dashboard')}>
          Temporary Access
        </Button>
      </Row>

    </Container>
  );
};
  
export default Login;