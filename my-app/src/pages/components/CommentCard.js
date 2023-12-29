import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function CommentCard(comment,getGoal,getUser,onClick) {
  const employee = getUser(comment.eid);
  const goal = getGoal(comment.gid);
  return (
    <Card variant="elevation" sx={{ width: '100%'}}>
      <CardActionArea onClick={onClick}>
        <CardHeader sx={{height: '60px'}}
          avatar={
            //<Avatar sx={ comment.viewedBy.includes(comment.author) ? { bgcolor: blue[500] } : { bgcolor: red[500] } }>
            <Avatar sx={  { bgcolor: blue[500] } }>
  
              {employee.firstname[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="view">
              {<ReviewsIcon size="lg" color="primary"/>}
            </IconButton>
          }
          title={goal.title}
          subheader={employee.firstname + " " + employee.lastname + " (" + employee.id+")"}
        />
        <CardContent sx={{height: '200px'}}>
          <Typography fontSize="14px" sx={{overflow: "hidden", textOverflow: "ellipsis", height: '85%'}} variant="body1" color="text.primary">
            {comment.description}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
           
            <div>{"Posted " + comment.createdate.toLocaleDateString() + " at " + comment.createdate.toLocaleTimeString()}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
