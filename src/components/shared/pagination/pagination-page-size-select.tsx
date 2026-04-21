import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationPageSizeSelectProps {
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (value: number) => void;
  triggerClassName?: string;
}

export const PaginationPageSizeSelect = ({
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  triggerClassName = 'w-[62px]',
}: PaginationPageSizeSelectProps) => {
  return (
    <Select
      value={String(pageSize)}
      onValueChange={(value) => onPageSizeChange(Number(value))}
    >
      <SelectTrigger className={triggerClassName} size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {pageSizeOptions.map((size) => (
          <SelectItem key={size} value={String(size)}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
