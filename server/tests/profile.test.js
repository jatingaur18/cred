const request = require('supertest');
const express = require('express');
const { ObjectId } = require('mongodb');

describe('Profile Detail Router', () => {
  let app;
  let mockDb;
  let consoleErrorSpy;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn()
    };
    
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const profileRouter = require('../api/fetchProfiles')(mockDb);
    app = express();
    app.use('/', profileRouter);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('should fetch profile by id successfully', async () => {
    const mockProfile = { _id: new ObjectId(), name: 'Test Profile' };
    mockDb.collection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockProfile)
    });

    const response = await request(app).get(`/${mockProfile._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        ...mockProfile,
        _id: mockProfile._id.toString()
      });
    expect(mockDb.collection).toHaveBeenCalledWith('profiles');
  });

  test('should return 404 for non-existent profile', async () => {
    mockDb.collection.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null)
    });

    const response = await request(app).get(`/${new ObjectId()}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Profile not found' });
  });

  test('should handle invalid ObjectId', async () => {
    const response = await request(app).get('/invalid-id');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Failed to fetch profile.' });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('should handle database error', async () => {
    mockDb.collection.mockReturnValue({
      findOne: jest.fn().mockRejectedValue(new Error('DB Error'))
    });

    const response = await request(app).get(`/${new ObjectId()}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Failed to fetch profile.' });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});