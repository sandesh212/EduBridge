import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Button, Typography, Autocomplete, TextField, Chip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SkillContext from '../context/Skill/SkillContext';
import skillArray from './skillArray';

export default function SkillsSection() {
  const context = useContext(SkillContext);
  const { Skill, AddSkill, getSkill, deleteSkill } = context;

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSkills.length > 0) {
      selectedSkills.forEach((skill) => {
        AddSkill(skill); // Call AddSkill function to add each skill to the backend
      });
      setSelectedSkills([]);
      alert('Skills added successfully!');
    }
  };

  useEffect(() => {
    getSkill();
  }, [Skill]);

  const handleDelete = (id) => {
    deleteSkill(id);
  };

  return (
    <>
      <Typography variant="overline" textAlign="center">
        Skills and Domain
      </Typography>
      <div>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              options={skillArray}
              value={selectedSkills}
              onChange={(event, value) => setSelectedSkills(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  style={{ minHeight: 40, minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={handleSubmit} disabled={selectedSkills.length === 0}>
              Add Skills
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: 16 }}>
          {Skill.map((skill) => (
            <Chip
              key={skill._id}
              label={skill.skillName}
              onDelete={() => handleDelete(skill._id)}
              style={{ marginRight: 8, marginBottom: 8, borderRadius: 16 }}
              deleteIcon={<ClearIcon />}
            />
          ))}
        </div>
      </div>
    </>
  );
}
