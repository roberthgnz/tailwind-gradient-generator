import { useState, useCallback, useEffect, RefObject } from 'react'

export interface ElementSize {
    width: number
    height: number
    x: number
    y: number
    top: number
    left: number
    bottom: number
    right: number
}

export const useElementSize = ({
    ref,
    referenceRef,
}: {
    ref: RefObject<HTMLElement>
    referenceRef?: RefObject<HTMLElement>
}) => {
    const [size, setSize] = useState<ElementSize>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    })

    const calculateSize = useCallback(() => {
        if (ref.current) {
            const elementRect = ref.current.getBoundingClientRect()
            const referenceRect = referenceRef?.current
                ? referenceRef.current.getBoundingClientRect()
                : { top: 0, left: 0 }

            setSize({
                width: elementRect.width,
                height: elementRect.height,
                x: elementRect.x - referenceRect.left,
                y: elementRect.y - referenceRect.top,
                top: elementRect.top - referenceRect.top,
                left: elementRect.left - referenceRect.left,
                bottom: elementRect.bottom - referenceRect.top,
                right: elementRect.right - referenceRect.left,
            })
        }
    }, [ref, referenceRef])

    useEffect(() => {
        // Initial size measurement
        calculateSize()

        // Add resize observer for efficient size tracking
        const resizeObserver = new ResizeObserver(calculateSize)

        if (ref.current) {
            resizeObserver.observe(ref.current)
        }

        // Add scroll event listener to parent to track positioning
        window.addEventListener('scroll', calculateSize)

        // Cleanup observer and event listener on unmount
        return () => {
            if (ref.current) {
                resizeObserver.unobserve(ref.current)
            }
            resizeObserver.disconnect()
            window.removeEventListener('scroll', calculateSize)
        }
    }, [ref, calculateSize])

    return size
}
