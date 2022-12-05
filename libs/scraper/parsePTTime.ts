export function parsePTTime(ptTime: string) {
  ptTime = ptTime.replace("PT", "")
  ptTime = ptTime.replace("H", " hours ")
  ptTime = ptTime.replace("M", " minutes ")
  ptTime = ptTime.replace("S", " seconds")

  return ptTime.trim()
}
