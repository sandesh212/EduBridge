import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const MAX_DESCRIPTION_LENGTH = 50;
const PostFunding = () => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setselectedFile] = useState(null);

  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return description;
  };
  const deleteFunding = async (fundingId) => {
    try {
      // API Call to delete the education entry from the database
      const response = await fetch(
        `http://localhost:8080/api/Funding/deleteFunding/${fundingId}`,
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
        // Update the funding state by removing the deleted entry
        setFunding((prevFunding) =>
          prevFunding.filter((fund) => fund._id !== fundingId)
        );
        // Show success message
        alert("Funding entry deleted successfully!");
      } else {
        // Show error message
        alert("Failed to delete funding entry. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting funding entry:", error);
      // Show error message
      alert(
        "An error occurred while deleting the funding entry. Please try again."
      );
    }
  };
  // updatefuction
  const updateFunding = async (fundingId, updatedData) => {
    try {
      const { id, selectedFile, ...rest } = updatedData; // Destructure the updatedData object

      // If a new file is selected, upload it and update the filename in the database
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Upload the file and get the new filename
        const response = await fetch(
          "http://localhost:8080/api/Funding/uploadFile",
          {
            method: "POST",
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
            body: formData,
          }
        );
        const json = await response.json();

        if (json.success) {
          // Update the filename in the updatedData object
          rest.file = json.filename;
        } else {
          throw new Error("Failed to upload file");
        }
      }

      const response = await fetch(
        `http://localhost:8080/api/Funding/updateFunding/${fundingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(rest), // Send the updated data without the file
        }
      );

      if (response.ok) {
        // Return true if the update was successful
        return true;
      } else {
        throw new Error("Failed to update funding");
      }
    } catch (error) {
      console.error("Error updating funding:", error);
      // Return false if there was an error during the update
      return false;
    }
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setselectedFile(event.target.files[0]);
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (validateForm(description, visibility)) {
      formData.append("description", description);
      formData.append("visibility", visibility);
      formData.append("link", link);
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8080/api/Funding/post", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const json = await response.json();
      alert(json.message);
      setId("");
      setDescription("");
      setLink("");
      setVisibility("");
      setselectedFile("");
      document.getElementById("fileInput").value = "";
    }
    return;
  };

  const handleDelete = (id) => {
    deleteFunding(id);
  };
  //Update Function
  const handleUpdate = (id) => {
    const selectedFunding = funding.find((item) => item._id === id);
    if (selectedFunding) {
      setId(selectedFunding._id);
      setDescription(selectedFunding.description);
      setVisibility(selectedFunding.visibility);
      setLink(selectedFunding.link);
      setselectedFile(selectedFunding.selectedFile);
      setisEditMode(true);
    }
  };
  //useState for edit
  const [isEditMode, setisEditMode] = useState(false);
  //handleeditSubmit
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const fund = {
      id: id,
      description: description,
      visibility: visibility,
      link: link,
      selectedFile: selectedFile,
    };
    if (validateForm(fund.description, fund.visibility)) {
      try {
        const isUpdated = await updateFunding(id, fund);

        if (isUpdated) {
          // Show success message
          alert("Funding entry updated successfully!");

          // Clear the form and set the edit mode to false
          clearForm();
        } else {
          // Show error message
          alert("Failed to update funding entry. Please try again.");
        }
      } catch (error) {
        console.error("Error updating funding:", error);
        // Show error message
        alert(
          "An error occurred while updating the funding entry. Please try again."
        );
      }
    }
  };
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState();
  const [isVisibilityEmpty, setIsVisibilityEmpty] = useState();
  const validateForm = (description, visibility) => {
    let isValid = true;
    if (description.trim() === "") {
      setIsDescriptionEmpty(true);
      isValid = false;
    } else {
      setIsDescriptionEmpty(false);
    }

    if (visibility.trim() === "") {
      setIsVisibilityEmpty(true);
      isValid = false;
    } else {
      setIsVisibilityEmpty(false);
    }
    return isValid;
  };

  const clearForm = () => {
    setId("");
    setDescription("");
    setLink("");
    setVisibility("");
    setselectedFile("");
    setisEditMode(false);
  };

  const [funding, setFunding] = useState([]);
  const fetchFunding = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/Funding/supervisorfundingsfetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      setFunding(json);
    } catch (error) {
      console.error(error);
      setFunding([]);
    }
  };

  useEffect(() => {
    fetchFunding();
  }, [funding]);
  return (
    <div>
      <form>
        <TextField
          label="Description"
          multiline
          maxRows={6}
          value={description}
          onChange={handleDescriptionChange}
          name="description"
          error={isDescriptionEmpty}
          helperText={isDescriptionEmpty && "Description is required"}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="visibility-label">Visibility</InputLabel>
          <Select
            label="Select Visibility"
            labelId="visibility-label"
            id="visibility-select"
            name="visibility"
            value={visibility}
            error={isVisibilityEmpty}
            helperText={isVisibilityEmpty && "Visibility is required"}
            onChange={handleVisibilityChange}
            required
          >
            <MenuItem value="connections">Connections</MenuItem>
            <MenuItem value="everyone">Everyone</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Link"
          value={link}
          name="link"
          onChange={handleLinkChange}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          name="file"
          id="fileInput"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        />
        <Button
          type="submit"
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            marginLeft: "500px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
          variant="contained"
          color="primary"
          onClick={isEditMode ? handleEditSubmit : handleSubmit}
        >
          {isEditMode ? "Update" : "Post"}
        </Button>
        {isEditMode && (
          <Button
            variant="contained"
            color="primary"
            className="mx-3"
            onClick={() => clearForm()}
          >
            Cancel
          </Button>
        )}
      </form>
      {funding.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {funding.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {" "}
                    <span title={data.description}>
                      {truncateDescription(data.description)}
                    </span>
                  </TableCell>
                  <TableCell>{data.visibility}</TableCell>
                  <TableCell>
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.link}
                    </a>
                  </TableCell>
                  <TableCell>{data.file}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(data._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleUpdate(data._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PostFunding;
