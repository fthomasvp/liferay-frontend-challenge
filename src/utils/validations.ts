/**
 * RegEx to validate repository full name.
 * The user must provide an input with at least
 * one word, followed by a slash and another word.
 */
export function isValidRepositoryName(repoName: string) {
  return repoName.match(/\w{1,}\/\w{1,}/);
}
