import { NextResponse } from 'next/server'
import { mlWorkflow } from '../../../agents/workflow'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const sse = url.searchParams.get('sse')
  const dataParam = url.searchParams.get('data')
  
  if (sse && dataParam) {
    const body = JSON.parse(decodeURIComponent(dataParam))
    
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }

        try {
          let stepIndex = 0
          const enabledSteps = body.steps.filter((s: any) => s.enabled)
          
          await mlWorkflow(body, (stepKey: string, result: any) => {
            stepIndex++
            const progress = (stepIndex / enabledSteps.length) * 100
            
            sendEvent({
              type: 'step_complete',
              step: stepKey,
              result,
              progress: Math.round(progress),
              stepIndex,
              totalSteps: enabledSteps.length
            })
          })
          
          sendEvent({ type: 'workflow_complete' })
        } catch (error) {
          sendEvent({ type: 'error', error: error instanceof Error ? error.message : 'Unknown error' })
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  }
  
  return NextResponse.json({ error: 'Invalid request' })
}

export async function POST(req: Request) {
  const body = await req.json()
  
  // If client requests SSE, stream progress
  if (body.sse) {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }

        try {
          let stepIndex = 0
          const enabledSteps = body.steps.filter((s: any) => s.enabled)
          
          await mlWorkflow(body, (stepKey: string, result: any) => {
            stepIndex++
            const progress = (stepIndex / enabledSteps.length) * 100
            
            sendEvent({
              type: 'step_complete',
              step: stepKey,
              result,
              progress: Math.round(progress),
              stepIndex,
              totalSteps: enabledSteps.length
            })
          })
          
          sendEvent({ type: 'workflow_complete' })
        } catch (error) {
          sendEvent({ type: 'error', error: error instanceof Error ? error.message : 'Unknown error' })
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  }
  
  // Regular non-SSE response
  const result = await mlWorkflow(body)
  return NextResponse.json(result)
} 