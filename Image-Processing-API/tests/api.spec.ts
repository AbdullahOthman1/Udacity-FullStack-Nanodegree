import supertest from 'supertest';
import app from '../src/index';

const request = supertest(app);

describe('Image API Endpoints', () => {
  it('should return 400 if filename is missing', async () => {
    const response = await request.get('/api/images?width=200&height=200');
    expect(response.status).toBe(400);
  });

  it('should return 400 if width is missing', async () => {
    const response = await request.get('/api/images?filename=Zoro&height=200');
    expect(response.status).toBe(400);
  });

  it('should return 400 if height is missing', async () => {
    const response = await request.get('/api/images?filename=Zoro&width=200');
    expect(response.status).toBe(400);
  });

  it('should return 400 if width is negative', async () => {
    const response = await request.get('/api/images?filename=Zoro&width=-100&height=200');
    expect(response.status).toBe(400);
  });

  it('should return 400 if height is zero', async () => {
    const response = await request.get('/api/images?filename=Zoro&width=200&height=0');
    expect(response.status).toBe(400);
  });

  it('should return 400 if format is invalid', async () => {
    const response = await request.get('/api/images?filename=Zoro&width=200&height=200&format=bmp');
    expect(response.status).toBe(400);
  });

  it('should return 404 if image does not exist', async () => {
    const response = await request.get('/api/images?filename=ghost&width=200&height=200');
    expect(response.status).toBe(404);
  });

  it('should return 200 for a valid request', async () => {
    const response = await request.get('/api/images?filename=Zoro&width=200&height=200');
    expect(response.status).toBe(200);
  });
});