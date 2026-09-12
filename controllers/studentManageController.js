const fs = require('fs');
const path = require('path');

// Path to the students JSON file
const studentsFilePath = path.join(__dirname, '../data/students.json');

// Controller to filter students by course
exports.getStudentsByCourse = (req, res) => {
    const course = req.params.course;  // Capture the course from the URL parameter

    console.log('Course parameter:', course);  // Debugging the course parameter

    // Read the students JSON file
    fs.readFile(studentsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading student data:', err);
            return res.status(500).json({ message: 'Error reading student data' });
        }

        try {
            // Parse the student data from JSON
            const students = JSON.parse(data);
            console.log('Parsed Students:', students);  // Log the students to check

            // Filter students by course (case insensitive)
            const filteredStudents = students.filter(student => {
                return student.course.toUpperCase() === course.toUpperCase();
            });

            console.log('Filtered Students:', filteredStudents);  // Log filtered students for debugging

            // Render the students data to the view (assuming EJS is used for the view)
            res.render('studentManagement', { students: filteredStudents });
        } catch (parseError) {
            console.error('Error parsing student data:', parseError);
            return res.status(500).json({ message: 'Error parsing student data' });
        }
    });
};
