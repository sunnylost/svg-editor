import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type SVGState = {
    SVGElementSource: string
    SVGElement: Element | null
}

export const svgStore = create(
    combine(
        {
            SVGElementSource: '',
            SVGElement: null,
        } as SVGState,
        (set, get) => {
            return {
                // raw svg string
                updateSVGElement(rawString: string) {
                    set((state) => {
                        const parser = new DOMParser()

                        return {
                            ...state,
                            SVGElementSource: rawString,
                            SVGElement: parser.parseFromString(
                                rawString,
                                'image/svg+xml',
                            ).children[0],
                        }
                    })
                },
            }
        },
    ),
)
