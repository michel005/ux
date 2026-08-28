import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Field, Flex } from "ux-library"
import { Modal } from "../components/Modal"
import styles from "./RegisterPage.module.scss"

export function RegisterPage() {
	const form = useForm()
	const navigate = useNavigate()

	return (
		<Modal
			header="Crie sua conta"
			description="Preencha os dados abaixo para criar sua conta"
		>
			<FormProvider {...form}>
				<Field.Text
					field="fullName"
					label="Nome completo"
					placeholder="Digite seu nome completo"
				/>
				<Field.Text
					field="email"
					label="Email"
					placeholder="Digite seu email"
				/>
				<Field.Text
					field="birthDate"
					label="Data de nascimento"
					placeholder="Digite sua data de nascimento"
					optionalLabel
				/>
				<Field.Text
					field="password"
					type="password"
					label="Senha"
					placeholder="Digite sua senha"
				/>
				<Field.Text
					field="passwordConfirmation"
					type="password"
					label="Confirme a senha"
					placeholder="Confirme sua senha"
				/>
				<Field.Checkbox
					field="acceptTerms"
					label={
						<>
							Ao cadastrar, você concorda com os{" "}
							<a href="#" style={{ color: "#999" }}>
								termos de serviço
							</a>
						</>
					}
				/>
			</FormProvider>
			<Flex.Column gap="1rem" padding="1rem 0">
				<Button.Primary>Cadastrar</Button.Primary>
			</Flex.Column>
			<p className={styles.registerText}>
				Já possui uma conta?{" "}
				<a
					onClick={() => {
						navigate("/")
					}}
				>
					Entre
				</a>
			</p>
		</Modal>
	)
}
