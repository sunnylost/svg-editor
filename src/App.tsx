import { Canvas, ElementPanel, FileUploader } from './components'
import { svgStore } from '@/store'

function App() {
    const { SVGElement } = svgStore()

    return (
        <div className="h-full flex flex-col items-center">
            <div className="w-1/2 h-1/2 flex items-center justify-center">
                {SVGElement ? <Canvas></Canvas> : <FileUploader />}
            </div>
            <ElementPanel />
        </div>
    )
}

export default App
