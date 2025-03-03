import { Pie, PieChart as RePieChart } from 'recharts';

type PieChartProps = {
  data: unknown[];
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Pie Chart</h3>
      <RePieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        />
      </RePieChart>
    </div>
  );
};

export default PieChart;
