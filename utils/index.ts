export const extractMessage = (message: string, replace: string[]) => {
  let temp = message
  for (let i = 0; i < replace.length; i++) {
    temp = temp.replace('<>', replace[i])
  }
  return temp
}
