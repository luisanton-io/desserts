import { Modal } from "react-bootstrap";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useRecoilState } from "recoil";
import dessertDetailAtom from "../atoms/detail";
import { maxStats } from "../constants/maxStats";

export default function DessertModal() {
    const [dessertDetail, setDessertDetail] = useRecoilState(dessertDetailAtom)

    const { label, stats } = dessertDetail ?? {}

    const data = Object.entries(stats ?? []).map(([key, value]) => ({
        "stat": key,
        "value": value,
        "fullMark": maxStats[key as keyof typeof maxStats]
    }))

    return <Modal show={!!dessertDetail} onHide={() => setDessertDetail(null)}>
        <Modal.Header>
            {label}
        </Modal.Header>
        <Modal.Body>
            <div style={{ minHeight: "40vh" }}>

                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" />
                        <PolarRadiusAxis />
                        <Radar name="dessert" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

        </Modal.Body>

    </Modal>;
}