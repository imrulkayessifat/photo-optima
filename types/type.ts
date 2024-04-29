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
    data: any
}

export type ImageDataProps = {
    id: string;
    url: string;
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
    price: string;
}

export interface QuotaProps {
    title: string;
    bandwidth: string;
    pay: string;
}

export interface ComparePlansProps {
    feature:string;
    free:string;
    paid:string;
}