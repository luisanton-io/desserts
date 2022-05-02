import { atom } from "recoil";
import { Cart } from "../interfaces";

const cartState = atom<Cart>({
    default: [],
    key: "cart"
})

export default cartState