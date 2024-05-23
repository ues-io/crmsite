import { RunActionBotApi, SaveResponseBatch } from "@uesio/bots"

export default function studio(bot: RunActionBotApi) {
	//const params = bot.params.getAll()
	const actionName = bot.getActionName()

	if (actionName !== "create_site") {
		bot.addError("unsupported action name: " + actionName)
		return
	}

	//const firstname = bot.params.get("firstname") as string
	//const lastname = bot.params.get("lastname") as string
	//const email = bot.params.get("email") as string
	//const company = bot.params.get("company") as string
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

	const handleRequestError = (result: SaveResponseBatch) => {
		if (result.code !== 200) {
			bot.addError(
				"Error Making Request: " + result.status + " " + result.body
			)
			return
		}
		const body = result.body as SaveResponseBatch
		if (body.wires.length !== 1) {
			bot.addError("Error Making Request: Invalid Response")
		}
		const wireResult = body.wires[0]
		if (wireResult.errors?.length) {
			bot.addError("Error Creating Site: " + wireResult.errors[0].message)
		}
	}

	// Create a new site and get its id
	const result = bot.http.request<unknown, SaveResponseBatch>({
		method: "POST",
		url: url + "/site/wires/save",
		body: {
			wires: [
				{
					collection: "uesio/studio.site",
					wire: "createsite",
					changes: {
						"0": {
							"uesio/studio.name": subdomain,
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
}
