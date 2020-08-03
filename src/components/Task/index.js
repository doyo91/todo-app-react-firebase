import React, { useState } from "react";
import { db } from "../../services/firebase";
import {
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
  Button,
  Input,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTitle: {
    marginBottom: "20px",
  },
  input: {
    marginBottom: "5px",
  },
  icon: {
    marginRight: "5px",
  },
  btn: {
    marginLeft: "5px",
  },
}));

export const Task = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTask = () => {
    if (input) {
      db.collection("tasks").doc(props.task.id).set(
        {
          task: input,
        },
        { merge: true }
      );
    }
    setOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={props.task.task}
          secondary={"task: " + props.task.id}
        ></ListItemText>
        <EditIcon
          className={classes.icon}
          color="primary"
          onClick={() => setOpen(true)}
        >
          Edit
        </EditIcon>
        <DeleteForeverIcon
          color="secondary"
          onClick={() => db.collection("tasks").doc(props.task.id).delete()}
        >
          Delete
        </DeleteForeverIcon>
      </ListItem>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <h1 className={classes.modalTitle}>Edit Task</h1>
          <Input
            className={classes.input}
            placeholder={props.task.task}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={updateTask}
          >
            Update Task
          </Button>
        </div>
      </Modal>
    </>
  );
};
