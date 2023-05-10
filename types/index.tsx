export interface NavLink {
  slug: string;
  name: string;
}

export type Variant = {
  id: string;
  name: string;
  values: string[];
};

export type VariantImage = {
  variants: VariantReference[];
  image: Image;
};

export type VariantReference = {
  id: string;
  option: string;
};

export type Image = {
  bucket: string;
  file: string;
};

export type ImageVariant = {
  image: Image;
  variants?: ImageVariantOption[];
};

export type ImageVariantOption = {
  name: string;
  value: string;
};
