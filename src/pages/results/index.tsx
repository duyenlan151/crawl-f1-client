import React, { useMemo, useState } from 'react';
import Filters from './components/filters';
import GridToggle from './components/grid-toggle';
import RaceTable from './components/race-table';
import Chart from '@/components/ui/charts';
import Tabs from '@/components/ui/tabs';
import { useF1Data } from '@/context/F1DataContext';
import { ChartType, ChartCategory } from '@/models/chart';
import { getChartTitle } from '@/utils';

const barChartCategories: ChartCategory[] = [
  'winner',
  'car',
  'month',
  'laps',
  'team',
  'race_time',
  'grandPrix',
];
const pieChartCategories: ChartCategory[] = [
  'winner',
  'car',
  'month',
  'laps',
  'team',
  'race_time',
  'grandPrix',
];
const lineChartCategories: ChartCategory[] = [
  'month',
  'laps',
  'race_time',
  'grandPrix',
];

const Results: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gridCols, setGridCols] = useState<number>(1);
  const { data, type, year, error } = useF1Data();

  const renderCharts = (
    chartType: ChartType,
    categories: ChartCategory[],
    gridCols: string,
  ) => (
    <div className={`grid ${gridCols} gap-6 place-content-center`}>
      {categories.map((category) => (
        <Chart
          key={`${chartType}-${category}`}
          data={data}
          type={chartType}
          category={category}
          title={`${getChartTitle(chartType, category)} in ${
            year || 'All Years'
          }`}
        />
      ))}
    </div>
  );

  const styleChart = useMemo(() => {
    return `grid-cols-${gridCols}`;
  }, [gridCols]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <Filters />
      <Tabs
        tabs={[
          {
            key: 'table',
            label: 'Table',
            content: (
              <RaceTable
                data={data}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                type={type}
              />
            ),
          },
          {
            key: 'bar-chart',
            label: 'Bar Chart',
            content: renderCharts('bar', barChartCategories, styleChart),
          },
          {
            key: 'pie-chart',
            label: 'Pie Chart',
            content: renderCharts('pie', pieChartCategories, styleChart),
          },
          {
            key: 'line-chart',
            label: 'Line Chart',
            content: renderCharts('line', lineChartCategories, styleChart),
          },
        ]}
      >
        <GridToggle gridCols={gridCols} setGridCols={setGridCols} />
      </Tabs>
    </div>
  );
};

export default Results;
