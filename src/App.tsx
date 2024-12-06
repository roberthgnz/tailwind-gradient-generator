import { useEffect, useRef, useState } from 'react'
import { ColorSelector } from '@/components/color-selector'
import { GradientPreview } from '@/components/gradient-preview'
import { Bug, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useResizeObserver } from 'usehooks-ts'
import { DIRECTIONS, SHADES, TAILWIND_COLORS } from './contants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDispatch, useSelector } from 'react-redux'
import { updateGradient, updateGradientBy } from './store/main-slice'
import { decode } from 'js-base64'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const getRandomItem = (array: readonly any[]) => array[Math.floor(Math.random() * array.length)]

export default function App() {
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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const gradientParam = urlParams.get('gradient')

        if (gradientParam) {
            const decodedGradient = JSON.parse(decode(gradientParam))
            dispatch(updateGradient(decodedGradient))
        }
    }, [])

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="bg-background">
                <header ref={headerRef} className="border-b">
                    <div className="container mx-auto flex h-14 items-center justify-between px-4 xl:px-0">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-6 h-6 rounded" />
                            <span className="font-semibold">Tailwind Gradient Generator</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" asChild>
                                <a
                                    href="https://tailwind-gradient-generator.canny.io/feature-requests"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Lightbulb className="h-5 w-5" />
                                    Feature request
                                </a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a
                                    href="https://github.com/roberthgnz/tailwind-gradient-generator/issues/new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Bug className="h-5 w-5" />
                                    Report bug
                                </a>
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                <main
                    className="container mx-auto px-4 xl:px-0"
                    style={{
                        height: `calc(100vh - ${headerSizes?.height || 56.9}px - ${footerSizes?.height || 56.9}px)`,
                    }}
                >
                    <div className="h-full grid md:grid-cols-2 py-6">
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
                                        dispatch(
                                            updateGradientBy({ stop: 'start', property: 'position', value: position }),
                                        )
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
                                        dispatch(
                                            updateGradientBy({ stop: 'end', property: 'position', value: position }),
                                        )
                                    }
                                />
                            </div>
                        </ScrollArea>
                        <GradientPreview
                            gradient={gradient}
                            direction={direction}
                            onDirectionChange={setDirection}
                            onRandomGradient={onRandomGradient}
                        />
                    </div>
                </main>

                <footer ref={footerRef} className="border-t py-6 md:py-0">
                    <div className="container mx-auto px-4 xl:px-0 flex h-14 items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Copyright © 2024 Tailwind Gradient Generator
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Made with ❤️ by{' '}
                            <a href="https://x.com/roberthgnz" target="_blank">
                                Roberth González
                            </a>
                        </div>
                    </div>
                </footer>

                <Toaster />
            </div>
        </ThemeProvider>
    )
}
