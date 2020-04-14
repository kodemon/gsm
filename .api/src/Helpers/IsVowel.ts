const VOWELS = ["a", "e", "i", "o", "u"];

/**
 * Is the provided letter a vowel?
 *
 * @param letter
 *
 * @returns vowel check result.
 */
export function isVowel(letter: string): boolean {
  return VOWELS.includes(letter);
}
