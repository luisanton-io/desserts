import { Container, Row } from "react-bootstrap";
import CartModal from "../Cart/Modal";
import DessertIcons from "./Icons";
import DessertModal from "./Modal";
import SearchPanel from "../SearchPanel";

export default function Main() {
    return (<>
        <Container>
            <Row>
                <SearchPanel />
                <DessertIcons />
                <DessertModal />
            </Row>
        </Container>
    </>
    )
}