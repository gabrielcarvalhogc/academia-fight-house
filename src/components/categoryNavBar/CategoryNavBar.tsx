import React from "react";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";

function CategoryNavBar() {
    const initialCategories = [
        { id: 1, name: 'LUVAS', active: false },
        { id: 2, name: 'CANELEIRAS', active: false },
        { id: 3, name: 'ACESSÓRIOS', active: false },
        { id: 4, name: 'MANOPLAS/APARADORES', active: false },
        { id: 5, name: 'PROTETORES', active: false },
        { id: 6, name: 'OUTROS', active: false },
    ];

    const [categories, setCategories] = useState(initialCategories);

    const handleCategoryClick = (categoryId: number) => {
        const updatedCategories = categories.map(category => ({
            ...category,
            active: category.id === categoryId
        }));

        setCategories(updatedCategories);
    };
    return (
        <div>
            <div
                style={{
                    backgroundColor: '#f5f5f5',
                    borderBottom: '1px solid #e5e5e5',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container fluid style={{ padding: 0 }}>
                    <div
                        style={{
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        <Nav className="flex-nowrap justify-content-evenly" style={{ minWidth: '100%', }}>
                            {categories.map((category) => (
                                <Nav.Item key={category.id}>
                                    <Nav.Link
                                        href={`#${category.name.toLowerCase()}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCategoryClick(category.id);
                                        }}
                                        style={{
                                            padding: '12px 20px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: category.active ? '#000' : '#666',
                                            borderBottom: category.active ? '3px solid #FFD700' : 'none',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        {category.name}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default CategoryNavBar;