import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories, conditions, rarityLevels, countries } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface Filters {
  category: string;
  priceRange: [number, number];
  conditions: string[];
  rarityLevels: string[];
  countries: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const Section = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground">
        {title}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({ filters, onChange }: FilterSidebarProps) => {
  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  return (
    <aside className="space-y-2 w-full">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Filters</h2>

      <Section title="Category">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={filters.category === ""} onCheckedChange={() => update({ category: "" })} />
            <span className="text-sm text-muted-foreground">All</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={filters.category === cat.slug} onCheckedChange={() => update({ category: cat.slug })} />
              <span className="text-sm text-muted-foreground">{cat.name}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <Slider
          min={0}
          max={6000}
          step={50}
          value={filters.priceRange}
          onValueChange={(v) => update({ priceRange: v as [number, number] })}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>${filters.priceRange[0].toLocaleString()}</span>
          <span>${filters.priceRange[1].toLocaleString()}</span>
        </div>
      </Section>

      <Section title="Condition" defaultOpen={false}>
        {conditions.map((cond) => (
          <label key={cond} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.conditions.includes(cond)}
              onCheckedChange={(checked) =>
                update({
                  conditions: checked
                    ? [...filters.conditions, cond]
                    : filters.conditions.filter((c) => c !== cond),
                })
              }
            />
            <span className="text-sm text-muted-foreground">{cond}</span>
          </label>
        ))}
      </Section>

      <Section title="Rarity" defaultOpen={false}>
        {rarityLevels.map((r) => (
          <label key={r} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.rarityLevels.includes(r)}
              onCheckedChange={(checked) =>
                update({
                  rarityLevels: checked
                    ? [...filters.rarityLevels, r]
                    : filters.rarityLevels.filter((l) => l !== r),
                })
              }
            />
            <span className="text-sm text-muted-foreground">{r}</span>
          </label>
        ))}
      </Section>

      <Section title="Country" defaultOpen={false}>
        {countries.map((c) => (
          <label key={c} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.countries.includes(c)}
              onCheckedChange={(checked) =>
                update({
                  countries: checked
                    ? [...filters.countries, c]
                    : filters.countries.filter((co) => co !== c),
                })
              }
            />
            <span className="text-sm text-muted-foreground">{c}</span>
          </label>
        ))}
      </Section>
    </aside>
  );
};

export default FilterSidebar;
