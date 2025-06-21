'use client'

import React from 'react'
import { Plus, Upload, Download, Settings, Terminal, Database } from 'lucide-react'

const quickActions = [
  {
    id: 'new-session',
    title: 'New Session',
    description: 'Start a new ML training or inference session',
    icon: Plus,
    color: 'bg-blue-500',
    href: '#'
  },
  {
    id: 'upload-model',
    title: 'Upload Model',
    description: 'Upload a trained model to the model registry',
    icon: Upload,
    color: 'bg-green-500',
    href: '#'
  },
  {
    id: 'upload-dataset',
    title: 'Upload Dataset',
    description: 'Upload a new dataset for training',
    icon: Database,
    color: 'bg-purple-500',
    href: '#'
  },
  {
    id: 'terminal',
    title: 'Terminal',
    description: 'Open a terminal session',
    icon: Terminal,
    color: 'bg-gray-500',
    href: '#'
  },
  {
    id: 'download-results',
    title: 'Download Results',
    description: 'Download training results and logs',
    icon: Download,
    color: 'bg-orange-500',
    href: '#'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure platform settings',
    icon: Settings,
    color: 'bg-indigo-500',
    href: '#'
  }
]

export default function QuickActions() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            title={action.description}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center ${action.color}`}>
              <action.icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 