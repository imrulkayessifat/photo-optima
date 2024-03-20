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
    image: ImageProp;
    images: ImagesProps[]
}

export interface StoreDataTypes {
    src:string;
    title:string;
}