const {
  deleteStudentQuery,
  putStudent,
  getSpecificAlumnit,
} = require('./student');
const {
  putSpecificCohort,
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
  postCohort,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getProjectById,
  deleteProject,
  getCohortProjectsQuery,
  getProjects,
} = require('./project');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  deleteStudentQuery,
  putStudent,
  getProjectById,
  deleteProject,
  getSpecificAlumnit,
  getProjects,
};
