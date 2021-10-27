import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ViewAssignments from "./pages/ViewAssignments";
import Home from "./pages/Home";
import AssignmentDetails from "./pages/AssignmentDetails";
import Dashboard from "./pages/Dashboard";
import AddAssignmentPage from "./pages/AddAssignmentPage";
import AssignmentCreate from "./pages/AssignmentCreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addAssignment" component={AddAssignmentPage} />
          <Route path="/assignmentCreate" component={AssignmentCreate} />
          <Route path="/viewAssignments" component={ViewAssignments} />
          <Route path="/assignmentDetails" component={AssignmentDetails} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
