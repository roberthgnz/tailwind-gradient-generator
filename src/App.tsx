import { useEffect, useRef, useState } from 'react'
import { ColorSelector } from '@/components/color-selector'
import { GradientPreview } from '@/components/gradient-preview'
import { Github, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useResizeObserver } from 'usehooks-ts'
import { DIRECTIONS, SHADES, TAILWIND_COLORS } from './contants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDispatch, useSelector } from 'react-redux'
import { updateGradient, updateGradientBy } from './store/main-slice'
import { encode, decode } from 'js-base64'

const getRandomItem = (array: readonly any[]) => array[Math.floor(Math.random() * array.length)]

export default function App() {
    const { toast } = useToast()
    const { theme, setTheme } = useTheme()

    const headerRef = useRef<HTMLDivElement>(null)
    const headerSizes = useResizeObserver({ ref: headerRef, box: 'border-box' })

    const footerRef = useRef<HTMLDivElement>(null)
    const footerSizes = useResizeObserver({ ref: footerRef, box: 'border-box' })

    const dispatch = useDispatch()
    const gradient = useSelector((state) => state.main.gradient)

    const [direction, setDirection] = useState('to-r')

    const onRandomGradient = () => {
        const randomColor = () => getRandomItem(TAILWIND_COLORS)
        const randomShade = () => getRandomItem(SHADES)

        const randomGradient = {
            start: { color: randomColor(), shade: randomShade(), position: '0%', active: true },
            middle: { color: randomColor(), shade: randomShade(), position: '50%', active: true },
            end: { color: randomColor(), shade: randomShade(), position: '100%', active: true },
        }

        dispatch(updateGradient(randomGradient))

        setDirection(getRandomItem(DIRECTIONS))
    }

    const onShare = () => {
        const shareUrl = `${window.location.origin}/?gradient=${encode(JSON.stringify(gradient))}`

        navigator.clipboard.writeText(shareUrl).then(() => {
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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const gradientParam = urlParams.get('gradient')

        if (gradientParam) {
            const decodedGradient = JSON.parse(decode(gradientParam))
            dispatch(updateGradient(decodedGradient))
        }
    }, [])

    return (
        <div className="bg-background">
            <header ref={headerRef} className="border-b">
                <div className="container mx-auto flex h-14 items-center justify-between px-4 xl:px-0">
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
                className="container mx-auto px-4 xl:px-0"
                style={{
                    height: `calc(100vh - ${headerSizes?.height || 56.9}px - ${footerSizes?.height || 56.9}px)`,
                }}
            >
                <div className="h-full grid md:grid-cols-2 py-6 sm:py-12">
                    <ScrollArea className="px-4">
                        <div className="h-full overflow-y-auto flex flex-col gap-4 px-4">
                            <ColorSelector
                                stop="start"
                                label="Starting color (from)"
                                selectedColor={gradient.start.color}
                                onColorSelect={(color) =>
                                    dispatch(updateGradientBy({ stop: 'start', property: 'color', value: color }))
                                }
                                shade={gradient.start.shade}
                                onShadeSelect={(shade) =>
                                    dispatch(updateGradientBy({ stop: 'start', property: 'shade', value: shade }))
                                }
                                stopPosition={gradient.start.position}
                                onStopPositionSelect={(position) =>
                                    dispatch(updateGradientBy({ stop: 'start', property: 'position', value: position }))
                                }
                            />
                            <ColorSelector
                                stop="middle"
                                label="Middle color (via)"
                                selectedColor={gradient.middle.color}
                                onColorSelect={(color) =>
                                    dispatch(updateGradientBy({ stop: 'middle', property: 'color', value: color }))
                                }
                                shade={gradient.middle.shade}
                                onShadeSelect={(shade) =>
                                    dispatch(updateGradientBy({ stop: 'middle', property: 'shade', value: shade }))
                                }
                                stopPosition={gradient.middle.position}
                                onStopPositionSelect={(position) =>
                                    dispatch(
                                        updateGradientBy({ stop: 'middle', property: 'position', value: position }),
                                    )
                                }
                            />
                            <ColorSelector
                                stop="end"
                                label="Ending color (to)"
                                selectedColor={gradient.end.color}
                                onColorSelect={(color) =>
                                    dispatch(updateGradientBy({ stop: 'end', property: 'color', value: color }))
                                }
                                shade={gradient.end.shade}
                                onShadeSelect={(shade) =>
                                    dispatch(updateGradientBy({ stop: 'end', property: 'shade', value: shade }))
                                }
                                stopPosition={gradient.end.position}
                                onStopPositionSelect={(position) =>
                                    dispatch(updateGradientBy({ stop: 'end', property: 'position', value: position }))
                                }
                            />
                        </div>
                    </ScrollArea>
                    <GradientPreview
                        gradient={gradient}
                        direction={direction}
                        onDirectionChange={setDirection}
                        onRandomGradient={onRandomGradient}
                        onShare={onShare}
                        onSave={onSave}
                        onExport={onExport}
                    />
                </div>
            </main>

            <footer ref={footerRef} className="border-t py-6 md:py-0">
                <div className="container mx-auto px-4 xl:px-0 flex h-14 items-center justify-between">
                    <div className="text-sm text-muted-foreground">Copyright © 2024 Tailwind Gradient Generator</div>
                    <div className="text-sm text-muted-foreground">Made with ❤️ by Roberth González</div>
                </div>
            </footer>

            <Toaster />
        </div>
    )
}
