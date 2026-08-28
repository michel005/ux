import { useState, useEffect } from "react"

export function useRenderReady() {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		setIsReady(true)
	}, [])

	return isReady
}
