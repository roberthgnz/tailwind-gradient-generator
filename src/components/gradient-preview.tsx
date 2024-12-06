import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Share2, Save, Download, RefreshCcw, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { GradientOutput } from './gradient-output'
import { getGradientClass } from '@/lib/gradient'
import type { Gradient, GradientColor } from '@/types'

import colors from 'tailwindcss/colors'

interface GradientPreviewProps {
    gradient: Gradient
    direction: string
    onDirectionChange: (direction: string) => void
    onRandomGradient: () => void
    onShare: () => void
    onSave: () => void
    onExport: () => void
}

const getTextColor = (color: GradientColor) => {
    return (colors as any)[color.color][color.shade]
}

export function GradientPreview({
    gradient,
    direction,
    onDirectionChange,
    onRandomGradient,
    onShare,
    onSave,
    onExport,
}: GradientPreviewProps) {
    const gradientClass = getGradientClass(gradient, direction)

    return (
        <div className="flex h-full mx-auto max-w-full aspect-video flex-col justify-center overflow-hidden">
            <div className="p-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-[90%] space-y-4 sm:rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {Object.keys(gradient).map((key) => (
                            <div
                                key={key}
                                className="size-9 border rounded-md"
                                style={{
                                    backgroundColor: getTextColor(gradient[key as keyof Gradient]),
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <TooltipProvider>
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
                        </TooltipProvider>
                        <TooltipProvider>
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
                        </TooltipProvider>
                        <TooltipProvider>
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
                <div className={`relative z-10 h-[50dvh] rounded-md ${gradientClass}`}>
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
