'use client';
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormExamples = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([new Date(), null]);
  const [startDateRange, endDateRange] = dateRange;

  return (
    <div className="space-y-6 p-4 bg-gray-800 rounded-lg">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Ejemplos de Input</h3>
        <div className="grid gap-4">
          {/* Input básico */}
          <Input 
            placeholder="Input básico" 
          />

          {/* Input con label */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              placeholder="ejemplo@correo.com" 
            />
          </div>

          {/* Input numérico */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Precio</label>
            <Input 
              type="number" 
              placeholder="0.00"
              min={0}
              step={0.01}
            />
          </div>

          {/* Input deshabilitado */}
          <Input 
            disabled 
            placeholder="Input deshabilitado" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Ejemplos de Select</h3>
        <div className="grid gap-4">
          {/* Select con grupos y separadores */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Categorías Agrupadas</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectGroup>
                  <SelectLabel>Electrónicos</SelectLabel>
                  <SelectItem value="phones">Teléfonos</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                </SelectGroup>
                <SelectSeparator className="bg-gray-700" />
                <SelectGroup>
                  <SelectLabel>Ropa</SelectLabel>
                  <SelectItem value="shirts">Camisetas</SelectItem>
                  <SelectItem value="pants">Pantalones</SelectItem>
                  <SelectItem value="shoes">Zapatos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Select múltiple (simulado) */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Múltiples Categorías</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona categorías" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectSeparator className="bg-gray-700" />
                <SelectItem value="electronics">Electrónicos</SelectItem>
                <SelectItem value="clothing">Ropa</SelectItem>
                <SelectItem value="food">Alimentos</SelectItem>
                <SelectItem value="books">Libros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Select con estados */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Estado del Producto</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="active" className="text-green-500">Activo</SelectItem>
                <SelectItem value="pending" className="text-yellow-500">Pendiente</SelectItem>
                <SelectItem value="inactive" className="text-red-500">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Ejemplos de DatePicker</h3>
        <div className="grid gap-4">
          {/* DatePicker básico */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Fecha</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* DatePicker con rango */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Rango de fechas</label>
            <DatePicker
              selectsRange={true}
              startDate={startDateRange}
              endDate={endDateRange}
              onChange={(update) => setDateRange(update)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona un rango"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 