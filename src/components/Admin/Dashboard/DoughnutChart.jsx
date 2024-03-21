import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import { Tag } from "antd";

const DoughnutChart = (props) => {
    const { chartData } = props;

    return (
        <div>
            <Doughnut
                data={{
                    labels: chartData.map((data) => data.role),
                    datasets: [
                        {
                            label: "User Count",
                            data: chartData.map((data) => data.count),
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
    )
}

export default DoughnutChart;
