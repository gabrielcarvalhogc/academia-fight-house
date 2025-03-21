import React from 'react';
import { Pagination } from 'react-bootstrap';

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
}) => {

    // Lógica para exibir um número limitado de páginas quando houver muitas
    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];

        // Definir o intervalo de páginas a serem exibidas
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        // Ajustar o início se estiver próximo ao final
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        // Sempre mostrar a primeira página
        if (startPage > 0) {
            pageNumbers.push(
                <Pagination.Item
                    key={0}
                    active={0 === currentPage}
                    onClick={() => onPageChange(0)}
                >
                    1
                </Pagination.Item>
            );

            // Adicionar elipses se houver páginas ocultas no início
            if (startPage > 1) {
                pageNumbers.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            }
        }

        // Renderizar as páginas visíveis
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i + 1}
                </Pagination.Item>
            );
        }

        // Sempre mostrar a última página
        if (endPage < totalPages - 1) {
            // Adicionar elipses se houver páginas ocultas no final
            if (endPage < totalPages - 2) {
                pageNumbers.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            }

            pageNumbers.push(
                <Pagination.Item
                    key={totalPages - 1}
                    active={totalPages - 1 === currentPage}
                    onClick={() => onPageChange(totalPages - 1)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return pageNumbers;
    };

    return (
        <Pagination className="justify-content-center mt-3">
            <Pagination.Prev
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
            />

            {renderPageNumbers()}

            <Pagination.Next
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
            />
        </Pagination>
    );
};

export default CustomPagination;