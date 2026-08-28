import clsx from "clsx"
import type { MaterialSymbol } from "material-symbols"
import { useState, type ReactNode } from "react"
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom"
import {
	Avatar,
	Badge,
	Button,
	Divider,
	Field,
	Flex,
	Icon,
	SimpleDropdownOptions,
	Tooltip,
	useMessage,
	useRenderReady,
	type BadgeProps,
} from "ux-library"
import { BankAccountPage } from "../pages/BankAccountPage"
import { CategoryPage } from "../pages/CategoryPage"
import { DashboardPage } from "../pages/DashboardPage"
import { MovementPage } from "../pages/MovementPage"
import { UserStore } from "../store/UserStore"
import { AppLogo } from "./AppLogo"
import style from "./PrivateLayout.module.scss"

interface Path {
	path: string
	label: string
	icon: MaterialSymbol
	element: ReactNode
	badge?: BadgeProps
}

const Paths: Path[] = [
	{
		path: "/",
		label: "Dashboard",
		icon: "dashboard",
		element: <DashboardPage />,
	},
	{
		path: "/bank-accounts",
		label: "Contas Bancárias",
		icon: "account_balance",
		element: <BankAccountPage />,
	},
	{
		path: "/categories",
		label: "Categorias",
		icon: "category",
		element: <CategoryPage />,
	},
	{
		path: "/movements",
		label: "Movimentações",
		icon: "swap_horiz",
		element: <MovementPage />,
	},
	{
		path: "/recurrences",
		label: "Recorrências",
		icon: "repeat",
		element: <div>Recorrências</div>,
	},
	{
		path: "/goals",
		label: "Metas",
		icon: "flag",
		element: <div>Metas</div>,
	},
	{
		path: "/support",
		label: "Suporte",
		icon: "support_agent",
		element: <div>Ajuda</div>,
	},
	{
		path: "/settings",
		label: "Configurações",
		icon: "settings",
		element: <div>Configurações</div>,
	},
]

export function PrivateLayout() {
	const [showSidebar, setShowSidebar] = useState(false)
	const message = useMessage()
	const navigate = useNavigate()
	const location = useLocation()
	const renderRady = useRenderReady()

	const currentPath = Paths.find((x) => x.path === location.pathname)

	return (
		<Flex.Row
			grow={1}
			className={clsx(style.privateLayout, showSidebar && style.showSidebar)}
		>
			<Flex.Column as="aside" className={style.sidebar}>
				<Flex.Row
					align="cl"
					gap="0.5rem"
					padding="0 1rem"
					className={style.sidebarLogo}
				>
					<AppLogo size={32} color="var(--primary-color)" />
					<h2 className={style.logoText}>GerFinWEB</h2>
				</Flex.Row>
				<Flex.Column padding="0 0.5rem 0rem 1rem">
					<Field.Text
						placeholder="Buscar..."
						value=""
						onChange={() => {}}
						inputLeft={<Icon icon="search" />}
					/>
				</Flex.Column>
				<Flex.Column padding="1rem 0.5rem 1rem 1rem" gap="0.5rem" grow={1}>
					{Paths.map((x) => (
						<Button
							variant={currentPath?.path === x.path ? "primary" : "ghost"}
							key={x.path}
							className={style.sidebarButton}
							align="left"
							onClick={() => {
								setShowSidebar(false)
								navigate(x.path)
							}}
							leftIcon={x.icon}
						>
							{x.label}
							{x.badge && <Flex.Space />}
							{x.badge && <Badge {...x.badge} />}
						</Button>
					))}
				</Flex.Column>
			</Flex.Column>
			<Flex.Column as="section" className={style.content} grow={1}>
				<Flex.Row
					as="header"
					align="cl"
					padding="0 1rem"
					gap="1rem"
					className={style.header}
				>
					<Tooltip content="Mostrar / esconder menu lateral" position="bl">
						<Button.Tertiary
							className={style.sidebarAlternateButton}
							leftIcon={showSidebar ? "menu_open" : "menu"}
							onClick={() => {
								setShowSidebar((x) => !x)
							}}
						/>
					</Tooltip>
					<Flex.Row
						gap="0.5rem"
						grow={1}
						align="cl"
						className={style.contentHeaderRow}
					>
						{currentPath?.icon && (
							<Icon icon={currentPath?.icon} size="1.5em" />
						)}
						<h2 className={style.contentHeader}>{currentPath?.label}</h2>
					</Flex.Row>

					<div id="headerButtonArea" />
					<Badge.Dot position="br">
						<SimpleDropdownOptions
							options={[
								{
									label: "Perfil",
									icon: "person",
									onClick: () => {
										navigate("/profile")
									},
								},
								{
									label: "Planos e Ofertas",
									icon: "paid",
									onClick: () => {
										navigate("/plans")
									},
								},
								{
									label: "Pagamentos",
									icon: "credit_card",
									onClick: () => {
										navigate("/payments")
									},
								},
								"divider",
								{
									label: "Notificações",
									icon: "notifications",
									onClick: () => {
										navigate("/notifications")
									},
								},
								{
									label: (
										<>
											Ajustes de e-mail <Badge.Dot position="br" />
										</>
									),
									icon: "mail",
									onClick: () => {
										navigate("/email-settings")
									},
								},
								"divider",
								{
									label: "Ajuda",
									icon: "help",
									onClick: () => {
										navigate("/help")
									},
								},
								{
									label: "Suporte",
									icon: "support_agent",
									onClick: () => {
										navigate("/support")
									},
								},
								"divider",
								{
									label: "Configurações",
									icon: "settings",
									onClick: () => {
										navigate("/settings")
									},
								},
								{
									label: "Sair da conta",
									icon: "logout",
									onClick: () => {
										message.openQuestion({
											header: "Sair da conta",
											content:
												"Deseja realmente sair da sua conta de forma segura?",
											confirmLabel: "Sair",
											onConfirm: () => {
												UserStore.getState().logout()
											},
										})
									},
								},
							]}
							position="br"
						>
							{(x) => (
								<Avatar.Circle
									name={UserStore.getState().user!.fullName}
									imageUrl={UserStore.getState().user!.picture}
									onClick={() => {
										x.alternate()
									}}
									size={48}
								/>
							)}
						</SimpleDropdownOptions>
					</Badge.Dot>
				</Flex.Row>
				<Flex.Row
					as="main"
					align="tc"
					padding="1rem"
					gap="1rem"
					grow={1}
					className={style.main}
				>
					{renderRady && (
						<Flex.Column className={style.mainContent} gap="1rem">
							<Routes>
								{Paths.map((x) => (
									<Route key={x.path} path={x.path} element={x.element} />
								))}
								<Route path="*" element={<Navigate to="/" />} />
							</Routes>
						</Flex.Column>
					)}
				</Flex.Row>
			</Flex.Column>
		</Flex.Row>
	)
}
