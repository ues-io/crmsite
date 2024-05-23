import { RunActionBotApi } from "@uesio/bots"

export default function studio(bot: RunActionBotApi) {
	const actionName = bot.getActionName()

	if (actionName !== "create_site") {
		bot.addError("unsupported action name: " + actionName)
		return
	}

	const firstname = bot.params.get("firstname") as string
	const lastname = bot.params.get("lastname") as string
	const email = bot.params.get("email") as string
	const company = bot.params.get("company") as string
	const subdomain = bot.params.get("subdomain") as string

	const creds = bot.getCredentials()
	const apiKey = creds.apikey

	if (!apiKey) {
		bot.addError("No API Key provided")
	}

	//bot.log.info("Creds", creds)

	const url = bot.getConfigValue("uesio/crmsite.studio_url")

	if (!url) {
		bot.addError("Not studio URL provided")
	}

	// Create a new site and get its id
	const result = bot.http.request<unknown, Record<string, string>>({
		method: "POST",
		url: url + "/site/bots/call/uesio/studio/createsite",
		body: {
			firstname,
			lastname,
			email,
			subdomain: subdomain + "-crm",
			site: subdomain,
			version: "v0.0.1",
			app: "uesio/crm",
			profile: "uesio/crm.admin",
			username: firstname,
		},
	})

	if (result.code !== 200) {
		bot.addError(
			"Error Making Request: " + result.status + " " + result.body
		)
		return
	}

	bot.log.info("Company", company)
}
