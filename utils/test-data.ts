export const USERS = {
  standard: { username: process.env.STANDARD_USER!, password: process.env.STANDARD_PASSWORD! },
  lockedOut: { username: process.env.LOCKED_USER!, password: process.env.LOCKED_PASSWORD! },
  problem: { username: process.env.PROBLEM_USER!, password: process.env.STANDARD_PASSWORD! },
  performance: { username: process.env.PERFORMANCE_USER!, password: process.env.STANDARD_PASSWORD! },
};

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const SHIPPING = {
  valid: { firstName: 'Jane', lastName: 'Doe', postalCode: '75001' },
} as const;
