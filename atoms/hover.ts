import { atom } from "recoil";
import { Dessert } from "../interfaces";

const hoverAtom = atom<Dessert | null>({
    default: null,
    key: "hover"
})

export default hoverAtom