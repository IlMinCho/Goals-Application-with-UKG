import { useState } from "react";
import BasicForm from "./components/BasicForm";
import "./NewGoal.css";

function NewGoal() {
  const [view, setView] = useState("basic");

  return (
    <div className="GoalMain" >
      <div className="heading">
      <h3>
           Create A New Goal
        </h3>
      </div>
      
      {view === "basic" ? <BasicForm /> : <BasicForm />}
    </div>
  );
}

export default NewGoal;