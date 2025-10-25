
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button>Click me</Button>
      <div>
        <Link href="/history">
          <Button>History</Button>
        </Link>
      </div>
    </div>
  );
}
