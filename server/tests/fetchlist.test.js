const request = require('supertest');
const express = require('express');
const profiles = require('../api/fetchlist');

let app;
let mockDb;
let consoleErrorSpy;

beforeEach(() => {
  app = express();
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  mockDb = {
    collection: jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn()
      })
    })
  };

  app.use('/', profiles(mockDb));
});

afterEach(() => {
  jest.clearAllMocks();
  consoleErrorSpy.mockRestore();
});

describe('Profiles Router', () => {
  test('should fetch profiles successfully', async () => {
    const mockProfiles = [
      { _id: '1', basicDetails: { name: 'John' } },
      { _id: '2', basicDetails: { name: 'Jane' } }
    ];

    mockDb.collection().find().toArray.mockResolvedValue(mockProfiles);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfiles);
    expect(mockDb.collection).toHaveBeenCalledWith('profiles');
  });

  test('should handle database error', async () => {
    mockDb.collection().find().toArray.mockRejectedValue(new Error('DB Error'));

    const response = await request(app).get('/');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Failed to fetch profiles.' });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('should handle empty profiles list', async () => {
    mockDb.collection().find().toArray.mockResolvedValue([]);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});