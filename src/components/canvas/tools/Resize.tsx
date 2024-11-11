import { Handle } from './Handle'

export function Resize() {
    return (
        <g>
            <Handle position="top" />
            <Handle position="bottom" />
        </g>
    )
}
