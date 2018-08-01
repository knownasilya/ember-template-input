import { helper } from '@ember/component/helper';

export function eq([val1, val2]/*, hash*/) {
  return val1 === val2;
}

export default helper(eq);
