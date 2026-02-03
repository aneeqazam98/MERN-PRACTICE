'use client'
import { useState, useEffect } from 'react';
import TestForm from './testform';


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}

export default function Home() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const fetchProducts = async () => {
const response = await fetch('/api/products');
const result = await response.json();
setProducts(result.data);
};
useEffect(() => {
  fetchProducts();
}, []);
return (
  <div>
    <h1>Ecommerce Store</h1>

    {loading ? <p>Loading...</p> : (
      products.map((item) => (
        <p key={item._id}>{item.name}</p>
      ))
    )}

    <TestForm />

  </div>
);


}

