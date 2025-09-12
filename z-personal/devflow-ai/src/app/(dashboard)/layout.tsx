import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
