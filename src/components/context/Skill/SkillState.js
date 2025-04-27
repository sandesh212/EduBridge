import React,{useState} from 'react'
import SkillContext from './SkillContext'

const  SkillState = (props)=> {
    const host = 'http://localhost:8080'
    const initialSkill = []
    const [Skill, setSkill] = useState(initialSkill);
    const [SkillData, setSkillData] = useState(initialSkill)

  //Add Skill Function
  const AddSkill = async (skillName) => {

    // API Call 
    const response = await fetch(`${host}/api/SkillRoute/AddSkill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      //Sending Json in form of Data in Body
      body: JSON.stringify({skillName})
    });

    const skill = await response.json();
    console.log(skill);
    setSkill(Skill.concat(skill))
  }

   //Function to get All Skill
 const getSkill = async () => {
  //API Calling:
  const response = await fetch(`${host}/api/SkillRoute/fetchSkill`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    }
  });
  const json = await response.json();
  setSkill(json)
}
const fetchSkill = async (userId) => {
  //API Calling:
  const response = await fetch(`${host}/api/SkillRoute/fetchSkill/${userId}`, {
    method: "GET",
  });
  const json = await response.json();
  setSkillData(json)
}
// Function to delete an skill entry
const deleteSkill = async (skillId) => {
  try {
    // API Call to delete the skill entry from the database
    const response = await fetch(`http://localhost:8080/api/SkillRoute/deleteSkill/${skillId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // Check if the deletion was successful
    if (response.ok) {
      // Update the skill state by removing the deleted entry
      setSkill((prevSkill) =>
        prevSkill.filter((ski) => ski._id !== skillId)
      );

      // Show success message
      alert("Skill entry deleted successfully!");
    } else {
      // Show error message
      alert("Failed to delete skill entry. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting education entry:", error);
    // Show error message
    alert("An error occurred while deleting the education entry. Please try again.");
  }
  };

  return (
    <SkillContext.Provider value={{Skill, AddSkill,getSkill,fetchSkill,SkillData, deleteSkill}}>
        {props.children}
    </SkillContext.Provider>
  )
}
export default SkillState