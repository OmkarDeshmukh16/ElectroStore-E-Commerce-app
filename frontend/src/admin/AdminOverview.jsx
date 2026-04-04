import { motion } from 'framer-motion'
import {
  FiBox, FiShoppingBag, FiDollarSign, FiTruck,
  FiTrendingUp, FiAlertCircle, FiArrowRight
} from 'react-icons/fi'
import { MOCK_STATS, MOCK_PRODUCTS, MOCK_ORDERS } from './mockData'

const STAT_CARDS = [
  {
    icon: FiBox,
    label: 'Total Products',
    value: MOCK_STATS.totalProducts,
    sub: '6 categories',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.3)',
    trend: '+4',
  },
  {
    icon: FiShoppingBag,
    label: 'Total Orders',
    value: MOCK_STATS.totalOrders.toLocaleString(),
    sub: 'All time',
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.3)',
    trend: '+218',
  },
  {
    icon: FiDollarSign,
    label: 'Revenue',
    value: `₹${(MOCK_STATS.totalRevenue / 1e6).toFixed(1)}M`,
    sub: 'This month',
    color: 'from-emerald-500 to-green-600',
    glow: 'rgba(16,185,129,0.3)',
    trend: '+12%',
  },
  {
    icon: FiTruck,
    label: 'Pending Deliveries',
    value: MOCK_STATS.pendingDeliveries,
    sub: 'Awaiting dispatch',
    color: 'from-orange-500 to-amber-500',
    glow: 'rgba(245,158,11,0.3)',
    trend: '-8',
  },
]

const STATUS_COLOR = {
  Delivered: 'text-emerald-400 bg-emerald-400/10',
  Shipped: 'text-blue-400 bg-blue-400/10',
  'Out for Delivery': 'text-orange-400 bg-orange-400/10',
  Pending: 'text-yellow-400 bg-yellow-400/10',
}

export default function AdminOverview({ setActiveTab }) {
  const lowStock = MOCK_PRODUCTS.filter((p) => p.stock > 0 && p.stock < 5)
  const recentOrders = MOCK_ORDERS.slice(0, 5)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-black font-poppins gradient-text">Good morning 👋</h1>
        <p className="text-slate-400 text-sm mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-5 cursor-pointer group"
            style={{ '--glow': card.glow }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3" /> {card.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-white font-poppins mb-0.5">{card.value}</p>
            <p className="text-sm font-medium text-slate-300">{card.label}</p>
            <p className="text-xs text-slate-600 mt-0.5">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white font-poppins">Recent Orders</h2>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
            >
              View all <FiArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600/30 to-accent-600/20 flex items-center justify-center text-xs font-bold text-primary-300 flex-shrink-0">
                  {order.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{order.customer}</p>
                  <p className="text-xs text-slate-500">{order._id} · {order.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                  {order.status}
                </span>
                <p className="text-sm font-bold text-white hidden sm:block">₹{order.total.toLocaleString('en-IN')}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Low Stock Warnings */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <FiAlertCircle className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-white font-poppins">Low Stock</h2>
            <span className="ml-auto text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">{lowStock.length}</span>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">All products well stocked ✓</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20"
                >
                  <img src={p.images?.[0]} alt="" className="w-9 h-9 rounded-lg object-cover bg-dark-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{p.name}</p>
                    <p className="text-xs text-amber-400">{p.stock} left</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Stats</h3>
            {[
              { label: 'In Stock', value: MOCK_PRODUCTS.filter(p => !p.outOfStock).length, color: 'text-emerald-400' },
              { label: 'Out of Stock', value: MOCK_PRODUCTS.filter(p => p.outOfStock).length, color: 'text-red-400' },
              { label: 'On Sale', value: MOCK_PRODUCTS.filter(p => p.onSale).length, color: 'text-primary-400' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
