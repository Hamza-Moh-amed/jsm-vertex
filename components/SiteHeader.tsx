import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar } from "./nav/Navbar";

interface SiteHeaderProps {
  /** href of the nav link to mark as current. */
  activeHref?: string;
  className?: string;
}

export function SiteHeader({ activeHref, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex min-h-24 flex-wrap items-center justify-between gap-4 border-b border-canvas-line px-6 py-4 sm:px-10 xl:px-15",
        className,
      )}
    >
      <Navbar activeHref={activeHref} />
      <div className="ml-auto flex items-center gap-5">
        <Show when="signed-in">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-xs text-neutral-900 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Bell className="size-6" strokeWidth={1.5} aria-hidden />
          </button>
          <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button className="bg-neutral-900 text-white rounded-sm hover:bg-primary-600" size="lg">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-neutral-900 text-white rounded-sm hover:bg-primary-600" size="lg">Sign up</Button>
          </SignUpButton>
        </Show>
      </div>
    </header>
  );
}