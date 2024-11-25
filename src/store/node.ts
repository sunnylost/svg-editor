import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export type NodeState = {
    activeNodeId: string
    activeNode: Element | null
}

export const nodeStore = create(
    combine(
        {
            activeNodeId: '',
            activeNode: null,
        } as NodeState,
        (set) => {
            return {
                updateActiveNode(id: string, node: Element | null) {
                    set((state) => {
                        return {
                            ...state,
                            activeNodeId: id,
                            activeNode: node,
                        }
                    })
                },
            }
        },
    ),
)
