"use client";

import SearchField from "../forms/SearchField";
import HeaderNavLinks from "../UI/navs/HeaderNavLinks";
import ThemeButton from "../UI/buttons/ThemeButton";
import { Suspense } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  visible: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  visible,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed top-20 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-b border-border/20 transition-all duration-300 ease-in-out ${
          isOpen && visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="w-full">
            <Suspense
              fallback={
                <div className="w-full h-12 bg-card/20 rounded-xl animate-pulse" />
              }
            >
              <SearchField />
            </Suspense>
          </div>

          <div className="flex flex-col space-y-3">
            <HeaderNavLinks />
          </div>

          <div className="pt-4 border-t border-border/20">
            <ThemeButton />
          </div>
        </div>
      </div>{" "}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
