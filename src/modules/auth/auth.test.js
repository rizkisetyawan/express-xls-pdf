/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');

describe('Post Login Endpoints', () => {
  it('username or password invalid', async () => {
    const res = await request(app).post('/api/auth').send({
      username: 'justtesting',
      password: 'Kwqewew213@',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status');
  });
});
