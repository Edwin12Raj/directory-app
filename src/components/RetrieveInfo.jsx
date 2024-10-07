import React, { useState } from 'react';

const RetrieveInfo = () => {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    const savedData = JSON.parse(localStorage.getItem('persons')) || [];
    const foundPerson = savedData.find(p => p.aadhar === aadhar);

    if (foundPerson) {
      setPerson(foundPerson);
      setMessage('');
    } else {
      setPerson(null);
      setMessage('No match found');
    }
  };

  return (
    <div>
      <h2>Retrieve Information</h2>
      <input
        type="text"
        placeholder="Enter Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
        maxLength="12"
      />
      <button onClick={handleSearch}>Search</button>

      {person && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
            </tr>
          </tbody>
        </table>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RetrieveInfo;
