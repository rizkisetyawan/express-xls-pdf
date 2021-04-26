const request = require('supertest');
const app = require('../../app');

describe('Post User Endpoints', () => {
	it("Don't insert Header Authorization", async () => {
		const res = await request(app).post('/api/user').send({
			username: 'justtesting',
			name: 'testing',
			role: 'user',
			password: 'Kwqewew213@',
		});
		expect(res.statusCode).toEqual(401);
		expect(res.body).toHaveProperty('status');
	});
});
