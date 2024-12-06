import type { Gradient, GradientStop } from '@/types'

const DIRECTION_MAP: Record<string, string> = {
    start: 'from',
    middle: 'via',
    end: 'to',
}

export const getGradientClass = (gradient: Gradient, direction: string) => {
    let base = `bg-gradient-${direction}`

    for (const key in gradient) {
        const element = gradient[key as GradientStop]
        if (!element.active) continue
        base += ` ${DIRECTION_MAP[key]}-${element.color}-${element.shade} ${DIRECTION_MAP[key]}-${element.position}`
    }

    return base
}
