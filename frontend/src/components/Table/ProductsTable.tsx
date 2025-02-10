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
  faSortUp,
  faSortDown,
  faSort,
  faChevronLeft,
  faChevronRight,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/loader';
import { Modal } from '@/components/ui/modal';
import Swal from 'sweetalert2';

const columnHelper = createColumnHelper<Product>();

export const ProductsTable = () => {
  const [data, setData] = React.useState<Product[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const { selectedOrganizationId } = useOrganizationStore();
  const [pageIndex, setPageIndex] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) throw new Error('Error al eliminar el producto');

        await Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff',
        });

        fetchProducts();
      } catch (error) {
        console.error('Error:', error);
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto.',
          icon: 'error',
          background: '#1f2937',
          color: '#fff',
        });
      }
    }
  };

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
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(info.row.original);
            }}
            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Icon icon={faPencil} size="sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(info.row.original.id);
            }}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
          >
            <Icon icon={faTrash} size="sm" />
          </button>
        </div>
      ),
    }),
  ];

  const fetchProducts = React.useCallback(async () => {
    if (!selectedOrganizationId) return;
    
    setLoading(true);
    try {
      const page = pageIndex + 1;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?organizationId=${selectedOrganizationId}&page=${page}&limit=${pageSize}`
      );
      const { items, total } = await response.json();
      setData(items);
      setTotalRows(total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedOrganizationId, pageIndex, pageSize]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  const handleUpdate = async (updatedProduct: Partial<Product>) => {
    if (!selectedProduct) return;

    const payload = {
      name: updatedProduct.name,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error('Error al actualizar el producto');

      await Swal.fire({
        title: '¡Actualizado!',
        text: 'El producto ha sido actualizado.',
        icon: 'success',
        background: '#1f2937',
        color: '#fff',
      });

      setSelectedProduct(null);
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el producto.',
        icon: 'error',
        background: '#1f2937',
        color: '#fff',
      });
    }
  };

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
                    className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                    onClick={() => setSelectedProduct(row.original)}
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

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setIsEditing(false);
        }}
        title={isEditing ? "Editar Producto" : "Detalles del Producto"}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">ID</label>
              <p className="text-gray-100">{selectedProduct.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
                  defaultValue={selectedProduct.name}
                  onChange={(e) => {
                    const updatedProduct = { ...selectedProduct, name: e.target.value };
                    setSelectedProduct(updatedProduct);
                  }}
                />
              ) : (
                <p className="text-gray-100">{selectedProduct.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Precio</label>
              {isEditing ? (
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
                  defaultValue={selectedProduct.price}
                  onChange={(e) => {
                    const updatedProduct = { ...selectedProduct, price: Number(e.target.value) };
                    setSelectedProduct(updatedProduct);
                  }}
                />
              ) : (
                <p className="text-gray-100">${selectedProduct.price.toLocaleString()}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Stock</label>
              {isEditing ? (
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white"
                  defaultValue={selectedProduct.stock}
                  onChange={(e) => {
                    const updatedProduct = { ...selectedProduct, stock: Number(e.target.value) };
                    setSelectedProduct(updatedProduct);
                  }}
                />
              ) : (
                <p className="text-gray-100">{selectedProduct.stock}</p>
              )}
            </div>
            {isEditing && (
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct(null);
                    setIsEditing(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleUpdate(selectedProduct)}
                >
                  Guardar
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}; 