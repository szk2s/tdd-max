import { generateExecContext } from '../src/execContext';

test('generates execContext', () => {
  const mockCollection: any = [];
  const execContext = generateExecContext(mockCollection);
  expect(execContext).toHaveProperty('test');
  expect(execContext).toHaveProperty('beforeEach');
});
