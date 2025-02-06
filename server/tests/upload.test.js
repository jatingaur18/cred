const request = require('supertest');
const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../api/upload');
const parseXML = require('../utils/parser');

jest.mock('../utils/parser');
jest.mock('mongodb');

let app;
let mockDb;
const uploadsDir = path.join(__dirname, '../uploads/'); // Replace with the actual uploads folder path

beforeEach(() => {
  app = express();

  mockDb = {
    collection: jest.fn().mockReturnValue({
      insertOne: jest.fn().mockResolvedValue({ insertedId: 'mock-id' })
    })
  };

  // Initialize router with mockDb
  const router = upload(mockDb);
  app.use('/', router);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  // Clear all files in the uploads folder after the tests
  fs.readdirSync(uploadsDir).forEach((file) => {
    const filePath = path.join(uploadsDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete each file in the uploads folder
    }
  });
});

describe('File Upload Router', () => {
  test('should successfully upload XML file and store data', async () => {
    const mockData = { name: 'Test Data' };
    parseXML.mockResolvedValue(mockData);

    const response = await request(app)
      .post('/')
      .attach('file', Buffer.from('dummy xml'), {
        filename: 'test.xml',
        contentType: 'application/xml'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'File uploaded and data stored successfully!',
      data: mockData
    });
  });

  test('should reject non-XML files', async () => {
    const response = await request(app)
      .post('/')
      .attach('file', Buffer.from('dummy text'), {
        filename: 'test.txt',
        contentType: 'text/plain'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Only XML files are allowed/i);
  });

  test('should handle missing file', async () => {
    const response = await request(app).post('/');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No file uploaded');
  });

  test('should handle database connection error', async () => {
    const router = upload(null);
    const appWithoutDb = express();
    appWithoutDb.use('/', router);

    const response = await request(appWithoutDb)
      .post('/')
      .attach('file', Buffer.from('dummy xml'), {
        filename: 'test.xml',
        contentType: 'application/xml'
      });

    expect(response.status).toBe(202);
    expect(response.body.message).toBe('Database not connected Properly');
    
  });

  test('should handle MongoDB schema validation error', async () => {
    const mockError = {
      code: 121,
      errInfo: { details: 'Invalid schema' }
    };
    
    mockDb.collection.mockReturnValue({
      insertOne: jest.fn().mockRejectedValue(mockError)
    });

    const response = await request(app)
      .post('/')
      .attach('file', Buffer.from('dummy xml'), {
        filename: 'test.xml',
        contentType: 'application/xml'
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data format',
      details: 'Invalid schema'
    });
  },30000);
});
