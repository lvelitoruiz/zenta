'use client';
import React from 'react';
import { useOrganizationStore } from '@/store/organizationStore';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ExportButton } from '@/components/ui/export-button';
import { Icon } from '@/components/ui/icon';
import { 
  faFilter, 
  faSearch, 
  faSortUp,
  faSortDown,
  faSort,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/loader';
import { useDebounce } from '@/hooks/use-debounce';

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Nombre',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Precio',
    cell: info => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: info => info.getValue(),
  }),
];

export const ProductsTable = () => {
  const [data, setData] = React.useState<Product[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const { selectedOrganizationId } = useOrganizationStore();
  const [pageIndex, setPageIndex] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedOrganizationId) return;
      
      setLoading(true);
      try {
        const page = pageIndex + 1;
        const searchParam = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : '';
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?organizationId=${selectedOrganizationId}&page=${page}&limit=${pageSize}${searchParam}`
        );
        const { items, total } = await response.json();
        setData(items);
        setTotalRows(total);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedOrganizationId, pageIndex, pageSize, debouncedSearch]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onSortingChange: setSorting,
    onPaginationChange: updates => {
      if (typeof updates === 'function') {
        const newState = updates({
          pageSize,
          pageIndex,
        });
        setPageSize(newState.pageSize);
        setPageIndex(newState.pageIndex);
      }
    },
    pageCount: Math.ceil(totalRows / pageSize),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
          <Loader />
        </div>
      )}
      
      <div className={loading ? 'opacity-50' : ''}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" icon={faFilter}>
                Filtros
              </Button>
              <div className="relative">
                <Icon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4 py-2 border rounded-md bg-gray-800 text-white border-gray-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ExportButton 
              data={data}
              filename="productos.xlsx"
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <table className="min-w-full">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-gray-700">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <Icon 
                            icon={
                              header.column.getIsSorted() === 'asc' 
                                ? faSortUp 
                                : header.column.getIsSorted() === 'desc'
                                ? faSortDown
                                : faSort
                            }
                            className={cn(
                              "transition-colors",
                              header.column.getIsSorted()
                                ? "text-blue-400"
                                : "text-gray-400"
                            )}
                            size="sm"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-300"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  {[10, 20, 30, 40, 50].map(size => (
                    <option key={size} value={size}>
                      {size} por página
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-400">
                  Página {table.getState().pagination.pageIndex + 1} de{' '}
                  {table.getPageCount()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={faChevronLeft}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={faChevronRight}
                  iconPosition="right"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 