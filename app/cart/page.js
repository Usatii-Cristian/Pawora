'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export default function CartPage() {
  const { items, itemCount, total, removeFromCart, updateQuantity } = useCart();

  const shipping = total >= 50 ? 0 : 4.99;
  const orderTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-9 h-9 text-stone-400" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-stone-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-2">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl font-bold text-stone-900">
            Shopping Cart
            <span className="ml-2 text-lg font-normal text-stone-500">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-4 border border-stone-100 shadow-sm"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-stone-50"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-green-700 capitalize">
                    {item.category.replace(/-/g, ' ')}
                  </span>
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 mt-0.5 hover:text-green-700 transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 bg-stone-50 rounded-xl p-1 border border-stone-100">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 text-stone-600" />
                      </button>
                      <span className="text-sm font-semibold text-stone-900 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 text-stone-600" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-stone-900 mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">
                    Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-medium text-stone-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Shipping</span>
                  <span
                    className={`font-medium ${
                      shipping === 0 ? 'text-green-600' : 'text-stone-900'
                    }`}
                  >
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {total < 50 && (
                  <div className="bg-stone-50 rounded-xl px-3 py-2.5 text-xs text-stone-600">
                    Add{' '}
                    <span className="font-semibold text-stone-900">
                      ${(50 - total).toFixed(2)}
                    </span>{' '}
                    more to unlock free shipping
                  </div>
                )}

                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900">Total</span>
                  <span className="font-bold text-stone-900 text-lg">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-green-700 text-white font-semibold py-4 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-stone-400 text-center mt-3">
                Payment system not yet implemented
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
