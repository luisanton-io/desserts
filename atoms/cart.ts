import { atom } from "recoil";
import { Cart } from "../interfaces";

interface CartState {
    cart: Cart
    show: boolean
}

const cartAtom = atom<CartState>({
    default: {
        cart: [],
        show: false
    },
    key: "cart"
})

export default cartAtom