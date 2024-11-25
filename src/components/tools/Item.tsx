import { ReactNode } from 'react'
import { useUpdateSVGMode, useSVGMode, Mode } from '@/store'

export type ItemProps = {
    mode: Mode
    children: ReactNode
}

export function Item({ mode, children }: ItemProps) {
    const svgMode = useSVGMode()
    const updateMode = useUpdateSVGMode()

    return (
        <li
            className={`${mode === svgMode ? 'bg-white' : ''}`}
            onClick={() => updateMode(mode)}
        >
            {children}
        </li>
    )
}
