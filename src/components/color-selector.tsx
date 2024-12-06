import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ColorGrid } from './color-grid'

interface ColorSelectorProps {
    label: string
    selectedColor: string
    onColorSelect: (color: string) => void
    shade: string
    onShadeSelect: (shade: string) => void
    stopPosition: string
    onStopPositionSelect: (position: string) => void
}

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const positions = ['0%', '25%', '50%', '75%', '100%']

export function ColorSelector({
    label,
    selectedColor,
    onColorSelect,
    shade,
    onShadeSelect,
    stopPosition,
    onStopPositionSelect,
}: ColorSelectorProps) {
    return (
        <div className="p-6 bg-card rounded-lg border shadow-sm">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium capitalize">{label}</h3>
                        <p className="text-sm text-muted-foreground">
                            {selectedColor.toUpperCase()} · SHADE: {shade}
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-black" />
                        <div className="w-6 h-6 rounded bg-white border" />
                    </div>
                </div>

                <ColorGrid selectedColor={selectedColor} onColorSelect={onColorSelect} />

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Label className="text-xs">Shade</Label>
                        <div className="flex gap-1 mt-1.5">
                            {shades.map((s) => (
                                <button
                                    key={s}
                                    className={`w-6 h-6 rounded transition-all bg-${selectedColor}-${s} hover:ring-2 hover:ring-${selectedColor}-${s}/50 focus:outline-none focus:ring-2 focus:ring-${selectedColor}-${s} ${
                                        shade === s
                                            ? `ring-2 ring-offset-2 ring-offset-background ring-${selectedColor}-${s}`
                                            : ''
                                    }`}
                                    onClick={() => onShadeSelect(s)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs">Stop Position (Optional)</Label>
                        <Select value={stopPosition} onValueChange={onStopPositionSelect}>
                            <SelectTrigger className="w-[120px] mt-1.5">
                                <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((position) => (
                                    <SelectItem key={position} value={position}>
                                        {position}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}
