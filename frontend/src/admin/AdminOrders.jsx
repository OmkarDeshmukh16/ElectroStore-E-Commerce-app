import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEye, FiChevronDown, FiX, FiMapPin, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { MOCK_ORDERS } from './mockData'

const STATUS_STYLES = {
  Pending:          { badge: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30', dot: 'bg-yellow-400' },
  Shipped:          { badge: 'text-blue-400 bg-blue-400/10 border border-blue-400/30',       dot: 'bg-blue-400' },
  'Out for Delivery': { badge: 'text-orange-400 bg-orange-400/10 border border-orange-400/30', dot: 'bg-orange-400' },
  Delivered:        { badge: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30', dot: 'bg-emerald-400' },
}

const STATUS_FLOW = ['Pending', 'Shipped', 'Out for Delivery', 'Delivered']

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openStatusMenu, setOpenStatusMenu] = useState(null)

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o))
    setOpenStatusMenu(null)
    toast.success(`Order ${orderId} → ${newStatus}`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-black font-poppins gradient-text">Orders & Deliveries</h1>
        <p className="text-slate-400 text-sm mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Status Summary Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {STATUS_FLOW.map((s) => {
          const count = orders.filter((o) => o.status === s).length
          return (
            <div key={s} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${STATUS_STYLES[s].badge}`}>
              <span className={`w-2 h-2 rounded-full ${STATUS_STYLES[s].dot}`} />
              {s} <span className="opacity-70">({count})</span>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Order ID', 'Customer', 'Products', 'Total', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/4 transition-colors"
                >
                  {/* Order ID */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-mono font-bold text-primary-400">{order._id}</p>
                    <p className="text-xs text-slate-600">{order.date}</p>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-white">{order.customer}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[160px]">{order.address.split(',')[0]}</p>
                  </td>

                  {/* Products */}
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      {order.products.map((p, pi) => (
                        <p key={pi} className="text-xs text-slate-300 truncate max-w-[140px]">
                          {p.name} ×{p.qty}
                        </p>
                      ))}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-5 py-4 text-sm font-bold text-white">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_STYLES[order.status]?.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[order.status]?.dot}`} />
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* View Details */}
                      <motion.button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 rounded-xl text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 transition-all"
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </motion.button>

                      {/* Update Status Dropdown */}
                      <div className="relative">
                        <motion.button
                          onClick={() => setOpenStatusMenu(openStatusMenu === order._id ? null : order._id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white glass-card hover:border-primary-500/40 transition-all"
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        >
                          Update <FiChevronDown className={`w-3 h-3 transition-transform ${openStatusMenu === order._id ? 'rotate-180' : ''}`} />
                        </motion.button>

                        <AnimatePresence>
                          {openStatusMenu === order._id && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              className="absolute right-0 mt-1 w-44 glass-card py-1 z-20"
                            >
                              {STATUS_FLOW.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(order._id, s)}
                                  className={`flex items-center gap-2 w-full px-4 py-2.5 text-xs transition-all hover:bg-white/5 ${
                                    order.status === s ? 'text-primary-400 font-semibold' : 'text-slate-300'
                                  }`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${STATUS_STYLES[s].dot}`} />
                                  {s}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={(e) => e.target === e.currentTarget && setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              className="glass-card p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black font-poppins gradient-text">{selectedOrder._id}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedOrder.date}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info */}
              <div className="glass-card p-4 mb-4">
                <p className="text-sm font-semibold text-white mb-3">{selectedOrder.customer}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <FiMapPin className="w-3.5 h-3.5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span>{selectedOrder.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FiPhone className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Products</h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/4">
                      <div>
                        <p className="text-sm font-medium text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">Qty: {p.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-white">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary-600/10 border border-primary-500/20 mb-4">
                <span className="text-sm font-semibold text-white">Total Amount</span>
                <span className="text-lg font-black gradient-text">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Current Status</span>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_STYLES[selectedOrder.status]?.badge}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
