const toString = Object.prototype.toString

function isSVGElement(el: unknown): el is SVGElement {
    return toString.call(el).substring(8).startsWith('SVG')
}

function create(tag: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}

class Shape {
    el: SVGElement

    constructor(el: SVGElement) {
        this.el = el
    }

    attr(key: string, value: string | null) {
        if (value) {
            this.el.setAttribute(key, value)
        } else {
            this.el.removeAttribute(key)
        }
    }

    stroke() {
        this.el.setAttribute('stroke')
    }
}

class Point {
    x = 0
    y = 0

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Line extends Shape {
    constructor(el: SVGElement) {
        super(el)
    }
}

// function line(start: Point, end: Point): Line
// function line(el: SVGElement):Line
// function line(x1: number, y1: number, x2: number, y2: number){
//     let el:SVGElement
//
//     if (isSVGElement(x1)) {
//         el = x1
//     } else if (typeof x1 === 'number') {
//         el = create('line')
//     } else {
//
//     }
//
//     return new Line(el)
// }

export class Util {
    #el: SVGElement
    #source = ''

    constructor(el: SVGElement) {
        this.#el = el
    }

    source(source?: string) {
        if (source) {
            this.#source = source
        } else {
            return this.#source
        }
    }

    static import(rawString: string) {
        const parser = new DOMParser()
        const el = parser.parseFromString(rawString, 'image/svg+xml')
            .children[0] as SVGElement
        const svg = new Util(el)

        svg.source(rawString)

        return svg
    }
}

export function svg(el: SVGElement) {
    return new Util(el)
}

export function importSVGElement(rawString: string) {
    const parser = new DOMParser()
    return parser.parseFromString(rawString, 'image/svg+xml')
        .children[0] as SVGElement
}
