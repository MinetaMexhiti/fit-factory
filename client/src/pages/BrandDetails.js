import React from 'react';
import { useParams } from 'react-router-dom';
import { FaRunning, FaStore, FaChartLine } from 'react-icons/fa';

const brandDetails = {
  nike: {
    name: 'Nike',
    description:
      'Nike is a global leader in sportswear, offering innovative products for athletes. From running shoes to activewear, Nike combines cutting-edge technology with sleek design to empower athletes of all levels.',
    facts: [
      'Founded in 1964 as Blue Ribbon Sports.',
      'Famous for its "Just Do It" slogan.',
      'Headquartered in Beaverton, Oregon, USA.',
    ],
    products: [
      'Nike Air Max Series',
      'Nike Dri-Fit Apparel',
      'Nike Flyknit Technology',
    ],
    inspiration:
      'Nike’s mission is to bring inspiration and innovation to every athlete in the world. If you have a body, you are an athlete.',
    stats: {
      revenue: '44.54 billion USD (2023)',
      employees: '79,100 (2023)',
      marketShare: '39% in athletic footwear globally',
    },
  },
  adidas: {
    name: 'Adidas',
    description:
      'Adidas is renowned for its performance-driven apparel and footwear. With a legacy of innovation, Adidas blends style and functionality to enhance athletic performance.',
    facts: [
      'Founded in 1949 by Adolf Dassler.',
      'Known for its "Three Stripes" logo.',
      'Headquartered in Herzogenaurach, Germany.',
    ],
    products: [
      'Ultraboost Running Shoes',
      'Adidas Originals Apparel',
      'Climacool Technology',
    ],
    inspiration:
      'Adidas strives to be the best sports company in the world by making athletes better, faster, and stronger.',
    stats: {
      revenue: '23.5 billion USD (2023)',
      employees: '62,285 (2023)',
      marketShare: '24% in global sportswear',
    },
  },
  underarmour: {
    name: 'Under Armour',
    description:
      'Under Armour is a pioneer in cutting-edge activewear, delivering innovative performance apparel and accessories for athletes worldwide.',
    facts: [
      'Founded in 1996 by Kevin Plank.',
      'First product was a moisture-wicking T-shirt.',
      'Headquartered in Baltimore, Maryland, USA.',
    ],
    products: [
      'HeatGear Compression Apparel',
      'HOVR Running Shoes',
      'Storm Technology Jackets',
    ],
    inspiration:
      'Under Armour’s mission is to make all athletes better through passion, design, and innovation.',
    stats: {
      revenue: '5.3 billion USD (2023)',
      employees: '17,500 (2023)',
      marketShare: '2.5% in global sportswear',
    },
  },
  puma: {
    name: 'Puma',
    description:
      'Puma is known for its fashionable and functional sports gear, blending innovation and style to empower athletes and fashion enthusiasts alike.',
    facts: [
      'Founded in 1948 by Rudolf Dassler.',
      'Introduced the first screw-in football studs.',
      'Headquartered in Herzogenaurach, Germany.',
    ],
    products: [
      'Puma Suede Sneakers',
      'Ignite Running Shoes',
      'Evoknit Sportswear',
    ],
    inspiration:
      'Puma’s mission is to be the fastest sports brand in the world by consistently pushing boundaries.',
    stats: {
      revenue: '8.9 billion USD (2023)',
      employees: '14,374 (2023)',
      marketShare: '7% in global sportswear',
    },
  },
};

const BrandDetails = () => {
  const { brandName } = useParams();
  const brand = brandDetails[brandName.toLowerCase()];

  if (!brand) {
    return <p>Brand not found!</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 py-16 shadow-lg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-6xl font-extrabold mb-6">{brand.name}</h1>
          <p className="text-xl">{brand.description}</p>
        </div>
      </div>

      {/* Brand Details Section */}
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
        {/* Quick Facts */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <h2 className="text-3xl font-semibold mb-4">Quick Facts</h2>
          <ul className="list-none space-y-2 text-gray-600">
            {brand.facts.map((fact, index) => (
              <li key={index} className="flex items-center space-x-3">
                <FaRunning className="text-blue-500" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Products */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg shadow-lg relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <h2 className="text-3xl font-semibold mb-4">Popular Products</h2>
          <ul className="list-none space-y-2 text-gray-600">
            {brand.products.map((product, index) => (
              <li key={index} className="flex items-center space-x-3">
                <FaStore className="text-purple-500" />
                <span>{product}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <FaChartLine className="text-green-500 text-4xl mx-auto mb-2" />
              <p className="text-lg font-semibold">{brand.stats.revenue}</p>
              <p className="text-sm text-gray-500">Annual Revenue</p>
            </div>
            <div className="p-4">
              <FaChartLine className="text-green-500 text-4xl mx-auto mb-2" />
              <p className="text-lg font-semibold">{brand.stats.employees}</p>
              <p className="text-sm text-gray-500">Employees</p>
            </div>
            <div className="p-4">
              <FaChartLine className="text-green-500 text-4xl mx-auto mb-2" />
              <p className="text-lg font-semibold">{brand.stats.marketShare}</p>
              <p className="text-sm text-gray-500">Market Share</p>
            </div>
          </div>
        </div>

        {/* Our Inspiration */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Inspiration</h2>
          <p className="text-gray-600 italic text-center">"{brand.inspiration}"</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2024 Fit Factory. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BrandDetails;
