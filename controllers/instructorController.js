const fs = require('fs');
const path = require('path');

const instructorsFilePath = path.join(__dirname, '../data/instructors.json');

// Function to handle updating an instructor's data
const updateInstructor = (req, res) => {
    const updatedInstructor = req.body;

    if (!updatedInstructor.id || !updatedInstructor.firstname || !updatedInstructor.lastname) {
        return res.status(400).json({ message: 'Missing required fields: id, firstname, or lastname.' });
    }

    fs.readFile(instructorsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Server error reading file.' });
        }

        let instructors;
        try {
            instructors = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).json({ message: 'Error parsing instructors data.' });
        }

        updatedInstructor.id = Number(updatedInstructor.id);
        const instructorIndex = instructors.findIndex(ins => ins.id === updatedInstructor.id);

        if (instructorIndex === -1) {
            return res.status(404).json({ message: 'Instructor not found.' });
        }

        instructors[instructorIndex] = { ...instructors[instructorIndex], ...updatedInstructor };

        fs.writeFile(instructorsFilePath, JSON.stringify(instructors, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error saving data.' });
            }

            res.status(200).json({ message: 'Instructor updated successfully.' });
        });
    });
};

module.exports = { updateInstructor };
