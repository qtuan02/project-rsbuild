import {
  Building2,
  FileText,
  ReceiptText,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/libs/cn";

import type { LucideIcon } from "lucide-react";

// --- Constants ---
const RESULTS_MAX_HEIGHT = "max-h-[380px]";

// --- Types ---
interface SearchResult {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly icon: LucideIcon;
}

interface QuickLink {
  readonly label: string;
  readonly icon: LucideIcon;
}

// --- Mock data ---
const MOCK_RESULTS: readonly SearchResult[] = [
  {
    id: "1",
    title: "Phòng 101 – Tòa A",
    subtitle: "Đang thuê • Nguyễn Văn An",
    category: "Phòng trọ",
    icon: Building2,
  },
  {
    id: "2",
    title: "Nguyễn Thị Bình",
    subtitle: "Khách thuê • Phòng 205",
    category: "Khách thuê",
    icon: Users,
  },
  {
    id: "3",
    title: "Hợp đồng #HĐ-2024-089",
    subtitle: "Còn hiệu lực • Hết hạn 30/06/2025",
    category: "Hợp đồng",
    icon: FileText,
  },
  {
    id: "4",
    title: "Hóa đơn tháng 4 – Phòng 302",
    subtitle: "Chưa thanh toán • 2,500,000 đ",
    category: "Hóa đơn",
    icon: ReceiptText,
  },
  {
    id: "5",
    title: "Tòa nhà Sunrise",
    subtitle: "45/48 phòng • Đường Lê Lợi, Q.1",
    category: "Tòa nhà",
    icon: Building2,
  },
] as const;

const QUICK_LINKS: readonly QuickLink[] = [
  { label: "Phòng trọ", icon: Building2 },
  { label: "Khách thuê", icon: Users },
  { label: "Hợp đồng", icon: FileText },
  { label: "Hóa đơn", icon: ReceiptText },
] as const;

// --- Helpers ---
const filterResults = (query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.subtitle.toLowerCase().includes(lowerQuery) ||
      r.category.toLowerCase().includes(lowerQuery),
  );
};

const groupByCategory = (results: SearchResult[]): Record<string, SearchResult[]> =>
  results.reduce<Record<string, SearchResult[]>>((acc, result) => {
    if (!acc[result.category]) acc[result.category] = [];
    acc[result.category].push(result);
    return acc;
  }, {});

// --- Main component ---
export const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const filtered = trimmedQuery ? filterResults(trimmedQuery) : [];
  const grouped = groupByCategory(filtered);

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Desktop trigger */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative hidden h-8 w-56 justify-start rounded-md border-border bg-background text-sm text-muted-foreground shadow-none hover:bg-muted hover:text-foreground lg:flex lg:w-64"
        >
          <Search className="mr-2 h-3.5 w-3.5" />
          <span>Tìm kiếm...</span>
          <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>

      {/* Mobile trigger */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Tìm kiếm</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 sm:max-w-xl overflow-hidden"
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            autoFocus
            placeholder="Tìm kiếm phòng, khách thuê, hợp đồng..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none h-auto p-0 text-sm focus-visible:ring-0 bg-transparent"
          />
          <kbd
            className="hidden shrink-0 cursor-pointer items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex"
            onClick={handleClose}
          >
            Esc
          </kbd>
        </div>

        {/* Results area */}
        <div className={cn(RESULTS_MAX_HEIGHT, "overflow-y-auto")}>
          {/* Empty query → quick links */}
          {!trimmedQuery && (
            <div className="p-3">
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Truy cập nhanh
              </p>
              <div className="grid grid-cols-2 gap-1">
                {QUICK_LINKS.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <link.icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Has query but no results */}
          {trimmedQuery && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Search className="mb-3 h-8 w-8 opacity-30" />
              <p className="text-sm font-medium">Không tìm thấy kết quả</p>
              <p className="mt-1 text-xs opacity-70">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}

          {/* Grouped results */}
          {Object.entries(grouped).map(([category, results], idx) => (
            <div key={category}>
              {idx > 0 && <Separator />}
              <div className="p-2">
                <p className="mb-1 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </p>
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={handleClose}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      <result.icon className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium leading-tight">
                        {result.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {result.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Keyboard hints footer */}
        <div className="flex items-center gap-4 border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border px-1 font-mono">↑↓</kbd> di chuyển
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border px-1 font-mono">↵</kbd> chọn
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border px-1 font-mono">Esc</kbd> đóng
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
