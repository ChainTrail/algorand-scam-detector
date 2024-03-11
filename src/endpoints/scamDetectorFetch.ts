import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { Scam } from "../types";
import { AlgorandBlockchain } from "utils/algorandBlockchain.util";
import { Chaintrail } from "utils/chaintrail.util";
import { ScamValidation } from "utils/scamValidation";

export class ScamDetectorFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Scam"],
		summary: "Fetches transaction via Nodely and validates whether it's a scam or not.",
		parameters: {
			txId: Path(String, {
				description: "ID of the transaction to validate",
			}),
		},
		responses: {
			"200": {
				description: "Returns a scam object depending on the outcome.",
				schema: {
					success: Boolean,
					result: {
						task: Scam,
					},
				},
			},
			"404": {
				description: "Transaction not found",
				schema: {
					success: Boolean,
					error: String,
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
        // Retrieve txId to validate whether it's scam or not
		const { txId } = data.params;

                let blacklist = await Chaintrail.getBlacklist(env);

                if(blacklist === false) {
                    return this.returnErrorResponse("Blacklist couldn't be loaded from Chaintrail", 400);
                }

                blacklist = blacklist['data'];
                
                let txn: any = await AlgorandBlockchain.fetchTxId(env, txId);
                if (txn === false || txn.transaction === undefined) {
        			return this.returnErrorResponse("Transaction not found", 404);
        		}

                let txIsScam = ScamValidation.isScam(txn, blacklist);
		return {
			success: true,
			scam: {
				txId: txId,
				isScam: txIsScam,
			},
		};
	}

    returnErrorResponse(message: String, errorCode: number) {
        return Response.json(
            {
                success: false,
                error: message,
            },
            {
                status: errorCode,
            }
        );
    }
}
