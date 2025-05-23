import { useState, useCallback } from 'react';
import productService from '../services/productService';
import { Product, ProductFormData } from '../types/productTypes';
import { FeedbackMessage } from '../types/feedback';

interface PageInfo {
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

export const useAdminProducts = (selectedCategory: string, searchTerm: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        currentPage: 0,
        totalPages: 1,
        pageSize: 10,
    });
    const [feedback, setFeedback] = useState<FeedbackMessage>({
        message: '',
        type: '',
    });

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            if (searchTerm) {
                const searchedProducts = await productService.getProductsByName(searchTerm);
                setProducts(searchedProducts);
                setPageInfo({
                    currentPage: 0,
                    totalPages: 1,
                    pageSize: searchedProducts.length || 10,
                });
            } else if (selectedCategory) {
                const filteredProducts = await productService.getProductsByCategory(selectedCategory);
                setProducts(filteredProducts);
                setPageInfo({
                    currentPage: 0,
                    totalPages: 1,
                    pageSize: filteredProducts.length || 10,
                });
            } else {
                const response = await productService.getProducts(pageInfo.currentPage, pageInfo.pageSize);
                if (response?._embedded?.productResponseDTOList) {
                    setProducts(response._embedded.productResponseDTOList);
                    if (response.page) {
                        setPageInfo({
                            currentPage: response.page.number,
                            totalPages: response.page.totalPages,
                            pageSize: response.page.size,
                        });
                    }
                } else {
                    console.warn('Formato de resposta não reconhecido ou lista vazia:', response);
                    setProducts([]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setFeedback({
                message: 'Não foi possível carregar os produtos. Por favor, tente novamente.',
                type: 'danger',
            });
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [pageInfo.currentPage, pageInfo.pageSize, selectedCategory, searchTerm]);

    const createProduct = async (formData: ProductFormData) => {
        try {
            await productService.createProduct(formData);
            setFeedback({ message: 'Produto criado com sucesso!', type: 'success' });
            await fetchProducts();
        } catch (error) {
            setFeedback({ message: 'Erro ao criar produto. Por favor, tente novamente.', type: 'danger' });
            throw error;
        }
    };

    const updateProduct = async (productId: string, formData: ProductFormData) => {
        try {
            await productService.updateProduct(productId, formData);
            setFeedback({ message: 'Produto atualizado com sucesso!', type: 'success' });
            await fetchProducts();
        } catch (error) {
            setFeedback({ message: 'Erro ao atualizar produto. Por favor, tente novamente.', type: 'danger' });
            throw error;
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await productService.deleteProduct(productId);
            setFeedback({ message: 'Produto excluído com sucesso!', type: 'success' });
            await fetchProducts();
        } catch (error) {
            setFeedback({ message: 'Erro ao excluir produto. Por favor, tente novamente.', type: 'danger' });
        }
    };

    return {
        products,
        loading,
        pageInfo,
        feedback,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        setPageInfo,
        setFeedback,
    };
};
