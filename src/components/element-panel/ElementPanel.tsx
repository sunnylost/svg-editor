import { useState } from 'react'
import { useSVGElement } from '@/store'
import { Node } from './Node'

export function ElementPanel({ className }: { className?: string }) {
    const svgElement = useSVGElement()
    const [display, setDisplay] = useState(false)

    return (
        <div className={`w-full ${className}`}>
            <div
                className="cursor-pointer"
                onClick={() => setDisplay((v) => !v)}
            >
                Element
            </div>
            <div
                className={`${display ? 'h-0' : 'h-full'} border transition-all overflow-hidden`}
            >
                <div className="h-full overflow-auto">
                    <Node node={svgElement} level={0} />
                </div>
            </div>
        </div>
    )
}
