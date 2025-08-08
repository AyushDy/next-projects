"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Filter, X } from "lucide-react";

interface MobileFiltersWrapperProps {
  children: React.ReactNode;
}

export default function MobileFiltersWrapper({
  children,
}: MobileFiltersWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => setIsOpen(!isOpen);
  const closeFilters = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-3 bg-card/80 backdrop-blur-lg border border-border/30 rounded-xl text-foreground hover:bg-card/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Mobile Filter Sidebar */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeFilters}
            />

            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-xl border-r border-border/30 shadow-2xl animate-in slide-in-from-left duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Filters
                  </h2>
                </div>
                <button
                  onClick={closeFilters}
                  className="w-8 h-8 bg-muted/20 hover:bg-muted/40 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
