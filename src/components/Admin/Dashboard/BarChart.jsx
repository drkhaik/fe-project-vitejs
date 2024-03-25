import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
    const { chartData } = props;

    return (
        <div>
            <Bar
                data={{
                    labels: chartData.map((data) => data.author),
                    datasets: [
                        {
                            label: "Posts",
                            data: chartData.map((data) => data.count),
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
            {/* <Bar data={chartData} /> */}
        </div>
    )
}

export default BarChart
