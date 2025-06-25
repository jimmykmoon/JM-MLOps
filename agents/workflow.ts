import { dataCollectionAgent } from './dataCollectionAgent'
import { preprocessingAgent } from './preprocessingAgent'
import { trainingAgent } from './trainingAgent'
import { evaluationAgent } from './evaluationAgent'

const stepMap: Record<string, any> = {
  collected: dataCollectionAgent,
  preprocessed: preprocessingAgent,
  trained: trainingAgent,
  evaluated: evaluationAgent,
}

export async function mlWorkflow(config: any = {}, onProgress?: (step: string, result: any) => void) {
  // config.steps: [{ key, enabled, params }]
  let input = config.input || {}
  const results: Record<string, any> = {}
  for (const step of config.steps) {
    if (!step.enabled) continue
    const fn = stepMap[step.key]
    if (!fn) continue
    // Simulate step delay for progress updates
    await new Promise(res => setTimeout(res, 600))
    const result = await fn({ ...input, ...step.params })
    results[step.key] = result
    input = result
    if (onProgress) onProgress(step.key, result)
  }
  return results
} 