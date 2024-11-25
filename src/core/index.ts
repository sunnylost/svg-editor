export class Core {
    elRef: SVGElement | null = null
    gRef: SVGElement | null = null

    constructor() {
        const elRef = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
        )
        const gRef = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        elRef.append(gRef)

        this.elRef = elRef
        this.gRef = gRef
        this.initEventHandler()
    }

    _eventHandler(e: MouseEvent) {
        console.log('mouseenter', e)
    }

    initEventHandler() {
        this.elRef?.addEventListener('mouseenter', this._eventHandler)
    }

    beforeDestroy() {
        this.elRef?.removeEventListener('mouseenter', this._eventHandler)
        this.elRef?.remove()
    }
}
