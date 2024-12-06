import { cn } from '@/lib/utils'

interface ColorGridProps {
    selectedColor: string
    onColorSelect: (color: string) => void
}

const colorGrid = [
    // Grays
    ['slate', 'gray', 'zinc', 'neutral', 'stone'],
    // Colors Row 1
    ['red', 'orange', 'amber', 'yellow', 'lime'],
    // Colors Row 2
    ['green', 'emerald', 'teal', 'cyan', 'sky'],
    // Colors Row 3
    ['blue', 'indigo', 'violet', 'purple', 'fuchsia'],
    // Pink/Rose
    ['pink', 'rose'],
]

export function ColorGrid({ selectedColor, onColorSelect }: ColorGridProps) {
    return (
        <div className="flex flex-col gap-1">
            {colorGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {row.map((color) => (
                        <button
                            key={color}
                            className={cn(
                                'w-6 h-6 rounded transition-all',
                                `bg-${color}-500 hover:ring-2 hover:ring-${color}-500/50 focus:outline-none focus:ring-2 focus:ring-${color}-500`,
                                selectedColor === color && 'ring-2 ring-offset-2 ring-offset-background',
                            )}
                            onClick={() => onColorSelect(color)}
                            title={color}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
