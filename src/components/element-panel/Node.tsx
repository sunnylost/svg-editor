import {
    useId,
    useMemo,
    useState,
    useCallback,
    useEffect,
    MouseEvent,
} from 'react'
import { nodeStore } from '@/store'
import { Arrow } from './Arrow'
import { AttrNode, Attr } from './AttrNode'

export function Node({ node, level }: { node: Element | null; level: number }) {
    const { activeNodeId, updateActiveNode } = nodeStore()
    const id = useId()
    const [expand, setExpand] = useState(false)
    const isSelected = useMemo(() => activeNodeId === id, [activeNodeId])
    const [attributes, setAttributes] = useState<Attr[]>([])
    const [isChange, setIsChange] = useState(1)

    const handleChange = useCallback((toggle: boolean) => {
        setExpand(toggle)
    }, [])

    useEffect(() => {
        const attributes: Attr[] = []

        if (node?.attributes) {
            for (const attr of node.attributes) {
                attributes.push({
                    name: attr.name,
                    value: attr.value,
                })
            }
        }

        setAttributes(attributes)
    }, [node, isChange])

    const selectNode = useCallback((e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        updateActiveNode(id, node)
    }, [])

    const handleAttrChange = useCallback((oldAttr: Attr, newAttr: Attr) => {
        node?.removeAttribute(oldAttr.name)
        node?.setAttribute(newAttr.name, newAttr.value)
        setIsChange((v) => v + 1)
    }, [])

    return node ? (
        <ol
            className={`node-wrap relative cursor-default ml-12 ${isSelected ? 'selected' : ''}`}
            onClick={selectNode}
        >
            <li className="node-tag relative flex items-center gap-1 text-xs bg-transparent">
                {node.children.length > 1 && <Arrow onChange={handleChange} />}

                <div className="node-tag-inner overflow-hidden inline-block">
                    <span className="tab">{`<${node.tagName}`}</span>
                    {attributes.map((attr) => (
                        <AttrNode
                            key={attr.name + attr.value}
                            attr={attr}
                            onChange={(e) => handleAttrChange(attr, e)}
                        />
                    ))}
                    <span>{`>`}</span>
                </div>
            </li>
            {node.children.length > 1 &&
                expand &&
                [...node.children].map((child, i) => (
                    <li key={child.id + i}>
                        <Node node={child} level={level + 1} />
                    </li>
                ))}
        </ol>
    ) : null
}
