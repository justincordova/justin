import * as React from "react";
import { cn } from "@/lib/utils";

const ExpCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-card transition-all duration-500",
      className
    )}
    {...props}
  />
));
ExpCard.displayName = "ExpCard";

const ExpCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ExpCardHeader.displayName = "ExpCard.Header";

const ExpCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ExpCardTitle.displayName = "ExpCard.Title";

const ExpCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ExpCardContent.displayName = "ExpCard.Content";

// Named export using Object.assign
export const NamedExpCard = Object.assign(ExpCard, {
  Header: ExpCardHeader,
  Title: ExpCardTitle,
  Content: ExpCardContent,
});