import { ChevronRight, ChevronDown } from 'lucide-react'
import { useState, MouseEvent } from 'react'

export function Arrow({ onChange }: { onChange?: (toggle: boolean) => void }) {
    const [active, setActive] = useState(false)

    function toggle(e: MouseEvent<SVGElement>) {
        e.stopPropagation()
        setActive((state) => !state)
        onChange?.(!active)
    }

    return active ? (
        <ChevronDown
            className="cursor-pointer"
            width={16}
            height={16}
            onClick={toggle}
        />
    ) : (
        <ChevronRight
            className="cursor-pointer"
            width={16}
            height={16}
            onClick={toggle}
        />
    )
}
