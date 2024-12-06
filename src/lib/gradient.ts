import { Gradient } from '@/types'

export const getGradientClass = (gradient: Gradient, direction: string) => {
    return `bg-gradient-${direction} from-${gradient.start.color}-${gradient.start.shade} from-${gradient.start.position} via-${gradient.middle.color}-${gradient.middle.shade} via-${gradient.middle.position} to-${gradient.end.color}-${gradient.end.shade} to-${gradient.end.position}`
}
