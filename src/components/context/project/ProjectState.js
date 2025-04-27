import React, { useState } from "react";
import ProjectContext from "./ProjectContext";

const ProjectState = (props) => {
  const host = "http://localhost:8080";
  const initialProject = [];

  const [Project, setProject] = useState(initialProject);
  const [ProjectData, setProjectData] = useState(initialProject);

  //Add Project
  const AddProject = async (projectTitle, startDate, endDate, description) => {
    // API Call
    const response = await fetch(`${host}/api/ProjectRoute/AddProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      //Sending Json in form of Data
      body: JSON.stringify({ projectTitle, startDate, endDate, description }),
    });

    const project = await response.json();
    setProject(Project.concat(project));
  };

  //Function to get All Project
  const getProject = async () => {
    //API Calling:
    const response = await fetch(`${host}/api/ProjectRoute/fetchProject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setProject(json);
  };

  const fetchProject = async (userId) => {
    //API Calling:
    const response = await fetch(
      `${host}/api/ProjectRoute/fetchProject/${userId}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setProjectData(json);
  };
  const deleteProject = async (projId) => {
    try {
      //Api Call:
      const response = await fetch(
        `${host}/api/ProjectRoute/deleteProject/${projId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Update the Project state by removing the deleted entry
        setProject((prevProject) =>
          prevProject.filter((proj) => proj._id !== projId)
        );
        // Show success message
        alert("project entry deleted successfully!");
      } else {
        // Show error message
        alert("Failed to delete Project entry. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting project entry:", error);
      // Show error message
      alert(
        "An error occurred while deleting the project entry. Please try again."
      );
    }
  };
  //update function
  const updateProject = async (projectId, updatedData) => {
    try {
      // Send a PUT request to update the project data
      const response = await fetch(`${host}/api/ProjectRoute/updateProject/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  return (
    <ProjectContext.Provider
      value={{ Project, AddProject, getProject, fetchProject, ProjectData,deleteProject,updateProject }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
