// profile page having choose avatar,currency,bio and many more functionality
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { User, Camera, Save, Mail, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const avatarEmojis = ['👤', '😊', '🎉', '🚀', '💼', '🏆', '🌟', '💡', '🎯', '📊', '💰', '🔥'];
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];
export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '👤',
    bio: user?.bio || '',
    currency: user?.currency || 'USD',
    theme: user?.theme || 'light'
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarSelect = (emoji: string) => {
    setFormData({
      ...formData,
      avatar: emoji
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };
  if (!user) return null;

  return (
    <>
      <div className="w-full text-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
        <h1 className="text-3xl font-bold text-white tracking-wide">Expense Tracker</h1>
      </div>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{user.avatar}</div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  <div className="flex items-center mt-2 text-blue-100">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Avatar</h2>
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-3">
                    {avatarEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleAvatarSelect(emoji)}
                        className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                          formData.avatar === emoji
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us a bit about yourself..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.bio.length}/200 characters
                  </p>
                </div>
                {/* Preferences */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Currency
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Save Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
}
