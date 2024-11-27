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

function isContains(attrList: Attr[], name: string) {
    return attrList.some((attr) => attr.name === name)
}

function updateAttr(attrList: Attr[], name: string, value: string) {
    attrList.some((attr) => {
        if (attr.name === name) {
            attr.value = value
            return true
        }
    })
}

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
        const _attributes: Attr[] = [...attributes]

        if (node?.attributes) {
            for (const attr of node.attributes) {
                if (isContains(_attributes, attr.name)) {
                    updateAttr(_attributes, attr.name, attr.value)
                } else {
                    _attributes.push({
                        name: attr.name,
                        value: attr.value,
                    })
                }
            }
        } else {
            _attributes.length = 0
        }

        setAttributes(_attributes)
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
            className={`node-wrap relative cursor-default ${isSelected ? 'selected' : ''}`}
            style={{
                '--indent': `${level * 20}px`,
            }}
            onClick={selectNode}
        >
            <li className="node-tag my-2 relative flex items-center text-xs bg-transparent">
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
                    {`>`}
                </div>
            </li>
            {node.children.length > 1 &&
                expand &&
                [...node.children].map((child, i) => (
                    <Node key={child.id + i} node={child} level={level + 1} />
                ))}
        </ol>
    ) : null
}
