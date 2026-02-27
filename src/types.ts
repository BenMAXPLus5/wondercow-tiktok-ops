export type Role = 'operator' | 'founder' | 'ceo'
export type ViewMode = 'guided' | 'all'

export interface ChecklistItem {
  id: string
  text: string
  roles?: Role[]
}

export interface SectionData {
  id: string
  step: number
  title: string
  subtitle: string
  timeEstimate: string
  roles: Role[]
  objective: string
  whyItMatters: string
  checklist: ChecklistItem[]
  content: string // markdown-ish structured content rendered by SectionRenderer
}

export interface CalcInputs {
  price: number
  cogs: number
  firstCommission: number
  repeatCommission: number
  purchasesTotal: number
  samplesPerDay: number
  postRate: number
  sampleUnitCost: number
  avgVideosPerCreator: number
  activeCreators: number
  avgGmvPerCreator: number
  programWeek: number
  winnersCount: number
  top3Share: number
  videosPerWeek: number
  monthlyGmv: number
  cpa: number
  samplesPerMonth: number
}

export interface AppState {
  mode: ViewMode
  role: Role
  currentStep: number
  completedSteps: number[]
  checklistState: Record<string, boolean>
  calcInputs: Partial<CalcInputs>
  notes: Record<string, string>
  nextActions: { id: string; text: string; done: boolean }[]
}
