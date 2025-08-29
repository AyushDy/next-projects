import { useState } from "react";
import { Task } from "../context/ColumnsContextProvider";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

export default function TaskCard({ task }: { task: Task }) {
  const [checked, setChecked] = useState(false);
  const pathName = usePathname();
  const router = useRouter();


  return (
    <div onClick={()=>router.push(`${pathName}/${task.id}`)}>
    <Card className="p-2 rounded-md group bg-primary/10 backdrop-blur-sm transition-all duration-200 relative overflow-visible">
      <Checkbox checked={checked} setChecked={setChecked} />
      <h3
        className={
          "font-semibold break-words transition-all duration-200" +
          ((checked ? " ml-7" : " ml-0 ") + " group-hover:ml-7")
        }
      >
        {task.title}
      </h3>
    </Card>
    </div>
  );
}


function Checkbox({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (v: boolean) => void;
}) {
  return (
    <Input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      className={
        `absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-primary accent-primary transition-all duration-200 ` +
        (checked
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto")
      }
    />
  );
}
