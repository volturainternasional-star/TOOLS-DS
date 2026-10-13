import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CiRVoIuu.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askFahmiAi = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("22179b928cc5e7f9904d26edd119c54ed031b177244389886ea390055c8fbe4a"));
var askToolAi = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0acbfca3f21879f4221b7c2fa001df38fdc8f496b19ed6d3f84b9498c25813f4"));
var generateImage = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c91484e40e92a1508c4d3c847c766254cf3f0c5828d19151b3fe64db792f2f36"));
var speakText = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("fb8d601fe255275bac671600aeaa808970d0306fdc1c4d227076341bcc8df5f0"));
//#endregion
export { speakText as a, generateImage as i, askToolAi as n, createSsrRpc as r, askFahmiAi as t };
