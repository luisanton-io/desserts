import { Button } from "react-bootstrap"
import { useRecoilState, useSetRecoilState } from "recoil"
import cartAtom from "../../atoms/cart"
import queryAtom from "../../atoms/query"
import { Dessert } from "../../interfaces"

export default function Content() {

    const [cartState, setCartState] = useRecoilState(cartAtom)
    const setQuery = useSetRecoilState(queryAtom)

    const handleDelete = (dessert: Dessert) => {
        setCartState(cartState => {
            const cart = cartState.cart.filter(c => c[0] !== dessert)
            return {
                ...cartState,
                cart,
            }
        })
    }

    const handleHide = () => {
        setQuery("")
        setCartState(cartState => ({
            ...cartState,
            show: false,
        }))
    }

    const items = cartState.cart.reduce((a, c) => a + c[1], 0)

    return (<div className="outer d-flex flex-column py-4 px-3 w-100">
        <h4>Cart {!!items && <span>[{items}]</span>}</h4>
        <hr className="mx-0" />
        <div className="content-wrapper" style={{ overflow: "auto" }}>
            {!cartState.cart.length &&
                <span className="d-inline-block mb-4">No desserts in cart yet...</span>
            }
            {
                cartState.cart.map(([dessert, quantity]) => {
                    return <div className="d-flex align-items-center mb-3" key={`cart-${dessert.filename}`}>
                        <span className="text-center" style={{ minWidth: "4ch" }}>{quantity}</span>
                        <span> {dessert.label}</span>

                        <Button className="ms-auto rounded-0" variant="outline-danger" onClick={() => handleDelete(dessert)}>
                            -
                        </Button>
                    </div>
                })
            }
        </div>

        <Button className="btn-tint d-sm-none" onClick={handleHide}>Done</Button>
    </div >)
}