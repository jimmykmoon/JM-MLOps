'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Database, 
  Upload, 
  Download, 
  Settings, 
  Plus, 
  Eye, 
  Trash2, 
  RefreshCw, 
  ArrowLeft,
  Server,
  Activity,
  Target,
  BarChart3,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Image,
  Table,
  Code,
  FileSpreadsheet,
  FileImage,
  FileCode,
  Zap,
  Cpu,
  HardDrive,
  Globe,
  Cloud,
  Key,
  Shield,
  Wifi,
  WifiOff,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Globe as GlobeIcon,
  FileText as FileTextIcon,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  Lock,
  Unlock
} from 'lucide-react'

const dataSources = [
  {
    id: 'mysql-001',
    name: 'Customer Database',
    type: 'MySQL',
    status: 'connected',
    host: 'mysql.company.com',
    port: 3306,
    database: 'customers',
    tables: 15,
    records: '2.5M',
    size: '45.2 GB',
    lastSync: '2024-01-15 10:30',
    credentials: 'encrypted',
    user: 'admin',
    ssl: true
  },
  {
    id: 'postgres-001',
    name: 'Analytics Warehouse',
    type: 'PostgreSQL',
    status: 'connected',
    host: 'postgres.analytics.com',
    port: 5432,
    database: 'analytics',
    tables: 28,
    records: '15.8M',
    size: '234.7 GB',
    lastSync: '2024-01-15 09:15',
    credentials: 'encrypted',
    user: 'analytics_user',
    ssl: true
  },
  {
    id: 'mongodb-001',
    name: 'User Behavior Data',
    type: 'MongoDB',
    status: 'connected',
    host: 'mongo.behavior.com',
    port: 27017,
    database: 'user_behavior',
    collections: 12,
    records: '8.9M',
    size: '67.3 GB',
    lastSync: '2024-01-15 11:45',
    credentials: 'encrypted',
    user: 'behavior_user',
    ssl: true
  },
  {
    id: 'redis-001',
    name: 'Cache Store',
    type: 'Redis',
    status: 'disconnected',
    host: 'redis.cache.com',
    port: 6379,
    database: 'cache',
    keys: '1.2M',
    size: '8.5 GB',
    lastSync: '2024-01-14 16:20',
    credentials: 'encrypted',
    user: 'cache_user',
    ssl: false
  },
  {
    id: 'api-001',
    name: 'External API',
    type: 'REST API',
    status: 'connected',
    host: 'api.external.com',
    port: 443,
    endpoints: 8,
    rateLimit: '1000/min',
    size: 'N/A',
    lastSync: '2024-01-15 12:00',
    credentials: 'api_key',
    user: 'api_user',
    ssl: true
  },
  {
    id: 's3-001',
    name: 'Cloud Storage',
    type: 'AWS S3',
    status: 'connected',
    host: 's3.amazonaws.com',
    port: 443,
    bucket: 'ml-data-bucket',
    objects: '45.2K',
    size: '1.2 TB',
    lastSync: '2024-01-15 08:30',
    credentials: 'iam_role',
    user: 's3_user',
    ssl: true
  }
]

const datasets = [
  {
    id: 'dataset-001',
    name: 'customer_data_v3',
    source: 'Customer Database',
    type: 'Structured',
    size: '2.4 GB',
    records: '150K',
    features: 45,
    lastUpdated: '2024-01-15 10:30',
    status: 'active',
    schema: {
      tables: ['customers', 'orders', 'products'],
      primaryKey: 'customer_id',
      foreignKeys: ['order_id', 'product_id']
    }
  },
  {
    id: 'dataset-002',
    name: 'user_behavior_v4',
    source: 'User Behavior Data',
    type: 'Semi-structured',
    size: '8.2 GB',
    records: '1M',
    features: 67,
    lastUpdated: '2024-01-15 11:45',
    status: 'active',
    schema: {
      collections: ['sessions', 'clicks', 'purchases'],
      indexes: ['user_id', 'timestamp', 'action_type']
    }
  },
  {
    id: 'dataset-003',
    name: 'analytics_warehouse_v2',
    source: 'Analytics Warehouse',
    type: 'Structured',
    size: '15.8 GB',
    records: '2.1M',
    features: 89,
    lastUpdated: '2024-01-15 09:15',
    status: 'processing',
    schema: {
      tables: ['events', 'metrics', 'dimensions'],
      primaryKey: 'event_id',
      foreignKeys: ['user_id', 'session_id']
    }
  }
]

const dataSourceTypes = [
  { 
    name: 'MySQL', 
    icon: DatabaseIcon, 
    color: 'bg-blue-500',
    description: 'Relational database with ACID compliance',
    features: ['ACID Transactions', 'SQL Support', 'Indexing', 'Replication']
  },
  { 
    name: 'PostgreSQL', 
    icon: DatabaseIcon, 
    color: 'bg-indigo-500',
    description: 'Advanced open-source relational database',
    features: ['JSON Support', 'Full-text Search', 'Extensions', 'Partitioning']
  },
  { 
    name: 'MongoDB', 
    icon: DatabaseIcon, 
    color: 'bg-green-500',
    description: 'Document-oriented NoSQL database',
    features: ['Document Storage', 'Aggregation', 'Sharding', 'GridFS']
  },
  { 
    name: 'Redis', 
    icon: DatabaseIcon, 
    color: 'bg-red-500',
    description: 'In-memory data structure store',
    features: ['Caching', 'Pub/Sub', 'Lua Scripting', 'Persistence']
  },
  { 
    name: 'REST API', 
    icon: GlobeIcon, 
    color: 'bg-purple-500',
    description: 'HTTP-based API endpoints',
    features: ['HTTP Methods', 'Authentication', 'Rate Limiting', 'JSON/XML']
  },
  { 
    name: 'AWS S3', 
    icon: CloudIcon, 
    color: 'bg-orange-500',
    description: 'Object storage service',
    features: ['Scalable Storage', 'Versioning', 'Lifecycle Policies', 'Encryption']
  }
]

export default function Datasets() {
  const [activeTab, setActiveTab] = useState('datasets')
  const [selectedDataset, setSelectedDataset] = useState(datasets[0])
  const [showNewConnection, setShowNewConnection] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-600" />
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-600" />
      case 'processing':
        return <Activity className="w-4 h-4 text-blue-600" />
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'MySQL':
      case 'PostgreSQL':
        return <DatabaseIcon className="w-5 h-5" />
      case 'MongoDB':
      case 'Redis':
        return <DatabaseIcon className="w-5 h-5" />
      case 'REST API':
        return <GlobeIcon className="w-5 h-5" />
      case 'AWS S3':
        return <CloudIcon className="w-5 h-5" />
      default:
        return <DatabaseIcon className="w-5 h-5" />
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
                <Database className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Datasets & Data Sources</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowNewConnection(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Connection
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
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Datasets</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Data Sources</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Storage</p>
                <p className="text-2xl font-bold text-gray-900">1.5 TB</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Connected Sources</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
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
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'sources'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Data Sources
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'connections'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            External Connections
          </button>
        </div>

        {activeTab === 'datasets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dataset List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Datasets</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search datasets..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {datasets.map((dataset) => (
                    <div
                      key={dataset.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedDataset.id === dataset.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedDataset(dataset)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(dataset.status)}`}>
                            {dataset.status}
                          </div>
                          <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(dataset.status)}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Source:</span>
                          <p className="font-medium">{dataset.source}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{dataset.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Records:</span>
                          <p className="font-medium">{dataset.records}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Features:</span>
                          <p className="font-medium">{dataset.features}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Last updated: {dataset.lastUpdated}</span>
                        <span>Size: {dataset.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dataset Details */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Dataset Details</h3>
                  <div className="flex items-center space-x-2">
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedDataset.status)}`}>
                          {selectedDataset.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Source:</span>
                        <span>{selectedDataset.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{selectedDataset.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size:</span>
                        <span>{selectedDataset.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Records:</span>
                        <span>{selectedDataset.records}</span>
                      </div>
                    </div>
                  </div>

                  {/* Schema */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Schema</h4>
                    <div className="space-y-2 text-sm">
                      {selectedDataset.schema.tables && (
                        <div>
                          <span className="text-gray-500">Tables:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedDataset.schema.tables.map((table) => (
                              <span key={table} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {table}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedDataset.schema.collections && (
                        <div>
                          <span className="text-gray-500">Collections:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedDataset.schema.collections.map((collection) => (
                              <span key={collection} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {collection}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <button className="btn-primary text-sm">
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Use Dataset
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

        {activeTab === 'sources' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Data Sources</h2>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Source
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSourceTypes.map((sourceType) => (
                <div key={sourceType.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sourceType.color}`}>
                      <sourceType.icon className="w-5 h-5 text-white" />
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{sourceType.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{sourceType.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {sourceType.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-primary w-full text-sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Connect {sourceType.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">External Connections</h2>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Test All
                </button>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Connection
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {dataSources.map((source) => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${source.ssl ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {getConnectionIcon(source.type)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(source.status)}`}>
                          {source.status}
                        </div>
                        <h3 className="font-semibold text-gray-900">{source.name}</h3>
                        <span className="text-sm text-gray-500">({source.type})</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(source.status)}
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Host:</span>
                      <p className="font-medium">{source.host}:{source.port}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Database:</span>
                      <p className="font-medium">{source.database || source.bucket || source.endpoints}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Records:</span>
                      <p className="font-medium">{source.records || source.keys || source.objects}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <p className="font-medium">{source.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Last sync: {source.lastSync}</span>
                      <div className="flex items-center space-x-1">
                        {source.ssl ? <Lock className="w-3 h-3 text-green-600" /> : <Unlock className="w-3 h-3 text-gray-400" />}
                        <span>{source.ssl ? 'SSL' : 'No SSL'}</span>
                      </div>
                    </div>
                    <span>User: {source.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 