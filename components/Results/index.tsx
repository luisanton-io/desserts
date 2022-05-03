import { useContext } from "react"
import { useRecoilValue } from "recoil"
import queryAtom from "../../atoms/query"
import DessertCtx from "../../context/dessertCtx"
import { queryMatch } from "../../utils/queryMatch"
import ResultEntry from "./Entry"

export default function DessertResults() {
    const query = useRecoilValue(queryAtom)
    const desserts = useContext(DessertCtx)

    return <>
        {
            query.length > 1 &&
            desserts
                .filter(dessert => queryMatch(dessert.label, query))
                .map(dessert => <ResultEntry key={dessert.filename} dessert={dessert} />)
        }
    </>
}