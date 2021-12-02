import { fetcher } from './fetcher'
import TapitaCategoryQueryBuilder from './TapitaCategoryQueryBuilder'

export const tapitaCategoryFetcher: any = async (path: string) => {
  const query = TapitaCategoryQueryBuilder()
  return fetcher(query)
}
