import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Field, Flex } from "ux-library"
import { GoogleLogo } from "../components/GoogleLogo"
import { Modal } from "../components/Modal"
import { UserStore } from "../store/UserStore"
import styles from "./LoginPage.module.scss"
import type { CSSProperties } from "react"

export function LoginPage() {
	const form = useForm()
	const navigate = useNavigate()

	return (
		<Modal
			header="Bem vindo de volta!"
			description="Sentimos muito sua falta. Informe seus dados para prosseguir"
		>
			<FormProvider {...form}>
				<Field.Text
					field="email"
					label="Email"
					placeholder="Digite seu email"
				/>
				<Field.Text
					field="password"
					type="password"
					label="Senha"
					placeholder="Digite sua senha"
				/>
				<Flex.Row>
					<Field.Checkbox field="remember" label="Lembrar-me" />
					<Flex.Space />
					<a href="#">Esqueceu sua senha?</a>
				</Flex.Row>
			</FormProvider>
			<Flex.Column gap="1rem" padding="1rem 0">
				<Button.Primary
					onClick={() => {
						UserStore.getState().login(
							{
								fullName: "Michel Douglas Grigoli",
								email: "mdgrigoli@hotmail.com.br",
								picture: "https://randomuser.me/api/portraits/men/15.jpg",
							},
							"6387216387162873628",
						)
					}}
				>
					Entrar
				</Button.Primary>
				<Button.Tertiary>
					<GoogleLogo />
					Entrar com o Google
				</Button.Tertiary>
			</Flex.Column>
			<p className={styles.registerText}>
				Não possui uma conta?{" "}
				<a
					onClick={() => {
						navigate("/register")
					}}
				>
					Cadastre-se
				</a>
			</p>
		</Modal>
	)
}
