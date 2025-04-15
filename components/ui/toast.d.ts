import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Toast, ToastAction, toastVariants } from "./toast"

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastAction>

export type ToastVariants = VariantProps<typeof toastVariants> 