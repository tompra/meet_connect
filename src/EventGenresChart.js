import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts';
import { useState, useEffect } from 'react';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const COLORS = ['#564787', '#EE964B', '#F2FDFF', '#9AD4D6', '#EE7B30'];

    const getData = () => {
        const data = genres.map((genre) => {
            const filteredEvents = events.filter((event) =>
                event.summary.includes(genre)
            );
            return {
                name: genre,
                value: filteredEvents.length,
            };
        });
        return data;
    };
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const isSmallScreen = window.innerWidth <= 320;
        let x, y;

        if (isSmallScreen) {
            if (isSmallScreen) {
                x = cx + (radius - 25) * Math.cos(-midAngle * RADIAN);
                y = cy + (radius - 25) * Math.sin(-midAngle * RADIAN);
            } else {
                x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1;
                y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1;
            }
        }

        return percent ? (
            <text
                key={`label-${index}`}
                x={x}
                y={y}
                fill='#fff'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    return (
        <ResponsiveContainer width='99%' height={400} minWidth={320}>
            <PieChart className='pie-chart-container'>
                <Pie
                    data={data}
                    dataKey='value'
                    fill='#8884d8'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend verticalAlign='bottom' />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;
