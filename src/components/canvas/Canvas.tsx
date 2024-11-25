import { useEffect, useRef, useMemo } from 'react'
import { useSVGElement } from '@/store'

export function Canvas() {
    const svgElement = useSVGElement()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const className = useMemo(() => `canvas w-full h-full`, [])

    // mount svg element
    useEffect(() => {
        if (containerRef.current && svgElement) {
            containerRef.current.append(svgElement)
        }
    }, [containerRef, svgElement])

    return <div ref={containerRef} className={className}></div>
}
