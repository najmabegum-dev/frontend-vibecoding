import { ArrowPath, CogEightTooth, CubeSolid, LinkSolid } from '../components/icons.jsx'

export const features = [
  {
    id: 'workflow-engine',
    title: 'Workflow Engine',
    description:
      'Sequence steps, branch logic, and coordinate handoffs across complex operating flows without losing context.',
    stat: '40% faster resolution',
    icon: ArrowPath,
  },
  {
    id: 'universal-data-connectors',
    title: 'Universal Data Connectors',
    description:
      'Link APIs, warehouses, CRMs, and databases directly so every run works from live context instead of copied data.',
    stat: 'Live data sync',
    icon: LinkSolid,
  },
  {
    id: 'stateful-memory',
    title: 'Stateful Memory & Recovery',
    description:
      'Track step progress, retry failed branches, and preserve continuity across long-running automations.',
    stat: 'Auto-resume recovery',
    icon: CogEightTooth,
  },
  {
    id: 'multi-agent-orchestration',
    title: 'Multi-Agent Orchestration',
    description:
      'Route work between specialized agents, hand off complex tasks, and pause for human checkpoints when needed.',
    stat: 'Human-in-the-loop',
    icon: CubeSolid,
  },
]
