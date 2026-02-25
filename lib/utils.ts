import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ClassGroups = [
    { key: "creche", value: "Creche" },
    { key: "nursery", value: "Nursery" },
    { key: "kg", value: "Kindergarten" },
    { key: "primary", value: "Primary" },
    { key: "jhs", value: "JHS" },
]

