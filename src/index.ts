import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { ScamDetectorFetch } from "./endpoints/scamDetectorFetch";
import { createCors } from 'itty-router'

export const router = OpenAPIRouter({
	docs_url: "/",
});
const { preflight, corsify } = createCors({
	methods: ['GET'],
  	origins: ["-"], // TODO: research why * is not working here. Needs the custom header object to configure ACAO correctly.
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
});

// embed preflight upstream to handle all OPTIONS requests
router.all('*', preflight);

// Scam endpoint
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
	fetch: async (request, env, ctx) => {
		return router.handle(request, env, ctx).then(corsify)
	 },
};
