import React from "react";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { productCategories } from "../../data/product-category";

function CategoryNavBar() {

    const [isActive, setIsActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleCategoryClick = (categoryId: number) => {
        setIsActive(true);
        setActiveIndex(categoryId);
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
                            {productCategories.map((category, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        href={`#${category.value}`}
                                        onClick={(e) => {
                                            handleCategoryClick(index);
                                        }}
                                        style={{
                                            padding: '12px 20px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: isActive && activeIndex === index ? '#000' : '#666',
                                            borderBottom: isActive && activeIndex === index ? '3px solid #FFD700' : 'none',
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