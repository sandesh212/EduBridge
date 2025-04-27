import React,{useState,useEffect} from "react";
// import Card from "./Card";
// import profileImage from "./Assets/teacher1.jpg";
// import profileImage2 from "./Assets/teacher2.png";
// import profileImage3 from "./Assets/teacher3.png";
import StudentConnectionCard from "./StudentConnectionCard";
import axios from "axios";

export default function SupervisorDashboard() {
  const [ConnectionData, setConnectionData] = useState([]);
  
//Function to Fetch Connection
const fetchConnection = async () => {
  //API Calling Link:
  const response = await fetch(`http://localhost:8080/api/connection/fetchConnection`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    }
  });
  const json = await response.json();
  const pendingConnection = json.filter(connection => connection.status === 'pending');
  setConnectionData(pendingConnection)
}
//Funtion: To Accept the the Connection on Supervisor End
const handleApproved = async(connectionId)=>{
  try {
    await axios.put(`http://localhost:8080/api/connection/${connectionId}/approved`).
    then((response)=>{
      alert(response.data.message)
    });
    fetchConnection();
    
  } catch (error) {
      console.error(error);
      alert("Failed to Approve connection request")
  }
}
//Funtion: To reject the the Connection on Supervisor End
const handleReject = async(connectionId)=>{
  try {
    await axios.put(`http://localhost:8080/api/connection/${connectionId}/rejected`).
    then((response)=>{
      alert(response.data.message);
    });
    fetchConnection();
  } catch (error) {
      console.error(error);
      alert("Failed to Approve connection request")
  }
}
useEffect(() => {
  fetchConnection();
})
  return (
    <>
      <div class="col main pt-5 mt-2">
        <p class="lead d-none d-sm-block">Students Connection</p>
        <hr />
        {/* <StudentCard /> */}
        <div className="container mt-6">
        <div className="row">
        <div className="col-9 pt-9">
          {ConnectionData.map((connection)=>(
            <div className="mt-3">
              <StudentConnectionCard key={connection._id} 
              img={connection.user.image}
              FirstName={connection.user.firstName} 
              LastName={connection.user.lastName} 
              interest={connection.interest} 
              comment={connection.comment}
              connection={connection}
              onApprove={handleApproved}
              onReject={handleReject}
              /> 
              </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
}