
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <div className="flex flex-col items-center justify-center gap-10">
        <Link href="/history">
          <Button>Customer History</Button>
        </Link>
        <Link href="/market">
          <Button>Market</Button>
        </Link>

        
      </div>
    </div>
  );
}
