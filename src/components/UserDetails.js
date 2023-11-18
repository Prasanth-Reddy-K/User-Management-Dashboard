import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';


function UserDetails() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/AIzaSyCRtUaQm4kgAyDCHw2RaCO8JEnz6pqARw8');
                    setUsers(response.data); 
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }, []); 

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery.toLowerCase()) ||
        user.id.toString().includes(searchQuery.toLowerCase()) ||
        user.creationDate.includes(searchQuery.toLowerCase())
    );

    const showUserReport = (user) => {
        setSelectedUser(user);
        setShowModal(true); 
    };

    const generateReport = () => {
        if (selectedUser) {
            
           
            setTimeout(() => {
                console.log(`Generating report for ${selectedUser.username}...`);
                axios.get(`/api/reports/${selectedUser.id}`)
                    .then(response => {
                        console.log('Report data:', response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching report data:', error);
                    });
            }, 3000);
        }
        setShowModal(false);
    };


    return (
        <div>
            <h2>User Details</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
            />
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>ID</th>
                        <th>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} onClick={() => showUserReport(user)}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.id}</td>
                            <td>{user.creationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h3>{selectedUser && `Report for ${selectedUser.username}`}</h3>
                        <button onClick={generateReport}>Generate Report</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
