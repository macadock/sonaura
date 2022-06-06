/* eslint-disable */
/* This is an autogenerated file. Do not edit this file directly! */
export type ColorsFragment = {
    id: string;
    name: string;
    color: "fabric" | "gold_oak" | "silver_natural_oak" | "bronze_walnut" | "light_oak_wood" | "oak_wood" | "natural_aluminium" | "infantry_green" | "purple_heart" | "black_aluminium" | "brass_tone_aluminium" | "black_fabric" | "bronze_tone_aluminium" | "gold_tone" | "black" | "nordic_ice" | "white_marble" | "silver" | "gold" | "bronze" | "natural" | "grey_mist" | "green" | "black_anthracite" | "pink" | "anthracite_oxygen" | "berluti_edition" | "oxygen_blue" | "sand" | "dark_maroon" | "timber" | "navy" | "chestnut" | "parisian_night_blue";
    colorCode: {
        hex: any;
    };
};
export type SizesFragment = {
    id: string;
    name: string;
    size: "s_65" | "s_77" | "s_88" | "s_55" | "s_48";
};
export type PositionningsFragment = {
    id: string;
    name: string;
    positionning: "fixed" | "motorized" | "wall_mount" | "floor" | "table";
};
export type FrameColorsFragment = {
    id: string;
    name: string;
    frameColor: "silver" | "black" | "gold";
    colorCode: {
        hex: any;
    };
};
export type SoundbarColorsFragment = {
    id: string;
    name: string;
    color: "light_oak" | "smocked_oak" | "walnut" | "grey_melange";
    colorCode: {
        hex: any;
    };
};
export type SupportColorsFragment = {
    id: string;
    name: string;
    supportColor: "silver" | "bronze" | "piano_black";
    colorCode: {
        hex: any;
    };
};
export type ProductFragment = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number | null;
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
    isNew: boolean;
    colors: (ColorsFragment)[];
    sizes: (SizesFragment)[];
    positionnings: (PositionningsFragment)[];
    frameColors: (FrameColorsFragment)[];
    soundbarColors: (SoundbarColorsFragment)[];
    supportColors: (SupportColorsFragment)[];
    quantity: number;
};
export type Product = {
    product: (ProductFragment) | null;
};
export type ProductVariables = {
    slug: string;
};
