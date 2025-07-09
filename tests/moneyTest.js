import { formatCurrency} from '../scripts/shared-functions/money.js';

//a collection of test cases are called Test Suites
console.log('test Suite: formatCurrency- converts cents to Dollar')


//occurence of each test is called a Test Case
if(formatCurrency(2095) === '20.95') {
  console.log('code works normally = Passed')
} else {
  console.log('code works normally = Failed')
}

if(formatCurrency(0) === '0.00') {
  console.log('Code converts 0 = Passed')
} else {
  console.log('Code converts 0 =Failed')
}

if(formatCurrency(2000.5) === '20.01') {
  console.log('Code rounds up = Passed')
} else {
  console.log('Code rounds up = Failed')
}

if(formatCurrency(2000.4) === '20.00') {
  console.log('Code rounds down = Passed')
} else {
  console.log('Code rounds down =Failed')
}
