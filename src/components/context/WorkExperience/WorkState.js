import React, { useState } from "react";
import WorkContext from "./WorkContext";

// Add Work Experience through API
const WorkState = (props) => {
  const host = 'http://localhost:8080';
  const initialWork = [];

  const [Work, setWork] = useState(initialWork);
  const [WorkData, setWorkData] = useState(initialWork);

  // Add Work
  const AddWork = async (title, employee, startDate, endDate, description) => {
    try {
      const response = await fetch(`${host}/api/WorkExperienceRoute/AddWorkExperience`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, employee, startDate, endDate, description })
      });
      const work = await response.json();
      setWork(Work.concat(work));
    } catch (error) {
      console.log("Error adding work experience:", error);
    }
  };

  const getWork = async () => {
    try {
      const response = await fetch(`${host}/api/WorkExperienceRoute/fetchWorkExperience`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setWork(json);
    } catch (error) {
      console.log("Error fetching work experience:", error);
    }
  };

  const fetchWork = async (userId) => {
    try {
      const response = await fetch(`${host}/api/WorkExperienceRoute/fetchWork/${userId}`, {
        method: 'GET',
      });
      const json = await response.json();
      setWorkData(json);
    } catch (error) {
      console.log("Error fetching work data:", error);
    }
  };
  const deleteWork = async (workID) => {
    try {
      // API Call to delete the work entry from the database
      const response = await fetch(`http://localhost:8080/api/WorkExperienceRoute/deleteWork/${workID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
  
      // Check if the deletion was successful
      if (response.ok) {
        // Update the Work state by removing the deleted entry
        setWork((preWork) =>
          preWork.filter((work) => work._id !== workID)
        );
        alert("Work Experience entry deleted successfully!");
      } else {
        // Show error message
        alert("Failed to delete Work Experience. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting Work Experience entry:", error);
      // Show error message
      alert("An error occurred while deleting the Work Experience entry. Please try again.");
    }
    };
    
    const updateWorkExperience = async (workId, updatedData) =>{
      try{
        //Send a PUT request to update 
        const response= await fetch(`${host}/api/WorkExperienceRoute/updateWorkExperience/${workId}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error('Failed to update work');
        }
      } catch (error) {
        console.error('Error updating work:', error);
      }
    };
  

  return (
    <WorkContext.Provider value={{ Work, AddWork, getWork, fetchWork, WorkData, deleteWork,updateWorkExperience }}>
      {props.children}
    </WorkContext.Provider>
  );
};

export default WorkState;
