import { useContext, useId } from "react"
import { Col, Container, Row, Image } from "react-bootstrap"
import DessertCtx from "../context/dessertCtx"
import { Dessert } from "../interfaces"

export default function DessertIcons() {

    const desserts = useContext(DessertCtx)

    return <Container>
        <Row>
            {desserts.map((dessert, i) => {
                const uri = `/assets/${dessert.filename}.png`
                return <Col xs={4} sm={3} key={`dessert-${i}`}>
                    <Image className="p-3" fluid src={uri} />
                </Col>
            })}
        </Row>
    </Container>
}