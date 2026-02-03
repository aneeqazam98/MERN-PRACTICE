'use client';
import { useState } from 'react';

export default function TestForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  });
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: formData.stock ? parseInt(formData.stock) : 0,
      }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test Product Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} />
        <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description:e.target.value})} />
        <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price:e.target.value})} />
        <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image:e.target.value})} />
        <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category:e.target.value})} />
        <input placeholder="Stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock:e.target.value})} />
        <button type="submit">Send Product</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
