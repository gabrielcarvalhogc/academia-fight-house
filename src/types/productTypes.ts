export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    size: string;
    code: number;
    imageUrl?: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    category: string;
    size: string;
    code: number | string;
    image: File | null;
}
