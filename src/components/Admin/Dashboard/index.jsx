import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import { fetchAllPostForStat, fetchDataUserForStat } from "../../../services/api";
import { message, Row, Col } from "antd";

const Dashboard = () => {
    const [dataPost, setDataPost] = useState([]);
    const [dataUser, setDataUser] = useState([]);

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
                    console.log("check res", res.data);
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

    const style = {
        'display': 'flex',
        'justifyContent': 'center'
    }


    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col span={12} style={style}>
                    <div style={{ width: 500 }}>
                        <BarChart chartData={dataPost} />

                    </div>
                </Col>
                <Col span={12} style={style}>
                    <div style={{ width: 400 }}>
                        <DoughnutChart chartData={dataUser} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;