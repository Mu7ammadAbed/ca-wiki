const connection = require('../../connection');

const postCohort = (reqData) => {
  const { name, description, imgUrl, githubLink } = reqData;
  return connection.query(
    'INSERT INTO cohort (name, description, img_url, github_link) VALUES ($1, $2, $3, $4) RETURNING *;',
    [name, description, imgUrl, githubLink],
  );
};

module.exports = postCohort;
