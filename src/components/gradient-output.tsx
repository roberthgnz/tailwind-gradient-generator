import { useToast } from '@/hooks/use-toast'
import { GradientOutputButton } from './gradient-output-button'
import { GradientOutputClass } from './gradient-output-class'

interface GradientOutputProps {
    value: string
}

export const GradientOutput = ({ value }: GradientOutputProps) => {
    const { toast } = useToast()

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(value)
        toast({
            title: 'Gradient copied!',
            description: 'You can now paste the gradient in your CSS file.',
        })
    }

    return (
        <GradientOutputButton onClick={() => copyToClipboard()}>
            <GradientOutputClass value={value} />
        </GradientOutputButton>
    )
}
