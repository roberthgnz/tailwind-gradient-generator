import { useToast } from '@/hooks/use-toast'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface GradientOutputButtonProps {
    children: React.ReactNode
}

export const GradientOutputButton = ({ children }: GradientOutputButtonProps) => {
    const { toast } = useToast()

    const onClick = () => {
        toast({
            title: 'Gradient copied!',
            description: 'You can now paste the gradient in your CSS file.',
        })
    }

    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        className="w-full bg-background hover:bg-accent hover:text-accent-foreground font-mono leading-6 text-center py-2.5 px-4 border border-input rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        onClick={onClick}
                    >
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to copy to clipboard</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
