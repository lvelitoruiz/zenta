interface TableTitleProps {
  title: string;
  subtitle?: string;
}

export const TableTitle = ({ title, subtitle }: TableTitleProps) => {
  return (
    <div className="mb-4 pb-2 border-b border-gray-700">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}; 