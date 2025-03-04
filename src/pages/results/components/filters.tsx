import React, { useState } from 'react';

import CrawlButton from './crawl-button';
import Dropdown from '@/components/ui/dropdown';
import { useF1Data } from '@/context/F1DataContext';
import { YearOptions } from '@/hooks/useFetchF1Data';
import { ChartCategory } from '@/models/chart';

const Filters: React.FC = () => {
  const [chartCategory, setChartCategory] = useState<ChartCategory>('winner');

  const {
    type,
    year,
    grandPrix,
    years,
    types,
    grandPrixOptions,
    setYear,
    setType,
    setGrandPrix,
  } = useF1Data();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <Dropdown<YearOptions>
        label="Select Year"
        selectedItem={year}
        onSelect={setYear}
        items={years?.map((y) => ({ label: String(y), value: y })) || []}
      />
      <Dropdown<string>
        label="Select Type"
        selectedItem={type}
        onSelect={setType}
        items={types?.map((t) => ({ label: t.name, value: t.value })) || []}
      />
      <Dropdown<string | null>
        label="Select Grand Prix"
        selectedItem={grandPrix}
        onSelect={setGrandPrix}
        items={
          grandPrixOptions?.map((gp) => ({
            label: gp.name,
            value: gp.dataValue,
          })) || []
        }
      />
      <Dropdown<ChartCategory>
        label="Chart Category"
        selectedItem={chartCategory}
        onSelect={setChartCategory}
        items={[
          { label: 'Winners', value: 'winner' },
          { label: 'Cars', value: 'car' },
          { label: 'Months', value: 'month' },
        ]}
      />
      <CrawlButton />
    </div>
  );
};

export default Filters;
