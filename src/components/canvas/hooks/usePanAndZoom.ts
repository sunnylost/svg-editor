import { useCallback, useState, MouseEvent, WheelEvent } from 'react'

const zoomFactor = 1.1

export function usePanAndZoom() {
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isPanning, setIsPanning] = useState(false)
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

    const reset = useCallback(() => {
        setScale(1)
    }, [])

    const handleWheel = useCallback((e: WheelEvent<SVGElement>) => {
        if (!e.ctrlKey) {
            return
        }

        const direction = e.deltaY > 0 ? 1 / zoomFactor : zoomFactor
        setScale((prevScale) =>
            Math.max(0.5, Math.min(prevScale * direction, 10)),
        )
    }, [])

    const handleMouseDown = useCallback((e: MouseEvent<SVGElement>) => {
        setIsPanning(true)
        setLastPosition({ x: e.clientX, y: e.clientY })
    }, [])

    const handleMouseUp = useCallback(() => setIsPanning(false), [])

    const handleMouseMove = useCallback(
        (e: MouseEvent<SVGElement>) => {
            if (isPanning) {
                const dx = e.clientX - lastPosition.x
                const dy = e.clientY - lastPosition.y
                setPosition((prevPos) => ({
                    x: prevPos.x + dx,
                    y: prevPos.y + dy,
                }))
                setLastPosition({ x: e.clientX, y: e.clientY })
            }
        },
        [isPanning, lastPosition],
    )

    return {
        transform: `translate(${position.x} ${position.y}) scale(${scale})`,
        handleWheel,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        reset,
    }
}
