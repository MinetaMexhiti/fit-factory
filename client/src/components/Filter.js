import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => { //tores the current filter values (category, brand, price range, size). 
    const [filters, setFilters] = useState({
        category: '', //indicates no filter are applied 
        brand: '',
        minPrice: '',
        maxPrice: '',
        size: '',
    });
 
    //This function is triggered whenever the user changes a filter value 
    const handleChange = (e) => {
        const { name, value } = e.target; //Refers to the input element that was changed 
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Filter Products</h3>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label className="font-medium">Category:</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        value={filters.category}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        <option value="shirts">Shirts</option>
                        <option value="pants">Pants</option>
                        <option value="jackets">Jackets</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium">Brand:</label>
                    <select
                        name="brand"
                        onChange={handleChange}
                        value={filters.brand}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        <option value="Nike">Nike</option>
                        <option value="Adidas">Adidas</option>
                        <option value="Puma">Puma</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium">Price Range:</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min"
                            onChange={handleChange}
                            value={filters.minPrice}
                            className="p-2 border border-gray-300 rounded-md w-1/2"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max"
                            onChange={handleChange}
                            value={filters.maxPrice}
                            className="p-2 border border-gray-300 rounded-md w-1/2"
                        />
                    </div>
                </div>

                
                <div className="flex flex-col">
                    <label className="font-medium">Size:</label>
                    <select
                        name="size"
                        onChange={handleChange}
                        value={filters.size}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Filter;
