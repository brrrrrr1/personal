const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const enrollRoutes = require('./routes/enroll');
const manageInstructorsRoutes = require('./routes/instructors');
const userRoutes = require('./routes/user');
const studentEditRoutes = require('./routes/student_Edit_Route');
const instructorEditRoutes = require('./routes/instructor_Edit_Routes');
const coursesRoute = require('./routes/courseManagementRoute');
const studentManageRoute = require('./routes/studentMngtRoute');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration that works on localhost and HTTPS deployments.
// NOTE: express-session's default MemoryStore is suitable for demos/school projects,
// but a production system should use a persistent session store.
const isProduction = process.env.NODE_ENV === 'production';
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dorsu-student-portal-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 4
    }
  })
);

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(enrollRoutes);
app.use('/instructors', manageInstructorsRoutes);
app.use('/', userRoutes);
app.use('/students', studentEditRoutes);
app.use('/instructors', instructorEditRoutes);
app.use('/', coursesRoute);
app.use(studentManageRoute);

// Health check for Vercel/local testing
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'DOrSU Student Portal API is running' });
});

// Friendly 404 response for unknown API/page routes.
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// IMPORTANT: Vercel needs the Express app exported instead of app.listen().
module.exports = app;

// Start a normal HTTP server only when running locally with `node server.js`.
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
