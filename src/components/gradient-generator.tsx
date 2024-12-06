import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const tailwindColors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
]

const colorIntensities = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

const directions = [
    { value: 'to-r', label: 'Left to Right' },
    { value: 'to-l', label: 'Right to Left' },
    { value: 'to-b', label: 'Top to Bottom' },
    { value: 'to-t', label: 'Bottom to Top' },
    { value: 'to-br', label: 'Top Left to Bottom Right' },
    { value: 'to-bl', label: 'Top Right to Bottom Left' },
    { value: 'to-tr', label: 'Bottom Left to Top Right' },
    { value: 'to-tl', label: 'Bottom Right to Top Left' },
]

export default function GradientGenerator() {
    const [startColor, setStartColor] = useState('blue')
    const [startIntensity, setStartIntensity] = useState('500')
    const [startStop, setStartStop] = useState('0%')
    const [endColor, setEndColor] = useState('indigo')
    const [endIntensity, setEndIntensity] = useState('500')
    const [endStop, setEndStop] = useState('100%')
    const [direction, setDirection] = useState('to-r')
    const [useMiddleColor, setUseMiddleColor] = useState(false)
    const [middleColor, setMiddleColor] = useState('purple')
    const [middleIntensity, setMiddleIntensity] = useState('500')
    const [middleStop, setMiddleStop] = useState('50%')

    const generateGradientClass = () => {
        let gradientClass = `bg-gradient-${direction} from-${startColor}-${startIntensity} from-${startStop}`
        if (useMiddleColor) {
            gradientClass += ` via-${middleColor}-${middleIntensity} via-${middleStop}`
        }
        gradientClass += ` to-${endColor}-${endIntensity} to-${endStop}`
        return gradientClass
    }

    const gradientClass = generateGradientClass()

    return (
        <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center mb-6">Tailwind CSS Gradient Generator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorSelector
                    label="Start Color"
                    color={startColor}
                    setColor={setStartColor}
                    intensity={startIntensity}
                    setIntensity={setStartIntensity}
                    stop={startStop}
                    setStop={setStartStop}
                />

                <ColorSelector
                    label="End Color"
                    color={endColor}
                    setColor={setEndColor}
                    intensity={endIntensity}
                    setIntensity={setEndIntensity}
                    stop={endStop}
                    setStop={setEndStop}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="use-middle-color" checked={useMiddleColor} onCheckedChange={setUseMiddleColor} />
                <Label htmlFor="use-middle-color">Use Middle Color</Label>
            </div>

            {useMiddleColor && (
                <ColorSelector
                    label="Middle Color"
                    color={middleColor}
                    setColor={setMiddleColor}
                    intensity={middleIntensity}
                    setIntensity={setMiddleIntensity}
                    stop={middleStop}
                    setStop={setMiddleStop}
                />
            )}

            <div>
                <Label htmlFor="direction">Direction</Label>
                <Select onValueChange={setDirection} value={direction}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                        {directions.map((dir) => (
                            <SelectItem key={dir.value} value={dir.value}>
                                {dir.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Preview</Label>
                <div className={`h-32 rounded-md ${gradientClass}`}></div>
            </div>

            <div>
                <Label>Generated Tailwind CSS Class</Label>
                <div className="flex mt-1">
                    <div className="flex-grow p-2 bg-muted rounded-l-md font-mono text-sm overflow-x-auto whitespace-nowrap">
                        {gradientClass}
                    </div>
                    <Button onClick={() => navigator.clipboard.writeText(gradientClass)} className="rounded-l-none">
                        Copy
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface ColorSelectorProps {
    label: string
    color: string
    setColor: (color: string) => void
    intensity: string
    setIntensity: (intensity: string) => void
    stop: string
    setStop: (stop: string) => void
}

function ColorSelector({ label, color, setColor, intensity, setIntensity, stop, setStop }: ColorSelectorProps) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select onValueChange={setColor} value={color}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                    {tailwindColors.map((c) => (
                        <SelectItem key={c} value={c}>
                            {c}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={setIntensity} value={intensity}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                    {colorIntensities.map((i) => (
                        <SelectItem key={i} value={i}>
                            {i}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
                <Label htmlFor={`${label}-stop`}>Stop</Label>
                <Input
                    id={`${label}-stop`}
                    type="text"
                    value={stop}
                    onChange={(e) => setStop(e.target.value)}
                    className="w-20"
                />
            </div>
        </div>
    )
}
