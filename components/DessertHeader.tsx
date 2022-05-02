import { Badge, Button, Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import cartAtom from "../atoms/cart";
import { CartOutline } from 'react-ionicons'

export default function DessertHeader() {

    const [cartState, setCartState] = useRecoilState(cartAtom)

    const displayCart = () => {
        setCartState(cartState => {
            return {
                ...cartState,
                show: true
            }
        })
    }

    const items = cartState.cart.reduce((a, c) => a + c[1], 0)

    return <Container id="dessert-header" className="px-4">
        <h1 className="ms-0 ms-sm-auto me-auto me-sm-3">desserts.</h1>


        <Badge pill bg="dark"
            style={{ opacity: 0.7 }}
            className="d-sm-none d-flex align-self-center align-items-center px-3 py-2"
            onClick={displayCart}
        >
            <CartOutline color="#fff" />

            <span className="ms-2">{items}</span>
        </Badge>

    </Container>;
}