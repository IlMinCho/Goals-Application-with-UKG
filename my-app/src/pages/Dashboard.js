import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import logo from './ukglogo.jpg';
import icon from './icon1.png';
import ManagerDashboard from "./ManagerDashboard.js";
import GoalCard from './components/GoalCard';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AlertBox from './components/AlertBox.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { GridActionsCellItem, GridRowId, GridColumns } from '@mui/x-data-grid';


//Sample Data
let rows = [

  {
    id: 298, title: 'Purchase New Coffee Machine',
    description: 'Jon says Keurig is preferred!',
    startdate: "9/26/2021", completedate: "10/27/2021",
    status: "In-Progress"
  },

  {
    id: 62, title: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work? I am now going to write a bunch more here to test whether or not anything breaks when a verrrrry long description is used. This should roughly be the maximum length of a description, right?',
    startdate: "11/2/21", completedate: "11/11/21",
    status: "Missed",
  },

  { id: 3876, title: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    startdate: "2/3/1989", completedate: "1/1/2040",
    status: "Done"
  },

  { id: 3877, title: 'Test Employee Dashboard Frontend', 
    description: 'Try to break inputs, look for undefined behavior.', 
    startdate: "10/11/2022", completedate: "10/13/2022",
    status: "Not-Started"
  },

  { id: 5, title: 'Spend More Time Outside', 
    description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    startdate: "4/12/2020", completedate: "5/16/2023",
    status: "In-Progress"
  },

];

//Sample Data
let loggedInUser = {
  firstname: "Jim",
  lastname: "Johnson",
  eid: 42, //Employee ID
  title: "Generic Middle Manager",
  isManager: true,
  email: "jimjohnson@acme.com",
  compid: 2, //Company ID
  mid: 43, //Manager ID
  password: "password",
}

const numOfCards = 4;

function EmployeeDashboard(selectedRows,setSelectedRows,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns) {
  const [modalShow, setModalShow] = React.useState(false);
  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
  
  // Below code not in use
  const dateComp = (str) => {
    const today = new Date()
    const [day, month, year] = str.split("/");
    const date = new Date(+year, month - 1, +day);
    return date.getTime() > today.getTime() ? true : false
  }
  // Above code not in use

  return (
    <div style={{ height: 450, width: '100%' }}>
      <div className="p-1 d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        <Image height="50" src={icon}/>
          {curEmployee == loggedInUser ? "Your" : curEmployee.firstname + " " +curEmployee.lastname + "'s"} Goals
        </div>
        <div>
          <Button className="m-1" variant="success" onClick={()=>setModalShow(true)}>New Goal</Button>
          <NewGoalModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />        
        </div>
      </div>
      <DataGrid
        rows={curRows}
        columns={columns}
        onRowClick={
          (params, event, details) => {
            if (!selectedRows.includes(params.row)){
              let temp = [...selectedRows];
              temp[selectedGoalIndex] = params.row;
              if (selectedGoalIndex+1 == selectedRows.length){
                selectedGoalIndex=-1;
              }
              setSelectedGoalIndex(selectedGoalIndex+1);
              setSelectedRows(temp);
            }
          }
        }
        components={{ Toolbar: () => 
          <Box sx = {{ p: 0.5, pb: 0, }} > <GridToolbarQuickFilter /> </Box> 
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'status', sort: 'desc'}],
          },
        }}
        pageSize={10}
        rowsPerPageOptions={[6]}
        checkboxSelection={false}
        sx={{
          '& .super-app-theme--Not-Started': {backgroundColor: 'rgba(0, 255, 255, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 255, 255, 0.5)')}},
          '& .super-app-theme--In-Progress': {backgroundColor: 'rgba(0, 255, 0, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 255, 0, 0.5)')}},
          '& .super-app-theme--Done': {backgroundColor: 'rgba(0, 0, 0, 0.25)', color: 'text.disabled',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 0, 0, 0.5)'),}},
          '& .super-app-theme--Missed': {backgroundColor: 'rgba(255, 0, 0, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(255, 0, 0, 0.5)')}},
        }}
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      />
      <TableRow sx={{width: '100%'}}>
        {selectedRows.map((GoalsRow) => (
          <TableCell sx={{height: "350px", width: "25%"}}>
            {GoalCard(GoalsRow,curEmployee)}
          </TableCell>
        ))}   
      </TableRow>
    </div>
  )
}

function NewGoalModal(props) {
  const [radioValue, setRadioValue] = useState(false);
  const radios = [
    { name: 'Not Started', value: '1' },
    { name: 'In-progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];
  const variant = [
    'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
  ];

  return (
    <Modal
      {...props}
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
        <Form>
          <Form.Group className="mb-3" controlId="newGoalDescription">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
              />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="newGoal"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newGoalStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newGoalCompletionDate">
            <Form.Label>Completion Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
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
          <Form.Group
            className="mb-3"
            controlId="newGoalComment"
          >
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" type="submit" onClick={() => null}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

function GoalDetailModal(props) {
  const [radioValue, setRadioValue] = useState('2');
  const radios = [
    { name: 'Not Started', value: '1' },
    { name: 'In-progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];
  const variant = [
    'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
  ];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="goalDetailModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="goalDetailModal">
          Goal ID
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="goalDetailTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="goalDetailDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailCompletionDate">
            <Form.Label>Completion Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailCreationDate">
            <Form.Label>Creation Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="12/34/5678"
              autoFocus
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailStatus">
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
          <Form.Group
            className="mb-3"
            controlId="goalDetailManagerComment"
          > 
            <Badge bg="danger" pill>!</Badge>
            <Form.Label>Manager Comment</Form.Label>
            <Form.Control as="textarea" rows={3} readOnly>
              Good job!
            </Form.Control>
            <Form.Text>Last edited on 02/11/2022</Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="goalDetailComment"
          >
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3}>
              I think so.
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" type="submit" onClick={() => null}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Dashboard() {

  const {state} = useLocation();
  if (state != null){
    loggedInUser = state.user;
    rows = state.goals;
    console.log(state);
  }

  const [selectedGoalIndex,setSelectedGoalIndex] = React.useState(0);
  const [selectedGoals, setSelectedGoals] = React.useState(rows.slice(0,numOfCards));
  const [curEmployee, setCurEmployee] = React.useState(loggedInUser);
  const [curRows, setCurRows] = React.useState(rows);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  
  const columns = [

    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      description: "The goal's unique 'id'entifier, or ID"
    },
  
    { 
      field: 'title', 
      headerName: 'Title', 
      flex: 0.5,
      description: "What the goal is!",
      minWidth: 200,
    },
  
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1,
      description: "More information about what the goal entails",
      minWidth: 110,
    },
  
    {
      field: 'startdate',
      description: 'The date of start for the goal',
      headerName: 'Start Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      width: 130,
    },
  
    {
      field: 'completedate',
      description: "The predicted completion date for a goal",
      headerName: 'Completion Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      width: 155,
    },
  
    {
      field: 'status',
      description: 'Not-Started/In-Progress/Done/Missed',
      headerName: 'Status',
      width: 120,
    },
  
    {
      field: "actions",
      type: 'actions',
      headerName: "View",
      description: 'Click for Full Goal Information!',
      sortable: false,
      filterable: false,
      width: 100,
  
      getActions: (params) => [

        <GridActionsCellItem icon={<ReviewsIcon color="primary" />} onClick={ () => setModalShow(true) }/>,
        // <GoalDetailModal
        //   show={modalShow}
        //   onHide={() => setModalShow(false)}
        // />,
        // AlertBox(
        //   {
        //     deny: "Cancel", 
        //     accept: "I'm Sure", 
        //     body: "Are you sure you want to delete this goal?", 
        //     title: "Delete Goal #" + params.id
        //   },
        //   () => {
        //     setCurRows( curRows.filter( (row) => row.id !== params.id ))
        //     rows=rows.filter( (row) => row.id !== params.id)
        //   }, 
        //   () => 1,
        //   <DeleteIcon color="warning"/>,
        // )
      ]
    
    },

    {
      field: "Archive",
      type: 'actions',
      headerName: "Archive",
      description: 'Set it to archive!',
      sortable: false,
      filterable: false,
      width: 100,
  
      getActions: (params) => [

        // <GridActionsCellItem icon={<ReviewsIcon color="primary" />} onClick={ () => setModalShow(true) }/>,
        <GoalDetailModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />,
        AlertBox(
          {
            deny: "Cancel", 
            accept: "I'm Sure", 
            body: "Are you sure you want to set this goal as archieve?", 
            title: "Archieve Goal #" + params.id
          },
          () => {
            setCurRows( curRows.filter( (row) => row.id !== params.id ))
            rows=rows.filter( (row) => row.id !== params.id)
          }, 
          () => 1,
          <DeleteIcon color="warning"/>,
        )

      ]
    
    }
  
  ];

  return (

    <div>
      <Navbar style={{backgroundColor: '#005151'}}>
          <Navbar.Brand style={{paddingLeft: '6%'}}className="fw-bold fs-3 navbar-light" href="#home">
            <Image className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Dashboard
          </Navbar.Brand>
          <Button variant="light" onClick={() => 
            {setCurEmployee(loggedInUser); 
            setCurRows(rows); 
            if(curEmployee != loggedInUser){setSelectedGoals(rows.slice(0,numOfCards))} }}>
              Your Goals
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Navbar.Text style={{paddingRight: '3px'}} className="fw-bold navbar-light">
              Signed in as <Button style={{marginRight: '5px'}} className="btn-md"><strong>{loggedInUser.firstname}</strong></Button>
              ID: {loggedInUser.eid}
            <Button className="m-1" variant="warning" onClick={()=>navigate('/')}>Logout</Button>

            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
      <div>
        {EmployeeDashboard(selectedGoals,setSelectedGoals,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns)}
        <div>

          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/>

          <div>
          {loggedInUser.isManager ? ManagerDashboard(setCurEmployee,setCurRows,setSelectedGoals,setSelectedGoalIndex,numOfCards) : "(not a manager)"}
          </div>
        </div>
      </div>
    </div>

  );
}