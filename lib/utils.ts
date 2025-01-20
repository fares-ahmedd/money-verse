import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMelinite(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMelinite(amount: number) {
  return amount / 1000;
}
