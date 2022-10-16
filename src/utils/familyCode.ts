export function extractCodeNumberFromFamilyCode(familyCode: string): number {
  const codeNumber = parseInt(familyCode.replace(/^\D+/g, ''), 10);

  if (Number.isNaN(codeNumber))
    throw new Error('there is no number inside this family code');

  return codeNumber;
}

export function convertCodeNumberToFamilyCode(codeNumber: number): string {
  if (Number.isNaN(codeNumber)) throw new Error('codeNumber can not be NaN');
  if (codeNumber < 1 || codeNumber > 99_999)
    throw new Error('codeNumber is out of range.');

  return `F${String(codeNumber).padStart(5, '0')}`;
}
