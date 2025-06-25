import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
interface Stats {
  totalExpenses: number;
  monthlyExpenses: number;
  categoryBreakdown: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  monthlyTrend: Array<{
    _id: { year: number; month: number };
    total: number;
    count: number;
  }>;
}
interface StatsCardsProps {
  stats: Stats;
}
export default function StatsCards({ stats }: StatsCardsProps) {
  const topCategory = stats.categoryBreakdown[0];
  const previousMonthExpenses = stats.monthlyTrend[stats.monthlyTrend.length - 2]?.total || 0;
  const currentMonthExpenses = stats.monthlyExpenses;
  const monthlyChange = previousMonthExpenses > 0 
    ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100 
    : 0;
  const cards = [
    {
      title: 'Total Expenses',
      value: `₹${stats.totalExpenses.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      description: 'All time total'
    },
    {
      title: 'This Month',
      value: `₹${stats.monthlyExpenses.toLocaleString()}`,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      description: `${monthlyChange >= 0 ? '+' : ''}${monthlyChange.toFixed(1)}% from last month`
    },
    {
      title: 'Monthly Trend',
      value: `${monthlyChange >= 0 ? '↗' : '↘'} ${Math.abs(monthlyChange).toFixed(1)}%`,
      icon: TrendingUp,
      color: monthlyChange >= 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600',
      description: 'Month over month'
    },
    {
      title: 'Top Category',
      value: topCategory?.total ? `₹${topCategory.total.toLocaleString()}` : '₹0',
      icon: PieChart,
      color: 'from-purple-500 to-purple-600',
      description: topCategory?._id || 'No expenses yet'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-gradient-to-r ${card.color} rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>     
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
