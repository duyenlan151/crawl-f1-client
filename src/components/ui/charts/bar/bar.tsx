import { Bar } from 'recharts';

type BarChartProps = {
  data: never[];
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Bar Chart</h3>
      {JSON.stringify(data)}
      <Bar dataKey="winner" data={data} fill="#3182CE" />
    </div>
  );
};

export default BarChart;
