import { svgStore } from '@/store'
import { useEffect, useRef } from 'react'
import { usePanAndZoom } from './hooks'
import { Resize } from './tools/Resize'

export function Canvas() {
    const containerRef = useRef<SVGSVGElement | null>(null)
    const { SVGElement } = svgStore()
    const {
        transform,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
    } = usePanAndZoom()

    useEffect(() => {
        if (containerRef.current && SVGElement) {
            containerRef.current.append(SVGElement)
        }
    }, [containerRef, SVGElement])

    return (
        <div className="canvas w-full h-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
            >
                <g transform={transform} ref={containerRef}></g>
                <Resize />
            </svg>
        </div>
    )
}
