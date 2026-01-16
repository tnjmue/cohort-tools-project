const router = require('express').Router();
const Student = require('../models/Student.model');


// POST /api/students - Creates a new student
router.post('/', (req, res) => {
    Student.create(req.body)
    .then(newStudent => res.status(201).json(newStudent))
    .catch(err => { 
        console.error("Internal server error while trying to create new student", err);
        next(err);
    });
})


//GET /api/students - Retrieves all of the students in the database collection --update with populate() later
router.get('/', (req, res) => {
    Student.find().populate("cohort")
    .then(allStudents => res.status(200).json(allStudents))
    .catch(err => { 
        console.error("Internal server error while trying to display all students", err);
        next(err);
    });
})

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort --update with populate() later
router.get('/cohort/:cohortId', (req, res) => {
    const { cohortId } = req.params
    Student.find({cohort: cohortId}).populate("cohort")
    .then(studentsByCohort => res.status(200).json(studentsByCohort))
    .catch(err => {
        console.error("Internal server error while trying to display students by cohort", err);
    next(err);
    });
})

// GET /api/students/:studentId - Retrieves a specific student by id --update with populate() later
router.get('/:studentId', (req, res) => {
    const { studentId } = req.params;
    Student.findById(studentId).populate("cohort")
    .then(singleStudent => res.status(200).json(singleStudent))
    .catch(err => {
        console.error("Internal server error while trying to display this student", err);
    next(err);
});
})

// PUT /api/students/:studentId - Updates a specific student by id
router.put('/:studentId', (req, res) => {
    const { studentId } = req.params;
    Student.findByIdAndUpdate(studentId, req.body, {new: true})
    .then(student =>  res.status(200).json(student))
    .catch(err => {
        console.error("Internal server error while trying to update student", err);
    next(err);
    });
})

//DELETE /api/students/:studentId - Deletes a specific student by id
router.delete('/:studentId', (req, res) => {
    const { studentId } = req.params;
    Student.findByIdAndDelete(studentId)
    .then(student => res.status(204).json({ 'message': `Student ${student} has been deleted.`}))
    .catch(err => {
        console.error("Internal server error while trying to delete student", err);
    next(err);
    })
})

module.exports = router;