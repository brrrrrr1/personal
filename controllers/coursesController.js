const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '../data/courses.json');

// Controller function to get courses by department
exports.getCoursesByDepartment = (req, res) => {
    const department = req.params.department;

    // Read courses data from the file
    fs.readFile(coursesFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the courses file:', err);
            return res.status(500).send('Unable to read courses data.');
        }
    
        try {
            const courses = JSON.parse(data);
            console.log('Available Departments:');
            courses.forEach(course => {
                console.log(course.department);
            });

            const normalizedDepartment = department.trim().toLowerCase();
            console.log('Normalized Department:', normalizedDepartment);
            const courseData = courses.find(course => {
                if (course.department) {
                    return course.department.trim().toLowerCase() === normalizedDepartment;
                }
                return false;
            });
    
            // If department is not found, send a 404 error
            if (!courseData) {
                console.log(`Department "${department}" not found.`);
                return res.status(404).send(`Department "${department}" not found.`);
            }
    
            // Render the view with the course data
            res.render('courseManagement', { department: courseData.department, subjects: courseData.subjects });
    
        } catch (e) {
            console.error('Error parsing courses data:', e);
            return res.status(500).send('Unable to parse courses data.');
        }
    });    
};
