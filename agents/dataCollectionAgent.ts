interface DataCollectionParams {
  dataSource?: string
  sampleSize?: number
  format?: 'csv' | 'json' | 'xml'
  filters?: Record<string, any>
  includeHeaders?: boolean
}

export async function dataCollectionAgent(input: any) {
  const params: DataCollectionParams = input.params || {}
  const { dataSource, sampleSize = 3, format = 'csv', filters = {}, includeHeaders = true } = params
  
  // Simulate data collection with parameters
  const baseData = ['sample1', 'sample2', 'sample3', 'sample4', 'sample5']
  const filteredData = baseData.slice(0, sampleSize)
  
  const result = {
    data: filteredData,
    metadata: {
      source: dataSource || 'default',
      format,
      sampleSize,
      filters,
      includeHeaders,
      timestamp: new Date().toISOString()
    }
  }
  
  return result
} 