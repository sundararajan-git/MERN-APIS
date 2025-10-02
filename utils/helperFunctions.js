export const sanitaize = (collection, allowedkeys) => {
    const safeCollection = {}
    allowedkeys.forEach((key) => {
        if (collection[key] !== undefined) {
            safeCollection[key] = collection[key]
        }
    })
    return safeCollection
}