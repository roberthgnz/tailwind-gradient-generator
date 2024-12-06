interface GradientOutputButtonProps {
    children: React.ReactNode
}

export const GradientOutputButton = ({ children }: GradientOutputButtonProps) => {
    return (
        <button
            type="button"
            title="Click to copy to clipboard"
            className="w-full bg-background hover:bg-accent hover:text-accent-foreground font-mono leading-6 text-center text-xs py-2.5 px-4 border border-input rounded-md inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
            {children}
        </button>
    )
}
