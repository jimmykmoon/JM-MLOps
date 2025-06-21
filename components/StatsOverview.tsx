'use client'

import React from 'react'
import { Play, Database, HardDrive, Users, TrendingUp, Clock } from 'lucide-react'

const stats = [
  {
    id: 'active-sessions',
    title: 'Active Sessions',
    value: '3',
    change: '+1',
    changeType: 'positive',
    icon: Play,
    color: 'bg-blue-500'
  },
  {
    id: 'total-models',
    title: 'Total Models',
    value: '24',
    change: '+3',
    changeType: 'positive',
    icon: Database,
    color: 'bg-green-500'
  },
  {
    id: 'storage-used',
    title: 'Storage Used',
    value: '2.4 TB',
    change: '+120 GB',
    changeType: 'neutral',
    icon: HardDrive,
    color: 'bg-purple-500'
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: Users,
    color: 'bg-orange-500'
  },
  {
    id: 'avg-session-time',
    title: 'Avg Session Time',
    value: '4.2h',
    change: '+0.5h',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-indigo-500'
  },
  {
    id: 'gpu-utilization',
    title: 'GPU Utilization',
    value: '67%',
    change: '+12%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-red-500'
  }
]

export default function StatsOverview() {
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return '↗'
      case 'negative':
        return '↘'
      default:
        return '→'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                  {getChangeIcon(stat.changeType)} {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">from last week</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 