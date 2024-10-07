import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    age: '',
    aadhar: '',
    mobile: '',
    address: ''
  });

  const [isAdding, setIsAdding] = useState(false); // For showing form
  const [dataList, setDataList] = useState([]); // For storing all entries

  // On page load, fetch data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('directoryData')) || [];
    setDataList(storedData);
  }, []);

  // Calculate Age automatically when birthDate is changed
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'birthDate') {
      const age = calculateAge(value); // Auto-fill age when birth date is entered
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        age: age
      }));
    } else if (name === 'aadhar' && value.length > 12) {
      return; // Prevent entering more than 12 digits in Aadhar
    } else if (name === 'mobile' && value.length > 10) {
      return; // Prevent entering more than 10 digits in mobile
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if Aadhar is unique
    const isAadharUnique = !dataList.some((person) => person.aadhar === formData.aadhar);

    if (!isAadharUnique) {
      alert('Aadhar number must be unique!');
      return;
    }

    // Save new entry to localStorage
    const updatedDataList = [...dataList, formData];
    setDataList(updatedDataList);
    localStorage.setItem('directoryData', JSON.stringify(updatedDataList));

    alert('Person added successfully!');
    setFormData({
      name: '',
      birthDate: '',
      age: '',
      aadhar: '',
      mobile: '',
      address: ''
    });
    setIsAdding(false); // Hide form after adding person
  };

  // Retrieve information based on Aadhar number
  const handleRetrieve = (e) => {
    e.preventDefault();

    const person = dataList.find((person) => person.aadhar === formData.aadhar);

    if (person) {
      setFormData(person); // Populate the form with retrieved data
      alert('Data retrieved successfully!');
    } else {
      alert('No person found with the given Aadhar number.');
    }
  };

  // Show form to add a new person
  const handleAddNewPerson = () => {
    setFormData({
      name: '',
      birthDate: '',
      age: '',
      aadhar: '',
      mobile: '',
      address: ''
    });
    setIsAdding(true); // Show form
  };

  return (
    <div className="container">
      <h2>Directory App</h2>

      {/* Form for retrieving or adding new person */}
      <form onSubmit={isAdding ? handleSubmit : handleRetrieve}>
        <input
          type="text"
          name="aadhar"
          placeholder="Enter Aadhar Number"
          value={formData.aadhar}
          onChange={handleInputChange}
          required
        />
        {isAdding && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Enter Birth Date"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              disabled
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="save-button">Save</button>
          </>
        )}
        {!isAdding && <button type="submit" className="save-button">Retrieve Information</button>}
      </form>

      {/* Button to add new person */}
      {!isAdding && <button onClick={handleAddNewPerson}>Add New Person</button>}

      {/* Display user data */}
      <div className="user-list">
        <h2>Added Users</h2>
        <ol>
          {dataList.map((person, index) => (
            <li key={index}>
              <strong>Name:</strong> {person.name}, <strong>Age:</strong> {person.age}, 
              <strong>Aadhar:</strong> {person.aadhar}, <strong>Mobile:</strong> {person.mobile}, 
              <strong>Address:</strong> {person.address}
            </li>
          ))}
        </ol>
      </div>

      {/* Display retrieved user data if exists */}
      {formData.aadhar && (
        <div className="retrieved-user">
          <h2>Retrieved User</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Aadhar:</strong> {formData.aadhar}</p>
          <p><strong>Mobile:</strong> {formData.mobile}</p>
          <p><strong>Address:</strong> {formData.address}</p>
        </div>
      )}
    </div>
  );
}

export default App;

