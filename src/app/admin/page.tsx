'use client';

import Link from 'next/link';
import { Users, ClipboardList, Database, Box, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const adminSections = [
  {
    title: 'Technicians',
    description: 'Manage your team of skilled professionals',
    icon: Users,
    href: '/admin/technicians',
    color: 'from-blue-500 to-cyan-500',
    count: 'Manage Staff'
  },
  {
    title: 'Work Order Templates',
    description: 'Create and organize standard job templates',
    icon: ClipboardList,
    href: '/admin/work-order-templates',
    color: 'from-purple-500 to-pink-500',
    count: 'Job Templates'
  },
  {
    title: 'Vendors',
    description: 'Track suppliers and service providers',
    icon: Box,
    href: '/admin/vendors',
    color: 'from-amber-500 to-orange-500',
    count: 'Suppliers'
  },
  {
    title: 'Parts & Inventory',
    description: 'Manage stock levels and component inventory',
    icon: Database,
    href: '/admin/parts',
    color: 'from-emerald-500 to-teal-500',
    count: 'Parts'
  },
  {
    title: 'Purchase Orders',
    description: 'Create and track vendor purchase orders',
    icon: ClipboardList,
    href: '/admin/purchase-orders',
    color: 'from-rose-500 to-red-500',
    count: 'Orders'
  },
];

const stats = [
  { label: 'Active Operations', value: 'Dashboard', icon: Zap },
];

export default function AdminIndex() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Admin Console</h1>
        <p className="text-slate-400 text-lg">Manage your operations, technicians, inventory, and vendors from one unified dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-emerald-400 opacity-50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin Sections Grid */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Link href={section.href}>
                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 cursor-pointer transition-all hover:border-slate-600 hover:bg-slate-800/50 h-full">
                    <div className={`bg-gradient-to-br ${section.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{section.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">{section.count}</span>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-slate-800/30 border border-slate-700 rounded-lg p-8">
        <h3 className="text-lg font-bold text-white mb-4">Pro Tips</h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-emerald-400 mt-0.5">•</span>
            <span>Use the left sidebar to navigate between management sections at any time</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-400 mt-0.5">•</span>
            <span>All changes are saved automatically when you create or update records</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-400 mt-0.5">•</span>
            <span>Use the expand/collapse icons to manage technicians, vendors, and more</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-emerald-400 mt-0.5">•</span>
            <span>All data is stored locally in demo mode for testing purposes</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
