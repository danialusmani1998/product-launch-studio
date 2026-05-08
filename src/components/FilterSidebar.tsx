import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { PRODUCT_FILTERS } from '../lib/filters';

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export function FilterSidebar({ onFilterChange, onClose, isOpen = true }: FilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Price']);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...selectedFilters };
    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    const index = newFilters[category].indexOf(value);
    if (index > -1) {
      newFilters[category].splice(index, 1);
    } else {
      newFilters[category].push(value);
    }

    if (newFilters[category].length === 0) {
      delete newFilters[category];
    }

    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative z-40 w-80 max-md:w-full h-screen max-md:h-auto max-md:translate-x-0 bg-white dark:bg-slate-800 border-r border-border dark:border-slate-700 transition-transform duration-300 md:transition-none overflow-y-auto max-md:max-h-96`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-border dark:border-slate-700 p-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink dark:text-white">Filters</h2>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X size={20} className="text-ink dark:text-white" />
        </button>
      </div>

      {/* Filter Categories */}
      <div className="p-6 space-y-4">
        {/* Clear Filters */}
        {Object.keys(selectedFilters).length > 0 && (
          <button
            onClick={clearAllFilters}
            className="w-full py-2 text-sm font-semibold text-azure hover:text-ink dark:hover:text-white transition-colors"
          >
            Clear All Filters
          </button>
        )}

        {/* Filter Sections */}
        {PRODUCT_FILTERS.map(category => (
          <div key={category.name} className="border-b border-border dark:border-slate-700 pb-4 last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between py-3 hover:text-azure transition-colors"
            >
              <span className="font-semibold text-ink dark:text-white text-lg">{category.name}</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  expandedCategories.includes(category.name) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Options */}
            {expandedCategories.includes(category.name) && (
              <div className="space-y-3 mt-3 pl-2">
                {category.options.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[category.name]?.includes(option.value) || false}
                      onChange={() => handleFilterChange(category.name, option.value)}
                      className="w-5 h-5 rounded border-2 border-border dark:border-slate-600 checked:bg-azure checked:border-azure cursor-pointer transition-colors"
                    />
                    <span className="text-ink dark:text-gray-300 group-hover:text-azure transition-colors">
                      {option.label}
                    </span>
                    {option.count && (
                      <span className="ml-auto text-xs text-muted-foreground">({option.count})</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
