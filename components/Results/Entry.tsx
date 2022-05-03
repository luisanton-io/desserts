import { useState } from "react"
import { Container, Row, Image, Col, Form } from "react-bootstrap"
import { useRecoilState, useSetRecoilState } from "recoil"
import cartAtom from "../../atoms/cart"
import dessertDetailAtom from "../../atoms/detail"
import hoverAtom from "../../atoms/hover"
import queryAtom from "../../atoms/query"
import { Dessert } from "../../interfaces"


export default function ResultEntry({ dessert }: { dessert: Dessert }) {

    const [hover, setHover] = useRecoilState(hoverAtom)
    const [cartState, setCartState] = useRecoilState(cartAtom)
    const [dessertDetail, setDessertDetail] = useRecoilState(dessertDetailAtom)

    const [quantity, setQuantity] = useState(0)

    const setQuery = useSetRecoilState(queryAtom)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (quantity <= 0) return

        setCartState(_cartState => {

            const cartState = structuredClone(_cartState)
            const index = cartState.cart.findIndex(entry => entry[0].filename === dessert.filename)

            index === -1
                ? cartState.cart.push([dessert, quantity])
                : cartState.cart[index][1] += quantity

            return cartState
        })

        setQuery("")
        setHover(null)

    }

    const handleDisplayDessert = (dessert: Dessert) => {
        setDessertDetail(dessert)
    }

    return <Container className="dessert-result rounded-0 mb-3 py-3 text-white"
        onMouseOut={() => setHover(null)}
        onMouseOver={() => setHover(dessert)}
    >
        <Row>
            <Col xs={4} className="d-sm-none" onClick={() => handleDisplayDessert(dessert)}>
                <Image fluid src={`/assets/${dessert.filename}.png`} />
            </Col>
            <Col xs={8} sm={12} className="d-flex align-items-center">
                <Row>
                    <Col xs={12} sm={7} className="d-flex align-items-center">
                        <h6>{dessert.label}</h6>
                    </Col>
                    <Col xs={12} sm={5} className="mt-3 mt-sm-0">
                        <Form onSubmit={handleSubmit} className="d-flex">
                            <Form.Control type="number" min={0} className="text-center rounded-0 bg-transparent text-white" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
                            <Form.Control disabled={!quantity} type="submit" className="btn-tint ms-2 rounded-0" value="Add" />
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}