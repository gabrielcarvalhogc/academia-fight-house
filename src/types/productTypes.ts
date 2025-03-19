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

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface FeedbackMessage {
    message: string;
    type: 'success' | 'danger' | 'warning' | 'info' | '';
}