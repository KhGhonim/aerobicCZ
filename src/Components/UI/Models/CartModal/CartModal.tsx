"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartModal = ({ isOpen, onClose, cartItems, onQuantityChange, onRemoveItem }: CartModalProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 mb-6 last:mb-0">
                    {/* Item Icon */}
                    <div className="w-12 h-12 bg-[var(--magenta)] rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-[var(--magenta)] rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-gray-600 mb-2">$ {item.price.toFixed(2)} USD</p>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[var(--darkMagenta)] cursor-pointer hover:text-[#8f1d52] text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-16 h-8 border border-gray-300 rounded-full text-center text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--magenta)] bg-[var(--lightGrey)]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-800 font-medium">Subtotal</span>
                  <span className="text-gray-800 font-semibold">$ {subtotal.toFixed(2)} USD</span>
                </div>
                
                {/* Checkout Button */}
                <button className="w-full bg-[var(--darkMagenta)] text-white font-bold py-4 rounded-xl hover:bg-[#8f1d52] transition-colors">
                  Continue to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartModal 