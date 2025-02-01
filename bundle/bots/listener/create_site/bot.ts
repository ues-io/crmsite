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

	const from = "info@updates.ues.io"

	const nl2br = (str: string) => {
		const breakTag = "<br>"
		const replaceStr = "$1" + breakTag
		return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
	}

	const templateParams = {
		logoUrl: bot.getHostUrl() + bot.getFileUrl("uesio/core.logo", ""),
		logoAlt: "ues.io",
		logoWidth: "40",
		footerText: "ues.io - Your app platform",
	}

	const titleText = "Someone just started the ues.io CRM journey!"
	const bodyText = `

First Name: ${firstname}
Last Name: ${lastname}
Email: ${email}
Company: ${company}
Subdomain: ${subdomain}

Cheers!

The team at ues.io`

	const notifyText = bot.mergeTemplateFile(
		"uesio/appkit.emailtemplates",
		"templates/genericmessage.txt",
		{
			titleText,
			bodyText,
			...templateParams,
		}
	)

	const notifyHtml = bot.mergeTemplateFile(
		"uesio/appkit.emailtemplates",
		"templates/genericmessage.html",
		{
			titleText,
			bodyText: nl2br(bodyText),
			...templateParams,
		}
	)

	bot.asAdmin.runIntegrationAction("uesio/appkit.resend", "sendemail", {
		to: "info@ues.io",
		from,
		subject: "New CRM Signup",
		html: notifyHtml,
		text: notifyText,
	})
}
