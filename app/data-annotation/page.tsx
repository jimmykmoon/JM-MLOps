'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Tag, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Play, 
  Pause, 
  Stop, 
  Plus, 
  Settings, 
  BarChart3, 
  Eye, 
  Download, 
  Upload, 
  ArrowLeft,
  Brain,
  Activity,
  Target,
  Star,
  Filter,
  Search,
  ArrowRight,
  RefreshCw,
  Zap,
  Cpu,
  HardDrive,
  FileText,
  Image,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  Bot,
  TrendingUp,
  Award,
  Calendar,
  Clock3
} from 'lucide-react'

const annotationProjects = [
  {
    id: 'proj-001',
    name: 'Customer Support Classification',
    type: 'Text Classification',
    status: 'active',
    progress: 78,
    total: 5000,
    labeled: 3900,
    ai_prelabeled: 3200,
    human_reviewed: 700,
    created: '2024-01-10',
    deadline: '2024-01-25',
    quality: 94,
    annotators: ['john.doe', 'jane.smith', 'admin'],
    ai_model: 'GPT-4',
    categories: ['Technical', 'Billing', 'General', 'Feature Request']
  },
  {
    id: 'proj-002',
    name: 'Document Entity Recognition',
    type: 'NER',
    status: 'active',
    progress: 45,
    total: 2000,
    labeled: 900,
    ai_prelabeled: 800,
    human_reviewed: 100,
    created: '2024-01-12',
    deadline: '2024-01-30',
    quality: 87,
    annotators: ['admin', 'john.doe'],
    ai_model: 'GPT-4',
    categories: ['Person', 'Organization', 'Location', 'Date', 'Amount']
  },
  {
    id: 'proj-003',
    name: 'Sentiment Analysis Dataset',
    type: 'Sentiment Analysis',
    status: 'completed',
    progress: 100,
    total: 3000,
    labeled: 3000,
    ai_prelabeled: 2500,
    human_reviewed: 500,
    created: '2024-01-05',
    deadline: '2024-01-20',
    quality: 96,
    annotators: ['jane.smith', 'admin'],
    ai_model: 'GPT-4',
    categories: ['Positive', 'Negative', 'Neutral']
  }
]

const annotationTasks = [
  {
    id: 'task-001',
    project: 'Customer Support Classification',
    text: 'I need help with my billing statement from last month. The charges seem incorrect.',
    ai_prediction: 'Billing',
    ai_confidence: 0.89,
    human_label: 'Billing',
    status: 'completed',
    annotator: 'john.doe',
    reviewed: true,
    quality_score: 0.95
  },
  {
    id: 'task-002',
    project: 'Document Entity Recognition',
    text: 'Apple Inc. announced new products on January 15th, 2024 in Cupertino, California.',
    ai_prediction: 'Organization: Apple Inc., Date: January 15th, 2024, Location: Cupertino, California',
    ai_confidence: 0.92,
    human_label: 'Organization: Apple Inc., Date: January 15th, 2024, Location: Cupertino, California',
    status: 'completed',
    annotator: 'admin',
    reviewed: true,
    quality_score: 0.98
  },
  {
    id: 'task-003',
    project: 'Sentiment Analysis Dataset',
    text: 'This product is absolutely amazing! I love everything about it.',
    ai_prediction: 'Positive',
    ai_confidence: 0.95,
    human_label: 'Positive',
    status: 'completed',
    annotator: 'jane.smith',
    reviewed: true,
    quality_score: 0.97
  }
]

const qualityMetrics = [
  { metric: 'Inter-annotator Agreement', value: 94.2, trend: 'up' },
  { metric: 'AI-Human Agreement', value: 89.7, trend: 'up' },
  { metric: 'Labeling Speed', value: '45 items/hr', trend: 'up' },
  { metric: 'Review Rate', value: 78.5, trend: 'stable' },
  { metric: 'Error Rate', value: 2.3, trend: 'down' },
  { metric: 'Completion Rate', value: 91.8, trend: 'up' }
]

export default function DataAnnotation() {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(annotationProjects[0])
  const [showNewProject, setShowNewProject] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-4 h-4 text-green-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />
      case 'draft':
        return <Clock className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
      case 'stable':
        return <Activity className="w-4 h-4 text-blue-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
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
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Data Annotation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowNewProject(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
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
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Annotators</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Pre-labeled</p>
                <p className="text-2xl font-bold text-gray-900">6,500</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Quality</p>
                <p className="text-2xl font-bold text-gray-900">92.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'projects'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Annotation Projects
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'tasks'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Annotation Tasks
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'quality'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Quality Control
          </button>
          <button
            onClick={() => setActiveTab('labelstudio')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'labelstudio'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Label Studio
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project List */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Annotation Projects</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {annotationProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedProject.id === project.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </div>
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(project.status)}
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{project.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Progress:</span>
                          <p className="font-medium">{project.progress}%</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Quality:</span>
                          <p className="font-medium">{project.quality}%</p>
                        </div>
                        <div>
                          <span className="text-gray-500">AI Model:</span>
                          <p className="font-medium">{project.ai_model}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress ({project.labeled}/{project.total})</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <span key={category} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span>{selectedProject.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{selectedProject.created}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Deadline:</span>
                        <span>{selectedProject.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">AI Model:</span>
                        <span>{selectedProject.ai_model}</span>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Items:</span>
                        <span>{selectedProject.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">AI Pre-labeled:</span>
                        <span>{selectedProject.ai_prelabeled}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Human Reviewed:</span>
                        <span>{selectedProject.human_reviewed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quality Score:</span>
                        <span>{selectedProject.quality}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Annotators */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Annotators</h4>
                    <div className="space-y-2">
                      {selectedProject.annotators.map((annotator) => (
                        <div key={annotator} className="flex items-center space-x-2 text-sm">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">
                              {annotator.split('.')[0].charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-700">{annotator}</span>
                        </div>
                      ))}
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

        {activeTab === 'tasks' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Annotation Tasks</h2>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </button>
            </div>

            <div className="space-y-4">
              {annotationTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                      <span className="text-sm text-gray-500">{task.project}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {task.reviewed && <CheckCircle className="w-4 h-4 text-green-600" />}
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-900 mb-2">{task.text}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">AI Prediction:</span>
                      <p className="font-medium">{task.ai_prediction}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">AI Confidence:</span>
                      <p className="font-medium">{(task.ai_confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Human Label:</span>
                      <p className="font-medium">{task.human_label}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Quality Score:</span>
                      <p className="font-medium">{(task.quality_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Annotated by: {task.annotator}</span>
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-3 h-3 text-green-600" />
                      <span>AI-Human Agreement</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quality Metrics */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quality Metrics</h2>
              <div className="space-y-4">
                {qualityMetrics.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(metric.trend)}
                      <span className="font-medium text-gray-900">{metric.metric}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quality Trends</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Quality trend chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'labelstudio' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Label Studio Info */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Label Studio Integration</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI-Assisted Data Labeling</h3>
                    <p className="text-sm text-gray-600">Powered by Label Studio with GPT-4 integration</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>AI pre-annotation with GPT-4</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Human review and validation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Quality control and metrics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Team collaboration tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Export to training format</span>
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
                    <span className="font-medium text-green-900">Label Studio Connected</span>
                  </div>
                  <span className="text-sm text-green-700">v1.9.2</span>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Annotation Statistics:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Projects Created</p>
                      <p className="text-xl font-semibold text-gray-900">12</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Items Labeled</p>
                      <p className="text-xl font-semibold text-gray-900">7,800</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">AI Pre-annotated</p>
                      <p className="text-xl font-semibold text-gray-900">6,500</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500">Avg Quality</p>
                      <p className="text-xl font-semibold text-gray-900">92.3%</p>
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