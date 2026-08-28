import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface UserType {
	fullName: string
	email: string
	picture?: string
}

export interface UserStoreProps {
	user: UserType | null
	token: string | null
	isLoggedIn: boolean
	login: (user: UserType, token: string) => void
	logout: () => void
}

export const UserStore = create<UserStoreProps>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isLoggedIn: false,
			login: (user: UserType, token: string) => {
				set({
					user,
					token,
					isLoggedIn: true,
				})
			},
			logout: () => {
				set({
					user: null,
					token: null,
					isLoggedIn: false,
				})
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
