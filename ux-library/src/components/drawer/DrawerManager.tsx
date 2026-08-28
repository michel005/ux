import type { ReactNode } from "react"
import { DrawerStore, type DrawerInstanceProps } from "../../stores"

export interface DrawerManagerProps {
	drawers: Record<string, (props: DrawerInstanceProps<any>) => ReactNode>
}

export function DrawerManager(props: DrawerManagerProps) {
	const drawerStore = DrawerStore()

	return (
		<>
			{Object.entries(drawerStore.drawers).map(([key, value]) => {
				const Component = props.drawers[key]

				if (!Component) {
					return <></>
				}

				return <Component key={key} {...value} />
			})}
		</>
	)
}
