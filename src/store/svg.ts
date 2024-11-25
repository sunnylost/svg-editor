import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { importSVGElement } from '@/core/util'
import { Core } from '@/core'
import { MODE, Mode } from '@/store/modes'

export * from './modes'

type SVGStoreState = {
    core: Core
    mode: Mode
    svg: SVGElement | null
}

export const useSvgStore = create(
    combine(
        {
            core: new Core(),
            mode: MODE.move,
            svg: null,
        } as SVGStoreState,
        (set, get) => {
            return {
                import(rawString: string) {
                    set((state) => {
                        const svgElement = importSVGElement(rawString)
                        const core = get().core

                        core.gRef?.append(svgElement)

                        return {
                            ...state,
                            svg: svgElement,
                        }
                    })
                },

                updateMode(mode: Mode) {
                    set((state) => ({
                        ...state,
                        mode,
                    }))
                },
            }
        },
    ),
)

export const useSVGCore = () => useSvgStore((state) => state.core)
export const useSVGMode = () => useSvgStore((state) => state.mode)
export const useSVGElement = () => useSvgStore((state) => state.svg)
export const useSVGImport = () => useSvgStore((state) => state.import)
export const useUpdateSVGMode = () => useSvgStore((state) => state.updateMode)
