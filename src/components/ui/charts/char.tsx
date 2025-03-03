// elements/charts.tsx
import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

import {
  BarLabelProps,
  ChartProps,
  CustomTooltipProps,
  PieLabelProps,
  ChartData,
} from '@/models/chart';
import { transformDataForChart, capitalizeFirstLetter, uid } from '@/utils';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#ff0000',
  '#00ff00',
  '#0000ff',
];
const RADIAN = Math.PI / 180;

// Custom Components (unchanged)
const CustomBarLabel: React.FC<BarLabelProps> = ({
  x = 0,
  y = 0,
  width = 0,
  value,
}) => (
  <text
    x={x + width / 2}
    y={y - 5}
    fill="#000"
    textAnchor="middle"
    fontSize={12}
    fontWeight="bold"
  >
    {value}
  </text>
);

const CustomPieLabel: React.FC<PieLabelProps> = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      className="text-center"
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  const tooltipContent = {
    winner: (
      <>
        <p>{`Wins: ${payload[0].value}`}</p>
        {data.car && <p>{`Car: ${data.car}`}</p>}
      </>
    ),
    car: <p>{`Wins: ${payload[0].value}`}</p>,
    month: <p>{`Races: ${payload[0].value}`}</p>,
    race_time: (
      <>
        <p>{`Time: ${data.time}`}</p>
        {data.car && <p>{`Car: ${data.car}`}</p>}
      </>
    ),
  };

  return (
    <div className="custom-tooltip">
      <p className="">{data.name}</p>
      {tooltipContent[data.category as keyof typeof tooltipContent] || (
        <p>{`Value: ${payload[0].value}`}</p>
      )}
    </div>
  );
};

const chartConfig = {
  xAxis: {
    angle: 65,
    textAnchor: 'start',
    dx: -12,
    dy: 1,
    tick: { fontSize: 12 },
  },
  legend: {
    layout: 'horizontal' as const,
    verticalAlign: 'bottom' as const,
    align: 'center' as const,
  },
};

const Chart: React.FC<ChartProps> = ({ data, type, category, title }) => {
  const chartData: ChartData[] = transformDataForChart(data, category);
  const maxValue = Math.max(...chartData.map((item) => item.count), 0);
  const padding = maxValue > 5 ? maxValue * 0.1 : 2;

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { bottom: 60 },
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <XAxis dataKey="name" {...chartConfig.xAxis} />
            <YAxis domain={[0, maxValue + padding]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              {...chartConfig.legend}
              wrapperStyle={{ position: 'relative', marginTop: 60 }}
              formatter={() => capitalizeFirstLetter(category)}
            />
            <Bar dataKey="count" label={<CustomBarLabel />}>
              {chartData.map((_, index) => {
                const id = uid();
                return (
                  <Cell
                    key={`bar-cell-${id}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Bar>
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={<CustomPieLabel />}
              outerRadius={200}
              innerRadius={50}
              dataKey="count"
              nameKey="name"
            >
              {chartData.map((_, index) => {
                const id = uid();
                return (
                  <Cell
                    key={`bar-cell-${id}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        );
      case 'line':
        return (
          <LineChart {...commonProps}>
            <XAxis dataKey="name" {...chartConfig.xAxis} />
            <YAxis domain={[0, maxValue + padding]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              {...chartConfig.legend}
              wrapperStyle={{ position: 'relative', marginTop: 40 }}
              formatter={() => capitalizeFirstLetter(category)}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="text-center mt-8">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
      <div className="w-full h-[35rem] flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
