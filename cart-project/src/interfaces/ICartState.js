export interface ICartState {
    products: {
        name: string,
        quantity: number,
        price: number
    },
    total: number,
    titles: {
        name: string,
        valuesType: string,
        parameterToSort: string
    },
    currentTitleToSort: null|string,
    currentDirection: string
}