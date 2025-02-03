import React, {useState} from 'react'
import ProductItem from '../components/ProductItem'
import SidebarFilters from '../components/SidebarFilters';
import SortingOptions from '../components/SortFilterBar';
import SubNavBar from '../components/SubNavBar';
const products = [
  {
    id: 1,
    name: 'Lenskart BLU Screen Glasses',
    image: 'src/assets/img_1_1.webp',
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 2,
    name: 'Lenskart BLU Screen Glasses (Black)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 3,
    name: 'Lenskart BLU Screen Glasses (Blue)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 4,
    name: 'Lenskart BLU Screen Glasses (Black)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 5,
    name: 'Lenskart BLU Screen Glasses (Blue)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 6,
    name: 'Lenskart BLU Screen Glasses (Black)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 7,
    name: 'Lenskart BLU Screen Glasses (Blue)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 8,
    name: 'Lenskart BLU Screen Glasses (Black)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 9,
    name: 'Lenskart BLU Screen Glasses (Blue)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 10,
    name: 'Lenskart BLU Screen Glasses (Black)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  },
  {
    id: 11,
    name: 'Lenskart BLU Screen Glasses (Blue)',
    image: 'src/assets/img_1_1.webp', 
    rating: 4.6,
    reviews: 534,
    size: "Medium",
    power: "Zero Power",
    offeredPrice: 1299,
    originalPrice: 1999,
    colors: ["black", "blue", "brown"],
  }
];

const Products = () => {
  const[sortOption, setSortOption]=useState('best-sellers');
  return (
    <div className='container mx-auto'> 
    {/* Sub Navigation Bar */}
    <SubNavBar/>

    <div className='flex'>
    {/* Sidebar (1/4) */}
    <SidebarFilters />
    
    {/* Main Content (3/4) */}
    <div className='w-3/4'>
    {/* Sorting Options */}
     <SortingOptions onSortChange={setSortOption} />
    
    
    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />      
              
   
      ))}
    </div>
    </div>
    </div>
    </div>
  )
}

export default Products