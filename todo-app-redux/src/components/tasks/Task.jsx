import React, { useState } from "react";
import moment from "moment";
import { removeTask } from "../../actions/taskActions";
import { connect } from "react-redux";
import Check from "./Check";
import { toggleChecked } from "../../actions/taskActions";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";

const Task = ({ task, removeTask, toggleChecked, uid }) => {
  // const history = useHistory();
  const [update, setUpdate] = useState("");
  const [open, setOpen] = useState(false);

  // const { uid } = props;
  // const handleClick = () => {
  //   setClick(!click);
  //   if (click) {
  //     console.log("Clicked");
  //     return <Redirect to="/taskDetails" />;
  //   }
  // };

  // const routeChange = () => {
  //   history.push("/taskDetails");
  // };

  const handleRemove = (task) => {
    removeTask(task);
  };

  const handleCheck = (task) => {
    toggleChecked(task);
  };

  const editTodo = (task) => {
    // editTask(task, update);
    const firestore = getFirebase().firestore();
    firestore.collection("tasks").doc(task.id).update({
      task: update,
    });
    setOpen(false);
  };

  const openUpdateDialog = (task) => {
    setOpen(true);
    // setToUpdateId(id);
    setUpdate(update);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <tr>
        <th>
          <Link to={{ pathname: "/taskDetails", state: { task } }}>
            {" "}
            {task.task}
          </Link>
        </th>
        <td>{moment(task.date.toDate()).calendar()}</td>
        <td
          style={{ cursor: "pointer" }}
          onClick={() => openUpdateDialog(task)}
        >
          <span className="material-icons">edit</span>
        </td>
        <td>
          <Check onClick={() => handleCheck(task)} checked={task.checked} />
        </td>
        <td>
          <span
            className="material-icons text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleRemove(task)}
          >
            delete
          </span>
        </td>
      </tr>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => editTodo(task)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  const uid = state.firebase.auth.uid;
  return {
    uid: uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTask: (task) => dispatch(removeTask(task)),
    toggleChecked: (task) => dispatch(toggleChecked(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
