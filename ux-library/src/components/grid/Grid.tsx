import type {
    CSSProperties,
    ElementType,
    HtmlHTMLAttributes,
    useRef
} from "react"

export interface GridProps extends HtmlHTMLAttributes<HTMLElement> {
    as?: ElementType
    columns?: string
    gap?: string
    margin?: string
    padding?: string
    rows?: string
    ref?: ReturnType<typeof useRef>
}

export function Grid(props: GridProps) {
    const { as, columns, gap, margin, padding, rows, ...otherProps } = props
    const Component = as || "div"

    const customStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap,
        margin,
        padding
    }

    return (
        <Component
            {...otherProps}
            style={{ ...customStyle, ...otherProps.style }}
        />
    )
}
