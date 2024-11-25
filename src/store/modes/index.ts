import { useDraw } from './draw'
import { useMove } from './move'

export const MODE = {
    move: 1,
    select: 2,
    draw: 3,
} as const

export type ModeType = typeof MODE
export type Mode = ModeType[keyof ModeType]

export const modes = {
    [MODE.move]: useMove,
    [MODE.draw]: useDraw,
}
