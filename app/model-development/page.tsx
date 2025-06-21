'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Brain, 
  Play, 
  Settings, 
  BarChart3, 
  GitBranch, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Cpu,
  HardDrive,
  Zap,
  Eye,
  Download,
  Upload,
  Code,
  Database,
  Target,
  Layers,
  Activity,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Star,
  Bookmark,
  Share2,
  ArrowLeft,
  BookOpen,
  Rocket,
  ArrowRightCircle
} from 'lucide-react'

const mlWorkflowSteps = [
  {
    id: 1,
    title: 'Problem Definition',
    icon: BookOpen,
    color: 'bg-blue-500',
    description: 'Define business objectives and success metrics',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Data Collection',
    icon: Database,
    color: 'bg-green-500',
    description: 'Gather data from various sources',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Data Exploration',
    icon: Search,
    color: 'bg-purple-500',
    description: 'Analyze patterns and relationships',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Data Preprocessing',
    icon: Settings,
    color: 'bg-orange-500',
    description: 'Clean and prepare data',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Model Development',
    icon: Brain,
    color: 'bg-red-500',
    description: 'Train and optimize models',
    status: 'active'
  },
  {
    id: 6,
    title: 'Model Evaluation',
    icon: Target,
    color: 'bg-indigo-500',
    description: 'Assess performance metrics',
    status: 'pending'
  },
  {
    id: 7,
    title: 'Model Deployment',
    icon: Rocket,
    color: 'bg-teal-500',
    description: 'Deploy to production',
    status: 'pending'
  },
  {
    id: 8,
    title: 'Monitoring',
    icon: Activity,
    color: 'bg-pink-500',
    description: 'Monitor and maintain',
    status: 'pending'
  }
]

const experiments = [
  {
    id: 'exp-001',
    name: 'Customer Churn Prediction v2.1',
    status: 'running',
    algorithm: 'XGBoost',
    dataset: 'customer_data_v3',
    created: '2024-01-15 10:30',
    duration: '2h 15m',
    metrics: {
      accuracy: 0.894,
      precision: 0.876,
      recall: 0.912,
      f1_score: 0.893
    },
    hyperparameters: {
      learning_rate: 0.1,
      max_depth: 6,
      n_estimators: 100,
      subsample: 0.8
    },
    tags: ['production', 'churn', 'xgboost'],
    user: 'john.doe',
    gpu_usage: '2x RTX 3080',
    memory_usage: '8 GB'
  },
  {
    id: 'exp-002',
    name: 'Fraud Detection Ensemble',
    status: 'completed',
    algorithm: 'Random Forest + Neural Network',
    dataset: 'transaction_data_v2',
    created: '2024-01-14 15:45',
    duration: '4h 30m',
    metrics: {
      accuracy: 0.923,
      precision: 0.945,
      recall: 0.901,
      f1_score: 0.922
    },
    hyperparameters: {
      n_estimators: 200,
      max_depth: 10,
      learning_rate: 0.05,
      batch_size: 64
    },
    tags: ['fraud', 'ensemble', 'production'],
    user: 'jane.smith',
    gpu_usage: '1x RTX 3080',
    memory_usage: '12 GB'
  },
  {
    id: 'exp-003',
    name: 'Sales Forecasting LSTM',
    status: 'failed',
    algorithm: 'LSTM',
    dataset: 'sales_history_v1',
    created: '2024-01-13 09:20',
    duration: '1h 45m',
    metrics: {
      mae: 0.234,
      rmse: 0.456,
      mape: 12.5
    },
    hyperparameters: {
      lstm_units: 128,
      dropout: 0.2,
      epochs: 100,
      batch_size: 32
    },
    tags: ['forecasting', 'lstm', 'time-series'],
    user: 'john.doe',
    gpu_usage: '1x RTX 3080',
    memory_usage: '6 GB'
  }
]

const algorithms = [
  { name: 'XGBoost', category: 'Ensemble', description: 'Gradient boosting framework' },
  { name: 'Random Forest', category: 'Ensemble', description: 'Bagging ensemble method' },
  { name: 'Neural Network', category: 'Deep Learning', description: 'Multi-layer perceptron' },
  { name: 'LSTM', category: 'Deep Learning', description: 'Long short-term memory' },
  { name: 'Linear Regression', category: 'Linear', description: 'Simple linear model' },
  { name: 'Logistic Regression', category: 'Linear', description: 'Binary classification' },
  { name: 'SVM', category: 'Kernel', description: 'Support vector machine' },
  { name: 'K-Means', category: 'Clustering', description: 'Unsupervised clustering' }
]

const datasets = [
  { name: 'customer_data_v3', size: '2.4 GB', records: '150K', features: 45 },
  { name: 'transaction_data_v2', size: '5.1 GB', records: '500K', features: 32 },
  { name: 'sales_history_v1', size: '1.8 GB', records: '100K', features: 28 },
  { name: 'user_behavior_v4', size: '8.2 GB', records: '1M', features: 67 }
]

export default function ModelDevelopment() {
  const [activeTab, setActiveTab] = useState('experiments')
  const [selectedExperiment, setSelectedExperiment] = useState(experiments[0])
  const [showNewExperiment, setShowNewExperiment] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="w-4 h-4 text-green-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
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
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Model Development</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Import Model
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowNewExperiment(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Experiment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ML Workflow Context */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">ML Workflow - You are here: Model Development</h2>
            <div className="text-sm text-gray-500">Step 5 of 8</div>
          </div>
          
          {/* Workflow Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {mlWorkflowSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className={`border rounded-lg p-3 transition-all ${
                    step.status === 'active' 
                      ? 'ring-2 ring-primary-500 bg-primary-50' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.color}`}>
                        <step.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-xs">{step.title}</h3>
                        <div className={`inline-block px-1 py-0.5 rounded text-xs font-medium border ${getWorkflowStatusColor(step.status)}`}>
                          {step.status}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                  
                  {/* Arrow for connection */}
                  {index < mlWorkflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-3 -right-1.5 transform -translate-y-1/2">
                      <ArrowRightCircle className="w-3 h-3 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Phase Info */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Model Development Phase</h4>
                <p className="text-sm text-blue-700">Select algorithms, train models, and optimize hyperparameters for best performance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('experiments')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'experiments'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Experiments
          </button>
          <button
            onClick={() => setActiveTab('algorithms')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'algorithms'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Algorithms
          </button>
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'datasets'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Datasets
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'templates'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
        </div>

        {activeTab === 'experiments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experiment List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Experiments</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search experiments..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {experiments.map((exp) => (
                    <div
                      key={exp.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedExperiment.id === exp.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedExperiment(exp)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(exp.status)}`}>
                            {exp.status}
                          </div>
                          <h3 className="font-semibold text-gray-900">{exp.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(exp.status)}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Star className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Algorithm:</span>
                          <p className="font-medium">{exp.algorithm}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dataset:</span>
                          <p className="font-medium">{exp.dataset}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{exp.duration}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">User:</span>
                          <p className="font-medium">{exp.user}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experiment Details */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Experiment Details</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedExperiment.status)}`}>
                          {selectedExperiment.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{selectedExperiment.created}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span>{selectedExperiment.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">GPU Usage:</span>
                        <span>{selectedExperiment.gpu_usage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Memory:</span>
                        <span>{selectedExperiment.memory_usage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedExperiment.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 uppercase">{key.replace('_', ' ')}</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {typeof value === 'number' ? value.toFixed(3) : value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hyperparameters */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Hyperparameters</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(selectedExperiment.hyperparameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key.replace('_', ' ')}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <button className="btn-primary text-sm">
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </button>
                      <button className="btn-secondary text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algo) => (
              <div key={algo.name} className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary-600" />
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{algo.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{algo.category}</p>
                <p className="text-sm text-gray-600 mb-4">{algo.description}</p>
                <button className="btn-primary w-full text-sm">
                  <Play className="w-4 h-4 mr-1" />
                  Use Algorithm
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'datasets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <div key={dataset.name} className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{dataset.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{dataset.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Records:</span>
                    <span className="font-medium">{dataset.records}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Features:</span>
                    <span className="font-medium">{dataset.features}</span>
                  </div>
                </div>
                <button className="btn-primary w-full text-sm">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Use Dataset
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Experiment Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Classification Template</h3>
                <p className="text-sm text-gray-600 mb-4">Standard template for binary and multi-class classification tasks</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Used 45 times</span>
                  <button className="btn-primary text-sm">Use Template</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Regression Template</h3>
                <p className="text-sm text-gray-600 mb-4">Template for continuous value prediction tasks</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Used 23 times</span>
                  <button className="btn-primary text-sm">Use Template</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Time Series Template</h3>
                <p className="text-sm text-gray-600 mb-4">Template for forecasting and time series analysis</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Used 12 times</span>
                  <button className="btn-primary text-sm">Use Template</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 