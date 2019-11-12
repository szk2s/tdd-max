import { generateExecContext } from '../src/execContext';
import { SuiteCollection } from '../src/SuiteCollection';

test('generates execContext', () => {
  const execContext = generateExecContext(new SuiteCollection());
  expect(execContext).toHaveProperty('test');
  expect(execContext).toHaveProperty('beforeEach');
});
