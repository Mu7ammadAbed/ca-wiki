const router = require('express').Router();

const { deleteStudent, putStudentData } = require('./student');
const { addCohort, deleteCohort, editCohort } = require('./cohort');
const {
  addProject,
  editProject,
  deleteProjectData,
  getCohortProjects,
} = require('./project');
const logout = require('./logout');

router.post('/cohorts', addCohort);

router
  .route('/cohorts/:cohortId')
  .all((req, res, next) => {
    // ToDo: make middleware to check authentication
    next();
  })
  .get((req, res, next) => {
    next(new Error('not implemented'));
  })
  .put(editCohort)
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  .delete(deleteCohort);

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);
router.get('/cohorts/:cohortId/projects', getCohortProjects);
router.delete('/alumni/:studentId', deleteStudent);
router.put('/alumni/:studentId', putStudentData);
router.delete('/projects/:projectId', deleteProjectData);
router.get('/logout', logout);

module.exports = router;
