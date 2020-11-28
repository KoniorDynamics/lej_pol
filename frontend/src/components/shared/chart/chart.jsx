import React from 'react';
import {Chart as GoogleChart} from "react-google-charts";
import './chart.css';

const Chart = ({data}) => {
    return (
        <GoogleChart
            className="chart"
            width={'100%'}
            height={'auto'}
            chartType="ColumnChart"
            data={data}
            options={{
                chartArea: { width: '70%' },
                legend: 'none'
            }}
        />
    );
};

export default Chart;
