import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const TaskDetails = (props) => {
  // const { uid } = this.props;
  if (props.location.state.task) {
    console.log(props.location.state.task);
    console.log(props.location.state.task.checked);
  }
  return (
    <>
      <h4 style={{ textAlign: "center", margin: "2rem 0" }}>
        Task Details Page
      </h4>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="task-title"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <label htmlFor="task-title" style={{ textDecoration: "underline" }}>
            Task Title
          </label>
          <h6>{props.location.state.task.task}</h6>
        </div>
        <div
          className="task-desc"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="task-desc" style={{ textDecoration: "underline" }}>
            Task Description
          </label>
          <p>{props.location.state.task.taskDesc}</p>
        </div>
        <div
          className="task-status"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="task-desc" style={{ textDecoration: "underline" }}>
            Task Status
          </label>
          <p>
            {props.location.state.task.checked === true
              ? "Completed"
              : "Pending"}
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  return {
    uid: uid,
  };
};

export default connect(mapStateToProps)(TaskDetails);
