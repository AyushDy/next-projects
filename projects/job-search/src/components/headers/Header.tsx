"use client";
import { Inter } from "next/font/google";
import SearchField from "../forms/SearchField";
import { useEffect, useState } from "react";
import HeaderNavLinks from "../UI/navs/HeaderNavLinks";
import ThemeButton from "../UI/buttons/ThemeButton";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";



export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export default function Header() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    const currentPath = window.location.pathname;
    setVisible(!currentPath.includes("/auth"));
    setIsMobileMenuOpen(false);
  }, [params]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(prevScrollHeight - currentScrollY > 0);

      setPrevScrollHeight(currentScrollY);
      setScrollHeight(currentScrollY);

      if (
        isMobileMenuOpen &&
        Math.abs(currentScrollY - prevScrollHeight) > 10
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollHeight, isMobileMenuOpen]);

  return (
    <>
      <div
        className={`h-20 fixed z-50 w-full px-4 sm:px-6 lg:px-8 flex items-center bg-background/20 dark:bg-background/10 backdrop-blur-lg text-foreground border-b border-border/20 transition-all duration-500 ease-in-out ${
          scrollHeight > 50
            ? "shadow-lg bg-background/20 dark:bg-background/20"
            : ""
        } ${
          !visible || (scrollHeight > 20 && !isScrollingUp)
            ? "transform -translate-y-full opacity-0 pointer-events-none"
            : "transform translate-y-0 opacity-100"
        }`}
      >
        <Link
          href={"/"}
          className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl ${inter.variable} text-foreground/80 hover:text-primary transition-colors duration-300`}
        >
          JOBFLY
        </Link>

        <div className="hidden lg:flex items-center flex-1 justify-center max-w-2xl mx-8">
          <SearchField />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <HeaderNavLinks />
          <ThemeButton />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden ml-auto p-2 rounded-lg bg-card/20 backdrop-blur-lg border border-border/20 hover:bg-card/30 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

\      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        visible={visible} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
