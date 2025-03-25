export interface Product {
    id: string;
    name: string;
    available: boolean;
    category: string;
    size: string;
    code: number;
    imageUrl?: string;
}

export interface ProductFormData {
    name: string;
    available: boolean;
    category: string;
    size: string;
    code: number | string;
    image: File | null;
}
