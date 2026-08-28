import "material-symbols"
import { DrawerManager, ModalManager, ToastGroup } from "ux-library"
import "ux-library/index.css"
import { PrivateLayout } from "./components/PrivateLayout"
import { PublicLayout } from "./components/PublicLayout"
import { BankAccountPresentationForm } from "./feautres/bankAccountForm/presentation/BankAccountFormPresentation"
import { UserStore } from "./store/UserStore"

function App() {
	const userStore = UserStore()

	return (
		<>
			{userStore.isLoggedIn ? <PrivateLayout /> : <PublicLayout />}
			<DrawerManager drawers={{}} />
			<ModalManager
				modals={{
					bankAccount: BankAccountPresentationForm,
				}}
			/>
			<ToastGroup />
		</>
	)
}

export default App
