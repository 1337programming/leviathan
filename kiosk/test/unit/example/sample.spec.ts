import {Calculator} from './calculator';

let myCalculator: Calculator = new Calculator();

describe('Calculator Tests', () => {
  
  describe('Add method', () => {
    it('2 + 3 should equal 5', () => {
      let x: number = 2;
      let y: number = 3;
      expect(myCalculator.add(x, y)).toBe(5);
    });
    it('10 + 3 should equal 13', () => {
      let x: number = 10;
      let y: number = 3;
      expect(myCalculator.add(x, y)).toBe(13);
    });
    
    it('123 + 53 should equal 176', () => {
      let x: number = 123;
      let y: number = 53;
      expect(myCalculator.add(x, y)).toBe(176);
    });
  });
  
  describe('Subtract method', () => {
    it('2 - 3 should equal -1', () => {
      let x: number = 2;
      let y: number = 3;
      expect(myCalculator.subtract(x, y)).toBe(-1);
    });
    it('10 - 3 should equal 13', () => {
      let x: number = 10;
      let y: number = 3;
      expect(myCalculator.subtract(x, y)).toBe(7);
    });
    
    it('123 - 53 should equal 70', () => {
      let x: number = 123;
      let y: number = 53;
      expect(myCalculator.subtract(x, y)).toBe(70);
    });
  });
  
  describe('Divide method', () => {
    it('2 / 3 should equal 0.666', () => {
      let x: number = 2;
      let y: number = 3;
      expect(myCalculator.divide(x, y)).toBe(0.6666666666666666);
    });
    it('10 / 3 should equal 3.333', () => {
      let x: number = 10;
      let y: number = 3;
      expect(myCalculator.divide(x, y)).toBe(3.3333333333333335);
    });
    
    it('123 / 53 should equal 2.32', () => {
      let x: number = 123;
      let y: number = 53;
      expect(myCalculator.divide(x, y)).toBe(2.3207547169811322);
    });
  });
  
  describe('Multiply method', () => {
    it('2 * 3 should equal 6', () => {
      let x: number = 2;
      let y: number = 3;
      expect(myCalculator.multiply(x, y)).toBe(6);
    });
    it('10 * 3 should equal 30', () => {
      let x: number = 10;
      let y: number = 3;
      expect(myCalculator.multiply(x, y)).toBe(30);
    });
    
    it('123 * 53 should equal 6519', () => {
      let x: number = 123;
      let y: number = 53;
      expect(myCalculator.multiply(x, y)).toBe(6519);
    });
  });
});
