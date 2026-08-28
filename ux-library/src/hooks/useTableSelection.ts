import { useState } from "react"

export function useTableSelection(props?: { initialSelection?: string[] }) {
	const [selected, setSelected] = useState<string[]>(props?.initialSelection || [])

	return {
		selected,
		setSelected,
		select: (id: string) => {
			const result: string[] = selected || []
			if (!result.includes(id)) {
				result.push(id)
			}
			setSelected([...result])
			return [...result]
		},
		unselect: (id: string) => {
			setSelected((x) => {
				return [...x.filter((y) => y !== id)]
			})
			return [...selected.filter((y) => y !== id)]
		},
		clear: () => {
			setSelected([])
		},
	}
}
