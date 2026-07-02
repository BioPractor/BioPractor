export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  reference: string;
  categorySlugs: string[];
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  featured: boolean;
  archived: boolean;
  views: number;
  whatsappClicks: number;
};

export type ProductInput = {
  slug: string;
  name: string;
  reference: string;
  categorySlugs: string[];
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
};
