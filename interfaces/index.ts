export interface Dessert {
    filename: string
    label: string
    stats: {
        popularity: number
        price: number
        easyToCook: number
        calories: number
        sweetness: number
    }
}

export type Cart = [Dessert, number][]