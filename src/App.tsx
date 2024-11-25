import { useSVGElement } from '@/store'
import { Canvas, ElementPanel, FileUploader, Tools } from './components'

function App() {
    const svgElement = useSVGElement()

    console.log('svgElement', svgElement)

    return (
        <div className="h-full flex flex-col items-center">
            <div className="flex items-center h-[70%]">
                {svgElement ? (
                    <Tools className="fixed left-0 top-0 w-20 z-10" />
                ) : null}
                <div className="w-[calc(100vw_-_40px)] h-full flex items-center justify-center">
                    {svgElement ? <Canvas /> : <FileUploader />}
                </div>
            </div>
            <ElementPanel className="h-[30%]" />
        </div>
    )
}

export default App
