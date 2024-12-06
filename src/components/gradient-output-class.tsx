import { useMemo, useState } from 'react'

interface GradientOutputClassProps {
    value: string
}

export const GradientOutputClass = ({ value }: GradientOutputClassProps) => {
    const transformValue = (currentValue: string, previousValue?: string): string => {
        if (!currentValue) {
            return currentValue
        }

        if (!previousValue) {
            return currentValue
        }

        const oldValueArr = previousValue.replace(/<[^>]*>/g, '').split(' ')
        const newValueArr = currentValue.split(' ')

        const diff: string[] = []
        for (let i = 0; i < oldValueArr.length; i++) {
            if (oldValueArr[i] !== newValueArr[i]) {
                diff.push(newValueArr[i])
            }
        }

        if (diff.length !== 1) {
            return currentValue
        }

        const reg = new RegExp(`(${diff[0]})`, 'gi')
        return currentValue.replace(reg, '<code class="text-sm font-bold text-accent-foreground">$&</code>')
    }

    const [parsedValue, setParsedValue] = useState(() => transformValue(value))

    const processedValue = useMemo(() => {
        const cleanCurrentValue = parsedValue.replace(/<[^>]*>/g, '')
        const cleanValue = value.replace(/<[^>]*>/g, '')

        if (cleanCurrentValue !== cleanValue) {
            const newParsedValue = transformValue(value, parsedValue)
            return newParsedValue
        }

        return parsedValue
    }, [value, parsedValue])

    if (processedValue !== parsedValue) {
        setParsedValue(processedValue)
    }

    return (
        <span
            className="hidden md:block font-semibold text-xs text-center transition-all"
            dangerouslySetInnerHTML={{ __html: processedValue }}
        />
    )
}
