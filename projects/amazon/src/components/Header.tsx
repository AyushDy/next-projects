
import SearchBar from "./UI/SearchBar";
import Link from "next/link";
import CartIcon from "./UI/buttons/CartIcon";
import NavLinks from "./NavLinks";
import Caregories from "./Categories";

export default function Header() {

  return (
    <header className="fixed inset-0 z-10 max-h-fit">
      <div className="bg-[#131921] text-white p-4 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-shrink-0">
          <Link href={'/'} className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ecomm App
          </Link>
        </div>

        <div className="flex-1 lg:max-w-2xl lg:mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 lg:flex-shrink-0">
          <NavLinks />
          <button
            type="button"
            className="relative hover:text-[#f0b511] transition-colors"
          >
            <Link href="/cart">
             <CartIcon />
             </Link>
          </button>
        </div>
      </div>
      </div>
      <Caregories />
    </header>
  );
}


