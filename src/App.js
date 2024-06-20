import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState({ nom: '', prenom: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error fetching the users!', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', form);
      setMessage('User added successfully!');
      setForm({ nom: '', prenom: '' });
      fetchUsers();

      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <h1>Jul</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required />
        <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" required />
        <button type="submit">Add User</button>
      </form>
      {message && <div>{message}</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nom} {user.prenom}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
