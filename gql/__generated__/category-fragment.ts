/* eslint-disable */
/* This is an autogenerated file. Do not edit this file directly! */
export type ProductFragment = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    mainAsset: {
        url: string;
    };
    assets: ({
        url: string;
    })[];
    category: ({
        name: string;
        slug: string;
    }) | null;
};
export type CategoryFragment = {
    id: string;
    name: string;
    slug: string;
    file: ({
        url: string;
    }) | null;
    products: (ProductFragment)[];
};
