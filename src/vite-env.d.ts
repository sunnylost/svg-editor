/// <reference types="vite/client" />

import 'react'

declare module 'react' {
    interface CSSProperties {
        '--indent': string
    }
}
