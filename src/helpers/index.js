export const copyToClipboard = (text, callback = null) => {
    navigator.clipboard.writeText(text)
    if (callback) {
        callback()
    }
}

export const addClassesToLocalStorage = (classes, database) => {
    const generatedClass = database.findOne('gradients', {
        where: {
            class: { $eq: classes },
        },
    })
    if (!generatedClass) {
        database.insert('gradients', { class: classes })
    }
}

export const removeClassesFromLocalStorage = (classes, database, callback = null) => {
    database.delete('gradients', {
        where: {
            class: {
                $in: classes,
            },
        },
    })
    if (callback !== null) callback()
}

export const debounce = (func, wait, immediate) => {
    let timeout
    return function () {
        let context = this,
            args = arguments
        let later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

// Generates a random integer between min(inclusive) & max(inclusive): [min, max]
export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Get the computed background color of an element
export const getNativeCssCode = (element) => {
    return getComputedStyle(element).getPropertyValue('background-image')
}
