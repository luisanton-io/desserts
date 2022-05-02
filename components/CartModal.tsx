import { Container, Modal, Row } from "react-bootstrap"
import { useRecoilState } from "recoil"
import cartAtom from "../atoms/cart"
import CartContent from "./CartContent"

export default function CartModal() {
    const [{ show }, setCartState] = useRecoilState(cartAtom)

    const handleHide = () => {
        setCartState(cartState => ({
            ...cartState,
            show: false,
        }))
    }

    return <>
        <Modal show={show} onHide={handleHide} className="d-sm-none">
            <Container id="mobile-cart">
                <CartContent />
            </Container>
        </Modal>
        <Container id="desktop-cart" className="d-none d-sm-flex">
            <CartContent />
        </Container>

    </>
}