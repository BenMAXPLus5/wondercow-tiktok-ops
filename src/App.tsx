import { useState, useCallback, useMemo } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import GuidedStepper from './components/GuidedStepper'
import SectionRenderer from './components/SectionRenderer'
import CommandCenter from './components/CommandCenter'
import TemplateLibrary from './components/TemplateLibrary'
import Callout from './components/Callout'
import KPICard from './components/KPICard'
import { sections } from './data/sections'
import { defaultCalcInputs, computeUnitEconomics, computeSampleModel, computeProductionModel, computeRevenueForecast, computeApprovalMode, computeNextActions } from './data/calculatorDefaults'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ViewMode, Role, CalcInputs, AppState } from './types'
import { Rocket, Zap, AlertTriangle, TrendingUp, Eye } from 'lucide-react'

const defaultState: AppState = {
  mode: 'guided',
  role: 'operator',
  currentStep: 0,
  completedSteps: [],
  checklistState: {},
  calcInputs: {},
  notes: {},
  nextActions: [],
}

export default function App() {
  const [state, setState] = useLocalStorage<AppState>('wondercow-tiktok-os', defaultState)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const mode = state.mode
  const role = state.role
  const currentStep = state.currentStep
  const completedSteps = state.completedSteps
  const checklistState = state.checklistState
  const calcInputs: CalcInputs = { ...defaultCalcInputs, ...state.calcInputs }

  const setMode = (m: ViewMode) => setState(s => ({ ...s, mode: m }))
  const setRole = (r: Role) => setState(s => ({ ...s, role: r }))
  const setCurrentStep = (step: number) => setState(s => ({ ...s, currentStep: step }))

  const onCompleteStep = useCallback((step: number) => {
    setState(s => ({
      ...s,
      completedSteps: s.completedSteps.includes(step) ? s.completedSteps : [...s.completedSteps, step],
    }))
  }, [setState])

  const onCheckChange = useCallback((id: string, val: boolean) => {
    setState(s => ({ ...s, checklistState: { ...s.checklistState, [id]: val } }))
  }, [setState])

  const onCalcChange = useCallback((inputs: CalcInputs) => {
    setState(s => ({ ...s, calcInputs: inputs }))
  }, [setState])

  // Search filtering
  const filteredSections = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return sections
    const q = searchQuery.toLowerCase()
    return sections.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.content.toLowerCase().includes(q) ||
      s.objective.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const visibleSections = mode === 'guided'
    ? filteredSections.filter(s => s.step <= currentStep + 1)
    : filteredSections

  // Export functions
  const exportJSON = useCallback(() => {
    const econ = computeUnitEconomics(calcInputs)
    const sample = computeSampleModel(calcInputs)
    const prod = computeProductionModel(calcInputs)
    const rev = computeRevenueForecast(calcInputs)
    const snapshot = {
      exportedAt: new Date().toISOString(),
      state: { mode, role, currentStep, completedSteps, checklistState },
      inputs: calcInputs,
      computed: { unitEconomics: econ, sampleModel: sample, productionModel: prod, revenueForecast: rev },
    }
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wondercow-snapshot-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [calcInputs, mode, role, currentStep, completedSteps, checklistState])

  const exportCSV = useCallback(() => {
    const econ = computeUnitEconomics(calcInputs)
    const sample = computeSampleModel(calcInputs)
    const prod = computeProductionModel(calcInputs)
    const rev = computeRevenueForecast(calcInputs)
    const rows = [
      ['Metric', 'Value'],
      ['Bundle Price', `$${calcInputs.price}`],
      ['COGS', `$${calcInputs.cogs}`],
      ['First Purchase Profit', `$${econ.profitFirst.toFixed(2)}`],
      ['Repeat Purchase Profit', `$${econ.profitRepeat.toFixed(2)}`],
      ['LTV Revenue', `$${econ.ltvRevenue.toFixed(2)}`],
      ['LTV Profit', `$${econ.ltvProfit.toFixed(2)}`],
      ['Blended Margin', `${(econ.blendedMargin * 100).toFixed(1)}%`],
      ['Samples/Day', String(calcInputs.samplesPerDay)],
      ['Monthly Samples', String(sample.monthlySamples)],
      ['Monthly Sample Spend', `$${sample.sampleSpend.toFixed(2)}`],
      ['Post Rate', `${(calcInputs.postRate * 100).toFixed(0)}%`],
      ['Videos/Week (est)', String(Math.round(prod.videosPerWeek))],
      ['Production Status', prod.status],
      ['Active Creators', String(calcInputs.activeCreators)],
      ['Est Monthly GMV', `$${rev.gmvEstimate.toLocaleString()}`],
      ['CPA', `$${calcInputs.cpa}`],
      ['Approval Mode', computeApprovalMode(calcInputs.postRate).mode],
      ['Completed Steps', `${completedSteps.length}/${sections.length}`],
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wondercow-kpis-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [calcInputs, completedSteps])

  const handlePrint = useCallback(() => window.print(), [])

  // Quick-start banner
  const showQuickStart = completedSteps.length === 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        mode={mode}
        role={role}
        searchQuery={searchQuery}
        onModeChange={setMode}
        onRoleChange={setRole}
        onSearchChange={setSearchQuery}
        onExportJSON={exportJSON}
        onExportCSV={exportCSV}
        onPrint={handlePrint}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <Sidebar
              mode={mode}
              role={role}
              currentStep={currentStep}
              completedSteps={completedSteps}
              checklistState={checklistState}
              onStepClick={(step) => { setCurrentStep(step); setMobileSidebarOpen(false) }}
            />
          </div>
        </div>
      )}

      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <Sidebar
          mode={mode}
          role={role}
          currentStep={currentStep}
          completedSteps={completedSteps}
          checklistState={checklistState}
          onStepClick={setCurrentStep}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 xl:p-8 overflow-hidden">
          {/* Quick Start Banner */}
          {showQuickStart && (
            <div className="mb-6 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Rocket size={24} />
                <h2 className="text-xl font-bold">Quick Start: Go Live in 48 Hours</h2>
              </div>
              <p className="text-brand-100 text-sm mb-4">
                Follow the Guided Mode to get the system operational fast. Complete Steps 0–3 on Day 1, Steps 4–5 on Day 2, and you'll be shipping samples and receiving content.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Day 1 Morning', desc: 'Steps 0–1: Overview + Tools' },
                  { label: 'Day 1 Afternoon', desc: 'Steps 2–3: Config + Acquisition' },
                  { label: 'Day 2 Morning', desc: 'Steps 4–5: Activation + Founder' },
                  { label: 'Day 2 Afternoon', desc: 'Steps 6–7: Breakouts + Ops' },
                ].map(d => (
                  <div key={d.label} className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs font-bold text-brand-200">{d.label}</p>
                    <p className="text-xs text-white/80 mt-1">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guided Stepper */}
          {mode === 'guided' && (
            <GuidedStepper
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepChange={setCurrentStep}
              onCompleteStep={onCompleteStep}
            />
          )}

          {/* Search results count */}
          {searchQuery && searchQuery.length >= 2 && (
            <div className="mb-4 text-sm text-gray-500">
              Found {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}

          {/* Sections */}
          <div className="space-y-8">
            {visibleSections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                role={role}
                checklistState={checklistState}
                onCheckChange={onCheckChange}
                searchQuery={searchQuery}
                isGuidedActive={mode === 'guided' && section.step === currentStep}
              />
            ))}
          </div>

          {/* Command Center */}
          <div id="command-center-section" className="scroll-mt-20 mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-brand-600" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Command Center</h2>
                <p className="text-sm text-gray-500">Interactive calculators, charts, risk alerts, and recommendations</p>
              </div>
            </div>
            <CommandCenter calcInputs={calcInputs} onCalcChange={onCalcChange} />
          </div>

          {/* CEO Dashboard Quick View */}
          <div id="ceo-dashboard-section" className="scroll-mt-20 mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Eye className="text-amber-600" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">CEO Dashboard</h2>
                <p className="text-sm text-gray-500">8 numbers, 2-minute review</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <KPICard label="Monthly GMV" value={calcInputs.monthlyGmv ? `$${calcInputs.monthlyGmv.toLocaleString()}` : '—'} subtitle="Target: $200K+" status={calcInputs.monthlyGmv >= 200000 ? 'good' : calcInputs.monthlyGmv >= 50000 ? 'warning' : 'neutral'} />
                <KPICard label="Videos/Week" value={calcInputs.videosPerWeek || '—'} subtitle="Target: 80–120" status={calcInputs.videosPerWeek >= 80 ? 'good' : calcInputs.videosPerWeek >= 60 ? 'warning' : 'danger'} />
                <KPICard label="Active Creators" value={calcInputs.activeCreators || '—'} subtitle="Target: 50+" status={calcInputs.activeCreators >= 50 ? 'good' : 'warning'} />
                <KPICard label="CPA" value={calcInputs.cpa ? `$${calcInputs.cpa}` : '—'} subtitle="Target: < $35" status={calcInputs.cpa <= 35 ? 'good' : calcInputs.cpa <= 59 ? 'warning' : 'danger'} />
                <KPICard label="$200+ Creators" value={calcInputs.winnersCount >= 0 ? '—' : '—'} subtitle="Target: 20+" status="neutral" />
                <KPICard label="$1K+ Creators" value="—" subtitle="Target: 5+" status="neutral" />
                <KPICard label="Samples/Month" value={calcInputs.samplesPerMonth || '—'} subtitle="Target: 600–900" status={calcInputs.samplesPerMonth >= 600 ? 'good' : 'warning'} />
                <KPICard label="Post Rate" value={`${(calcInputs.postRate * 100).toFixed(0)}%`} subtitle="Target: 30–35%" status={calcInputs.postRate >= 0.30 ? 'good' : calcInputs.postRate >= 0.25 ? 'warning' : 'danger'} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Callout type="warning" title="Early Warning Signals">
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Videos/week &lt;80 for 2 weeks</li>
                    <li>Samples/month &lt;600</li>
                    <li>$200+ tier not growing MoM</li>
                    <li>CPA &gt;$59</li>
                    <li>WoW growth negative 2+ weeks</li>
                  </ul>
                </Callout>
                <Callout type="success" title="Acceleration Signals">
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Videos/week &gt;120</li>
                    <li>5+ Performers active</li>
                    <li>WoW growth &gt;15% for 3+ weeks</li>
                    <li>Post rate &gt;35%</li>
                    <li>Creator hits $10K+ in a month</li>
                  </ul>
                </Callout>
              </div>
            </div>
          </div>

          {/* Template Library */}
          <div id="template-library-section" className="scroll-mt-20 mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Zap className="text-indigo-600" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Template Library</h2>
                <p className="text-sm text-gray-500">Copy-paste message templates for every situation</p>
              </div>
            </div>
            <TemplateLibrary role={role} />
          </div>

          {/* Footer */}
          <footer className="mt-16 py-8 border-t border-gray-200 text-center text-sm text-gray-400">
            <p>WonderCow TikTok OS &mdash; Internal Operations System</p>
            <p className="mt-1">All data stored locally in your browser. Export snapshots regularly.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
