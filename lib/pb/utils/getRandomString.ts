// length >0
export const getRandomString = (length: number = 20): string => {
  const result = []
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  // so first character is not a number
  result.push(
    characters.slice(0, characters.length - 10)
      .charAt(Math.floor(Math.random() * (charactersLength - 10))
      )
  )

  for (let i = 0; i < length - 1; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    )
  }
  return result.join('')
}

export default getRandomString;