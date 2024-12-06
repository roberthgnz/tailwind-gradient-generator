export type GradientStop = 'start' | 'middle' | 'end'

export interface GradientColor {
    color: string
    shade: string
    position: string
}

export interface Gradient {
    start: GradientColor
    middle: GradientColor
    end: GradientColor
}
