import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isPending: boolean;
  onClick?: () => void;
}

export default function ActionButton({ children, isPending, variant, size, className, onClick }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick ? (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onClick(); } : undefined}
      type="button"
      disabled={isPending}
      variant={variant}
      size={size}
      className={cn(className, "inline-grid place-items-center [grid-template-areas:'stack']")}
    >
      <span className={cn(isPending && "invisible", "flex items-center gap-2 [grid-area:stack]")}>{children}</span>
      <LoaderCircle
        aria-label="Exporting…"
        className={cn(isPending ? "visible" : "invisible", "size-5 animate-spin transition-opacity [grid-area:stack]")}
      />
    </Button>
  );
}
