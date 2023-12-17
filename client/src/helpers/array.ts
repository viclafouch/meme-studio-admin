export function getFilledArray(length: number) {
  return Array.from({ length }, (_, index) => {
    return index
  })
}
