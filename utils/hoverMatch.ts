import { useRecoilValue } from "recoil";
import hoverAtom from "../atoms/hover";
import { Dessert } from "../interfaces";

export const hoverMatch = (dessert: Dessert) => {
    const hover = useRecoilValue(hoverAtom)
    return hover?.filename === dessert.filename
}