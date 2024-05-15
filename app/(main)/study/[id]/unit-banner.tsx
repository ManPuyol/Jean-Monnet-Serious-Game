import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  locked: boolean;
};

export const UnitBanner = ({
  title,
  description,
  locked
}: Props) => {
  return (
    <div className={cn(
      "w-full rounded-xl p-5 text-white flex items-center justify-between",
      locked
        ? 'bg-muted-foreground text-muted opacity-50'
        : ' bg-primary')
        }>
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>
        <p className="text-lg">
          {description}
        </p>
      </div>
      {/* <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link> */}
    </div>
  );
};