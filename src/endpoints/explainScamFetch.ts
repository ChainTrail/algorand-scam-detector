import { Scam } from "../types";
import { ScamValidation } from "utils/scamValidation";
import template from "../templates/explainScamTemplate";
import { Chaintrail } from "utils/chaintrail.util";
import { AlgorandBlockchain } from "utils/algorandBlockchain.util";
import Mustache from "mustache";
import { OpenAPIRoute } from "@cloudflare/itty-router-openapi";
import { OpenAPIRouteSchema, Path } from "@cloudflare/itty-router-openapi";

export class ExplainScamFetch extends OpenAPIRoute  {

	static schema: OpenAPIRouteSchema = {
		tags: ["ExplainScam"],
		summary: "Fetches transaction via Nodely and validates through Chaintrail whether it's a SCAM. Returns a human friendly HTML page with more information.",
		parameters: {
			txId: Path(String, {
				description: "ID of the transaction to validate",
			}),
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {	
		// Retrieve txId to validate whether it's scam or not
		let { txId } = data.params;

		let blacklist = await Chaintrail.getBlacklist(env);

		let txIsScam = false;
		let txFound = false;
		if(blacklist !== false) {
			blacklist = blacklist['data'];
		
			let txn: any = await AlgorandBlockchain.fetchTxId(env, txId);
			if (txn !== false && txn.transaction !== undefined) {
				// TODO: show that we couldn't find the transaction
				txFound = true;
			}
		
			if(txFound !== false) {
				txIsScam = ScamValidation.isScam(txn, blacklist);
			}
		}

		let output = Mustache.render(template, { 
			txId: txId,
			txIsScam: txIsScam,
			txFound: txFound,
			blacklistRetrieved: (blacklist !== false) ? true : false
		});

		return new Response(output, {
			headers: {
				"Content-Type": "text/html",
			}	
		});
	}
}
