import React, { useState, useEffect } from 'react';

const AddPerson = () => {
  const [rows, setRows] = useState([]);
  
  // Handle form inputs
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    if (name === 'dob') {
      const age = calculateAge(value);
      updatedRows[index].age = age;
    }

    setRows(updatedRows);
  };

  // Add a new row with empty values
  const addRow = () => {
    setRows([...rows, { name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
  };

  // Save data to local storage
  const saveRow = (index) => {
    const updatedRows = [...rows];
    const savedData = JSON.parse(localStorage.getItem('persons')) || [];
    savedData.push(updatedRows[index]);
    localStorage.setItem('persons', JSON.stringify(savedData));
  };

  // Delete row
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <h2>Add New Person</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" name="name" value={row.name} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="date" name="dob" value={row.dob} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="text" name="aadhar" value={row.aadhar} onChange={(e) => handleInputChange(index, e)} maxLength="12" /></td>
              <td><input type="text" name="mobile" value={row.mobile} onChange={(e) => handleInputChange(index, e)} maxLength="10" /></td>
              <td>{row.age}</td>
              <td>
                <button onClick={() => saveRow(index)}>Save</button>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add New Row</button>
    </div>
  );
};

export default AddPerson;
