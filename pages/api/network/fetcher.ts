export const fetcher = async (req: Request) => {
  try {
    const res = await fetch(req)
    return await res.json()
  } catch (e) {
    throw e
  }
}
