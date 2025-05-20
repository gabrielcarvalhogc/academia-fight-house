import { useState, useEffect, useCallback } from 'react';
import newsService from '../services/newsService';
import { News, NewsFormData } from '../types/newsType';

type Feedback = { message: string; type: '' | 'success' | 'danger' | 'warning' | 'info' };

export function useAdminNews() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({ message: '', type: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNews, setSelectedNews] = useState<News | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [toDelete, setToDelete] = useState<News | null>(null);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

    const loadAll = useCallback(async () => {
        setLoading(true);
        try {
            const all = await newsService.getAll();
            setNewsList(all);
        } catch (error) {
            console.error('Erro ao carregar notícias', error);
            setFeedback({ message: 'Erro ao carregar notícias.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAll();
    }, [loadAll]);

    const openCreate = () => {
        setSelectedNews(undefined);
        setIsEditing(false);
        setModalVisible(true);
    };

    const openEdit = (item: News) => {
        setSelectedNews(item);
        setIsEditing(true);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    const handleSubmit = async (data: NewsFormData) => {
        try {
            if (isEditing && selectedNews) {
                await newsService.update(selectedNews.id, data);
                setFeedback({ message: 'Notícia atualizada!', type: 'success' });
            } else {
                await newsService.create(data);
                setFeedback({ message: 'Notícia criada!', type: 'success' });
            }
            await loadAll();
            closeModal();
        } catch (error) {
            console.error('Erro ao processar notícia', error);
            setFeedback({ message: 'Erro ao processar notícia.', type: 'danger' });
        }
    };

    const openDeleteConfirm = (item: News) => {
        setToDelete(item);
        setDeleteConfirmVisible(true);
    };

    const confirmDelete = async () => {
        if (!toDelete) return;
        try {
            await newsService.delete(toDelete.id);
            setFeedback({ message: 'Notícia excluída!', type: 'success' });
            await loadAll();
        } catch (error) {
            console.error('Erro ao excluir notícia', error);
            setFeedback({ message: 'Erro ao excluir notícia.', type: 'danger' });
        } finally {
            setToDelete(null);
            setDeleteConfirmVisible(false);
        }
    };

    const clearFeedback = () => setFeedback({ message: '', type: '' });

    return {
        newsList,
        loading,
        feedback,
        modalVisible,
        selectedNews,
        isEditing,
        deleteConfirmVisible,
        toDelete,
        openCreate,
        openEdit,
        closeModal,
        handleSubmit,
        openDeleteConfirm,
        confirmDelete,
        clearFeedback,
    };
}