export interface GradientColor {
    color: string
    shade: string
    position: string
    active: boolean
}

export interface Gradient {
    start: GradientColor
    middle: GradientColor
    end: GradientColor
}

export type GradientStop = keyof Gradient
