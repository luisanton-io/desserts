import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import queryAtom from "../atoms/query";
import CartModal from "./CartModal";

export default function SearchPanel() {

    const [query, setQuery] = useRecoilState(queryAtom)

    return <Col id="search-panel" xs={12} sm={4} className="order-1 order-sm-0">
        <Form>
            <Form.Control
                type="text"
                className="rounded-0 bg-transparent text-white"
                placeholder="Looking for sweetness..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </Form>
        <CartModal />

    </Col>
}