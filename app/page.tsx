'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import SessionList from '@/components/SessionList'
import ResourceMonitor from '@/components/ResourceMonitor'
import QuickActions from '@/components/QuickActions'
import StatsOverview from '@/components/StatsOverview'
import { GitBranch, ArrowRight, BookOpen, Play, Target, Database, Search, Settings, Brain, Rocket, Activity, ArrowLeft, ArrowRightCircle } from 'lucide-react'

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
    status: 'active'
  },
  {
    id: 4,
    title: 'Data Preprocessing',
    icon: Settings,
    color: 'bg-orange-500',
    description: 'Clean and prepare data',
    status: 'pending'
  },
  {
    id: 5,
    title: 'Model Development',
    icon: Brain,
    color: 'bg-red-500',
    description: 'Train and optimize models',
    status: 'pending'
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('sessions')

  const getStatusColor = (status: string) => {
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* ML Lifecycle Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Learn the ML Lifecycle</h2>
                    <p className="text-blue-100">Understand the complete machine learning process from data to deployment</p>
                  </div>
                </div>
                <Link 
                  href="/ml-lifecycle"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Explore ML Lifecycle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <QuickActions />
            </div>

            {/* Stats Overview */}
            <StatsOverview />
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Left Column - Sessions */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Active Sessions</h2>
                    <button className="btn-primary">
                      <span className="mr-2">+</span>
                      New Session
                    </button>
                  </div>
                  <SessionList />
                </div>
              </div>
              
              {/* Right Column - Resources */}
              <div className="space-y-6">
                <ResourceMonitor />
              </div>
            </div>

            {/* ML Workflow Visualization */}
            <div className="mt-8">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">ML Workflow Overview</h2>
                  <Link 
                    href="/model-development"
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                  >
                    <span>Start Model Development</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Workflow Steps */}
                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mlWorkflowSteps.map((step, index) => (
                      <div key={step.id} className="relative">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.color}`}>
                              <step.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm">{step.title}</h3>
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                                {step.status}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                        
                        {/* Arrow for connection */}
                        {index < mlWorkflowSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-4 -right-2 transform -translate-y-1/2">
                            <ArrowRightCircle className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Phases */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Development Phase</h4>
                    <p className="text-sm text-blue-700">Problem definition through model evaluation</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Production Phase</h4>
                    <p className="text-sm text-green-700">Model deployment and monitoring</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Continuous Improvement</h4>
                    <p className="text-sm text-purple-700">Ongoing monitoring and model updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 