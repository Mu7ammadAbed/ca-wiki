const request = require('supertest');
const connection = require('../server/database/config/connection');
const dbBuild = require('../server/database/config/build');

const app = require('../server/app');

beforeAll(() => dbBuild());

afterAll(() => connection.end());

test('Get projects route', (done) => {
  request(app)
    .get('/api/v1/projects')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(async (err, res) => {
      if (err) return done(err);
      const { data } = res.body;
      expect(data).toHaveLength(2);
      done();
    });
});
