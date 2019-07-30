export function getTotal( selection ) {
    return selection.reduce((acc, iter) => {
        return acc + iter.price;
    }, 0);
}