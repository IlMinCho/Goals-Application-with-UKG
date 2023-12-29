import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'react-bootstrap/Image';
import icon from './icon2.png';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function Row(props) {
  const { user } = props;
  const { goals } = props;
  const { setCurUser } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow >
        <TableCell style={{width: 20}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => goals.length===0?setOpen(false):setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          
        </TableCell>
        <TableCell component="th" scope="row">
         
        <IconButton size="small" onClick={() => {
            setCurUser( user.id )
          }}>
          {<PersonIcon color="primary"/>}
          <strong>{user.firstname + " " + user.lastname}  </strong>
        </IconButton>
        </TableCell>
        <TableCell >{user.id}</TableCell>
        <TableCell >{user.title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Goals
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Goal Title</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Completion Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {goals.map((GoalsRow) => (
                    <TableRow key={GoalsRow.id}>
                      <TableCell component="th" scope="row">
                        <IconButton size="small" onClick={() => props.activateModal(GoalsRow)}>
                          {<ReviewsIcon color="primary"/>}
                           {GoalsRow.title}
                        </IconButton>
                       
                      </TableCell>
                      <TableCell>
                        {GoalsRow.startdate} 
                      </TableCell>
                      <TableCell>
                        {GoalsRow.completedate}
                      </TableCell>
                      <TableCell>
                        {GoalsRow.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function ManagerDashboard(setCurUser, activateModal, getUsers, user, goals) {
  const users = getUsers(user);
  return (
    <box style={{width:"100%"}}>
    <br/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className="fw-bold fs-2" style={{color: '#005151'}} colSpan={2}>
              <Image height="50" src={icon}/>
              Your Employees
            </TableCell>
            </TableRow>
          <TableRow>
            <TableCell />
            <TableCell sx={{width: 300}}>Name</TableCell>
            <TableCell sx={{width: 80}}>ID</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Row key={user.id} setCurUser={setCurUser}
              goals={goals.filter((goal)=>goal.assignedto===user.id)}
              user = {user} activateModal={activateModal}
              />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </box>
  );
}
