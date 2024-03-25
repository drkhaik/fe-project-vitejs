import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
    const { chartData } = props;

    return (
        <div>
            <Line
                data={{
                    labels: chartData.map((data) => data.role),
                    datasets: [
                        {
                            label: "Revenue",
                            data: chartData.map((data) => data.count),
                            backgroundColor: "#064FF0",
                            borderColor: "#064FF0",
                        },
                        {
                            label: "Cost",
                            data: chartData.map((data) => data.role),
                            backgroundColor: "#FF3030",
                            borderColor: "#FF3030",
                        },
                    ],
                }}
                options={{
                    elements: {
                        line: {
                            tension: 0.5,
                        },
                    },
                    plugins: {
                        title: {
                            text: "Monthly Revenue & Cost",
                        },
                    },
                }}
            />
        </div>
    )
}

export default LineChart;