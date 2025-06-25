// It is the dashbord page where i have use famer motion..
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseCharts from '../components/ExpenseCharts';
import StatsCards from '../components/StatsCards';
import Chatbot from '../components/Chatbot';
import { Plus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  tags: string[];
}

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

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await axios.get(`/expenses?${params}`);
      if (response.data.success) {
        setExpenses(response.data.expenses);
      }
    } catch (error: any) {
      toast.error('Failed to fetch expenses');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/expenses/stats');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddExpense = async (expenseData: Omit<Expense, '_id'>) => {
    try {
      const response = await axios.post('/expenses', expenseData);
      if (response.data.success) {
        setExpenses([response.data.expense, ...expenses]);
        setShowAddForm(false);
        toast.success('Expense added successfully!');
        fetchStats();
      }
    } catch (error: any) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const handleEditExpense = async (id: string, expenseData: Omit<Expense, '_id'>) => {
    try {
      const response = await axios.put(`/expenses/${id}`, expenseData);
      if (response.data.success) {
        setExpenses(expenses.map(expense => 
          expense._id === id ? response.data.expense : expense
        ));
        setEditingExpense(null);
        toast.success('Expense updated successfully!');
        fetchStats();
      }
    } catch (error: any) {
      toast.error('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await axios.delete(`/expenses/${id}`);
      if (response.data.success) {
        setExpenses(expenses.filter(expense => expense._id !== id));
        toast.success('Expense deleted successfully!');
        fetchStats();
      }
    } catch (error: any) {
      toast.error('Failed to delete expense');
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </motion.button>
        </div>

        {/* Stats Cards */}
        {stats && <StatsCards stats={stats} />}

        {/* Charts */}
        {stats && <ExpenseCharts stats={stats} />}

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          loading={loading}
          filters={filters}
          onFiltersChange={setFilters}
          onEdit={setEditingExpense}
          onDelete={handleDeleteExpense}
        />

        {/* Add/Edit Expense Modal */}
        {(showAddForm || editingExpense) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <ExpenseForm
                expense={editingExpense}
                onSubmit={editingExpense 
                  ? (data) => handleEditExpense(editingExpense._id, data)
                  : handleAddExpense
                }
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingExpense(null);
                }}
              />
            </motion.div>
          </div>
        )}

        {/* Chatbot */}
        <Chatbot expenses={expenses} stats={stats} />  {/*for chatbot*/}
      </div>
    </DashboardLayout>
  );
}
