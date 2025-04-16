import { createMocks } from 'node-mocks-http';
import submitHandler from '../../app/api/calculator/submit/route';
import scheduleHandler from '../../app/api/calculator/schedule/route';

describe('Calculator API', () => {
  const mockCalculatorData = {
    loanType: 'purchase',
    propertyValue: '$500,000',
    downPayment: '$100,000',
    marketRate: '6.5%',
    loanTerm: '30 years',
    targetPayment: '$2,500',
    targetRate: '5.5%'
  };

  describe('POST /api/calculator/submit', () => {
    it('should handle calculator submission successfully', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          calculatorData: mockCalculatorData
        },
      });

      await submitHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const jsonResponse = JSON.parse(res._getData());
      expect(jsonResponse.success).toBe(true);
      expect(jsonResponse.data.userEmailId).toBeDefined();
    });

    it('should return 400 for invalid submission data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          // Missing required fields
          name: 'Test User'
        },
      });

      await submitHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
    });
  });

  describe('POST /api/calculator/schedule', () => {
    it('should handle scheduling successfully', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          date: '2024-04-01',
          time: '10:00 AM',
          calculatorData: mockCalculatorData
        },
      });

      await scheduleHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const jsonResponse = JSON.parse(res._getData());
      expect(jsonResponse.success).toBe(true);
      expect(jsonResponse.data.userEmailId).toBeDefined();
    });

    it('should return 400 for invalid scheduling data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          // Missing required fields
          name: 'Test User'
        },
      });

      await scheduleHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
    });
  });
}); 