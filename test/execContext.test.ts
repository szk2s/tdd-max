import { generateExecContext } from '../src/execContext';
import { suiteCollection } from '../src/SuiteCollection';

test('generates execContext', () => {
  const execContext = generateExecContext(suiteCollection);
  expect(execContext).toHaveProperty('test');
  expect(execContext).toHaveProperty('beforeEach');
});
