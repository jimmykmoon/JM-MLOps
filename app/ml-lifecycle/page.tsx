'use client'

import React, { useState, useEffect } from 'react'
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

const defaultSteps = [
  { key: 'collected', label: 'Data Collection', enabled: true, params: {} as Record<string, any> },
  { key: 'preprocessed', label: 'Preprocessing', enabled: true, params: {} as Record<string, any> },
  { key: 'trained', label: 'Training', enabled: true, params: {} as Record<string, any> },
  { key: 'evaluated', label: 'Evaluation', enabled: true, params: {} as Record<string, any> },
]

// Parameter presets for each step type
const parameterPresets: Record<string, Record<string, Record<string, any>>> = {
  collected: {
    'Basic': { sampleSize: 3, format: 'csv' },
    'Large Dataset': { sampleSize: 10, format: 'json', includeHeaders: false },
    'Custom Source': { dataSource: 'custom-api', sampleSize: 5, format: 'json' }
  },
  preprocessed: {
    'Standard': { method: 'upper', removeDuplicates: true },
    'Aggressive': { method: 'normalize', removeDuplicates: true, handleMissing: 'drop' },
    'Custom': { method: 'custom', customTransform: 'prefix' }
  },
  trained: {
    'Quick': { modelType: 'random_forest', epochs: 50 },
    'Thorough': { modelType: 'neural_network', epochs: 200, crossValidation: true },
    'Production': { modelType: 'xgboost', validationSplit: 0.3, earlyStopping: true }
  },
  evaluated: {
    'Basic': { metrics: ['accuracy'], generateReport: true },
    'Comprehensive': { metrics: ['accuracy', 'precision', 'recall', 'f1'], comparisonBaseline: 0.85 },
    'Production': { metrics: ['accuracy', 'precision', 'recall', 'f1', 'auc'], saveModel: true, exportResults: true }
  }
}

// Workflow templates for common ML scenarios
const workflowTemplates = {
  'Quick Classification': {
    description: 'Fast classification pipeline for prototyping',
    steps: [
      { key: 'collected', label: 'Data Collection', enabled: true, params: { sampleSize: 5, format: 'csv' } },
      { key: 'preprocessed', label: 'Preprocessing', enabled: true, params: { method: 'upper', removeDuplicates: true } },
      { key: 'trained', label: 'Training', enabled: true, params: { modelType: 'random_forest', epochs: 50 } },
      { key: 'evaluated', label: 'Evaluation', enabled: true, params: { metrics: ['accuracy'], generateReport: true } }
    ]
  },
  'Production ML Pipeline': {
    description: 'Comprehensive pipeline for production deployment',
    steps: [
      { key: 'collected', label: 'Data Collection', enabled: true, params: { sampleSize: 10, format: 'json', includeHeaders: false } },
      { key: 'preprocessed', label: 'Preprocessing', enabled: true, params: { method: 'normalize', removeDuplicates: true, handleMissing: 'drop' } },
      { key: 'trained', label: 'Training', enabled: true, params: { modelType: 'xgboost', epochs: 200, crossValidation: true, earlyStopping: true } },
      { key: 'evaluated', label: 'Evaluation', enabled: true, params: { metrics: ['accuracy', 'precision', 'recall', 'f1'], comparisonBaseline: 0.85, saveModel: true } }
    ]
  },
  'Deep Learning Experiment': {
    description: 'Neural network pipeline with advanced features',
    steps: [
      { key: 'collected', label: 'Data Collection', enabled: true, params: { sampleSize: 8, format: 'json' } },
      { key: 'preprocessed', label: 'Preprocessing', enabled: true, params: { method: 'normalize', handleMissing: 'interpolate' } },
      { key: 'trained', label: 'Training', enabled: true, params: { modelType: 'neural_network', epochs: 300, learningRate: 0.001, validationSplit: 0.3 } },
      { key: 'evaluated', label: 'Evaluation', enabled: true, params: { metrics: ['accuracy', 'precision', 'recall', 'f1', 'auc'], generateReport: true, exportResults: true } }
    ]
  }
}

// External ML library integrations
const mlLibraries = {
  'scikit-learn': {
    name: 'Scikit-learn',
    description: 'Python ML library for traditional algorithms',
    models: ['RandomForest', 'LinearRegression', 'SVM', 'KMeans'],
    status: 'available'
  },
  'tensorflow': {
    name: 'TensorFlow',
    description: 'Deep learning framework by Google',
    models: ['NeuralNetwork', 'CNN', 'RNN', 'Transformer'],
    status: 'available'
  },
  'pytorch': {
    name: 'PyTorch',
    description: 'Deep learning framework by Facebook',
    models: ['NeuralNetwork', 'CNN', 'RNN', 'Transformer'],
    status: 'available'
  },
  'xgboost': {
    name: 'XGBoost',
    description: 'Gradient boosting library',
    models: ['XGBClassifier', 'XGBRegressor'],
    status: 'available'
  }
}

// Parameter validation rules
const validationRules: Record<string, Record<string, any>> = {
  collected: {
    sampleSize: { min: 1, max: 100, type: 'number' },
    format: { type: 'enum', values: ['csv', 'json', 'xml'] },
    dataSource: { type: 'string', required: false }
  },
  preprocessed: {
    method: { type: 'enum', values: ['upper', 'lower', 'normalize', 'custom'] },
    validationSplit: { min: 0.1, max: 0.5, type: 'number' },
    customTransform: { type: 'string', required: false, dependsOn: 'method', dependsValue: 'custom' }
  },
  trained: {
    modelType: { type: 'enum', values: ['random_forest', 'linear_regression', 'neural_network', 'xgboost'] },
    epochs: { min: 1, max: 1000, type: 'number' },
    learningRate: { min: 0.0001, max: 0.1, type: 'number' },
    validationSplit: { min: 0.1, max: 0.5, type: 'number' }
  },
  evaluated: {
    comparisonBaseline: { min: 0, max: 1, type: 'number' },
    threshold: { min: 0, max: 1, type: 'number' }
  }
}

export default function MLLifecycle() {
  const [selectedStep, setSelectedStep] = useState(lifecycleSteps[2])
  const [activeTab, setActiveTab] = useState('overview')
  const [workflowResult, setWorkflowResult] = useState<Record<string, any> | null>(null)
  const [loadingWorkflow, setLoadingWorkflow] = useState(false)
  const [dataSource, setDataSource] = useState('')
  const [steps, setSteps] = useState<typeof defaultSteps>(defaultSteps)
  const [activeStepIdx, setActiveStepIdx] = useState(-1)
  const [useSSE, setUseSSE] = useState(false)
  const [liveResults, setLiveResults] = useState<Record<string, any>>({})
  const [currentProgress, setCurrentProgress] = useState(0)
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [selectedLibrary, setSelectedLibrary] = useState<string>('')
  const [validationErrors, setValidationErrors] = useState<Record<string, Record<string, string>>>({})
  const [showTemplates, setShowTemplates] = useState(false)
  const [showLibraries, setShowLibraries] = useState(false)

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

  // Drag and drop handlers
  const onDragStart = (idx: number) => (e: React.DragEvent) => {
    e.dataTransfer.setData('stepIdx', idx.toString())
  }
  const onDrop = (idx: number) => (e: React.DragEvent) => {
    const fromIdx = parseInt(e.dataTransfer.getData('stepIdx'))
    if (fromIdx === idx) return
    const newSteps = [...steps]
    const [moved] = newSteps.splice(fromIdx, 1)
    newSteps.splice(idx, 0, moved)
    setSteps(newSteps)
  }
  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  // Step config handlers
  const toggleStep = (idx: number) => {
    const newSteps = [...steps]
    newSteps[idx].enabled = !newSteps[idx].enabled
    setSteps(newSteps)
  }
  const updateStepParam = (idx: number, param: string, value: any) => {
    const newSteps = [...steps]
    newSteps[idx].params[param] = value
    setSteps(newSteps)
    
    // Validate the parameter
    const stepKey = newSteps[idx].key
    const error = validateParameter(stepKey, param, value)
    
    setValidationErrors(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [param]: error || ''
      }
    }))
  }

  const applyPreset = (stepKey: string, presetName: string) => {
    const preset = parameterPresets[stepKey as keyof typeof parameterPresets]?.[presetName]
    if (preset) {
      const newSteps = [...steps]
      const stepIndex = newSteps.findIndex(s => s.key === stepKey)
      if (stepIndex !== -1) {
        newSteps[stepIndex].params = { ...preset }
        setSteps(newSteps)
      }
    }
  }

  // Parameter validation function
  const validateParameter = (stepKey: string, paramKey: string, value: any): string | null => {
    const rules = validationRules[stepKey]
    if (!rules || !rules[paramKey]) return null
    
    const rule: any = rules[paramKey]
    
    if (rule.type === 'number') {
      if (typeof value !== 'number') return `${paramKey} must be a number`
      if (rule.min !== undefined && value < rule.min) return `${paramKey} must be at least ${rule.min}`
      if (rule.max !== undefined && value > rule.max) return `${paramKey} must be at most ${rule.max}`
    }
    
    if (rule.type === 'enum') {
      if (!rule.values.includes(value)) return `${paramKey} must be one of: ${rule.values.join(', ')}`
    }
    
    if (rule.type === 'string' && rule.required && !value) {
      return `${paramKey} is required`
    }
    
    if (rule.dependsOn) {
      const dependentValue = steps.find(s => s.key === stepKey)?.params[rule.dependsOn]
      if (dependentValue === rule.dependsValue && !value) {
        return `${paramKey} is required when ${rule.dependsOn} is ${rule.dependsValue}`
      }
    }
    
    return null
  }

  // Apply workflow template
  const applyTemplate = (templateName: string) => {
    const template = workflowTemplates[templateName as keyof typeof workflowTemplates]
    if (template) {
      setSteps(template.steps as typeof defaultSteps)
      setSelectedTemplate(templateName)
      setValidationErrors({})
    }
  }

  // Save current workflow as template
  const saveAsTemplate = () => {
    const templateName = prompt('Enter template name:')
    if (templateName) {
      // In a real app, you'd save this to a database or file
      console.log('Saving template:', templateName, steps)
      alert(`Template "${templateName}" saved!`)
    }
  }

  // Check if workflow is valid
  const isWorkflowValid = () => {
    const hasErrors = Object.values(validationErrors).some(stepErrors => 
      Object.values(stepErrors).some(error => error !== '')
    )
    const hasEnabledSteps = steps.some(step => step.enabled)
    return !hasErrors && hasEnabledSteps
  }

  const renderParameterForm = (step: typeof defaultSteps[0], idx: number) => {
    const { key, params } = step
    
    switch (key) {
      case 'collected':
        return (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
                <input
                  type="text"
                  value={params.dataSource || ''}
                  onChange={e => updateStepParam(idx, 'dataSource', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="e.g., api-endpoint, file-path"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Size</label>
                <input
                  type="number"
                  value={params.sampleSize || 3}
                  onChange={e => updateStepParam(idx, 'sampleSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select
                  value={params.format || 'csv'}
                  onChange={e => updateStepParam(idx, 'format', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xml">XML</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`includeHeaders-${idx}`}
                  checked={params.includeHeaders !== false}
                  onChange={e => updateStepParam(idx, 'includeHeaders', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`includeHeaders-${idx}`} className="text-sm text-gray-700">Include Headers</label>
              </div>
            </div>
            <div className="flex gap-2">
              {Object.keys(parameterPresets.collected).map(preset => (
                <button
                  key={preset}
                  onClick={() => applyPreset(key, preset)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'preprocessed':
        return (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                <select
                  value={params.method || 'upper'}
                  onChange={e => updateStepParam(idx, 'method', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="upper">Uppercase</option>
                  <option value="lower">Lowercase</option>
                  <option value="normalize">Normalize</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              {params.method === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Transform</label>
                  <input
                    type="text"
                    value={params.customTransform || ''}
                    onChange={e => updateStepParam(idx, 'customTransform', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="e.g., prefix, suffix"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Handle Missing</label>
                <select
                  value={params.handleMissing || 'drop'}
                  onChange={e => updateStepParam(idx, 'handleMissing', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="drop">Drop</option>
                  <option value="fill">Fill</option>
                  <option value="interpolate">Interpolate</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`removeDuplicates-${idx}`}
                  checked={params.removeDuplicates || false}
                  onChange={e => updateStepParam(idx, 'removeDuplicates', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`removeDuplicates-${idx}`} className="text-sm text-gray-700">Remove Duplicates</label>
              </div>
            </div>
            <div className="flex gap-2">
              {Object.keys(parameterPresets.preprocessed).map(preset => (
                <button
                  key={preset}
                  onClick={() => applyPreset(key, preset)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'trained':
        return (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Type</label>
                <select
                  value={params.modelType || 'random_forest'}
                  onChange={e => updateStepParam(idx, 'modelType', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="random_forest">Random Forest</option>
                  <option value="linear_regression">Linear Regression</option>
                  <option value="neural_network">Neural Network</option>
                  <option value="xgboost">XGBoost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Epochs</label>
                <input
                  type="number"
                  value={params.epochs || 100}
                  onChange={e => updateStepParam(idx, 'epochs', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="1"
                  max="1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validation Split</label>
                <input
                  type="number"
                  value={params.validationSplit || 0.2}
                  onChange={e => updateStepParam(idx, 'validationSplit', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="0.1"
                  max="0.5"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Rate</label>
                <input
                  type="number"
                  value={params.learningRate || 0.001}
                  onChange={e => updateStepParam(idx, 'learningRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="0.0001"
                  max="0.1"
                  step="0.0001"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`crossValidation-${idx}`}
                  checked={params.crossValidation || false}
                  onChange={e => updateStepParam(idx, 'crossValidation', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`crossValidation-${idx}`} className="text-sm text-gray-700">Cross Validation</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`earlyStopping-${idx}`}
                  checked={params.earlyStopping || false}
                  onChange={e => updateStepParam(idx, 'earlyStopping', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`earlyStopping-${idx}`} className="text-sm text-gray-700">Early Stopping</label>
              </div>
            </div>
            <div className="flex gap-2">
              {Object.keys(parameterPresets.trained).map(preset => (
                <button
                  key={preset}
                  onClick={() => applyPreset(key, preset)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'evaluated':
        return (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Baseline</label>
                <input
                  type="number"
                  value={params.comparisonBaseline || 0.8}
                  onChange={e => updateStepParam(idx, 'comparisonBaseline', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
                <input
                  type="number"
                  value={params.threshold || 0.5}
                  onChange={e => updateStepParam(idx, 'threshold', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`generateReport-${idx}`}
                  checked={params.generateReport !== false}
                  onChange={e => updateStepParam(idx, 'generateReport', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`generateReport-${idx}`} className="text-sm text-gray-700">Generate Report</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`saveModel-${idx}`}
                  checked={params.saveModel || false}
                  onChange={e => updateStepParam(idx, 'saveModel', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`saveModel-${idx}`} className="text-sm text-gray-700">Save Model</label>
              </div>
            </div>
            <div className="flex gap-2">
              {Object.keys(parameterPresets.evaluated).map(preset => (
                <button
                  key={preset}
                  onClick={() => applyPreset(key, preset)}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const runWorkflow = async () => {
    setLoadingWorkflow(true)
    setWorkflowResult(null)
    setLiveResults({})
    setCurrentProgress(0)
    setActiveStepIdx(0)
    
    if (useSSE) {
      // SSE-based real-time updates
      const eventSource = new EventSource(`/api/ml-workflow?sse=true&data=${encodeURIComponent(JSON.stringify({
        input: { dataSource },
        steps
      }))}`)
      
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.type === 'step_complete') {
          setLiveResults(prev => ({ ...prev, [data.step]: data.result }))
          setCurrentProgress(data.progress)
          setActiveStepIdx(data.stepIndex)
        } else if (data.type === 'workflow_complete') {
          setWorkflowResult(liveResults)
          setActiveStepIdx(-1)
          setLoadingWorkflow(false)
          eventSource.close()
        } else if (data.type === 'error') {
          setWorkflowResult({ error: data.error })
          setActiveStepIdx(-1)
          setLoadingWorkflow(false)
          eventSource.close()
        }
      }
      
      eventSource.onerror = () => {
        setWorkflowResult({ error: 'SSE connection failed' })
        setActiveStepIdx(-1)
        setLoadingWorkflow(false)
        eventSource.close()
      }
    } else {
      // Regular non-SSE request
      try {
        const res = await fetch('/api/ml-workflow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { dataSource },
            steps
          })
        })
        const data = await res.json()
        setWorkflowResult(data)
        setActiveStepIdx(-1)
      } catch (err) {
        setWorkflowResult({ error: 'Failed to run workflow' })
        setActiveStepIdx(-1)
      } finally {
        setLoadingWorkflow(false)
      }
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
            {/* Workflow Templates */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Workflow Templates</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    {showTemplates ? 'Hide' : 'Show'} Templates
                  </button>
                  <button
                    onClick={saveAsTemplate}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Save as Template
                  </button>
                </div>
              </div>
              
              {showTemplates && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(workflowTemplates).map(([name, template]) => (
                    <div key={name} className="bg-white rounded-lg shadow p-4 border">
                      <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <button
                        onClick={() => applyTemplate(name)}
                        className="w-full px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                      >
                        Apply Template
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ML Library Integration */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">ML Library Integration</h3>
                <button
                  onClick={() => setShowLibraries(!showLibraries)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  {showLibraries ? 'Hide' : 'Show'} Libraries
                </button>
              </div>
              
              {showLibraries && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {Object.entries(mlLibraries).map(([key, library]) => (
                    <div key={key} className="bg-white rounded-lg shadow p-4 border">
                      <h4 className="font-semibold text-gray-900 mb-1">{library.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{library.description}</p>
                      <div className="text-xs text-gray-500 mb-2">
                        Models: {library.models.join(', ')}
                      </div>
                      <div className={`inline-block px-2 py-1 rounded text-xs ${
                        library.status === 'available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {library.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step Configuration Panel */}
            <div className="w-full max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Configure Workflow Steps</h3>
                {!isWorkflowValid() && (
                  <div className="text-red-600 text-sm">
                    ⚠️ Please fix validation errors before running
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={step.key} className="bg-white rounded-lg shadow-sm border">
                    <div
                      className={`flex items-center gap-2 p-3 cursor-pointer ${step.enabled ? '' : 'opacity-50'}`}
                      draggable
                      onDragStart={onDragStart(idx)}
                      onDrop={onDrop(idx)}
                      onDragOver={onDragOver}
                      onClick={() => setExpandedStep(expandedStep === step.key ? null : step.key)}
                    >
                      <span className="cursor-move text-gray-400">☰</span>
                      <input
                        type="checkbox"
                        checked={step.enabled}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleStep(idx)
                        }}
                      />
                      <span className="font-medium flex-1">{step.label}</span>
                      {validationErrors[step.key] && Object.values(validationErrors[step.key]).some(e => e !== '') && (
                        <span className="text-red-500 text-sm">⚠️</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedStep(expandedStep === step.key ? null : step.key)
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedStep === step.key ? '▼' : '▶'}
                      </button>
                    </div>
                    {expandedStep === step.key && step.enabled && (
                      <div className="border-t">
                        {renderParameterForm(step, idx)}
                        {/* Validation Errors */}
                        {validationErrors[step.key] && (
                          <div className="p-4 bg-red-50 border-t">
                            {Object.entries(validationErrors[step.key]).map(([param, error]) => 
                              error && (
                                <div key={param} className="text-red-600 text-sm mb-1">
                                  {error}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* ML Workflow Trigger */}
            <div className="flex flex-col items-center mb-8 w-full">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mb-4">
                <input
                  type="text"
                  placeholder="Enter data source (optional)"
                  value={dataSource}
                  onChange={e => setDataSource(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <button
                  onClick={runWorkflow}
                  className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors disabled:opacity-50"
                  disabled={loadingWorkflow || !isWorkflowValid()}
                >
                  {loadingWorkflow ? 'Running Workflow...' : 'Run ML Agent Workflow'}
                </button>
              </div>
              
              {/* SSE Toggle */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="sse-toggle"
                  checked={useSSE}
                  onChange={e => setUseSSE(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="sse-toggle" className="text-sm font-medium">
                  Enable Real-time Updates (SSE)
                </label>
              </div>
              
              {/* Progress Bar */}
              {loadingWorkflow && (
                <div className="w-full max-w-2xl mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-1">
                    {currentProgress}% Complete
                  </div>
                </div>
              )}
              
              {/* Stepper/Progress Bar */}
              <div className="flex gap-2 w-full max-w-2xl mb-4">
                {steps.filter(s => s.enabled).map((step, idx) => (
                  <div key={step.key} className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      workflowResult || liveResults[step.key]
                        ? 'bg-green-500'
                        : loadingWorkflow && activeStepIdx === idx
                        ? 'bg-blue-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs mt-1 text-center">{step.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Live Results (SSE mode) */}
              {useSSE && Object.keys(liveResults).length > 0 && (
                <div className="w-full max-w-2xl space-y-4 mb-4">
                  <h4 className="font-semibold text-primary-700">Live Results:</h4>
                  {steps.filter(s => s.enabled).map((step, idx) => (
                    liveResults[step.key] && (
                      <div key={step.key} className="bg-green-50 rounded-lg shadow p-4 border border-green-200">
                        <div className="font-semibold text-green-700 mb-2 capitalize">{step.label} Output ✓</div>
                        <pre className="text-sm text-gray-800 overflow-x-auto">
                          {JSON.stringify(liveResults[step.key], null, 2)}
                        </pre>
                      </div>
                    )
                  ))}
                </div>
              )}
              
              {/* Final Results */}
              {workflowResult && !useSSE && (
                <div className="w-full max-w-2xl space-y-4">
                  {steps.filter(s => s.enabled).map((step, idx) => (
                    <div key={step.key} className="bg-white rounded-lg shadow p-4 border">
                      <div className="font-semibold text-primary-700 mb-2 capitalize">{step.label} Output</div>
                      <pre className="text-sm text-gray-800 overflow-x-auto">
                        {JSON.stringify(workflowResult[step.key], null, 2)}
                      </pre>
                    </div>
                  ))}
                  {workflowResult.error && (
                    <div className="text-red-600 font-semibold">{workflowResult.error}</div>
                  )}
                </div>
              )}
            </div>
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