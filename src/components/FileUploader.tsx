import { ChangeEvent } from 'react'
import { svgStore } from '@/store'

export function FileUploader() {
    const { updateSVGElement } = svgStore()

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            reader.result && updateSVGElement(reader.result.toString())
        })
        reader.readAsText(file)
    }

    return (
        <label>
            <input type="file" accept=".svg" onChange={(e) => handleFile(e)} />
        </label>
    )
}
