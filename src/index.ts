import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { ScamDetectorFetch } from "./endpoints/scamDetectorFetch";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/api/scam/:txId/", ScamDetectorFetch);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
