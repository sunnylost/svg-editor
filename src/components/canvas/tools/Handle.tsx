type ControlRectProps = {
    position: string
}

export function Handle({ position }: ControlRectProps) {
    return (
        <rect
            data-position={position}
            width="32"
            height="32"
            className="fill-sky-400 cursor-move"
        />
    )
}
