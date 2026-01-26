const router = require('express').Router();
const Cohort = require('../models/Cohort.model');


// POST /api/cohorts - Creates a new cohort
router.post('/', (req, res) => {
    Cohort.create(req.body)
    .then(newCohort => res.status(201).json(newCohort))
    .catch(err => {
        console.error("Internal server error while trying to create new cohort", err);
        next(err);
    })
})

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get('/', (req, res) => {
    Cohort.find(req.query)
    .then(allCohorts => res.status(200).json(allCohorts))
    .catch(err => {
        console.error("Internal server error trying to display all cohorts ->", err);
        next(err)
    });
})

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get('/:cohortId', (req, res) => {
    const { cohortId } = req.params;
    Cohort.findById(cohortId)
    .then(singleCohort => res.status(200).json(singleCohort))
    .catch(err => { 
        console.error("Internal server error while trying to display this cohort", err);
        next(err)
    });
})

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put('/:cohortId', (req, res) => {
    const { cohortId } = req.params;
    Cohort.findByIdAndUpdate(cohortId, req.body, {new: true})
    .then(cohort => res.status(200).json(cohort))
    .catch(err => { 
        console.error("Internal server error while trying to update this cohort", err);
        next(err)
    });
})

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete('/cohortId', (req, res) => {
    const { cohortId } = req.params;
    Cohort.findByIdAndDelete(cohortId)
    .then(cohort => res.status(204).json({'message': `Cohort ${cohort} has been deleted.`}))
    .catch(err => { 
        console.error("Internal server error while trying to delete this cohort", err);
        next(err)
    });
})

module.exports = router;