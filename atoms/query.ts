import { atom } from "recoil";

const queryAtom = atom({
    default: "",
    key: "query"
})

export default queryAtom