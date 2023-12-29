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
import NewGoalModal from  './NewGoalModal';
import GoalDetailModal from './GoalDetailModal'

export default function EmployeeDashboard(props) {
  let {
    numOfCards,
    setTopComments, comments,
    loggedInUser, topComments, curUser, curGoals, AddGoal,
    columns, activateModal, getGoalByID, getUserByID, users,
  } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
  
  return (
    <div style={{  height: 410, width: '100%' }}>
      <div className="p-1 d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        <Image height="50" src={icon}/>
          {curUser === loggedInUser ? "Your" : curUser.firstname + " " +curUser.lastname + "'s"} Goals
        </div>
        <div>
          <Button className="m-1" variant="success" onClick={()=>setModalShow(true)}>New Goal</Button>
          <NewGoalModal
            AddGoal={AddGoal}
            loggedInUser={loggedInUser}
            managedUsers={users.filter((user)=>user.mid===loggedInUser.id)}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
      <DataGrid
        rows={curGoals}
        columns={columns}
        onRowClick={
          (params, event, details) => {
            setTopComments(comments.filter((comment)=>comment.gid === params.id).slice(0,numOfCards));
            // activateModal(params.row);
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
        pageSize={5}
        goalsPerPageOptions={[5]}
        checkboxSelection={false}
        sx={{cursor: "grab",
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
      <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        Recent Comments
      <Container fluid>
      <Row sx={{width: '100%'}}>
        {topComments.length === 0 ? <div className="fw-italic"><br/> no recent comments... </div>: topComments.map((comment) => (
          <Col key={comment.eid} sx={{height: "300px", width: "25%"}}>
            {CommentCard(comment,getGoalByID,getUserByID,() => activateModal(getGoalByID(comment.gid))  )}
          </Col>
        ))}
      </Row>
      </Container>
      </div>
    </div>
  )
}
