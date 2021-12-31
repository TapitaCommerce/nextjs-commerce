import TapitaPageRequestBuilder from './TapitaPageRequestBuilder'
import { TAPITA_ENDPOINT, TAPITA_INTEGRATION_TOKEN } from '../../../lib/pb/config'
import { fetcher } from './fetcher'

export const tapitaPageFetcher: any = async (path: string) => {
  const query = TapitaPageRequestBuilder(TAPITA_ENDPOINT, TAPITA_INTEGRATION_TOKEN)
  return fetcher(query)
}
