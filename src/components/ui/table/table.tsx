// components/Table.tsx
import { useMemo, ReactNode } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { ITEMS_PER_PAGE_DEFAULT, TableProps } from './table.props';

const Table = <T,>({
  data,
  columns,
  currentPage,
  setCurrentPage,
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT,
  emptyMessage = '😞 No Data Found',
  invalidDataMessage = 'Invalid Data',
} // rowKey,
: TableProps<T>): ReactNode => {
  const paginatedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    return data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(
    Array.isArray(data) ? data.length / itemsPerPage : 0,
  );

  if (!Array.isArray(data)) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-gray-500 text-lg font-semibold">
          {invalidDataMessage}
        </h2>
        <p className="text-gray-400">Data provided is not an array.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-gray-500 text-lg font-semibold">{emptyMessage}</h2>
        <p className="text-gray-400">Try adjusting your selection.</p>
      </div>
    );
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (startPage > 1) buttons.push(<span key="start-ellipsis">...</span>);
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer w-8 p-2 max-h-[33px] leading-[18px] border rounded ${
            currentPage === i
              ? 'bg-primary border-0 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          {i}
        </button>,
      );
    }
    if (endPage < totalPages) buttons.push(<span key="end-ellipsis">...</span>);

    return buttons;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="border-thead">
          <tr>
            {columns.map(({ label, key }) => (
              <th
                key={String(key)}
                scope="col"
                className="p-4 uppercase text-sm font-medium text-gray-800"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={String(row?.id)}
              className={
                data.indexOf(row) % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }
            >
              {columns.map(({ key, render }) => {
                const value = row[key as keyof T];
                return (
                  <td key={String(key)} className="p-4 text-sm text-gray-600">
                    {render ? render(value, row) : String(value ?? '-')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer w-8 p-2 text-center border rounded bg-white text-gray-800 disabled:opacity-50 hover:bg-gray-100"
            aria-label="Previous page"
          >
            <GrFormPrevious size={15} />
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="cursor-pointer w-8 p-2 border rounded bg-white text-gray-800 disabled:opacity-50 hover:bg-gray-100"
            aria-label="Next page"
          >
            <GrFormNext size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
