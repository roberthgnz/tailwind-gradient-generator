import { GradientOutputButton } from './gradient-output-button'
import { GradientOutputClass } from './gradient-output-class'

interface GradientOutputProps {
    value: string
}

export const GradientOutput = ({ value }: GradientOutputProps) => {
    return (
        <GradientOutputButton>
            <GradientOutputClass value={value} />
        </GradientOutputButton>
    )
}
