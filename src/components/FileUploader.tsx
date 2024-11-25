import { ChangeEvent } from 'react'
import { useSVGImport } from '@/store'

export function FileUploader() {
    const importSVG = useSVGImport()

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.addEventListener(
            'load',
            () => reader.result && importSVG(reader.result.toString()),
        )
        reader.readAsText(file)
    }

    return (
        <label>
            <input type="file" accept=".svg" onChange={(e) => handleFile(e)} />
        </label>
    )
}
