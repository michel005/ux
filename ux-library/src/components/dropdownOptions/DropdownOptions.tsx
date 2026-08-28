import clsx from "clsx"
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react"
import type { PositionType } from "@/types"
import { createPortal } from "react-dom"
import style from "./DropdownOptions.module.scss"

export interface DropdownOptionsProps {
	children: ReactNode
	content: ReactNode
	offsetSpace?: number
	position?: PositionType
	show: boolean
	setShow: Dispatch<SetStateAction<boolean>>
	contentClassName?: string
	dropdownClassName?: string
	closeOnBackgroundClick?: boolean
}

export function DropdownOptions({
	children,
	content,
	offsetSpace = 4,
	position = "tl",
	show,
	setShow,
	contentClassName,
	dropdownClassName,
	closeOnBackgroundClick,
}: DropdownOptionsProps) {
	const [init, setInit] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [coords, setCoords] = useState<{ top: number; left: number }>()

	const updatePosition = useCallback(() => {
		if (!ref.current || !dropdownRef.current) return

		const rect = ref.current.firstElementChild!.getBoundingClientRect()
		const dropdownRect = dropdownRef.current.getBoundingClientRect()

		let top = rect.top
		let left = rect.left

		if (position === "tl") {
			top = rect.top - dropdownRect.height - offsetSpace
			left = rect.left
		}
		if (position === "tc") {
			top = rect.top - dropdownRect.height - offsetSpace
			left = rect.left + rect.width / 2 - dropdownRect.width / 2
		}
		if (position === "tr") {
			top = rect.top - dropdownRect.height - offsetSpace
			left = rect.left + rect.width - dropdownRect.width
		}

		if (position === "cl") {
			top = rect.top + rect.height / 2 - dropdownRect.height / 2
			left = rect.left - offsetSpace - dropdownRect.width
		}
		if (position === "clt") {
			top = rect.top
			left = rect.left - offsetSpace - dropdownRect.width
		}
		if (position === "clb") {
			top = rect.top - dropdownRect.height + rect.height
			left = rect.left - offsetSpace - dropdownRect.width
		}
		if (position === "cr") {
			top = rect.top + rect.height / 2 - dropdownRect.height / 2
			left = rect.left + offsetSpace + rect.width
		}
		if (position === "crt") {
			top = rect.top
			left = rect.left + offsetSpace + rect.width
		}
		if (position === "crb") {
			top = rect.top - dropdownRect.height + rect.height
			left = rect.left + offsetSpace + rect.width
		}

		if (position === "bl") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left
		}
		if (position === "bc") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left + rect.width / 2 - dropdownRect.width / 2
		}
		if (position === "br") {
			top = rect.top + rect.height + offsetSpace
			left = rect.left + rect.width - dropdownRect.width
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
			setTimeout(() => {
				setInit(false)
				updatePosition()
			}, 10)
		}
	}, [show])

	return (
		<>
			<div ref={ref} className={clsx(style.children, contentClassName)}>
				{children}
			</div>
			{show &&
				createPortal(
					<>
						<div
							className={style.background}
							onClick={() => {
								if (!(closeOnBackgroundClick ?? true)) return
								setShow(false)
							}}
						/>
						<div
							ref={dropdownRef}
							data-position={position}
							className={clsx(
								style.dropdown,
								init && style.show,
								dropdownClassName,
							)}
							style={{
								transform: `translateY(${coords?.top}px) translateX(${coords?.left}px)`,
								width: ref.current?.getBoundingClientRect().width || "200px",
							}}
						>
							{content}
						</div>
					</>,
					document.body,
				)}
		</>
	)
}
