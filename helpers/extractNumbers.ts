const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g

export function extractNumbers(string: string | number | undefined) {
  if (string === undefined) {
    return NaN
  }

  return string.toString().match(NUMERIC_REGEXP)
}
