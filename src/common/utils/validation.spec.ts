import { isValidIp } from './validation';

describe('Utilities', () => {
  describe('Validation', () => {
    it('isValidIp (Valid IP)', () => {
      expect(isValidIp('198.123.65.87')).toBe(true);
    });

    it('isValidIp (Invalid IP)', () => {
      expect(isValidIp('')).toBe(false);
    });

    it('isValidIp (Invalid IP)', () => {
      expect(isValidIp('::1')).toBe(false);
    });

    it('isValidIp (Invalid IP)', () => {
      expect(isValidIp('127.0.0.1')).toBe(false);
    });

    it('isValidIp (Invalid IP)', () => {
      expect(isValidIp('abc')).toBe(false);
    });
  });
});
