import { Container, Row } from "react-bootstrap";
import CartModal from "./CartModal";
import DessertIcons from "./DessertIcons";
import DessertModal from "./DessertModal";
import SearchPanel from "./SearchPanel";

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