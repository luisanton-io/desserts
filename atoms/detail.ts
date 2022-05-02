import { atom } from "recoil";
import { Dessert } from "../interfaces";

const dessertDetailAtom = atom<Dessert | null>({
    default: null,
    key: "dessertDetail"
})

export default dessertDetailAtom