

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchInput() {
  return (
    <div className="flex w-full ml-auto max-w-sm items-center gap-2">
      <Input type="text" placeholder="Search..." />
      <Button type="submit" variant="outline">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
