import React, { FormEvent, useEffect, useState } from "react";
import ProductPageHeader from "../../components/productPageHeader/ProductPageHeader";
import CategoryNavBar from "../../components/categoryNavBar/CategoryNavBar";
import productService from "../../services/productService";
import { Alert, Container } from "react-bootstrap";
import CategoryProductSlider from "../../components/productCategorySlider/ProductCategorySlider";
import { Product } from "../../types/productTypes";
import ProductCard from "../../components/productCard/ProductCard";
import EmptyState from "../../components/emptyState/EmptyState";
import Footer from "../../components/footer/Footer";

function ProductPage() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [productsByName, setProductsByName] = useState<Product[]>([]);
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [errorSearch, setErrorSearch] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await productService.getProducts(0, 100);
                const uniqueCategories = [...new Set(
                    response._embedded?.productResponseDTOList?.map(p => p.category) || []
                )];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Falha ao carregar categorias:', err);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setHasSearched(true);
        setLoadingSearch(true);
        setErrorSearch(null);

        try {
            const results = await productService.getProductsByName(searchTerm);
            setProductsByName(results);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            setErrorSearch('Não foi possível buscar os produtos. Tente novamente.');
        } finally {
            setLoadingSearch(false);
        }
    };

    return (
        <>
            <ProductPageHeader
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onSearchSubmit={handleSearch}
                loading={loadingSearch}
            />

            <main style={{ backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 400px)' }}>
                <CategoryNavBar />
                <h1 className='text-center fw-bold py-4' style={{ fontFamily: 'var(--font-title)' }}>
                    PRODUTOS
                </h1>

                <Container fluid className='py-4 px-0'>
                    {errorSearch && <Alert variant='danger'>{errorSearch}</Alert>}

                    {loadingSearch && (
                        <div className='text-center py-5'>
                            <h4 className='text-center'>Buscando produtos...</h4>
                        </div>
                    )}

                    {productsByName.length > 0 && (
                        <div className='mb-4'>
                            <h5 className='text-uppercase fs-2 py-2 ps-4' style={{ fontFamily: 'var(--font-title)' }}>Resultados da busca:</h5>
                            <div className='d-flex overflow-auto py-2'>
                                {productsByName.map((product, idx) => (
                                    <div key={idx} className='' style={{ minWidth: '200px' }}>
                                        <ProductCard
                                            imageSrc={product.imageURL}
                                            title={product.name}
                                            size={product.size}
                                            code={product.code.toString()}
                                            available={product.available}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loadingSearch && hasSearched && productsByName.length === 0 && (
                        <EmptyState />
                    )}

                    {!loadingCategories && categories.map(cat => (
                        <CategoryProductSlider
                            key={cat}
                            category={cat}
                            title={cat.toUpperCase()}
                        />
                    ))}

                    {!loadingCategories && categories.length == 0 && (
                        <EmptyState />
                    )}
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default ProductPage;