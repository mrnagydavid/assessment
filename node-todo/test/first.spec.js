import request from 'supertest';
import app from '../src/app';

describe('test', () => {
  test('testing', () => {
    return request(app)
            .get("/")
            .then(response => {
              expect(response.statusCode).toBe(200)
            });
  });
});
