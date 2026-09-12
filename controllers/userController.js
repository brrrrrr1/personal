const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/user.json');
let users = [];

// Load synchronously so the first Vercel request cannot race the file read.
const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    users = JSON.parse(data);
    if (!Array.isArray(users)) users = [];
  } catch (err) {
    console.error('Error reading user.json:', err);
    users = [];
  }
};

const saveUsers = () => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving user.json:', err);
    return false;
  }
};

const registerUser = (newUser) => {
  const existingUser = users.find(
    user => user.email?.toLowerCase() === newUser.email?.toLowerCase()
  );

  if (existingUser) return { error: 'Email already exists' };

  users.push(newUser);
  saveUsers();
  return { success: 'User registered successfully' };
};

const changePassword = (email, currentPassword, newPassword) => {
  const user = users.find(
    user => user.email?.toLowerCase() === email?.toLowerCase()
  );

  if (!user) return { error: 'User not found' };
  if (user.password !== currentPassword) {
    return { error: 'Current password is incorrect' };
  }

  user.password = newPassword;
  saveUsers();
  return { success: 'Password updated successfully' };
};

const getUsers = () => users;

// Load once when the module is initialized.
loadUsers();

module.exports = { loadUsers, getUsers, registerUser, changePassword };
