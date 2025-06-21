'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Lightbulb, 
  Database, 
  Search, 
  Settings, 
  Brain, 
  Target, 
  Rocket, 
  Activity, 
  Shield, 
  ArrowRight,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  FileText,
  Code,
  BarChart3,
  Zap,
  ArrowLeft
} from 'lucide-react'

const lifecycleSteps = [
  {
    id: 1,
    title: 'Problem Definition',
    subtitle: 'Understand the business problem',
    icon: Lightbulb,
    color: 'bg-blue-500',
    description: 'Define what you want to predict or classify, set success metrics, and understand business requirements.',
    details: [
      'Define business objectives',
      'Set success metrics (accuracy, ROI)',
      'Identify data requirements',
      'Establish project timeline',
      'Define constraints and limitations'
    ],
    examples: [
      'Predict customer churn',
      'Classify spam emails',
      'Forecast sales revenue',
      'Detect fraud transactions'
    ],
    status: 'completed'
  },
  {
    id: 2,
    title: 'Data Collection',
    subtitle: 'Gather relevant data',
    icon: Database,
    color: 'bg-green-500',
    description: 'Collect data from various sources including databases, APIs, files, and external sources.',
    details: [
      'Identify data sources',
      'Extract data from databases',
      'Collect data from APIs',
      'Handle data privacy',
      'Validate data quality'
    ],
    examples: [
      'Customer transaction history',
      'User behavior logs',
      'Sensor data from IoT devices',
      'Social media feeds'
    ],
    status: 'completed'
  },
  {
    id: 3,
    title: 'Data Exploration',
    subtitle: 'Understand your data',
    icon: Search,
    color: 'bg-purple-500',
    description: 'Analyze data patterns, identify relationships, and understand data quality issues.',
    details: [
      'Statistical analysis',
      'Data visualization',
      'Correlation analysis',
      'Missing value detection',
      'Outlier identification'
    ],
    examples: [
      'Distribution plots',
      'Correlation matrices',
      'Missing value heatmaps',
      'Box plots for outliers'
    ],
    status: 'active'
  },
  {
    id: 4,
    title: 'Data Preprocessing',
    subtitle: 'Clean and prepare data',
    icon: Settings,
    color: 'bg-orange-500',
    description: 'Transform raw data into a format suitable for machine learning algorithms.',
    details: [
      'Handle missing values',
      'Remove duplicates',
      'Normalize/scale features',
      'Encode categorical variables',
      'Feature engineering'
    ],
    examples: [
      'Fill missing values with mean/median',
      'One-hot encoding for categories',
      'StandardScaler for numerical features',
      'Create interaction features'
    ],
    status: 'pending'
  },
  {
    id: 5,
    title: 'Model Development',
    subtitle: 'Train machine learning models',
    icon: Brain,
    color: 'bg-red-500',
    description: 'Select algorithms, train models, and optimize hyperparameters for best performance.',
    details: [
      'Algorithm selection',
      'Hyperparameter tuning',
      'Cross-validation',
      'Model training',
      'Performance evaluation'
    ],
    examples: [
      'Random Forest for classification',
      'Linear Regression for prediction',
      'Neural Networks for complex patterns',
      'XGBoost for structured data'
    ],
    status: 'pending'
  },
  {
    id: 6,
    title: 'Model Evaluation',
    subtitle: 'Assess model performance',
    icon: Target,
    color: 'bg-indigo-500',
    description: 'Evaluate model performance using various metrics and validation techniques.',
    details: [
      'Performance metrics calculation',
      'Cross-validation results',
      'Confusion matrix analysis',
      'ROC curve analysis',
      'Business metric validation'
    ],
    examples: [
      'Accuracy, Precision, Recall',
      'F1-Score and AUC-ROC',
      'Mean Absolute Error (MAE)',
      'Root Mean Square Error (RMSE)'
    ],
    status: 'pending'
  },
  {
    id: 7,
    title: 'Model Deployment',
    subtitle: 'Deploy to production',
    icon: Rocket,
    color: 'bg-teal-500',
    description: 'Deploy the trained model to production environment for real-world use.',
    details: [
      'Model packaging',
      'API development',
      'Infrastructure setup',
      'Load balancing',
      'Security implementation'
    ],
    examples: [
      'Docker containerization',
      'REST API endpoints',
      'Kubernetes deployment',
      'Authentication & authorization'
    ],
    status: 'pending'
  },
  {
    id: 8,
    title: 'Monitoring & Maintenance',
    subtitle: 'Monitor and improve',
    icon: Activity,
    color: 'bg-pink-500',
    description: 'Continuously monitor model performance and maintain it over time.',
    details: [
      'Performance monitoring',
      'Data drift detection',
      'Model retraining',
      'A/B testing',
      'Incident response'
    ],
    examples: [
      'Real-time performance tracking',
      'Statistical drift detection',
      'Scheduled model updates',
      'Automated alerting'
    ],
    status: 'pending'
  }
]

const processPhases = [
  {
    phase: 'Development',
    steps: ['Problem Definition', 'Data Collection', 'Data Exploration', 'Data Preprocessing', 'Model Development', 'Model Evaluation'],
    color: 'bg-blue-50 border-blue-200'
  },
  {
    phase: 'Production',
    steps: ['Model Deployment', 'Monitoring & Maintenance'],
    color: 'bg-green-50 border-green-200'
  }
]

export default function MLLifecycle() {
  const [selectedStep, setSelectedStep] = useState(lifecycleSteps[2])
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'active':
        return <Play className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
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
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MLOps Platform</h1>
            </div>
            <nav className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('detailed')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'detailed' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Detailed Steps
              </button>
              <button 
                onClick={() => setActiveTab('examples')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'examples' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Examples
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Machine Learning Lifecycle
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understand the complete journey from problem definition to production deployment. 
                Each step builds upon the previous one to create successful ML solutions.
              </p>
            </div>

            {/* Lifecycle Flow */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Complete ML Workflow</h3>
              
              <div className="relative">
                {/* Connection Lines */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 hidden lg:block"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lifecycleSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      <div 
                        className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedStep.id === step.id ? 'ring-2 ring-primary-500' : ''
                        }`}
                        onClick={() => setSelectedStep(step)}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.color}`}>
                            <step.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{step.title}</h4>
                            <p className="text-sm text-gray-500">{step.subtitle}</p>
                          </div>
                          {getStatusIcon(step.status)}
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      
                      {/* Arrow for connection */}
                      {index < lifecycleSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                          <ArrowRight className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Phases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {processPhases.map((phase) => (
                <div key={phase.phase} className={`card ${phase.color}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{phase.phase} Phase</h3>
                  <div className="space-y-2">
                    {phase.steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detailed Step-by-Step Guide
              </h2>
              <p className="text-lg text-gray-600">
                Deep dive into each phase of the ML lifecycle with practical examples and best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step List */}
              <div className="lg:col-span-1">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Steps</h3>
                  <div className="space-y-2">
                    {lifecycleSteps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setSelectedStep(step)}
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                          selectedStep.id === step.id
                            ? 'bg-primary-50 border border-primary-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.color}`}>
                            <step.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{step.title}</p>
                            <p className="text-sm text-gray-500">{step.subtitle}</p>
                          </div>
                          {getStatusIcon(step.status)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Details */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedStep.color}`}>
                      <selectedStep.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStep.title}</h2>
                      <p className="text-gray-600">{selectedStep.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-700">{selectedStep.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Activities</h3>
                      <ul className="space-y-2">
                        {selectedStep.details.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedStep.examples.map((example, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-700">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real-World ML Examples
              </h2>
              <p className="text-lg text-gray-600">
                See how the ML lifecycle applies to common business problems and use cases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Customer Churn Prediction */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Customer Churn Prediction</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Predict which customers are likely to leave</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">Customer behavior, transactions, demographics</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">Random Forest, XGBoost</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Churn probability score</p>
                  </div>
                </div>
              </div>

              {/* Fraud Detection */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Fraud Detection</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Detect fraudulent transactions in real-time</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">Transaction history, user behavior, location</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">Isolation Forest, Neural Networks</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Fraud risk score</p>
                  </div>
                </div>
              </div>

              {/* Sales Forecasting */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Forecasting</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Predict future sales volumes</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">Historical sales, seasonality, marketing</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">ARIMA, Prophet, LSTM</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Sales predictions with confidence intervals</p>
                  </div>
                </div>
              </div>

              {/* Image Classification */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Document Classification</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Automatically categorize documents</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">Document images, text content</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">CNN, BERT, Transformers</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Document category labels</p>
                  </div>
                </div>
              </div>

              {/* Recommendation System */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recommendation System</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Suggest relevant products to users</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">User interactions, product features</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">Collaborative Filtering, Matrix Factorization</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Personalized product recommendations</p>
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Problem:</span>
                    <p className="text-gray-600">Analyze customer sentiment from text</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Data:</span>
                    <p className="text-gray-600">Customer reviews, social media posts</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>
                    <p className="text-gray-600">BERT, LSTM, Naive Bayes</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Output:</span>
                    <p className="text-gray-600">Sentiment scores (positive/negative/neutral)</p>
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