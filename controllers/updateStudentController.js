const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, '../data/students.json');

// Update student details
const updateStudent = (req, res) => {
    const updatedStudent = req.body;
    console.log('Received Update Request:', updatedStudent);

    // Ensure studentID is a number
    updatedStudent.studentID = Number(updatedStudent.studentID);

    // Read the existing data from the JSON file
    fs.readFile(studentsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Server error reading file.' });
        }

        let students;
        try {
            students = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing student data:', parseErr);
            return res.status(500).json({ message: 'Error parsing student data.' });
        }

        // Find the student to update
        const studentIndex = students.findIndex(student => student.studentID === updatedStudent.studentID);
        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Update the student details
        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };

        // Save the updated data back to the JSON file
        fs.writeFile(studentsFilePath, JSON.stringify(students, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error saving data:', writeErr);
                return res.status(500).json({ message: 'Error saving data.' });
            }

            res.status(200).json({ message: 'Student updated successfully.' });
        });
    });
};

module.exports = { updateStudent };
