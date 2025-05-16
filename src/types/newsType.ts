export interface News {
    id: number;
    title: string;
    author: string;
    image: string;
    content: string;
    date: string;
}

export interface NewsFormData {
    title: string;
    author: string;
    imageFile: File | undefined;
    content: string;
    date: string;
}