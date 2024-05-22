import { RunActionBotApi } from "@uesio/bots"

export default function studio(bot: RunActionBotApi) {
	const params = bot.params.getAll()
	const actionName = bot.getActionName()

	bot.log.info("Name", actionName)
	bot.log.info("Params", params)

	if (actionName !== "create_site") {
		bot.addError("unsupported action name: " + actionName)
		return
	}

	const creds = bot.getCredentials()
	const apiKey = creds.apikey

	if (!apiKey) {
		bot.addError("No API Key provided")
	}

	bot.log.info("Creds", creds)

	const url = bot.getConfigValue("uesio/crmsite.studio_url")

	if (!url) {
		bot.addError("Not studio URL provided")
	}

	// Call API to create order
	const result = bot.http.request({
		method: "POST",
		url: url + "/site/wire/load",
		body: {
			collection: "uesio/core.user",
			query: true,
		},
	})
	if (result.code !== 200) {
		bot.addError("error: " + result.status)
		return
	}
	bot.log.info("GOT SOMETIBG BLACK", result.body)
}
