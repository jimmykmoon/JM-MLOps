'use client'

import React from 'react'
import { Play, Square, Trash2, ExternalLink, Clock, Cpu, HardDrive } from 'lucide-react'

const sessions = [
  {
    id: 'sess-001',
    name: 'TensorFlow Training',
    image: 'tensorflow:2.8.0-gpu',
    status: 'running',
    uptime: '2h 15m',
    cpu: '4 cores',
    memory: '8 GB',
    gpu: '1x RTX 3080',
    created: '2024-01-15 10:30',
    user: 'john.doe'
  },
  {
    id: 'sess-002',
    name: 'PyTorch Inference',
    image: 'pytorch:1.12.0',
    status: 'running',
    uptime: '45m',
    cpu: '2 cores',
    memory: '4 GB',
    gpu: 'None',
    created: '2024-01-15 11:45',
    user: 'jane.smith'
  },
  {
    id: 'sess-003',
    name: 'Jupyter Notebook',
    image: 'jupyter:latest',
    status: 'stopped',
    uptime: '0m',
    cpu: '2 cores',
    memory: '4 GB',
    gpu: 'None',
    created: '2024-01-15 09:15',
    user: 'john.doe'
  }
]

export default function SessionList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'status-running'
      case 'stopped':
        return 'status-stopped'
      case 'pending':
        return 'status-pending'
      default:
        return 'status-stopped'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case 'stopped':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      case 'pending':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    }
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(session.status)}
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(session.status)}`}>
                  {session.status.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{session.name}</h3>
                <p className="text-sm text-gray-500">{session.image}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Play className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Square className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Uptime: {session.uptime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{session.cpu}</span>
            </div>
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{session.memory}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">GPU: {session.gpu}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Created: {session.created}</span>
            <span>User: {session.user}</span>
          </div>
        </div>
      ))}
    </div>
  )
} 