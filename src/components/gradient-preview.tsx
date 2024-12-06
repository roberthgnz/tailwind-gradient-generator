import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Share2, Save, Download, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface GradientPreviewProps {
    gradientClass: string
    onDirectionChange: (direction: string) => void
    onRandomGradient: () => void
    onShare: () => void
    onSave: () => void
    onExport: () => void
}

export function GradientPreview({
    gradientClass,
    onDirectionChange,
    onRandomGradient,
    onShare,
    onSave,
    onExport,
}: GradientPreviewProps) {
    return (
        <div className="flex h-full mx-auto max-w-full aspect-video flex-col justify-center overflow-hidden">
            <div className="p-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-[90%] sm:rounded-lg">
                <div className={`relative z-10 h-[50dvh] rounded ${gradientClass}`}>
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
                <div className="mt-4 flex flex-col">
                    <code className="text-sm bg-muted px-4 py-2 rounded-md flex-grow mr-2">{gradientClass}</code>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onShare}>
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Share gradient</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onSave} className="ml-2">
                                        <Save className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Save gradient</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={onExport} className="ml-2">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Export gradient</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
