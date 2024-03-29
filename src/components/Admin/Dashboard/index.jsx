import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import { fetchAllPostForStat, fetchDataUserForStat, fetchAllDocumentForStat } from "../../../services/api";
import { message, Row, Col } from "antd";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
    const [dataPost, setDataPost] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataDocument, setDataDocument] = useState([]);

    useEffect(() => {
        const getDataPostForStat = async () => {
            try {
                const res = await fetchAllPostForStat();
                if (res && res.data && res.errCode === 0) {
                    setDataPost(res.data);
                } else {
                    message.error("Failed to load list post")
                }
            } catch (e) {
                console.log(e);
            }
        }

        getDataPostForStat();

    }, []);

    useEffect(() => {
        const getDataUserForStat = async () => {
            try {
                const res = await fetchDataUserForStat();
                if (res && res.data && res.errCode === 0) {
                    setDataUser(res.data);
                } else {
                    message.error("Failed to load list user")
                }
            } catch (e) {
                console.log(e);
            }
        }

        getDataUserForStat();

    }, []);

    useEffect(() => {
        const getDataDocumentForStat = async () => {
            try {
                const res = await fetchAllDocumentForStat();
                if (res && res.data && res.errCode === 0) {
                    console.log("check res document", res.data);
                    setDataDocument(res.data);
                } else {
                    message.error("Failed to load list document")
                }
            } catch (e) {
                console.log(e);
            }
        }

        getDataDocumentForStat();

    }, []);

    const style = {
        'display': 'flex',
        'justifyContent': 'center'
    }

    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col span={12} style={style}>
                    <div style={{ width: 500, paddingTop: 50 }}>
                        <BarChart chartData={dataPost} />
                    </div>
                </Col>
                <Col span={12} style={style}>
                    <div style={{ width: 400 }}>
                        <DoughnutChart chartData={dataUser} />
                    </div>
                </Col>
                <Col span={12} style={style}>
                    <Bar
                        data={{
                            labels: dataDocument.map((data) => data.author),
                            datasets: [
                                {
                                    label: "Documents",
                                    data: dataDocument.map((data) => data.count),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                        "rgba(75,192,192,1)",
                                    ],
                                    borderRadius: 5,
                                },
                            ],
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;