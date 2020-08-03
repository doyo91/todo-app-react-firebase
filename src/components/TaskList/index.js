import React from "react";
import { List } from "@material-ui/core";
import { Task } from "../Task";

export const TaskList = (props) => {
  return (
    <>
      <List>
        {props.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </List>
    </>
  );
};
