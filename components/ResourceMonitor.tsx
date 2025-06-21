'use client'

import React from 'react'
import { Cpu, HardDrive, Activity, TrendingUp } from 'lucide-react'

const resourceData = {
  cpu: {
    usage: 45,
    cores: 8,
    temperature: 65
  },
  memory: {
    used: 12.5,
    total: 16,
    usage: 78
  },
  gpu: {
    usage: 23,
    memory: {
      used: 4.2,
      total: 12,
      usage: 35
    },
    temperature: 58
  },
  storage: {
    used: 450,
    total: 1000,
    usage: 45
  }
}

export default function ResourceMonitor() {
  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'text-green-600'
    if (usage < 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getUsageBarColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500'
    if (usage < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Resource Monitor</h3>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* CPU */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">CPU</span>
            </div>
            <span className={`text-sm font-medium ${getUsageColor(resourceData.cpu.usage)}`}>
              {resourceData.cpu.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getUsageBarColor(resourceData.cpu.usage)}`}
              style={{ width: `${resourceData.cpu.usage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{resourceData.cpu.cores} cores</span>
            <span>{resourceData.cpu.temperature}°C</span>
          </div>
        </div>

        {/* Memory */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Memory</span>
            </div>
            <span className={`text-sm font-medium ${getUsageColor(resourceData.memory.usage)}`}>
              {resourceData.memory.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getUsageBarColor(resourceData.memory.usage)}`}
              style={{ width: `${resourceData.memory.usage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{resourceData.memory.used} GB used</span>
            <span>{resourceData.memory.total} GB total</span>
          </div>
        </div>

        {/* GPU */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">GPU</span>
            </div>
            <span className={`text-sm font-medium ${getUsageColor(resourceData.gpu.usage)}`}>
              {resourceData.gpu.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getUsageBarColor(resourceData.gpu.usage)}`}
              style={{ width: `${resourceData.gpu.usage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{resourceData.gpu.memory.used} GB VRAM</span>
            <span>{resourceData.gpu.temperature}°C</span>
          </div>
        </div>

        {/* Storage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Storage</span>
            </div>
            <span className={`text-sm font-medium ${getUsageColor(resourceData.storage.usage)}`}>
              {resourceData.storage.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getUsageBarColor(resourceData.storage.usage)}`}
              style={{ width: `${resourceData.storage.usage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{resourceData.storage.used} GB used</span>
            <span>{resourceData.storage.total} GB total</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last updated</span>
          <span className="text-gray-900 font-medium">2 seconds ago</span>
        </div>
      </div>
    </div>
  )
} 