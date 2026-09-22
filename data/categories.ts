import { Category } from "@/types";

export const categories: Category[] = [
  { slug: "yangi-kelganlar", name: "Yangi kelganlar" },
  { slug: "ayollar-kiyimi", name: "Ayollar kiyimi" },
  { slug: "oyoq-kiyim", name: "Oyoq kiyim" },
  { slug: "sumka", name: "Sumka" },
  { slug: "aksessuarlar", name: "Aksessuarlar" },
  { slug: "chegirmalar", name: "Chegirmalar" }
];

export const navCategories = categories.filter(
  (c) => c.slug !== "chegirmalar"
);
