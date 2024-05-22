
declare module "@uesio/app/bots/listener/uesio/crmsite/create_site" {

	type Params = {
		firstname: string
		lastname: string
		email: string
		company: string
		subdomain: string
	}

	export type {
		Params
	}
}
declare module "@uesio/app/bots/runaction/uesio/crmsite/create_site_action" {

	type Params = {
		amount: number
		itemNumbers: string[]
	}

	export type {
		Params
	}
}