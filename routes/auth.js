const express = require('express');
const router = express.Router();
const Mentor = require('../model/mentor');
const Admin = require('../model/admin');

// GET route for listing
router.get('/', (req, res) => {
    res.status(200).send("Welcome to the Mentor Registration Page");
});


//=========================MENTOR HANDLER=============================================
// POST route for creating a new mentor
router.post('/mentorReg', async (req, res) => {
    const registrationDateTime = new Date(); // Get current date and time

    const mentor = new Mentor({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        registrationDateTime: registrationDateTime,
    });

    try {
        const newMentor = await mentor.save();
        res.status(200).send("Registered Successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration Failed!");
    }
});

// GET route for rendering login page
router.get('/login', (req, res) => {
    res.render("Auth/login", { session: req.session });
});

// Route to handle login form submission
router.post('/mentorLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find mentor in the database by email
        const mentor = await Mentor.findOne({ email });

        // If mentor is not found or password does not match, render login page with error message
        if (!mentor || mentor.password !== password) {
            return res.status(404).render('login/mentorLogin', {errorMessage: 'Invalid email or password', session: req.session });
        }

        // If mentor is found and password matches, store mentor ID in session and redirect to dashboard
        req.session.user = { id: mentor._id, user: 'admin', name:mentor.name, email:mentor.email }; // Store mentor ID in session
        res.status(200).redirect('/dashboard/mentor'); // Redirect to dashboard after login
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).render('login/mentorLogin', { errorMessage: 'An error occurred while logging in', session: req.session });
    }
});
//=========================ADMIN HANDLER=============================================

router.post('/adminReg', async (req, res) => {
    const registrationDateTime = new Date(); // Get current date and time
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        registrationDateTime: registrationDateTime,
    });

    try {
        const newAdmin = await admin.save();
        res.status(200).send("Registered Successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration Failed!");
    }
});

router.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find mentor in the database by email
        const admin = await Admin.findOne({ email });

        // If mentor is not found or password does not match, render login page with error message
        if (!admin || admin.password !== password) {
            return res.status(404).render('login/adminLogin', {errorMessage: 'Invalid email or password', session: req.session });
        }

        // If mentor is found and password matches, store mentor ID in session and redirect to dashboard
        req.session.user = { id: admin._id, user: 'admin', name:admin.name, email:admin.email }; // Store mentor ID in session
        res.status(200).redirect('/dashboard/admin'); // Redirect to dashboard after login
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).render('login/adminLogin', { errorMessage: 'An error occurred while logging in', session: req.session });
    }
});


//===================================================LOGOUT=================================================

// GET route for handling logout
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        // Redirect the user to the login page after successful logout
        res.redirect('/');
    });
});

module.exports = router;
