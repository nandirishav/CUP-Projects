import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AssignmentNav from "../components/AssignmentNav";
import { Link, Redirect } from "react-router-dom";
import Footer from "../components/Footer";

function ViewAssignments() {
  const [assignments, setAssignments] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8001/api/v1/assignments/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const location = useLocation();
  if (!location.state) {
    return <Redirect to="/signin" />;
  }
  // console.log(location.state);

  return (
    <AssignmentNav data={location.state.userData}>
      <>
        <div className="as-list">
          <h2>All Assignments</h2>
          <div className="as-item">
            {assignments &&
              assignments.map((assignment) => {
                // console.log(assignment);
                return (
                  <div className="assignment" key={assignment.id}>
                    <Link
                      to={{ pathname: "/assignmentDetails", state: assignment }}
                    >
                      <h2 className="as-title">{assignment.name}</h2>
                    </Link>
                    <p className="as-time-up">{assignment.teacher}</p>
                    <p className="as-points">{assignment.points} points</p>
                    <p className="as-desc">{assignment.description}</p>
                    <span className="as-date">{assignment.date}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <Footer />
      </>
    </AssignmentNav>
  );
}

export default ViewAssignments;
