import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Save, Download, RefreshCcw, Link2, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { GradientOutput } from './gradient-output'
import { getGradientClass } from '@/lib/gradient'
import type { Gradient, GradientColor, GradientStop } from '@/types'

import colors from 'tailwindcss/colors'
import { useDispatch } from 'react-redux'
import { toggleGradient } from '@/store/main-slice'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { encode } from 'js-base64'

import { toPng } from 'html-to-image'
import { useCallback, useRef } from 'react'

interface GradientPreviewProps {
    gradient: Gradient
    direction: string
    onDirectionChange: (direction: string) => void
    onRandomGradient: () => void
}

const getTextColor = (color: GradientColor) => {
    return (colors as any)[color.color][color.shade]
}

export function GradientPreview({ gradient, direction, onDirectionChange, onRandomGradient }: GradientPreviewProps) {
    const { toast } = useToast()

    const dispatch = useDispatch()

    const gradientClass = getGradientClass(gradient, direction)

    const gradientRef = useRef<HTMLDivElement>(null)

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

    const onExport = useCallback(() => {
        if (gradientRef.current === null) {
            return
        }
        const link = document.createElement('a')
        toPng(gradientRef.current, { cacheBust: true })
            .then((dataUrl) => {
                link.download = 'gradient.png'
                link.href = dataUrl
                link.click()
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                link.remove()
            })
    }, [gradientRef])

    return (
        <div className="flex h-full mx-auto max-w-full aspect-video flex-col justify-center overflow-hidden">
            <div className="p-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-[90%] space-y-4 sm:rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {Object.keys(gradient).map((key) => (
                            <Button
                                key={key}
                                variant={'ghost'}
                                size="icon"
                                className="group"
                                disabled={key === 'start'}
                                style={{
                                    backgroundColor: getTextColor(gradient[key as GradientStop]),
                                }}
                                onClick={() => dispatch(toggleGradient({ stop: key as GradientStop }))}
                            >
                                {key !== 'start' && (
                                    <EyeOff
                                        className={cn(
                                            'opacity-0 group-hover:opacity-100 size-4 text-[#ffffff95] transition-all',
                                            !gradient[key as GradientStop].active && 'opacity-100',
                                        )}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <TooltipProvider delayDuration={150}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onShare}>
                                        <Link2 className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy URL</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onExport}>
                                        <Download className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Download as image</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onSave}>
                                        <Save className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Save gradient</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div ref={gradientRef} className="relative z-10 overflow-hidden h-[50dvh] rounded-md">
                    <div className={`absolute inset-0 size-full ${gradientClass}`} />
                    <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-tl')}
                        >
                            <ArrowUp className="rotate-[-45deg]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-center bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-t')}
                        >
                            <ArrowUp />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-end bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-tr')}
                        >
                            <ArrowUp className="rotate-45" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full self-center bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-l')}
                        >
                            <ArrowLeft />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-center self-center bg-white/10 hover:bg-white/20"
                            onClick={() => onRandomGradient()}
                        >
                            <RefreshCcw />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-end self-center bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-r')}
                        >
                            <ArrowRight />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full self-end bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-bl')}
                        >
                            <ArrowDown className="rotate-45" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-center self-end bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-b')}
                        >
                            <ArrowDown />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full justify-self-end self-end bg-white/10 hover:bg-white/20"
                            onClick={() => onDirectionChange('to-br')}
                        >
                            <ArrowDown className="rotate-[-45deg]" />
                        </Button>
                    </div>
                </div>
                <GradientOutput value={gradientClass} />
            </div>
        </div>
    )
}
