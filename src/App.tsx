import { useRef, useState } from 'react'
import { ColorSelector } from '@/components/color-selector'
import { GradientPreview } from '@/components/gradient-preview'
import { Github, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useResizeObserver } from 'usehooks-ts'
import { DIRECTIONS, SHADES, TAILWIND_COLORS } from './contants'

type GradientStop = 'start' | 'middle' | 'end'

interface GradientColor {
    color: string
    shade: string
    position: string
}

interface Gradient {
    start: GradientColor
    middle: GradientColor
    end: GradientColor
}

const getRandomItem = (array: readonly any[]) => array[Math.floor(Math.random() * array.length)]

const getGradientClass = (gradient: Gradient, direction: string) => {
    return `bg-gradient-${direction} from-${gradient.start.color}-${gradient.start.shade} from-${gradient.start.position} via-${gradient.middle.color}-${gradient.middle.shade} via-${gradient.middle.position} to-${gradient.end.color}-${gradient.end.shade} to-${gradient.end.position}`
}

export default function App() {
    const { toast } = useToast()
    const { theme, setTheme } = useTheme()

    const headerRef = useRef<HTMLDivElement>(null)
    const headerSizes = useResizeObserver({ ref: headerRef, box: 'border-box' })

    const footerRef = useRef<HTMLDivElement>(null)
    const footerSizes = useResizeObserver({ ref: footerRef, box: 'border-box' })

    const [gradient, setGradient] = useState<Gradient>({
        start: { color: 'green', shade: '400', position: '0%' },
        middle: { color: 'cyan', shade: '900', position: '50%' },
        end: { color: 'blue', shade: '500', position: '100%' },
    })

    const [direction, setDirection] = useState('to-r')

    const gradientClass = getGradientClass(gradient, direction)

    const updateGradient = (key: GradientStop, property: 'color' | 'shade' | 'position', value: string) => {
        setGradient((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [property]: value,
            },
        }))
    }

    const onRandomGradient = () => {
        const randomColor = () => getRandomItem(TAILWIND_COLORS)
        const randomShade = () => getRandomItem(SHADES)

        updateGradient('start', 'color', randomColor())
        updateGradient('start', 'shade', randomShade())

        updateGradient('middle', 'color', randomColor())
        updateGradient('middle', 'shade', randomShade())

        updateGradient('end', 'color', randomColor())
        updateGradient('end', 'shade', randomShade())

        setDirection(getRandomItem(DIRECTIONS))
    }

    const onShare = () => {
        navigator.clipboard.writeText(gradientClass).then(() => {
            toast({
                title: 'Gradient class copied!',
                description: 'The gradient class has been copied to your clipboard.',
            })
        })
    }

    const onSave = () => {
        // Implement save functionality (e.g., to local storage)
        toast({
            title: 'Gradient saved!',
            description: 'The gradient has been saved to your collection.',
        })
    }

    const onExport = () => {
        // Implement export functionality (e.g., as CSS or image)
        toast({
            title: 'Gradient exported!',
            description: 'The gradient has been exported as CSS.',
        })
    }

    return (
        <div className="bg-background">
            <header ref={headerRef} className="border-b">
                <div className="container mx-auto max-w-screen-xl flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-6 h-6 rounded" />
                        <span className="font-semibold">Tailwind Gradient Generator</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            Feedback
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Github className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        >
                            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>
                </div>
            </header>

            <main
                className="container mx-auto max-w-screen-xl"
                style={{
                    height: `calc(100vh - ${headerSizes?.height || 56.9}px - ${footerSizes?.height || 56.9}px)`,
                }}
            >
                <div className="h-full grid md:grid-cols-2 gap-8 py-6 sm:py-12">
                    <div className="h-full overflow-y-auto flex flex-col gap-4">
                        <ColorSelector
                            label="Starting color (from)"
                            selectedColor={gradient.start.color}
                            onColorSelect={(color) => updateGradient('start', 'color', color)}
                            shade={gradient.start.shade}
                            onShadeSelect={(shade) => updateGradient('start', 'shade', shade)}
                            stopPosition={gradient.start.position}
                            onStopPositionSelect={(position) => updateGradient('start', 'position', position)}
                        />
                        <ColorSelector
                            label="Middle color (via)"
                            selectedColor={gradient.middle.color}
                            onColorSelect={(color) => updateGradient('middle', 'color', color)}
                            shade={gradient.middle.shade}
                            onShadeSelect={(shade) => updateGradient('middle', 'shade', shade)}
                            stopPosition={gradient.middle.position}
                            onStopPositionSelect={(position) => updateGradient('middle', 'position', position)}
                        />
                        <ColorSelector
                            label="Ending color (to)"
                            selectedColor={gradient.end.color}
                            onColorSelect={(color) => updateGradient('end', 'color', color)}
                            shade={gradient.end.shade}
                            onShadeSelect={(shade) => updateGradient('end', 'shade', shade)}
                            stopPosition={gradient.end.position}
                            onStopPositionSelect={(position) => updateGradient('end', 'position', position)}
                        />
                    </div>
                    <GradientPreview
                        gradientClass={gradientClass}
                        onDirectionChange={setDirection}
                        onRandomGradient={onRandomGradient}
                        onShare={onShare}
                        onSave={onSave}
                        onExport={onExport}
                    />
                </div>
            </main>

            <footer ref={footerRef} className="border-t py-6 md:py-0">
                <div className="container mx-auto max-w-screen-xl flex h-14 items-center justify-between">
                    <div className="text-sm text-muted-foreground">Copyright © 2024 Tailwind Gradient Generator</div>
                    <div className="text-sm text-muted-foreground">Made with ❤️ by Roberth González</div>
                </div>
            </footer>

            <Toaster />
        </div>
    )
}
