import React, { useState } from "react";
import EducationContext from "./EducationContext";

const EduationState = (props) => {
  const host = "http://localhost:8080";
  const initialEducation = [];

  //Education useState:
  const [Education, setEducation] = useState(initialEducation);
  const [EducationData, setEducationData] = useState([]);

  //Function to Add Education
  const AddEducation = async (InstituteName, degree, startDate, endDate) => {
    // API Call
    const response = await fetch(`${host}/api/EducationRoute/AddEducation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      //Sending Json in form of Data in Body
      body: JSON.stringify({ InstituteName, degree, startDate, endDate }),
    });

    const education = await response.json();
    setEducation(Education.concat(education));
  };

  //Function to get All Education
  const getEducation = async () => {
    //API Calling:
    const response = await fetch(`${host}/api/EducationRoute/fetchEducation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setEducation(json);
  };
  const fetchEducation = async (userId) => {
    //API Calling:
    const response = await fetch(
      `http://localhost:8080/api/EducationRoute/fetchEducation/${userId}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setEducationData(json);
  };
  // Function to delete an education entry
  const deleteEducation = async (educationId) => {
    try {
      // API Call to delete the education entry from the database
      const response = await fetch(
        `http://localhost:8080/api/EducationRoute/deleteEducation/${educationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      // Check if the deletion was successful
      if (response.ok) {
        // Update the Education state by removing the deleted entry
        setEducation((prevEducation) =>
          prevEducation.filter((edu) => edu._id !== educationId)
        );

        // Show success message
        alert("Education entry deleted successfully!");
      } else {
        // Show error message
        alert("Failed to delete education entry. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting education entry:", error);
      // Show error message
      alert(
        "An error occurred while deleting the education entry. Please try again."
      );
    }
  };

  const updateEducation = async (educationId, updatedData) => {
    try {
      // Send a PUT request to update the education data
      const response = await fetch(
        `${host}/api/EducationRoute/updateEducation/${educationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };
  return (
    <EducationContext.Provider
      value={{
        Education,
        AddEducation,
        getEducation,
        deleteEducation,
        fetchEducation,
        EducationData,
        updateEducation,
      }}
    >
      {props.children}
    </EducationContext.Provider>
  );
};

export default EduationState;
