// components/RaceTable.tsx
import React, { useState } from 'react';
import Table from '@/components/ui/table/table';
import { Column } from '@/components/ui/table/table.props';
import { IRaceData } from '@/models/chart';

export type TableType = 'races' | 'drivers' | 'team' | 'fastest-laps';

const headers: Record<TableType, Column<IRaceData>[]> = {
  races: [
    { label: 'Grand Prix', key: 'grandPrix' },
    { label: 'Date', key: 'date' },
    { label: 'Winner', key: 'winner' },
    { label: 'Car', key: 'car' },
    { label: 'Laps', key: 'laps' },
    { label: 'Time', key: 'time' },
  ],
  drivers: [
    { label: 'Pos', key: 'pos' },
    { label: 'Driver', key: 'driver' },
    { label: 'Nationality', key: 'nationality' },
    { label: 'Car', key: 'car' },
    { label: 'Pts', key: 'pts' },
  ],
  team: [
    { label: 'Pos', key: 'pos' },
    { label: 'Team', key: 'team' },
    { label: 'Pts', key: 'pts' },
  ],
  'fastest-laps': [
    { label: 'Grand Prix', key: 'grandPrix' },
    { label: 'Driver', key: 'driver' },
    { label: 'Car', key: 'car' },
    { label: 'Time', key: 'time' },
  ],
};

interface RaceTableProps {
  data: IRaceData[];
  type: TableType;
}

const RaceTable: React.FC<RaceTableProps> = ({ data, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowKey =
    type === 'races' || type === 'fastest-laps' ? 'grandPrix' : 'pos';

  return (
    <div className="mt-4">
      <Table
        data={data}
        columns={headers[type]}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowKey={rowKey}
        emptyMessage={`No ${type} data found`}
        invalidDataMessage={`Invalid ${type} data`}
      />
    </div>
  );
};

export default RaceTable;
