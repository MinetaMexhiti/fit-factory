import React from 'react';
import nikeLogo from '../assets/images/loading.png';
import adidasLogo from '../assets/images/loading.png';
import underArmourLogo from '../assets/images/loading.png';
import pumaLogo from '../assets/images/loading.png';

const brands = [
  { id: 1, name: 'Nike', logo: nikeLogo, description: 'Innovative and stylish activewear for top performance.' },
  { id: 2, name: 'Adidas', logo: adidasLogo, description: 'Modern designs blending comfort and versatility.' },
  { id: 3, name: 'Under Armour', logo: underArmourLogo, description: 'Gear built for durability and extreme conditions.' },
  { id: 4, name: 'Puma', logo: pumaLogo, description: 'Bold and trendy sportswear for every athlete.' },
];

const BrandPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Explore Our Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <img src={brand.logo} alt={brand.name} className="w-full h-20 object-contain mb-4" />
            <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
            <p className="text-gray-600 text-center text-sm mt-2">{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
