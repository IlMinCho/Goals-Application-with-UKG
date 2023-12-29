import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ListGroup from 'react-bootstrap/ListGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function GoalDetailModal(props) {
    const { row, getCommentsByGoal, changeRow, getEmployee, AddComment, loggedInUser, managedUsers} = props;
    
    const [changed, setChanged] = useState(false);
    const [makingNewComment,setMakingNewComment] = useState(false);
    const [radioValue, setRadioValue] = useState('-1');
  
  
  
    if (row === undefined){return;}
    let users = managedUsers.concat([loggedInUser]);
  
    let comments = getCommentsByGoal(row.id).sort((a,b) => {
      return b.createdate.getTime() - a.createdate.getTime();
    });
  
    const radios = [
      { name: 'Not-Started', value: '1' },
      { name: 'In-Progress', value: '2' },
      { name: 'Done', value: '3' },
      { name: 'Missed', value: '4' },
    ];
  
    let newRadio = radios.reduce((ret,obj,i) => { 
      if (obj['name'] === row.status){
        return obj['value'];
      }
      return ret;
    },'0');
  
    if (!changed && newRadio !== radioValue){
      setRadioValue(newRadio);
    }
  
    const variant = [
      'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
    ];
    
    const createdBy =  props.getEmployee(row.createdBy); 
    const assignedTo = props.getEmployee(row.assignedto);
  
    const onFormSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
      
      if (!users.includes(createdBy)){formDataObj.assignedto=row.assignedto;}
      else {formDataObj.assignedto = parseInt(formDataObj.assignedto.split("(")[1].slice(0,-1));}
  
      let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
      const modifiedObj = {
        id: row.id,
        title: formDataObj.title,
        description: formDataObj.description,
        startdate: formDataObj.startdate,
        completedate: formDataObj.completedate,
        createdate: row.createdate,
        status: r,
        assignedto: formDataObj.assignedto,
        createdate: row.createdate,
        createdBy: row.createdBy,
      }
      changeRow(modifiedObj).then(()=>setChanged(false));
    }
  
    const onClose = () => {
      if (changed){
        setChanged(false);
      }
      if (makingNewComment){
        setMakingNewComment(false);
      }
      props.onHide();
    };
  
    const addComment = (e) => {
      e.preventDefault()
  
      const comment = {
        gid: row.id,
        description: Object.fromEntries(new FormData(e.target).entries()).commentbody,
        eid: loggedInUser.id, createdate: new Date(),
        viewedBy: [],
      }
      if (comment.description !== ""){
        AddComment(comment).then( () => setMakingNewComment(false));
      }
      setMakingNewComment(false);
    } 
  
    return (
      <Modal
        {...props}
        onHide={onClose}
        size="lg"
        aria-labelledby="goalDetailModal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="goalDetailModal">
            View/Edit Goal #{row.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={onFormSubmit} onChange={() => setChanged(true)}>
          <Form.Group className="mb-3" controlId="goalDetailTitle">
              <FloatingLabel
                controlID="floatingInput"
                label="Title"
                className="mb-3"
                >
                <Form.Control
                  name="title"
                  size="lg"
                  type="text"
                  autoFocus
                  required
                  defaultValue={row.title}
                  placeholder=""
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="goalDetailDescription"
            >
              <FloatingLabel
                controlID="floatingInput"
                label="Description"
                className="mb-3"
              >
                <Form.Control 
                  name="description"
                  placeholder="" 
                  as="textarea" 
                  style={{height: '160px'}} 
                  defaultValue={row.description} />
              </FloatingLabel>
            </Form.Group>
            <Row className="g-2">
              <Col md>
            <Form.Group className="mb-3" controlId="goalDetailStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                name="startdate"
                type="date"
                placeholder=""
                required
                defaultValue={ row.startdate }
              />
            </Form.Group>
              </Col>
              <Col>
            <Form.Group className="mb-3" controlId="goalDetailCompletionDate">
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                name="completedate"
                type="date"
                placeholder=""
                required
                defaultValue={row.completedate}
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="goalDetailCreationDate">
              <Form.Label>Creation Date</Form.Label>
              <Form.Control
                name="createdate"
                type="date"
                placeholder=""
                readOnly
                disabled
                value={row.createdate.split("T")[0]}
              />
            </Form.Group>
            </Col>
            </Row>
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
                    onChange={(e) => {setChanged(true); setRadioValue(e.currentTarget.value); }}
                    required
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Form.Group>
              <Row>
                  <Col><Form.Label>Created By</Form.Label></Col>
                  <Col><Form.Label>Assigned To</Form.Label></Col>
              </Row>
              <Row>
                  <Col>
                  <Form.Control
                    name="createdBy"
                    type="string"
                    placeholder=""
                    readOnly
                    disabled
                    value={createdBy.firstname + " " + createdBy.lastname}
              />
                  </Col>
                  <Col>
                  <Form.Select defaultValue={assignedTo.firstname + " " + assignedTo.lastname + " (" + assignedTo.id + ")"} disabled={!users.includes(createdBy)} name="assignedto">
                {users.map((user) => 
                  <option> {user.firstname + " " + user.lastname + " (" + user.id + ")"} </option>
                )}
              </Form.Select>
              </Col>
              </Row>
            </Form.Group>
            <br/>
  
            <Form.Group
              className="mb-3"
              controlId="goalDetailManagerComment"
            > 
            <Form.Label>Comments</Form.Label>
              <ListGroup as="ol" numbered>
                {comments.map( (comment) => {
                const author = getEmployee(comment.eid);
                return (<ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{author.firstname + " " + author.lastname}</div>
                    {comment.description}
                  </div>
                  {comment.createdate.toLocaleDateString() + " at " + comment.createdate.toLocaleTimeString()}
                </ListGroup.Item>
                )})}
              </ListGroup>
            </Form.Group>
            
            
            <br/>
            <Modal.Footer>
          <Button onClick={onClose} >Close</Button>
          <Button variant="success" disabled={!changed} type="submit" >Save Changes</Button>
        </Modal.Footer>
          </Form>
          <Form 
            onChange={(e)=>{e.commentbody!==""?setMakingNewComment(true):setMakingNewComment(false)}} 
            onSubmit={addComment}>
            <Form.Group
              className="mb-5"
              controlId="goalDetailComment"
            > <FloatingLabel
            controlID="floatingInput"
            label="New Comment"
            className="mb-3"
            >
              <Form.Control name="commentbody" 
                className="mb-1" 
                defaultValue={""} 
                placeholder={""}as="textarea" style={{height: '100px'}}/>
              </FloatingLabel>
              <Button style={{float: 'right'}} disabled={!makingNewComment} type="submit">Add Comment</Button>
            </Form.Group>
            </Form>
        </Modal.Body>
       
      </Modal>
    );
  }
  