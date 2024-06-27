export type ImageProp = {
    src: string;
}

export type ImagesProps = {
    id: number;
    src: string;
}

export interface ProductTableProps {
    data: any
}

export type ProductDataProps = {
    id: number;
    title: string;
}

export interface ImageTableProps {
    shopifyAccessToken:string;
    storeName:string;
    plan:string;
    data: any
}

export type ImageDataProps = {
    id: string;
    url: string;
    name: string;
    alt: string;
    productId: string;
    status: string;
}

export interface StoreDataTypes {
    src: string;
    title: string;
}

export interface PlansProps {
    name: string;
    description?: string;
    bandwidth: string;
    price: number;
}

export interface QuotaProps {
    name: string;
    bandwidth: string;
    price: number;
}

export interface ComparePlansProps {
    feature: string;
    free: string;
    paid: string;
}