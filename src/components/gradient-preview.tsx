import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    RotateCcw,
    Share2,
    Shuffle,
    Save,
    Download,
    AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface GradientPreviewProps {
    gradientClass: string
    onDirectionChange: (direction: string) => void
    onRandomGradient: () => void
    onShare: () => void
    onSave: () => void
    onExport: () => void
    warningMessage?: string
}

export function GradientPreview({
    gradientClass,
    onDirectionChange,
    onRandomGradient,
    onShare,
    onSave,
    onExport,
    warningMessage,
}: GradientPreviewProps) {
    return (
        <div className="relative">
            <div className={`h-64 rounded-lg shadow-lg ${gradientClass}`}>
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
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-t')}
                    >
                        <ArrowUp />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-tr')}
                    >
                        <ArrowUp className="rotate-45" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-l')}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-r')}
                    >
                        <RotateCcw />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-r')}
                    >
                        <ArrowRight />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-bl')}
                    >
                        <ArrowDown className="rotate-45" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-b')}
                    >
                        <ArrowDown />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20"
                        onClick={() => onDirectionChange('to-br')}
                    >
                        <ArrowDown className="rotate-[-45deg]" />
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <code className="text-sm bg-muted px-4 py-2 rounded-md flex-grow mr-2">{gradientClass}</code>
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white/10 hover:bg-white/20 ml-2"
                                onClick={onRandomGradient}
                            >
                                <Shuffle className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Generate random gradient</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {warningMessage && (
                <Alert variant="warning" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>{warningMessage}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}
