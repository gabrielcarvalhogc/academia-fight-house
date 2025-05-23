import { HateoasResponse } from '../types/pagination';
import { Product, ProductFormData } from '../types/productTypes';
import apiService from './apiService';

const PRODUCT_ENDPOINT = import.meta.env.VITE_PRODUCT_ENDPOINT;
const PRODUCT_GET_ENDPOINT = import.meta.env.VITE_GET_PRODUCTS_ENDPOINT;

export const productService = {
    /**
     * Obtém uma lista paginada de produtos no formato HATEOAS
     * @param page Número da página (começando em 0)
     * @param size Tamanho da página
     * @returns Resposta HATEOAS contendo os produtos
     */
    getProducts: async (page: number = 0, size: number = 10): Promise<HateoasResponse<Product>> => {
        try {
            return await apiService.get<HateoasResponse<Product>>(`${PRODUCT_GET_ENDPOINT}/pagination?page=${page}&size=${size}`);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    },

    /**
     * Busca produtos filtrados por categoria.
     * Utiliza endpoint com PathVariable: /products/category/{category}
     * @param category Nome da categoria a ser filtrada
     * @returns Lista de produtos filtrados pela categoria
     */
    getProductsByCategory: async (category: string): Promise<Product[]> => {
        try {
            return await apiService.get<Product[]>(`${PRODUCT_GET_ENDPOINT}/category/${category}`);
        } catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error);
            throw error;
        }
    },

    /**
     * Busca produtos filtrados por nome.
     * Utiliza endpoint com PathVariable: /products/name/{name}
     * @param name Nome (ou parte dele) a ser buscado
     * @returns Lista de produtos que correspondem ao nome
     */
    getProductsByName: async (name: string): Promise<Product[]> => {
        try {
            return await apiService.get<Product[]>(`${PRODUCT_GET_ENDPOINT}/name/${name}`);
        } catch (error) {
            console.error('Erro ao buscar produtos por nome:', error);
            throw error;
        }
    },
    /**
     * Cria um novo produto
     * @param productData Dados do produto a ser criado
     * @returns O produto criado
     */
    createProduct: async (productData: ProductFormData): Promise<Product> => {
        try {
            const formData = new FormData();

            if (productData.image) {
                formData.append('image', productData.image);
            }

            formData.append('name', productData.name);
            formData.append('available', productData.available.toString());
            formData.append('category', productData.category);
            formData.append('size', productData.size);
            formData.append('code', productData.code.toString());

            return await apiService.post<Product>(PRODUCT_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    },

    /**
     * Atualiza um produto existente
     * @param id ID do produto a ser atualizado
     * @param productData Novos dados do produto
     * @returns O produto atualizado
     */
    updateProduct: async (id: string, productData: ProductFormData): Promise<Product> => {
        try {
            const formData = new FormData();

            if (productData.image) {
                formData.append('image', productData.image);
            }

            formData.append('name', productData.name);
            formData.append('available', productData.available.toString());
            formData.append('category', productData.category);
            formData.append('size', productData.size);
            formData.append('code', productData.code.toString());

            return await apiService.put<Product>(`${PRODUCT_ENDPOINT}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error(`Erro ao atualizar produto ${id}:`, error);
            throw error;
        }
    },

    /**
     * Remove um produto
     * @param id ID do produto a ser removido
     * @returns true se o produto foi removido com sucesso
     */
    deleteProduct: async (id: string): Promise<boolean> => {
        try {
            await apiService.delete(`${PRODUCT_ENDPOINT}/${id}`);
            return true;
        } catch (error) {
            console.error(`Erro ao excluir produto ${id}:`, error);
            throw error;
        }
    },
};

export default productService;