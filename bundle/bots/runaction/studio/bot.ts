import { RunActionBotApi } from "@uesio/bots"
import { wires } from "@uesio/ui"

export default function studio(bot: RunActionBotApi) {
	//const params = bot.params.getAll()
	const actionName = bot.getActionName()

	if (actionName !== "create_site") {
		bot.addError("unsupported action name: " + actionName)
		return
	}

	const firstname = bot.params.get("firstname") as string
	const lastname = bot.params.get("lastname") as string
	//const email = bot.params.get("email") as string
	//const company = bot.params.get("company") as string
	const subdomain = bot.params.get("subdomain") as string

	const sitename =
		"selfsignup_" + firstname + "_" + lastname + "_" + subdomain

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
	const result = bot.http.request({
		method: "POST",
		url: url + "/site/wires/save",
		body: {
			wires: [
				{
					collection: "uesio/studio.site",
					wire: "createsite",
					changes: {
						"0": {
							"uesio/studio.name": sitename,
							"uesio/studio.bundle": {
								"uesio/core.uniquekey": "uesio/crm:0:0:1",
							},
							"uesio/studio.app": {
								"uesio/core.uniquekey": "uesio/crm",
							},
						},
					},
				},
			],
		},
	})
	if (result.code !== 200) {
		bot.log.info("auth", "Bearer " + apiKey)
		bot.log.info("Errrrrrr", result.body)
		bot.addError("error: " + result.status)
		return
	}
	const body = result.body as wires.SaveResponseBatch

	bot.log.info("GOT SOMETIBG BLACK", result.body)
}
