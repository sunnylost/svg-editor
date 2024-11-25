import {
    useEffect,
    useRef,
    useState,
    useCallback,
    FocusEvent,
    KeyboardEvent,
} from 'react'

export type Attr = {
    name: string
    value: string
}
export type AttrNodeProp = {
    attr: Attr
    onChange?: (attr: Attr) => void
}

export function AttrNode({ attr, onChange }: AttrNodeProp) {
    const valueRef = useRef<HTMLSpanElement | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [content, setContent] = useState('')

    const handleSubmit = useCallback(() => {
        setEditMode(false)
        const [name, value] = valueRef.current?.textContent?.split('=') ?? []
        onChange?.({
            name,
            value: value?.trim().replace(/^"|"$/g, ''),
        })
    }, [editMode])
    const handleEnter = useCallback(
        (e: KeyboardEvent<HTMLSpanElement>) =>
            e.key === 'Enter' && handleSubmit(),
        [editMode],
    )
    const handleBlur = useCallback(
        (e: FocusEvent<HTMLSpanElement>) => {
            e.stopPropagation()
            handleSubmit()
        },
        [editMode],
    )

    const handleDoubleClick = useCallback(() => {
        setEditMode(true)
        setContent(`${attr.name}="${attr.value}"`)
    }, [])

    useEffect(() => {
        if (editMode && valueRef.current) {
            const range = document.createRange()
            const textNode = valueRef.current.firstChild
            textNode && range.setStart(textNode, attr.name.length + 2)
            textNode &&
                range.setEnd(textNode, attr.name.length + attr.value.length + 2)

            const selection = getSelection()
            selection?.removeAllRanges()
            selection?.addRange(range)
        }
    }, [editMode])

    return editMode ? (
        <span
            className="border"
            ref={valueRef}
            onBlur={handleBlur}
            onKeyUp={handleEnter}
            contentEditable={true}
        >
            {content}
        </span>
    ) : (
        <span className="attr" onDoubleClick={handleDoubleClick}>
            <span className="attr-name">{attr.name}</span>
            <span>{'="'}</span>
            <span className="attr-value text-sky-500">{attr.value}</span>
            <span>{'"'}</span>
        </span>
    )
}
