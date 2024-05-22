import { RunActionBotApi } from "@uesio/bots"
import { Params } from "@uesio/app/bots/runaction/uesio/crmsite/create_site_action"

export default function create_site_action(bot: RunActionBotApi) {
	const params = bot.params.getAll() as Params
	const actionName = bot.getActionName()

	bot.log.info("Name", actionName)
	bot.log.info("PARAMS", params)

	if (actionName !== "createOrder") {
		bot.addError("unsupported action name: " + actionName)
		return
	}

	/*
	// Call API to create order
	const result = bot.http.request({
		method: "POST",
		url: bot.getIntegration().getBaseURL() + "/api/v1/orders",
		body: {
			lineItems: itemNumbers,
			amount: amount,
		},
	})
	if (result.code !== 200) {
		bot.addError("could not place order: " + result.status)
		return
	}
	const orderDetails = result.body as OrderDetails
	const { orderNumber } = orderDetails

    bot.addResult("orderNumber", orderNumber)
	*/
}
