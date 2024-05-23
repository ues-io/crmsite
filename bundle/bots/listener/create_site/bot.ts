import { ListenerBotApi } from "@uesio/bots"

export default function create_site(bot: ListenerBotApi) {
	const firstname = bot.params.get("firstname") as string
	const lastname = bot.params.get("lastname") as string
	const email = bot.params.get("email") as string
	const company = bot.params.get("company") as string
	const subdomain = bot.params.get("subdomain") as string

	bot.runIntegrationAction("uesio/crmsite.studio", "create_site", {
		firstname,
		lastname,
		email,
		company,
		subdomain,
	})

	// Create a lead in our CRM App

	// Create a new crm site

	// Create a new domain for that site

	// Create a new user for that site
}
