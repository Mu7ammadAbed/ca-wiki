const connection = require('../../connection');

const deleteProject = (projectId) =>
  connection.query('DELETE FROM project WHERE id = $1', [projectId]);

module.exports = deleteProject;
