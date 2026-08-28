import { Button } from "ux-library"
import { useBankAccountSaveMutation } from "../hooks/useBankAccountSaveMutation"

export function SaveButton() {
	const saveMutation = useBankAccountSaveMutation()
	return (
		<>
			<Button.Primary
				leftIcon="save"
				onClick={() => {
					saveMutation.mutate()
				}}
			>
				Salvar
			</Button.Primary>
		</>
	)
}
