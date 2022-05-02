import { useContext } from "react"
import { Col, Image, Row } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"
import dessertDetailAtom from "../atoms/detail"
import queryAtom from "../atoms/query"
import DessertCtx from "../context/dessertCtx"
import { Dessert } from "../interfaces"
import DessertHeader from "./DessertHeader"

export default function DessertIcons() {

    const desserts = useContext(DessertCtx)

    const query = useRecoilValue(queryAtom)

    const queryMatch = (label: string) => label.toLocaleLowerCase().includes(query.toLocaleLowerCase())

    const [dessertDetail, setDessertDetail] = useRecoilState(dessertDetailAtom)

    const handleDisplayDessert = (dessert: Dessert) => {
        setDessertDetail(dessert)
    }

    return <Col xs={12} sm={8} id="dessert-icons">
        <DessertHeader />
        <Row>
            {desserts.map((dessert, i) => {
                const uri = `/assets/${dessert.filename}.png`
                const match = queryMatch(dessert.label)

                // console.table({
                //     label: dessert.label, match: queryMatch(dessert.label),
                // })
                return <Col xs={4} sm={3}
                    onClick={() => match && handleDisplayDessert(dessert)}
                    key={`dessert-${i}`}
                >
                    <Image className={`p-3 ${!match ? "filtered" : ""}`} fluid src={uri} />
                    <span style={{ fontSize: '0.7em' }} className={`d-block text-center ${match ? "text-white" : "invisible"}`}>{dessert.label}</span>
                </Col>
            })}
        </Row>
    </Col>
}