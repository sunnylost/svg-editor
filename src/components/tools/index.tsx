import { Circle, Pointer, MousePointer2 } from 'lucide-react'
import { MODE } from '@/store'
import { Item } from './Item'

export function Tools({ className }: { className?: string }) {
    return (
        <ul className={className}>
            <Item mode={MODE.select}>
                <MousePointer2 />
            </Item>
            <Item mode={MODE.move}>
                <Pointer />
            </Item>
            <Item mode={MODE.move}>
                <Circle />
            </Item>
        </ul>
    )
}
