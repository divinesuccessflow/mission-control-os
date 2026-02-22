'use client';

import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { Product, ProductStatus, MissionControlData, ProductChecklist } from '@/types';
import { formatNumber } from '@/lib/utils';

interface GumroadProductsProps {
  data: MissionControlData;
  onUpdate: (data: MissionControlData) => void;
}

const statusOptions: ProductStatus[] = ['Creating', 'Ready', 'Uploaded', 'Live', 'Promoted'];

export default function GumroadProducts({ data, onUpdate }: GumroadProductsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.type || !newProduct.price) {
      alert('Please fill in all fields');
      return;
    }

    const product: Product = {
      id: `product${Date.now()}`,
      name: newProduct.name,
      type: newProduct.type,
      price: parseFloat(newProduct.price),
      status: 'Creating',
      checklist: {
        fileReady: false,
        coverImage: false,
        description: false,
        priceSet: false,
        uploaded: false,
        live: false,
      },
      revenue: 0,
    };

    onUpdate({
      ...data,
      products: [...data.products, product],
    });

    setNewProduct({ name: '', type: '', price: '' });
    setShowAddForm(false);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    onUpdate({
      ...data,
      products: data.products.map(p => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const handleToggleChecklistItem = (productId: string, key: keyof ProductChecklist) => {
    const product = data.products.find(p => p.id === productId);
    if (!product) return;

    handleUpdateProduct(productId, {
      checklist: {
        ...product.checklist,
        [key]: !product.checklist[key],
      },
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      onUpdate({
        ...data,
        products: data.products.filter(p => p.id !== id),
      });
    }
  };

  const totalRevenue = data.products.reduce((sum, p) => sum + p.revenue, 0);

  const checklistItems: { key: keyof ProductChecklist; label: string }[] = [
    { key: 'fileReady', label: 'Product file ready' },
    { key: 'coverImage', label: 'Cover image' },
    { key: 'description', label: 'Description' },
    { key: 'priceSet', label: 'Price set' },
    { key: 'uploaded', label: 'Uploaded' },
    { key: 'live', label: 'Live' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-gold" />
          <div>
            <h2 className="text-3xl font-bold">Gumroad Products 🛒</h2>
            <p className="text-sm text-gray-400 mt-1">
              {data.products.length} products · ₹{formatNumber(totalRevenue)} revenue
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="border-blue/30">
          <h3 className="font-semibold mb-4">Add New Product</h3>
          <div className="space-y-4">
            <Input
              placeholder="Product name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Type (e.g., eBook, Template, Course)"
              value={newProduct.type}
              onChange={e => setNewProduct({ ...newProduct, type: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price (₹)"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddProduct}>Add Product</Button>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.products.map(product => {
          const completedItems = Object.values(product.checklist).filter(Boolean).length;
          const totalItems = checklistItems.length;

          return (
            <Card key={product.id} className="border-blue/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                    <span>{product.type}</span>
                    <span>•</span>
                    <span className="text-gold font-semibold">₹{product.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Status</label>
                <select
                  value={product.status}
                  onChange={e =>
                    handleUpdateProduct(product.id, { status: e.target.value as ProductStatus })
                  }
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checklist */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-300">
                    Upload Checklist ({completedItems}/{totalItems})
                  </h4>
                </div>
                <div className="space-y-2">
                  {checklistItems.map(item => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 cursor-pointer hover:bg-surface p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={product.checklist[item.key]}
                        onChange={() => handleToggleChecklistItem(product.id, item.key)}
                        className="w-4 h-4 accent-gold"
                      />
                      <span
                        className={`text-sm ${
                          product.checklist[item.key] ? 'text-gray-400 line-through' : 'text-gray-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Revenue */}
              <div className="pt-4 border-t border-border">
                <label className="text-xs text-gray-400 block mb-2">Revenue</label>
                <Input
                  type="number"
                  value={product.revenue}
                  onChange={e =>
                    handleUpdateProduct(product.id, { revenue: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0"
                />
              </div>
            </Card>
          );
        })}
      </div>

      {data.products.length === 0 && (
        <Card className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No products yet. Add your first digital product!</p>
        </Card>
      )}
    </div>
  );
}
