'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Cpu, 
  Gauge, 
  HardDrive, 
  Zap, 
  Play, 
  Pause, 
  Stop, 
  Plus, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Server,
  Activity,
  DollarSign,
  BarChart3,
  Users,
  Calendar,
  ArrowRight,
  RefreshCw,
  Power,
  PowerOff
} from 'lucide-react'

const computeInstances = [
  {
    id: 'gpu-001',
    name: 'RTX-3080-Training',
    type: 'GPU',
    status: 'running',
    specs: {
      gpu: 'NVIDIA RTX 3080',
      cpu: '8 cores',
      memory: '32 GB',
      storage: '500 GB SSD'
    },
    usage: {
      gpu: 85,
      cpu: 45,
      memory: 78,
      storage: 23
    },
    cost: 2.50,
    uptime: '2d 14h 32m',
    user: 'john.doe',
    purpose: 'Model Training'
  },
  {
    id: 'gpu-002',
    name: 'RTX-4090-Inference',
    type: 'GPU',
    status: 'idle',
    specs: {
      gpu: 'NVIDIA RTX 4090',
      cpu: '12 cores',
      memory: '64 GB',
      storage: '1 TB SSD'
    },
    usage: {
      gpu: 12,
      cpu: 8,
      memory: 15,
      storage: 45
    },
    cost: 4.20,
    uptime: '5d 8h 15m',
    user: 'jane.smith',
    purpose: 'Model Inference'
  },
  {
    id: 'cpu-001',
    name: 'CPU-Cluster-01',
    type: 'CPU',
    status: 'running',
    specs: {
      gpu: 'None',
      cpu: '32 cores',
      memory: '128 GB',
      storage: '2 TB SSD'
    },
    usage: {
      gpu: 0,
      cpu: 67,
      memory: 82,
      storage: 67
    },
    cost: 1.80,
    uptime: '1d 22h 45m',
    user: 'admin',
    purpose: 'Data Processing'
  }
]

const jobQueue = [
  {
    id: 'job-001',
    name: 'Customer Churn Model Training',
    type: 'training',
    status: 'running',
    priority: 'high',
    user: 'john.doe',
    submitted: '2024-01-15 10:30',
    estimated: '2h 30m',
    progress: 65,
    resources: 'RTX-3080-Training',
    cost: 3.75
  },
  {
    id: 'job-002',
    name: 'Fraud Detection Inference',
    type: 'inference',
    status: 'queued',
    priority: 'medium',
    user: 'jane.smith',
    submitted: '2024-01-15 11:15',
    estimated: '45m',
    progress: 0,
    resources: 'RTX-4090-Inference',
    cost: 1.20
  },
  {
    id: 'job-003',
    name: 'Data Preprocessing Pipeline',
    type: 'processing',
    status: 'completed',
    priority: 'low',
    user: 'admin',
    submitted: '2024-01-15 09:00',
    estimated: '1h 15m',
    progress: 100,
    resources: 'CPU-Cluster-01',
    cost: 0.90
  }
]

const costBreakdown = [
  { category: 'GPU Instances', amount: 156.80, percentage: 65 },
  { category: 'CPU Instances', amount: 43.20, percentage: 18 },
  { category: 'Storage', amount: 28.50, percentage: 12 },
  { category: 'Network', amount: 12.30, percentage: 5 }
]

export default function Compute() {
  const [activeTab, setActiveTab] = useState('instances')
  const [selectedInstance, setSelectedInstance] = useState(computeInstances[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'idle':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'stopped':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'queued':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="w-4 h-4 text-green-600" />
      case 'idle':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'stopped':
        return <PowerOff className="w-4 h-4 text-red-600" />
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Compute Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Instance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Instances</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Running Jobs</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Queued Jobs</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Cost</p>
                <p className="text-2xl font-bold text-gray-900">$241.80</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('instances')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'instances'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Instances
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'jobs'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Job Queue
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'costs'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Cost Analysis
          </button>
        </div>

        {activeTab === 'instances' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instance List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Compute Instances</h2>
                  <div className="flex items-center space-x-2">
                    <button className="btn-secondary text-sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {computeInstances.map((instance) => (
                    <div
                      key={instance.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedInstance.id === instance.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedInstance(instance)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(instance.status)}`}>
                            {instance.status}
                          </div>
                          <h3 className="font-semibold text-gray-900">{instance.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(instance.status)}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Power className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{instance.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">User:</span>
                          <p className="font-medium">{instance.user}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Uptime:</span>
                          <p className="font-medium">{instance.uptime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Cost/hr:</span>
                          <p className="font-medium">${instance.cost}</p>
                        </div>
                      </div>

                      {/* Usage Bars */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>GPU Usage</span>
                          <span>{instance.usage.gpu}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${instance.usage.gpu}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span>Memory Usage</span>
                          <span>{instance.usage.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${instance.usage.memory}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instance Details */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Instance Details</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedInstance.status)}`}>
                          {selectedInstance.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{selectedInstance.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">User:</span>
                        <span>{selectedInstance.user}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Purpose:</span>
                        <span>{selectedInstance.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Uptime:</span>
                        <span>{selectedInstance.uptime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">GPU:</span>
                        <span>{selectedInstance.specs.gpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CPU:</span>
                        <span>{selectedInstance.specs.cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Memory:</span>
                        <span>{selectedInstance.specs.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Storage:</span>
                        <span>{selectedInstance.specs.storage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <button className="btn-primary text-sm">
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </button>
                      <button className="btn-secondary text-sm">
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Job Queue</h2>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Submit Job
              </button>
            </div>

            <div className="space-y-4">
              {jobQueue.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                        {job.priority}
                      </div>
                      <h3 className="font-semibold text-gray-900">{job.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(job.status)}
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <p className="font-medium">{job.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">User:</span>
                      <p className="font-medium">{job.user}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Resources:</span>
                      <p className="font-medium">{job.resources}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost:</span>
                      <p className="font-medium">${job.cost}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'costs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cost Breakdown */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cost Breakdown</h2>
              <div className="space-y-4">
                {costBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-primary-600 rounded"></div>
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.amount}</p>
                      <p className="text-sm text-gray-500">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cost Trends</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Cost trend chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 