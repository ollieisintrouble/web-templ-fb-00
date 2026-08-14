import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function FormatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-UK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    })
}