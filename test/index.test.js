const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

describe('Cohort', () => {
  const data = {
    name: 'G6',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
    githubLink: 'https://github.com/GSG-G8',
  };
  const wrongData = {
    name: 'G5',
    description: 'GazaSkyGeeks Code Academy, 6th Cohort',
    imgUrl: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
    githubLink: 'githun link',
  };
  test('POST Route /cohorts status 200, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 3',
        );
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: 3,
          name: 'G6',
          description: 'GazaSkyGeeks Code Academy, 6th Cohort',
          img_url:
            'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
          github_link: 'https://github.com/GSG-G8',
        });
        expect(message).toBe('Cohort added successfully');
        done();
      });
  });
  test('POST Route /cohorts status 400, json header, send data ', (done) => {
    request(app)
      .post('/api/v1/cohorts')
      .send(data)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        const { message } = res.body.data;
        if (err) return done(err);
        const { rows } = await connection.query(
          'SELECT * from cohort WHERE id = 4',
        );
        expect(rows).toHaveLength(0);
        expect(message).toBe('Cohort already exists');
        done();
      });
  });
});
