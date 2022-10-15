export function extractCodeNumberFromFamilyCode(familyCode: string): number {
  return parseInt(familyCode.replace(/^\D+/g, ''), 10);
}

export function convertCodeNumberToFamilyCode(codeNumber: number): string {
  return `${String(codeNumber).padStart(5, '0')}`;
}
