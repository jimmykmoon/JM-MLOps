'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Upload, 
  Download, 
  Settings, 
  Play, 
  Pause, 
  Stop, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ArrowLeft,
  File,
  Database,
  BarChart3,
  Eye,
  Trash2,
  RefreshCw,
  Filter,
  Search,
  ArrowRight,
  BookOpen,
  Image,
  Table,
  Code,
  FileSpreadsheet,
  FileImage,
  FileCode,
  Zap,
  Cpu,
  HardDrive,
  Activity
} from 'lucide-react'

const documentTypes = [
  { name: 'PDF', icon: FileText, color: 'bg-red-500', supported: true },
  { name: 'DOCX', icon: FileText, color: 'bg-blue-500', supported: true },
  { name: 'XLSX', icon: FileSpreadsheet, color: 'bg-green-500', supported: true },
  { name: 'HTML', icon: FileCode, color: 'bg-orange-500', supported: true },
  { name: 'Images', icon: FileImage, color: 'bg-purple-500', supported: true },
  { name: 'PPTX', icon: FileText, color: 'bg-pink-500', supported: true }
]

const processingJobs = [
  {
    id: 'job-001',
    name: 'Research Papers Batch',
    status: 'completed',
    type: 'PDF Processing',
    files: 15,
    processed: 15,
    created: '2024-01-15 10:30',
    duration: '2h 15m',
    size: '45.2 MB',
    extracted: {
      text: '2.3 MB',
      tables: 23,
      images: 45,
      code: 12
    },
    quality: 94,
    user: 'john.doe'
  },
  {
    id: 'job-002',
    name: 'Financial Reports',
    status: 'running',
    type: 'PDF + XLSX',
    files: 8,
    processed: 3,
    created: '2024-01-15 11:15',
    duration: '45m',
    size: '12.8 MB',
    extracted: {
      text: '0.8 MB',
      tables: 8,
      images: 12,
      code: 0
    },
    quality: 87,
    user: 'jane.smith'
  },
  {
    id: 'job-003',
    name: 'Technical Documentation',
    status: 'failed',
    type: 'DOCX Processing',
    files: 25,
    processed: 0,
    created: '2024-01-15 09:00',
    duration: '0m',
    size: '8.5 MB',
    extracted: {
      text: '0 MB',
      tables: 0,
      images: 0,
      code: 0
    },
    quality: 0,
    user: 'admin'
  }
]

const preprocessingPipelines = [
  {
    id: 'pipeline-001',
    name: 'Academic Paper Pipeline',
    description: 'Process research papers with table extraction and formula recognition',
    steps: ['PDF Parsing', 'Layout Analysis', 'Table Extraction', 'Formula Recognition', 'Text Cleaning'],
    status: 'active',
    created: '2024-01-10',
    usage: 45
  },
  {
    id: 'pipeline-002',
    name: 'Financial Document Pipeline',
    description: 'Extract financial data from reports and spreadsheets',
    steps: ['Document Parsing', 'Table Detection', 'Data Validation', 'Format Standardization'],
    status: 'active',
    created: '2024-01-08',
    usage: 23
  },
  {
    id: 'pipeline-003',
    name: 'Technical Doc Pipeline',
    description: 'Process technical documentation with code extraction',
    steps: ['Document Parsing', 'Code Block Detection', 'Text Extraction', 'Metadata Extraction'],
    status: 'draft',
    created: '2024-01-12',
    usage: 8
  }
]

export default function DataPreprocessing() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [selectedJob, setSelectedJob] = useState(processingJobs[0])
  const [showUpload, setShowUpload] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'queued':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'running':
        return <Activity className="w-4 h-4 text-blue-600" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Data Preprocessing</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowUpload(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
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
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processed Documents</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Table className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Extracted Tables</p>
                <p className="text-2xl font-bold text-gray-900">456</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Document Formats</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {documentTypes.map((format) => (
              <div key={format.name} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${format.color}`}>
                  <format.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{format.name}</p>
                  <p className="text-xs text-gray-500">
                    {format.supported ? 'Supported' : 'Coming Soon'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'jobs'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Processing Jobs
          </button>
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'pipelines'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Preprocessing Pipelines
          </button>
          <button
            onClick={() => setActiveTab('docling')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'docling'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Docling Integration
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Processing Jobs</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {processingJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedJob.id === job.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                            {job.status}
                          </div>
                          <h3 className="font-semibold text-gray-900">{job.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{job.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Files:</span>
                          <p className="font-medium">{job.processed}/{job.files}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{job.duration}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Quality:</span>
                          <p className="font-medium">{job.quality}%</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{Math.round((job.processed / job.files) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${(job.processed / job.files) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedJob.status)}`}>
                          {selectedJob.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">User:</span>
                        <span>{selectedJob.user}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{selectedJob.created}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size:</span>
                        <span>{selectedJob.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Extracted Content */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Extracted Content</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Text:</span>
                        <span>{selectedJob.extracted.text}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tables:</span>
                        <span>{selectedJob.extracted.tables}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Images:</span>
                        <span>{selectedJob.extracted.images}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Code Blocks:</span>
                        <span>{selectedJob.extracted.code}</span>
                      </div>
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

        {activeTab === 'pipelines' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Preprocessing Pipelines</h2>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Pipeline
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preprocessingPipelines.map((pipeline) => (
                <div key={pipeline.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pipeline.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pipeline.status}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{pipeline.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{pipeline.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {pipeline.steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Used {pipeline.usage} times</span>
                    <span>{pipeline.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docling' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Docling Info */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Docling Integration</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Document Processing</h3>
                    <p className="text-sm text-gray-600">Powered by Docling for comprehensive document understanding</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Multi-format parsing (PDF, DOCX, XLSX, HTML, images)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Advanced PDF understanding with layout analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Table structure and formula recognition</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Code block and image classification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Local execution for sensitive data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Integration Status */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Integration Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Docling Connected</span>
                  </div>
                  <span className="text-sm text-green-700">v2.37.0</span>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Processing Statistics:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Documents Processed</p>
                      <p className="text-xl font-semibold text-gray-900">1,247</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Success Rate</p>
                      <p className="text-xl font-semibold text-gray-900">98.5%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Avg Processing Time</p>
                      <p className="text-xl font-semibold text-gray-900">2.3s</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Storage Used</p>
                      <p className="text-xl font-semibold text-gray-900">45.2 GB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 