import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import { db } from "./services/firebase";
import firebase from "firebase";
import { TaskList } from "./components/TaskList";

const AppStyled = styled.div`
  text-align: center;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;

  .App__title {
    font-size: 2rem;
    margin: 2rem auto;
  }

  .App__input {
    margin-bottom: 1rem;
  }

  .App__btn {
    margin-left: 1rem;
  }
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data().task }))
        );
      });
  }, [input]);

  const addTask = (event) => {
    event.preventDefault();
    // ...tasks -->todo lo que existe, input -> push input
    // setTasks([...tasks, input]);
    db.collection("tasks").add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <AppStyled className="App">
      <h1 className="App__title">To Do List</h1>
      <FormControl>
        <InputLabel>Write a Task</InputLabel>
        <Input
          className="App__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </FormControl>
      <Button
        className="App__btn"
        type="submit"
        onClick={addTask}
        disabled={!input}
        variant="contained"
        color="primary"
      >
        Add task
      </Button>
      <TaskList tasks={tasks} />
    </AppStyled>
  );
}

export default App;
