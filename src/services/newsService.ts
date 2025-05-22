import { newsPaginatedResponse } from '../types/newsPaginetedResponse';
import { News, NewsFormData } from '../types/newsType';
import apiService from './apiService';

const NEWS_ENDPOINT = import.meta.env.VITE_NEWS_ENDPOINT as string;
const NEWS_GET_ENDPOINT = import.meta.env.VITE_GET_NEWS_ENDPOINT as string;

export const newsService = {
    /**
     * Busca notícias com paginação.
     * @param page índice da página (0-based). Default = 0
     * @param size quantos itens por página. Default = 10
     * @param sort string de ordenação, ex: "date,desc". Default = "date,desc"
     */
    getAll: async (
        page = 0,
        size = 10,
        sort = 'date,desc'
    ): Promise<newsPaginatedResponse<News>> => {
        try {
            const response = await apiService.get<newsPaginatedResponse<News>>(
                NEWS_GET_ENDPOINT,
                {
                    params: { page, size, sort }
                }
            )
            return response
        } catch (error) {
            console.error('Erro ao buscar notícias paginadas:', error)
            throw error
        }
    },

    /**
     * Obtém uma notícia pelo ID.
     * @param id ID da notícia
     */
    getById: async (id: number, slug: string): Promise<News> => {
        try {
            return await apiService.get<News>(`${NEWS_GET_ENDPOINT}/${id}/${slug}`);
        } catch (error) {
            console.error(`Erro ao buscar notícia ${id}:`, error);
            throw error;
        }
    },

    /**
     * Cria uma nova notícia com multipart/form-data.
     * @param data Dados da notícia sem ID
     */
    create: async (data: NewsFormData): Promise<News> => {
        try {
            const formData = new FormData();
            if (data.imageFile) {
                formData.append('image', data.imageFile);
            }
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('date', data.date);
            formData.append('content', data.content);

            return await apiService.post<News>(
                NEWS_ENDPOINT,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
        } catch (error) {
            console.error('Erro ao criar notícia:', error);
            throw error;
        }
    },

    /**
     * Atualiza uma notícia existente pelo ID utilizando multipart/form-data.
     * @param id ID da notícia a ser atualizada
     * @param data Dados atualizados da notícia
     */
    update: async (id: number, data: NewsFormData): Promise<News> => {
        try {
            const formData = new FormData();

            if (data.imageFile) {
                formData.append('image', data.imageFile);
            }

            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('date', data.date);
            formData.append('content', data.content);

            return await apiService.put<News>(
                `${NEWS_ENDPOINT}/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
        } catch (error) {
            console.error(`Erro ao atualizar notícia ${id}:`, error);
            throw error;
        }
    },

    /**
     * Exclui uma notícia pelo ID.
     * @param id ID da notícia
     */
    delete: async (id: number): Promise<boolean> => {
        try {
            await apiService.delete(`${NEWS_ENDPOINT}/${id}`);
            return true;
        } catch (error) {
            console.error(`Erro ao excluir notícia ${id}:`, error);
            throw error;
        }
    },
};

export default newsService;
