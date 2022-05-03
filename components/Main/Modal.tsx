import { Button, Modal } from "react-bootstrap";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, Tooltip } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { useRecoilState, useSetRecoilState } from "recoil";
import cartAtom from "../../atoms/cart";
import dessertDetailAtom from "../../atoms/detail";
import queryAtom from "../../atoms/query";
import { maxStats } from "../../constants/maxStats";

function CustomTooltip({ active, payload }: { active: boolean, payload: Payload<number, string>[] }) {

    if (active && payload) {
        return <div className="dessert-tooltip">
            <span className="d-block">{payload[0].payload.originalValue} out of {payload[0].payload.fullMark}</span>
        </div>
    } else return null
}

export default function DessertModal() {
    const [dessertDetail, setDessertDetail] = useRecoilState(dessertDetailAtom)
    const [cartState, setCartState] = useRecoilState(cartAtom)
    const setQuery = useSetRecoilState(queryAtom)

    const cartIndex = cartState.cart.findIndex(([dessert]) => dessert.filename === dessertDetail?.filename)
    const quantity = cartIndex !== -1 ? cartState.cart[cartIndex][1] : 0

    const { label, stats } = dessertDetail ?? {}

    const data = stats && Object.entries(stats).map(([stat, _value]) => {
        const fullMark = maxStats[stat as keyof typeof stats]
        const normalized = Math.round(100 * _value / fullMark)

        return ({
            stat, value: normalized, originalValue: _value, fullMark, domain: [0, 100]
        })
    })

    const handleHide = () => {
        setQuery("")
        setDessertDetail(null)
    }

    const handleIncrement = () => {
        setCartState(_cartState => {
            const cartState = structuredClone(_cartState)

            cartIndex !== -1
                ? cartState.cart[cartIndex][1]++
                : cartState.cart.push([dessertDetail!, 1])

            return cartState
        })
    }

    const handleDecrement = () => {
        setCartState(_cartState => {
            const cartState = structuredClone(_cartState)

            cartIndex !== -1
                && !--cartState.cart[cartIndex][1]
                && cartState.cart.splice(cartIndex, 1)

            return cartState
        })
    }

    return <Modal show={!!dessertDetail} onHide={handleHide}>
        <Modal.Body className="p-4 p-sm-5 rounded-0">
            <h1 className="tint-color mb-0 text-center">{label}</h1>
            {
                data &&
                <div className="d-flex flex-column align-items-center" >
                    <div className="d-flex justify-content-center" style={{
                        width: 'calc(100% + 6rem)'
                    }}>
                        <ResponsiveContainer width={"100%"} height={250} >
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="stat" />
                                <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
                                <Radar name="dessert" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} >
                                </Radar>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="px-4">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, sint temporibus? Veniam ea cumque voluptatem perferendis dolores, maxime exercitationem est cum fugit nemo eligendi? Consequatur aliquid veniam velit a dolor!</p>
                    </div>

                    <div className="d-flex justify-content-around w-50 mx-auto">
                        <Button variant="outline-dark" className="rounded-0" onClick={handleDecrement} disabled={cartIndex === -1 || (quantity <= 0)}>-</Button>
                        <Button variant="outline-dark" className="rounded-0 px-4" disabled>{quantity}</Button>
                        <Button variant="outline-dark" className="rounded-0" onClick={handleIncrement}>+</Button>
                    </div>

                    <Button className="btn-tint rounded-0 px-4 my-3" onClick={handleHide}>Done</Button>
                </div>

            }       </Modal.Body>

    </Modal>;
}