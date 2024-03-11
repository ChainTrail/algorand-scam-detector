import { Env } from '../config/env';

export class Chaintrail {

    static getBlacklist(env: Env) {
        try {
            return fetch(env.CHAINTRAIL_BLACKLIST_URL, {
                cf: {
                  cacheTtl: 60,
                  cacheEverything: true,
                }
            }).then(res => res.json());
        } catch(exception) {
            console.error(exception);
            return false;
        }
    }

}