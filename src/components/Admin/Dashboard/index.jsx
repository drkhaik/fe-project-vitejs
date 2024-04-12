import React, { useEffect, useState } from "react";
import { fetchAllPostForStat, fetchDataUserForStat, fetchAllDocumentForStat } from "../../../services/api";
import { message, Row, Col } from "antd";
import Chart from 'chart.js/auto';
import { Bar, Doughnut } from "react-chartjs-2";

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
                        <Bar
                            data={{
                                labels: dataPost.map((data) => data.author),
                                datasets: [
                                    {
                                        label: "Posts",
                                        data: dataPost.map((data) => data.count),
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
                            options={{
                                plugins: {
                                    title: {
                                        text: "Posts Stat",
                                    },
                                },
                            }}
                        />
                    </div>
                </Col>
                <Col span={12} style={style}>
                    <div style={{ width: 400 }}>
                        <Doughnut
                            data={{
                                labels: dataUser.map((data) => data.role),
                                datasets: [
                                    {
                                        label: "User Count",
                                        data: dataUser.map((data) => data.count),
                                        backgroundColor: [
                                            "rgba(43, 63, 229, 0.8)",
                                            "rgba(250, 192, 19, 0.8)",
                                            "rgba(253, 135, 135, 0.8)",
                                            "rgba(75,192,192,1)",
                                            "#ecf0f1",
                                            "#50AF95",
                                            "#f3ba2f",
                                            "#2a71d0",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Revenue Sources",
                                    },
                                },
                            }}
                        />
                    </div>
                </Col>
                <Col span={12} style={style}>
                    <div style={{ width: 400 }}>
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
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;