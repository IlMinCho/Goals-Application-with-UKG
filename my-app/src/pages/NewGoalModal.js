import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useResolvedPath, resolvePath } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import logo from './ukglogo.jpg';
import icon from './icon1.png';
import ManagerDashboard from "./ManagerDashboard.js";
import CommentCard from './components/CommentCard';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AlertBox from './components/AlertBox.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { GridActionsCellItem, GridRowId, GridColumns } from '@mui/x-data-grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Cookies from 'universal-cookie';
export default function NewGoalModal(props) {
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
      { name: 'Not-Started', value: '1' },
      { name: 'In-Progress', value: '2' },
      { name: 'Done', value: '3' },
      { name: 'Missed', value: '4' },
    ];
    const variant = [
      'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
    ];
  
    const onFormSubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
      formDataObj.id = -1;
      formDataObj.createdate = new Date();
      formDataObj.createdBy = props.loggedInUser.id;
      let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
      formDataObj.status = r;
      const aTo = formDataObj.assignedto;
      if (aTo === "Me"){
        formDataObj.assignedto = props.loggedInUser.id;
      }
      else{
        const id = parseInt(aTo.split("(")[1].slice(0,-1));
        formDataObj.assignedto = id;
      }
  
      
  
      props.AddGoal(formDataObj);
      props.onHide();
    };
  
    const onClose = () => {
      setRadioValue('1');
      props.onHide();
    }
  
    return (
      <Modal
        key={Modal.uid}
        {...props}
        onHide={onClose}
        size="lg"
        aria-labelledby="newGoalModal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="newGoalModal">
            New Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="newGoalDescription">
                <FloatingLabel controlID="floatingInputGrid" label="Title">
                  <Form.Control
                    name = "title"
                    type="text"
                    required
                    placeholder=""
                  />
                </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newGoal"
            >
              <FloatingLabel controlID="floatingInputGrid" label="Description">
                <Form.Control required 
                  name="description" 
                  as="textarea" 
                  style={{height: '160px'}} 
                  placeholder=""
                />
              </FloatingLabel>
            </Form.Group>
            <Row><Col>
            <Form.Group className="mb-3" controlId="newGoalStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                name = "startdate"
                type="date"
                required
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="newGoalCompletionDate">
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                name="completedate"
                type="date"
                required
              />
            </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col>
            <Form.Group className="mb-3" controlId="newGoalStatus">
              <Form.Label>Status</Form.Label><br/>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={variant[idx]}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    required
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group>
              <Form.Label>Assigned To</Form.Label>
              <Form.Select name="assignedto">
              <option>Me</option>
                {props.managedUsers.map((user) => 
                  <option> {user.firstname + " " + user.lastname + " (" + user.id + ")"} </option>
                )}
              </Form.Select>
              
            </Form.Group>
            </Col>
            </Row>
          
            <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button variant="success" type="submit"> Create</Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
        
      </Modal>
    );
  }

