const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, '../data/students.json');
const coursesFilePath = path.join(__dirname, '../data/courses.json');

// Enroll a new student (POST /enroll)
exports.enrollStudent = (req, res) => {
  const { firstname, middlename, lastname, course, year, age } = req.body;

  // Read the existing student data
  fs.readFile(studentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading student data:', err);
      return res.status(500).send('Error reading student data');
    }

    let students;
    try {
      students = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return res.status(500).send('Error parsing student data');
    }
    const yearNumber = Number(year);
    const studentID = students.length + 1; // Generate unique ID
    const newStudent = {
      studentID,
      firstname,
      middlename,
      lastname,
      age,
      course,
      yearNumber,
      status: 'Active' // Default status is active
    };

    students.push(newStudent);

    // Write the updated students data back to students.json
    fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), (err) => {
      if (err) {
        console.error('Error writing student data:', err);
        return res.status(500).send('Error saving student data');
      }

      console.log('Student added:', newStudent);
      res.redirect('/enroll'); // Redirect back to the enrollment page after success
    });
  });
};

// Show enroll form with courses (GET /enroll)
exports.showEnrollForm = (req, res) => {
  fs.readFile(coursesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading courses data:', err);
      return res.status(500).send('Error reading courses data');
    }

    let courses;
    try {
      courses = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing courses data:', parseError);
      return res.status(500).send('Error parsing courses data');
    }

    // Render the enroll page with courses data
    res.render('enroll', { 
      courses: courses.map(course => course.courseCode), // Assuming you want to display courseCode
      user: req.session.user // Pass user session data if needed
    });
  });
};
