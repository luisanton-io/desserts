import { Modal } from "react-bootstrap";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from "recharts";
import { useRecoilState } from "recoil";
import dessertDetailAtom from "../atoms/detail";
import { maxStats } from "../constants/maxStats";

export default function DessertModal() {
    const [dessertDetail, setDessertDetail] = useRecoilState(dessertDetailAtom)

    const { label, stats } = dessertDetail ?? {}

    const data = stats && Object.entries(stats).map(([stat, value]) => ({
        stat, value, fullMark: maxStats[stat as keyof typeof maxStats]
    }))

    return <Modal show={!!dessertDetail} onHide={() => setDessertDetail(null)}>
        <Modal.Header>
            {label}
        </Modal.Header>
        <Modal.Body>
            {
                data &&
                <div className="d-flex">
                    <ResponsiveContainer width={"100%"} height={350}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="stat" />
                            <PolarRadiusAxis />
                            <Radar name="dessert" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} >
                                {/* {
                                    data.map((entry, index) => {
                                        console.table({ entry, index, fill: entry.value / entry.fullMark })
                                        return <Cell key={`cell-${index}`} domain={[0, entry.fullMark]} fill={`${entry.value / entry.fullMark}`} />
                                    })
                                } */}
                            </Radar>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

            }       </Modal.Body>

    </Modal>;
}