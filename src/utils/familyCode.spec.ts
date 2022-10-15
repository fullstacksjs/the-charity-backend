import {
  convertCodeNumberToFamilyCode,
  extractCodeNumberFromFamilyCode,
} from './familyCode';

describe('FamilyCode util', () => {
  it('should convert code number to family code', () => {
    expect(convertCodeNumberToFamilyCode(99)).toBe('F00099');
    expect(convertCodeNumberToFamilyCode(1)).toBe('F00001');
    expect(convertCodeNumberToFamilyCode(99999)).toBe('F99999');
  });

  it('should extract the code number from family code', () => {
    expect(extractCodeNumberFromFamilyCode('F00001')).toBe(1);
    expect(extractCodeNumberFromFamilyCode('F00099')).toBe(99);
    expect(extractCodeNumberFromFamilyCode('F99999')).toBe(99999);
  });
});
