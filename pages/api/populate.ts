import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	// await kv.hset("quotes", await getQuotesDataJSON());
	// await kv.hset("attributes", await getAttributesDataJSON());
	// await kv.hset("resume", await getResumeJSON());
	// const quotes = await getFromKV("quotes");
	// const attributes = await getFromKV("attributes");
	// const resume = await getFromKV("resume");
	// res.status(200).json({
	// 	message: JSON.stringify({
	// 		quotes: quotes || "no quotes found",
	// 		attributes: attributes || "no attributes found",
	// 		resume: resume || "no resume found",
	// 	}),
	// });
}
