/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './context';
import type { core, connectionPluginCore } from 'nexus';
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "JSONObject";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "JSONObject";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>,
    ): void;
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateCategoryInput: {
    // input type
    icon: string; // String!
    name: string; // String!
    slug: string; // String!
  };
  CreateProductInput: {
    // input type
    categoryId: string; // String!
    description: string; // String!
    fromPrice?: number | null; // Int
    mainAsset: string; // String!
    name: string; // String!
    price?: number | null; // Int
    quantity?: number | null; // Int
    shopId?: string | null; // String
    slug: string; // String!
  };
  CreateShopInput: {
    // input type
    address: string; // String!
    city: string; // String!
    country: string; // String!
    email: string; // String!
    googleMapsUrl: string; // String!
    image: string; // String!
    openHours?: NexusGenScalars['JSONObject'] | null; // JSONObject
    phoneNumber: string; // String!
    postalCode: string; // String!
  };
  CreateVariantsInput: {
    // input type
    productId: string; // String!
    type: NexusGenEnums['VariantType']; // VariantType!
    uniqueName: string; // String!
  };
  UpdateCategoryInput: {
    // input type
    icon?: string | null; // String
    id: string; // String!
    name?: string | null; // String
    slug?: string | null; // String
  };
  UpdateProductInput: {
    // input type
    categoryId?: string | null; // String
    description?: string | null; // String
    fromPrice?: number | null; // Int
    id: string; // String!
    mainAsset?: string | null; // String
    name?: string | null; // String
    price?: number | null; // Int
    quantity?: number | null; // Int
    shopId?: string | null; // String
    slug?: string | null; // String
  };
  UpdateShopInput: {
    // input type
    address?: string | null; // String
    city: string; // String!
    country?: string | null; // String
    email?: string | null; // String
    googleMapsUrl?: string | null; // String
    id: string; // String!
    image?: string | null; // String
    openHours?: NexusGenScalars['JSONObject'] | null; // JSONObject
    phoneNumber?: string | null; // String
    postalCode?: string | null; // String
  };
  UpdateVariantsInput: {
    // input type
    type: NexusGenEnums['VariantType']; // VariantType!
    uniqueName?: string | null; // String
    variantId: string; // String!
  };
}

export interface NexusGenEnums {
  VariantType: 'COLOR' | 'TEXT';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  JSONObject: any;
}

export interface NexusGenObjects {
  Category: {
    // root type
    icon?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
    slug?: string | null; // String
  };
  Mutation: {};
  Product: {
    // root type
    description?: string | null; // String
    fromPrice?: number | null; // Int
    id?: string | null; // String
    mainAsset?: string | null; // String
    name?: string | null; // String
    price?: number | null; // Int
    quantity?: number | null; // Int
    slug?: string | null; // String
  };
  Query: {};
  Shop: {
    // root type
    address?: string | null; // String
    city?: string | null; // String
    country?: string | null; // String
    email?: string | null; // String
    googleMapsUrl?: string | null; // String
    id?: string | null; // String
    image?: string | null; // String
    openHours?: NexusGenScalars['JSONObject'] | null; // JSONObject
    phoneNumber?: string | null; // String
    postalCode?: string | null; // String
  };
  Variant: {
    // root type
    id?: string | null; // String
    type?: NexusGenEnums['VariantType'] | null; // VariantType
    uniqueName?: string | null; // String
  };
  VariantValue: {
    // root type
    colorHex?: string | null; // String
    id?: string | null; // String
    value?: string | null; // String
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Category: {
    // field return type
    icon: string | null; // String
    id: string | null; // String
    name: string | null; // String
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
    slug: string | null; // String
  };
  Mutation: {
    // field return type
    createCategory: NexusGenRootTypes['Category'] | null; // Category
    createProduct: NexusGenRootTypes['Product'] | null; // Product
    createShop: NexusGenRootTypes['Shop'] | null; // Shop
    createVariant: NexusGenRootTypes['Variant'] | null; // Variant
    deleteCategory: NexusGenRootTypes['Category'] | null; // Category
    deleteProduct: NexusGenRootTypes['Product'] | null; // Product
    deleteShop: NexusGenRootTypes['Shop'] | null; // Shop
    deleteVariant: NexusGenRootTypes['Variant'] | null; // Variant
    updateCategory: NexusGenRootTypes['Category'] | null; // Category
    updateProduct: NexusGenRootTypes['Product'] | null; // Product
    updateShop: NexusGenRootTypes['Shop'] | null; // Shop
    updateVariant: NexusGenRootTypes['Variant'] | null; // Variant
  };
  Product: {
    // field return type
    category: NexusGenRootTypes['Category'] | null; // Category
    description: string | null; // String
    fromPrice: number | null; // Int
    id: string | null; // String
    mainAsset: string | null; // String
    name: string | null; // String
    price: number | null; // Int
    quantity: number | null; // Int
    shop: NexusGenRootTypes['Shop'] | null; // Shop
    slug: string | null; // String
    variants: Array<NexusGenRootTypes['Variant'] | null> | null; // [Variant]
  };
  Query: {
    // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    categoryById: NexusGenRootTypes['Category'] | null; // Category
    categoryBySlug: NexusGenRootTypes['Category'] | null; // Category
    productById: NexusGenRootTypes['Product'] | null; // Product
    productByIds: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
    productBySlug: NexusGenRootTypes['Product'] | null; // Product
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
    shopById: NexusGenRootTypes['Shop'] | null; // Shop
    shops: Array<NexusGenRootTypes['Shop'] | null> | null; // [Shop]
    variantsByProductId: Array<NexusGenRootTypes['Variant'] | null> | null; // [Variant]
  };
  Shop: {
    // field return type
    address: string | null; // String
    city: string | null; // String
    country: string | null; // String
    email: string | null; // String
    googleMapsUrl: string | null; // String
    id: string | null; // String
    image: string | null; // String
    openHours: NexusGenScalars['JSONObject'] | null; // JSONObject
    phoneNumber: string | null; // String
    postalCode: string | null; // String
  };
  Variant: {
    // field return type
    id: string | null; // String
    type: NexusGenEnums['VariantType'] | null; // VariantType
    uniqueName: string | null; // String
    values: Array<NexusGenRootTypes['VariantValue'] | null> | null; // [VariantValue]
  };
  VariantValue: {
    // field return type
    colorHex: string | null; // String
    id: string | null; // String
    value: string | null; // String
  };
}

export interface NexusGenFieldTypeNames {
  Category: {
    // field return type name
    icon: 'String';
    id: 'String';
    name: 'String';
    products: 'Product';
    slug: 'String';
  };
  Mutation: {
    // field return type name
    createCategory: 'Category';
    createProduct: 'Product';
    createShop: 'Shop';
    createVariant: 'Variant';
    deleteCategory: 'Category';
    deleteProduct: 'Product';
    deleteShop: 'Shop';
    deleteVariant: 'Variant';
    updateCategory: 'Category';
    updateProduct: 'Product';
    updateShop: 'Shop';
    updateVariant: 'Variant';
  };
  Product: {
    // field return type name
    category: 'Category';
    description: 'String';
    fromPrice: 'Int';
    id: 'String';
    mainAsset: 'String';
    name: 'String';
    price: 'Int';
    quantity: 'Int';
    shop: 'Shop';
    slug: 'String';
    variants: 'Variant';
  };
  Query: {
    // field return type name
    categories: 'Category';
    categoryById: 'Category';
    categoryBySlug: 'Category';
    productById: 'Product';
    productByIds: 'Product';
    productBySlug: 'Product';
    products: 'Product';
    shopById: 'Shop';
    shops: 'Shop';
    variantsByProductId: 'Variant';
  };
  Shop: {
    // field return type name
    address: 'String';
    city: 'String';
    country: 'String';
    email: 'String';
    googleMapsUrl: 'String';
    id: 'String';
    image: 'String';
    openHours: 'JSONObject';
    phoneNumber: 'String';
    postalCode: 'String';
  };
  Variant: {
    // field return type name
    id: 'String';
    type: 'VariantType';
    uniqueName: 'String';
    values: 'VariantValue';
  };
  VariantValue: {
    // field return type name
    colorHex: 'String';
    id: 'String';
    value: 'String';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    createCategory: {
      // args
      createCategoryInput: NexusGenInputs['CreateCategoryInput']; // CreateCategoryInput!
    };
    createProduct: {
      // args
      createProductInput: NexusGenInputs['CreateProductInput']; // CreateProductInput!
    };
    createShop: {
      // args
      createShopInput: NexusGenInputs['CreateShopInput']; // CreateShopInput!
    };
    createVariant: {
      // args
      createVariantInput: NexusGenInputs['CreateVariantsInput']; // CreateVariantsInput!
    };
    deleteCategory: {
      // args
      id: string; // String!
    };
    deleteProduct: {
      // args
      id: string; // String!
    };
    deleteShop: {
      // args
      id: string; // String!
    };
    deleteVariant: {
      // args
      id: string; // String!
    };
    updateCategory: {
      // args
      updateCategoryInput: NexusGenInputs['UpdateCategoryInput']; // UpdateCategoryInput!
    };
    updateProduct: {
      // args
      updateProductInput: NexusGenInputs['UpdateProductInput']; // UpdateProductInput!
    };
    updateShop: {
      // args
      updateShopInput: NexusGenInputs['UpdateShopInput']; // UpdateShopInput!
    };
    updateVariant: {
      // args
      updateVariantInput: NexusGenInputs['UpdateVariantsInput']; // UpdateVariantsInput!
    };
  };
  Query: {
    categoryById: {
      // args
      id: string; // String!
    };
    categoryBySlug: {
      // args
      slug: string; // String!
    };
    productById: {
      // args
      id: string; // String!
    };
    productByIds: {
      // args
      ids: Array<string | null>; // [String]!
    };
    productBySlug: {
      // args
      slug: string; // String!
    };
    shopById: {
      // args
      id: string; // String!
    };
    variantsByProductId: {
      // args
      id: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
