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

	bot.asAdmin.runIntegrationAction("uesio/core.sendgrid", "sendemail", {
		to: ["info@ues.io"],
		toNames: ["ues.io"],
		from: "info@ues.io",
		fromName: "ues.io",
		subject: "New CRM signup",
		plainBody: `
		<!DOCTYPE html>
		<html>
			<body>
				Someone just started the ues.io CRM journey!<br/>
				First Name: ${firstname}<br/>
				Last Name: ${lastname}<br/>
				Email: ${email}<br/>
				Company: ${company}<br/>
				Subdomain: ${subdomain}<br/>
			</body>
		</html>`,
		contentType: "text/html",
	})
}
