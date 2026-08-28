import { useEffect, useRef, useState } from "react"

export function useToastTimer(
	delay = 10000,
	persistent = false,
	onTimeout?: () => void,
) {
	const [isPaused, setIsPaused] = useState(false)
	const remainingTimeRef = useRef(delay)
	const startTimeRef = useRef<number | null>(null)
	const timerIdRef = useRef<any | null>(null)

	useEffect(() => {
		if (persistent) return

		if (isPaused) {
			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current)
				timerIdRef.current = null
			}
			if (startTimeRef.current) {
				const elapsedTime = Date.now() - startTimeRef.current
				remainingTimeRef.current = Math.max(
					0,
					remainingTimeRef.current - elapsedTime,
				)
			}
		} else {
			if (remainingTimeRef.current <= 0) {
				onTimeout?.()
				return
			}

			startTimeRef.current = Date.now()
			timerIdRef.current = setTimeout(() => {
				onTimeout?.()
			}, remainingTimeRef.current)
		}

		return () => {
			if (timerIdRef.current) clearTimeout(timerIdRef.current)
		}
	}, [isPaused, persistent])

	return {
		isPaused,
		pause: () => setIsPaused(true),
		resume: () => setIsPaused(false),
		remainingTime: remainingTimeRef.current,
	}
}
