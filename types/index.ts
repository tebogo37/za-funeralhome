// types/index.ts
export type Province = "Gauteng";
export type City = "Johannesburg" | "Pretoria" | "Ekurhuleni";

export interface LocationFilters {
  minPrice?: number;
  maxPrice?: number;
  services?: string[];
  verifiedOnly?: boolean;
  minRating?: number;
}