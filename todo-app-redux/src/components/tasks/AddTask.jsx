import React, { Component } from "react";
import { addTask } from "../../actions/taskActions";
import { connect } from "react-redux";

class AddTask extends Component {
  state = {
    task: "",
    taskDesc: "",
    checked: "false",
  };

  handleTaskChange = (e) => {
    this.setState({
      // [e.target.id]: e.target.value,
      task: e.target.value,
    });
  };

  handleTaskDescChange = (e) => {
    this.setState({
      taskDesc: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state);
    document.getElementById("addTaskForm").reset();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <form
          id="addTaskForm"
          className="container"
          autoComplete="off"
          style={{ marginTop: "30px" }}
          onSubmit={this.handleSubmit}
        >
          <legend> </legend>
          <div className="form-group">
            <label htmlFor="task">Add a task</label>
            <h6>Task </h6>
            <input
              type="text"
              className="form-control"
              id="task-title"
              onChange={this.handleTaskChange}
            />
            <h6 style={{ margin: "1rem 0" }}>Task Description</h6>
            <input
              type="text"
              className="form-control"
              id="task-desc"
              onChange={this.handleTaskDescChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(addTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(AddTask);
