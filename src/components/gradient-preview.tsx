import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Save,
    Download,
    RefreshCcw,
    Link2,
    EyeOff,
    Image,
    ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { GradientOutput } from './gradient-output'
import { getGradientClass } from '@/lib/gradient'
import type { Gradient, GradientColor, GradientStop } from '@/types'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import colors from 'tailwindcss/colors'
import { useDispatch } from 'react-redux'
import { toggleGradient } from '@/store/main-slice'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { encode } from 'js-base64'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { toPng, toJpeg, toSvg } from 'html-to-image'
import { useRef, useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { ASPECT_RATIOS } from '@/contants'

interface GradientPreviewProps {
    gradient: Gradient
    direction: string
    onDirectionChange: (direction: string) => void
    onRandomGradient: () => void
}

const getGradientColor = (color: GradientColor) => {
    return (colors as any)[color.color][color.shade]
}

const getAspectRation = (aspect: string) => {
    const [width, height] = aspect.split(':').map(Number)
    return width / height
}

export function GradientPreview({ gradient, direction, onDirectionChange, onRandomGradient }: GradientPreviewProps) {
    const { toast } = useToast()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedAspect, setSelectedAspect] = useState('1:1')

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

    const onExport = (format: 'png' | 'jpeg' | 'svg') => {
        if (gradientRef.current === null) {
            return
        }

        const fnEpect = {
            png: toPng,
            jpeg: toJpeg,
            svg: toSvg,
        }

        const download = fnEpect[format]

        const link = document.createElement('a')

        download(gradientRef.current, { cacheBust: true })
            .then((dataUrl) => {
                link.download = 'gradient.' + format
                link.href = dataUrl
                link.click()
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                link.remove()
            })
    }

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
                                    backgroundColor: getGradientColor(gradient[key as GradientStop]),
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
                                    <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
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
                <div className="relative z-10 overflow-hidden h-[50dvh] rounded-md">
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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Download as image</DialogTitle>
                        <DialogDescription>
                            Select the aspect ratio for the image and download it in PNG, JPEG or SVG format.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative aspect-square">
                        <div
                            ref={gradientRef}
                            className={`absolute inset-0 max-w-full max-h-full ${gradientClass}`}
                            style={{
                                aspectRatio: getAspectRation(selectedAspect),
                            }}
                        />
                        <div className="absolute overflow-hidden top-4 left-4 flex flex-col rounded-md bg-white/20 shadow">
                            {ASPECT_RATIOS.map((aspect) => (
                                <button
                                    key={aspect}
                                    type="button"
                                    className={cn(
                                        'cursor-pointer p-4 hover:bg-white/40 transition-all',
                                        selectedAspect === aspect && 'bg-white/40',
                                    )}
                                    onClick={() => setSelectedAspect(aspect)}
                                >
                                    {aspect}
                                </button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Image className="size-4" />
                                    Download
                                    <ChevronDown className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => onExport('png')}>Download as PNG</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => onExport('jpeg')}>Download as JPEG</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => onExport('svg')}>Download as SVG</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
