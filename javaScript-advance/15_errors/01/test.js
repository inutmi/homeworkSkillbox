import { calculateDiscount, getMarketingPrice, getAvatarUrl } from './index';

test('calculateDiscount', () => {
  expect(calculateDiscount(1000, 10)).toBe(100);
  expect(() => {
    calculateDiscount('1000', '10');
  }).toThrow();
  expect(() => {
    calculateDiscount('1000', '10');
  }).toThrowError(TypeError);
});

test('getMarketingPrice', () => {
  expect(() => {
    getMarketingPrice('{ "name": "Product" }');
  }).not.toThrow();
  expect(getMarketingPrice('{ "name": "Product" }')).toBeNull();
  expect(getMarketingPrice('{ "name": "Product", "prices": { "marketingPrice": 1200 } }')).toBe(1200);
});

test('getAvatarUrl', async () => {
  await expect(getAvatarUrl(1)).resolves.toBe('/images/default.jpg');
});
