import clsx from "clsx"
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import style from "./Tooltip.module.scss"
import type { PositionType } from "../../types"

export interface TooltipProps {
	children: ReactNode
	content: ReactNode
	offsetSpace?: number
	position?: PositionType
	enabled?: boolean
}

export function Tooltip({
	enabled = true,
	children,
	content,
	offsetSpace = 4,
	position = "tl",
}: TooltipProps) {
	const [show, setShow] = useState(false)
	const [init, setInit] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<number>(null)
	const [coords, setCoords] = useState<{ top: number; left: number }>()

	const updatePosition = useCallback(() => {
		if (!ref.current || !tooltipRef.current) return

		const rect = ref.current.firstElementChild!.getBoundingClientRect()
		const tooltipRect = tooltipRef.current.getBoundingClientRect()

		let top = rect.top
		let left = rect.left

		if (position === "tl") {
			top = rect.top - tooltipRect.height - offsetSpace
			left = rect.left
		}
		if (position === "tc") {
			top = rect.top - tooltipRect.height - offsetSpace
			left = rect.left + rect.width / 2 - tooltipRect.width / 2
		}
		if (position === "tr") {
			top = rect.top - tooltipRect.height - offsetSpace
			left = rect.left + rect.width - tooltipRect.width
		}

		if (position === "cl") {
			top = rect.top + rect.height / 2 - tooltipRect.height / 2
			left = rect.left - offsetSpace - tooltipRect.width
		}
		if (position === "clt") {
			top = rect.top
			left = rect.left - offsetSpace - tooltipRect.width
		}
		if (position === "clb") {
			top = rect.top - tooltipRect.height + rect.height
			left = rect.left - offsetSpace - tooltipRect.width
		}
		if (position === "cr") {
			top = rect.top + rect.height / 2 - tooltipRect.height / 2
			left = rect.left + offsetSpace + rect.width
		}
		if (position === "crt") {
			top = rect.top
			left = rect.left + offsetSpace + rect.width
		}
		if (position === "crb") {
			top = rect.top - tooltipRect.height + rect.height
			left = rect.left + offsetSpace + rect.width
		}

		if (position === "bl") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left
		}
		if (position === "bc") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left + rect.width / 2 - tooltipRect.width / 2
		}
		if (position === "br") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left + rect.width - tooltipRect.width
		}

		setCoords({ top, left })
		setInit(true)
	}, [position, offsetSpace])

	useLayoutEffect(() => {
		if (!ref.current) return
		updatePosition()

		const observer = new ResizeObserver(() => {
			updatePosition()
		})

		observer.observe(ref.current)
		window.addEventListener("resize", updatePosition)
		window.addEventListener("scroll", updatePosition)

		return () => {
			ref.current?.removeEventListener("resize", updatePosition)
			window.removeEventListener("resize", updatePosition)
			window.removeEventListener("scroll", updatePosition)
		}
	}, [updatePosition])

	useEffect(() => {
		if (show) {
			const checkHover = (e: MouseEvent) => {
				if (ref.current && !ref.current.contains(e.target as Node)) {
					setShow(false)
				}
			}
			window.addEventListener("mousemove", checkHover)
			return () => window.removeEventListener("mousemove", checkHover)
		}
	}, [show])

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				setInit(false)
				updatePosition()
			}, 10)
		}
	}, [show])

	if (!enabled) {
		return children
	}

	return (
		<>
			<div
				ref={ref}
				className={style.children}
				onMouseEnter={() => {
					timeoutRef.current = setTimeout(() => {
						setShow(true)
					}, 1000)
				}}
				onMouseLeave={() => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current)
					setShow(false)
					updatePosition()
				}}
			>
				{children}
			</div>
			{show &&
				createPortal(
					<div
						ref={tooltipRef}
						data-position={position}
						className={clsx(style.tooltip, init && style.show)}
						style={{
							transform: `translateY(${coords?.top}px) translateX(${coords?.left}px)`,
						}}
					>
						{content}
					</div>,
					document.body,
				)}
		</>
	)
}
