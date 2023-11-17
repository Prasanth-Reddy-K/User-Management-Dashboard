import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UserDetails() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('/api/users') 
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }, []); 

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery.toLowerCase())
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
    };


    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." />
            <table>
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

            {showModal && selectedUser && ( 
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span> {/* Close button */}
                        <h2>{selectedUser.username}'s Report</h2>
                        {/* Add content for the report */}
                        <button onClick={generateReport}>Generate Report</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
