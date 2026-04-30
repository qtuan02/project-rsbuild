import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/libs/cn";

interface SearchInputWithClearProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  inputClassName?: string;
  containerClassName?: string;
}

export const SearchInputWithClear = ({
  value,
  placeholder,
  onChange,
  inputClassName,
  containerClassName,
}: SearchInputWithClearProps) => {
  return (
    <div className={cn("relative w-full sm:w-auto", containerClassName)}>
      <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn("h-8 w-full sm:w-40 pl-7 lg:w-64", inputClassName)}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Xóa từ khóa tìm kiếm"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
