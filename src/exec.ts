/* eslint-disable @typescript-eslint/no-unused-vars */
import { execContext } from './execContext';

export const exec = (script: string, { test, beforeEach }: execContext) => {
  eval(script);
};
