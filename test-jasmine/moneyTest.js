import { formatCurrency} from '../scripts/shared-functions/money.js';

//a collection of test cases are called Test Suites
//occurence of each test is called a Test Case
describe('test Suite: formatCurrency', function(){
  it('converts cents to dollars', function() {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('converts 0 to 0.00', function() {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up correctly', function() {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});