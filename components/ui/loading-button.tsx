"use client";

import * as React from "react";
import { Loader } from "lucide-react";
import { Button, buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";

type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function LoadingButton({
  loading,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
}
