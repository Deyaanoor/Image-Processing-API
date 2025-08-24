import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index.js';
import { processImage } from '../utilities/imageProcessing.js';

const server = supertest(app);

const testFile = 'fjord.jpg';
const resizeWidth = 200;
const resizeHeight = 200;
const outputFolder = path.resolve('./images/thumb');
const resizedImagePath = path.join(
  outputFolder,
  `${resizeWidth}x${resizeHeight}_${testFile}`
);

// prepare test environment
beforeAll(() => {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
});

// clean up after tests
afterAll(() => {
  if (fs.existsSync(resizedImagePath)) {
    fs.unlinkSync(resizedImagePath);
  }
});

describe('API: /api/images endpoint', () => {
  it('responds with 400 when required query params are missing', async () => {
    const res = await server.get('/api/images');
    expect(res.status).toBe(400);
  });

  it('responds with 404 when the source image does not exist', async () => {
    const res = await server.get(
      '/api/images?filename=invalid.jpg&width=200&height=200'
    );
    expect(res.status).toBe(404);
  });

  it('successfully generates a resized image with valid parameters', async () => {
    const res = await server.get(
      `/api/images?filename=${testFile}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.status).toBe(200);
    expect(fs.existsSync(resizedImagePath)).toBeTrue();
  });

  it('serves the cached image if it already exists', async () => {
    await server.get(
      `/api/images?filename=${testFile}&width=${resizeWidth}&height=${resizeHeight}`
    );
    const res = await server.get(
      `/api/images?filename=${testFile}&width=${resizeWidth}&height=${resizeHeight}`
    );
    expect(res.status).toBe(200);
  });
});

describe('Unit: processImage utility', () => {
  it('runs without throwing an exception on valid input', async () => {
    await expectAsync(
      processImage(testFile, resizeWidth, resizeHeight)
    ).not.toBeRejected();
    expect(fs.existsSync(resizedImagePath)).toBeTrue();
  });

  it('rejects with error if input image is missing', async () => {
    const fakeFile = 'doesnotexist.jpg';
    await expectAsync(
      processImage(fakeFile, resizeWidth, resizeHeight)
    ).toBeRejectedWithError('Original image not found');
  });

  it('returns the existing resized image path if already created', async () => {
    const result = await processImage(testFile, resizeWidth, resizeHeight);
    expect(result).toBe(resizedImagePath);
  });
});
