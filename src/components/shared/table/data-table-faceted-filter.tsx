import { Check, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import type { Column } from '@tanstack/react-table';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} đã chọn
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="start">
        <div className="p-2">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {title}
          </p>
          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => {
                    if (isSelected) {
                      selectedValues.delete(option.value);
                    } else {
                      selectedValues.add(option.value);
                    }
                    const filterValues = Array.from(selectedValues);
                    column?.setFilterValue(
                      filterValues.length ? filterValues : undefined,
                    );
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent',
                    isSelected && 'bg-accent',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                  {option.icon && (
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="flex-1 text-left">{option.label}</span>
                  {facets?.get(option.value) && (
                    <span className="ml-auto flex h-4 w-4 items-center justify-center text-xs font-mono">
                      {facets.get(option.value)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {selectedValues.size > 0 && (
          <>
            <Separator />
            <div className="p-1">
              <button
                type="button"
                onClick={() => column?.setFilterValue(undefined)}
                className="w-full rounded-md px-2 py-1.5 text-center text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Xóa bộ lọc
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
