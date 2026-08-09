export type { Company } from '../data/companies';
export { companies, getCompany, getAllSlugs, getComparisons } from '../data/companies';
import { companies } from '../data/companies';

export function getCompanies() {
  return companies;
}

// Update these keys/labels to match the service categories in your niche
export const SERVICE_LABELS: Record<string, string> = {
  'multi-agent-systems':      'Multi-Agent Systems',
  'rag-knowledge-agents':     'RAG & Knowledge Agents',
  'workflow-integration':     'Workflow Integration',
  'coding-agents':            'Coding Agents',
  'monitoring-agents':        'Monitoring Agents',
  'data-analytics-agents':    'Data & Analytics Agents',
  'llm-integration':          'LLM Integration',
  'agent-orchestration':      'Agent Orchestration',
  'enterprise-automation':    'Enterprise Automation',
  'task-automation':          'Task Automation',
  'customer-support-agents':  'Customer Support Agents',
};
