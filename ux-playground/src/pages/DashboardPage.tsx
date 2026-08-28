import { Flex } from "ux-library"
import { UserStore } from "../store/UserStore"

export function DashboardPage() {
	const userStore = UserStore()

	return (
		<Flex.Column gap="0.25rem">
			<small>Bem vindo,</small>
			<h1>{userStore.user?.fullName}</h1>
		</Flex.Column>
	)
}
