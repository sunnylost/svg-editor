import { useState } from 'react'
import { svgStore } from '@/store'
import { Node } from './Node'

export function ElementPanel() {
    const { SVGElement } = svgStore()
    const [display, setDisplay] = useState(false)

    return (
        <>
            <div
                className="cursor-pointer"
                onClick={() => setDisplay((v) => !v)}
            >
                Element
            </div>
            <div
                className={`${display ? 'h-0' : 'h-1/2'} w-full border transition-all overflow-hidden`}
            >
                <div className="h-full overflow-auto">
                    <Node node={SVGElement} level={0} />
                </div>
            </div>
        </>
    )
}
