import { Navigate, Route, Routes } from "react-router-dom"
import styles from "./PublicLayout.module.scss"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export function PublicLayout() {
	return (
		<>
			<img
				src="https://wallpapershome.com/images/pages/pic_h/25956.jpg"
				alt="background"
				className={styles.backgroundVideo}
			/>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	)
}
