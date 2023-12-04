import { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [allLocations, events]);

    const getData = () => {
        const data = allLocations.map((location, index) => {
            const count = events.filter(
                (event) => event.location === location
            ).length;
            const city = location.split(/, | - /)[0];
            return { id: index, city, count };
        });
        return data;
    };

    return (
        <ResponsiveContainer width='99%' height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type='category'
                    dataKey='city'
                    name='City'
                    angle={60}
                    interval={0}
                    tick={{ dx: 20, dy: 40, fontSize: 14, fill: '#fff' }}
                />
                <YAxis
                    type='number'
                    dataKey='count'
                    name='Number of events'
                    allowDecimals={false}
                    tick={{ fontSize: 14, fill: '#fff' }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name='A school' data={data} fill='#0088FE' />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;
