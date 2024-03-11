import { Env } from '../config/env';

export class AlgorandBlockchain {

    // Use a direct fetch with 24 hour TTL cache
    static fetchTxId(env: Env, txId: string) {
        try {
            return fetch(env.ALGO_INDEXER_SERVER + "/v2/transactions/" + txId, {
                cf: {
                    cacheTtl: 60 * 60 * 24,
                    cacheEverything: true,
                }
            }).then(res => res.json());
        } catch(exception) {
            console.error(exception);
            return false;
        }
    }

}