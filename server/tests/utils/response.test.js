const response = require('../src/utils/response');

describe('Response Utils', () => {
  test('success response should return correct format', () => {
    const data = { name: 'test' };
    const result = response.success(data);
    
    expect(result.code).toBe(0);
    expect(result.data).toEqual(data);
    expect(result.message).toBe('success');
  });

  test('success response with custom message', () => {
    const result = response.success(null, 'custom message');
    
    expect(result.code).toBe(0);
    expect(result.message).toBe('custom message');
  });

  test('error response should return correct format', () => {
    const result = response.error('error message');
    
    expect(result.code).toBe(-1);
    expect(result.data).toBeNull();
    expect(result.message).toBe('error message');
  });

  test('error response with custom code', () => {
    const result = response.error('not found', 404);
    
    expect(result.code).toBe(404);
    expect(result.message).toBe('not found');
  });
});
