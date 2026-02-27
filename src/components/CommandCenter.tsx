import { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LineChart, Line,
} from 'recharts'
import {
  Calculator, TrendingUp, AlertTriangle, Target,
  DollarSign, Users,
} from 'lucide-react'
import KPICard from './KPICard'
import Callout from './Callout'
import Accordion from './Accordion'
import { CalcInputs } from '../types'
import {
  defaultCalcInputs, computeUnitEconomics, computeSampleModel,
  computeProductionModel, computeRevenueForecast, computeRiskAlerts,
  computeApprovalMode, computeNextActions,
} from '../data/calculatorDefaults'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface Props {
  calcInputs: CalcInputs
  onCalcChange: (inputs: CalcInputs) => void
}

// ---------------------------------------------------------------------------
// Helper: number input
// ---------------------------------------------------------------------------
interface NumInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
  prefix?: string
  suffix?: string
}

function NumInput({ label, value, onChange, step = 1, min, max, prefix, suffix }: NumInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <div className="flex items-center gap-1">
        {prefix && <span className="text-sm text-gray-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {suffix && <span className="text-sm text-gray-400">{suffix}</span>}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helpers: formatting
// ---------------------------------------------------------------------------
function fmt$(n: number, decimals = 2): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}

function fmtNum(n: number, decimals = 0): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

// ---------------------------------------------------------------------------
// Status badge helper
// ---------------------------------------------------------------------------
function StatusBadge({ text, color }: { text: string; color: string }) {
  const colorMap: Record<string, string> = {
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${colorMap[color] ?? 'bg-gray-100 text-gray-700'}`}>
      {text}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CommandCenter({ calcInputs, onCalcChange }: Props) {
  // shorthand updater
  const set = (patch: Partial<CalcInputs>) => onCalcChange({ ...calcInputs, ...patch })

  // computed values
  const unitEcon = useMemo(() => computeUnitEconomics(calcInputs), [calcInputs])
  const sampleModel = useMemo(() => computeSampleModel(calcInputs), [calcInputs])
  const prodModel = useMemo(() => computeProductionModel(calcInputs), [calcInputs])
  const revForecast = useMemo(() => computeRevenueForecast(calcInputs), [calcInputs])
  const riskAlerts = useMemo(() => computeRiskAlerts(calcInputs), [calcInputs])
  const approvalMode = useMemo(() => computeApprovalMode(calcInputs.postRate), [calcInputs.postRate])
  const nextActions = useMemo(() => computeNextActions(calcInputs), [calcInputs])

  // ------ chart data ------
  const gmvChartData = useMemo(() => [
    { name: 'Current', value: revForecast.gmvEstimate, fill: '#3b82f6' },
    { name: '$200K Target', value: 200000, fill: '#22c55e' },
    { name: '$500K Target', value: 500000, fill: '#a855f7' },
  ], [revForecast.gmvEstimate])

  const videoChartData = useMemo(() => [
    { name: 'Current', value: prodModel.videosPerWeek, fill: '#3b82f6' },
  ], [prodModel.videosPerWeek])

  const sampleSpendChartData = useMemo(() => [
    { name: 'Current', value: sampleModel.sampleSpend, fill: '#3b82f6' },
  ], [sampleModel.sampleSpend])

  // ------ export helpers ------
  function exportJSON() {
    const payload = {
      inputs: calcInputs,
      unitEconomics: unitEcon,
      sampleModel,
      productionModel: prodModel,
      revenueForecast: revForecast,
      approvalMode,
      riskAlerts: riskAlerts.map((a) => ({ type: a.type, title: a.title })),
      nextActions,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wondercow-command-center.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportCSV() {
    const rows = [
      ['Metric', 'Value'],
      ['Price', calcInputs.price],
      ['COGS', calcInputs.cogs],
      ['First Purchase Profit', unitEcon.profitFirst.toFixed(2)],
      ['Repeat Purchase Profit', unitEcon.profitRepeat.toFixed(2)],
      ['LTV Revenue', unitEcon.ltvRevenue.toFixed(2)],
      ['LTV Profit', unitEcon.ltvProfit.toFixed(2)],
      ['Blended Margin', (unitEcon.blendedMargin * 100).toFixed(1) + '%'],
      ['Monthly Samples', sampleModel.monthlySamples],
      ['Sample Spend', sampleModel.sampleSpend.toFixed(2)],
      ['Cost per Posting Creator', sampleModel.costPerPostingCreator.toFixed(2)],
      ['Posting Creators/Week', prodModel.postingCreatorsPerWeek.toFixed(1)],
      ['Videos/Week', prodModel.videosPerWeek.toFixed(1)],
      ['Production Status', prodModel.status],
      ['Est. Monthly GMV', revForecast.gmvEstimate.toFixed(2)],
      ['CPA', calcInputs.cpa],
      ['Approval Mode', approvalMode.mode],
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wondercow-command-center.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* ================================================================= */}
      {/* Section 1 — Unit Economics Calculator */}
      {/* ================================================================= */}
      <Accordion title="Unit Economics Calculator" defaultOpen badge="Core">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <NumInput label="Price" value={calcInputs.price} onChange={(v) => set({ price: v })} step={0.01} min={0} prefix="$" />
            <NumInput label="COGS" value={calcInputs.cogs} onChange={(v) => set({ cogs: v })} step={0.01} min={0} prefix="$" />
            <NumInput label="1st Purchase Commission" value={calcInputs.firstCommission} onChange={(v) => set({ firstCommission: v })} step={0.01} min={0} max={1} suffix="%" />
            <NumInput label="Repeat Purchase Commission" value={calcInputs.repeatCommission} onChange={(v) => set({ repeatCommission: v })} step={0.01} min={0} max={1} suffix="%" />
            <NumInput label="Total Purchases (LTV)" value={calcInputs.purchasesTotal} onChange={(v) => set({ purchasesTotal: v })} step={1} min={1} max={50} />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <KPICard label="1st Purchase Profit" value={fmt$(unitEcon.profitFirst)} icon={<DollarSign className="h-5 w-5" />} status={unitEcon.profitFirst > 0 ? 'good' : 'danger'} />
            <KPICard label="Repeat Purchase Profit" value={fmt$(unitEcon.profitRepeat)} icon={<DollarSign className="h-5 w-5" />} status={unitEcon.profitRepeat > 0 ? 'good' : 'danger'} />
            <KPICard label="LTV Revenue" value={fmt$(unitEcon.ltvRevenue)} icon={<TrendingUp className="h-5 w-5" />} status="neutral" />
            <KPICard label="LTV Profit" value={fmt$(unitEcon.ltvProfit)} icon={<Target className="h-5 w-5" />} status={unitEcon.ltvProfit > 0 ? 'good' : 'danger'} />
            <KPICard label="Blended Margin" value={fmtPct(unitEcon.blendedMargin)} icon={<Calculator className="h-5 w-5" />} status={unitEcon.blendedMargin >= 0.3 ? 'good' : unitEcon.blendedMargin >= 0.15 ? 'warning' : 'danger'} />
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 2 — Sample Model */}
      {/* ================================================================= */}
      <Accordion title="Sample Model">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <NumInput label="Samples / Day" value={calcInputs.samplesPerDay} onChange={(v) => set({ samplesPerDay: v })} step={1} min={0} max={200} />
            <NumInput label="Post Rate" value={calcInputs.postRate} onChange={(v) => set({ postRate: v })} step={0.01} min={0} max={1} suffix="%" />
            <NumInput label="Sample Unit Cost" value={calcInputs.sampleUnitCost} onChange={(v) => set({ sampleUnitCost: v })} step={0.01} min={0} prefix="$" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <KPICard label="Monthly Samples" value={fmtNum(sampleModel.monthlySamples)} icon={<Users className="h-5 w-5" />} status={sampleModel.monthlySamples >= 600 && sampleModel.monthlySamples <= 900 ? 'good' : 'warning'} />
            <KPICard label="Monthly Sample Spend" value={fmt$(sampleModel.sampleSpend)} icon={<DollarSign className="h-5 w-5" />} status={sampleModel.sampleSpend <= 12000 ? 'good' : sampleModel.sampleSpend <= 15000 ? 'warning' : 'danger'} />
            <KPICard label="Cost per Posting Creator" value={fmt$(sampleModel.costPerPostingCreator)} icon={<Target className="h-5 w-5" />} status="neutral" />
          </div>

          {sampleModel.sampleSpend > 15000 && calcInputs.monthlyGmv < 100000 && (
            <Callout type="warning" title="Sample Spend Warning">
              <p>Monthly sample spend ({fmt$(sampleModel.sampleSpend)}) exceeds $15K while GMV ({fmt$(calcInputs.monthlyGmv)}) is under $100K. Consider tightening approvals.</p>
            </Callout>
          )}

          <Callout type="info" title="Recommended Band">
            <p>Target 600 -- 900 samples/month with $8K -- $12K spend for optimal ROI at this stage.</p>
          </Callout>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 3 — Production Model */}
      {/* ================================================================= */}
      <Accordion title="Production Model">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <NumInput label="Avg Videos per Posting Creator" value={calcInputs.avgVideosPerCreator} onChange={(v) => set({ avgVideosPerCreator: v })} step={0.1} min={0} max={20} />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <KPICard label="Posting Creators / Week" value={fmtNum(prodModel.postingCreatorsPerWeek, 1)} icon={<Users className="h-5 w-5" />} status="neutral" />
            <KPICard label="Videos / Week (est.)" value={fmtNum(prodModel.videosPerWeek, 1)} icon={<TrendingUp className="h-5 w-5" />} status={prodModel.videosPerWeek >= 100 ? 'good' : prodModel.videosPerWeek >= 60 ? 'warning' : 'danger'} />
            <div className="flex items-center">
              <StatusBadge
                text={prodModel.status}
                color={
                  prodModel.videosPerWeek < 60
                    ? 'red'
                    : prodModel.videosPerWeek < 100
                    ? 'yellow'
                    : prodModel.videosPerWeek < 150
                    ? 'green'
                    : 'blue'
                }
              />
            </div>
          </div>

          <div className="rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-500">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-red-500" /> &lt;60 Risk
            <span className="ml-4 mr-3 inline-block h-2 w-2 rounded-full bg-yellow-500" /> 60 -- 100 Moderate
            <span className="ml-4 mr-3 inline-block h-2 w-2 rounded-full bg-green-500" /> 100 -- 150 On Track
            <span className="ml-4 mr-3 inline-block h-2 w-2 rounded-full bg-blue-500" /> 150+ Breakout
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 4 — Revenue Forecast */}
      {/* ================================================================= */}
      <Accordion title="Revenue Forecast">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <NumInput label="Active Creators" value={calcInputs.activeCreators} onChange={(v) => set({ activeCreators: v })} step={1} min={0} max={5000} />
            <NumInput label="Avg GMV per Creator / Month" value={calcInputs.avgGmvPerCreator} onChange={(v) => set({ avgGmvPerCreator: v })} step={10} min={0} prefix="$" />
          </div>

          <KPICard
            label="Estimated Monthly GMV"
            value={fmt$(revForecast.gmvEstimate, 0)}
            subtitle={`${calcInputs.activeCreators} creators x ${fmt$(calcInputs.avgGmvPerCreator)} avg`}
            icon={<DollarSign className="h-5 w-5" />}
            status={revForecast.gmvEstimate >= 200000 ? 'good' : revForecast.gmvEstimate >= 100000 ? 'warning' : 'danger'}
          />

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gmvChartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => fmt$(v, 0)} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 5 — Paid Break-Even */}
      {/* ================================================================= */}
      <Accordion title="Paid Break-Even">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <NumInput label="CPA" value={calcInputs.cpa} onChange={(v) => set({ cpa: v })} step={0.5} min={0} prefix="$" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <KPICard label="Max Acceptable CPA" value={fmt$(unitEcon.ltvProfit)} subtitle="= LTV Profit" icon={<Target className="h-5 w-5" />} status="neutral" />
            <KPICard
              label="Current CPA"
              value={fmt$(calcInputs.cpa)}
              icon={<DollarSign className="h-5 w-5" />}
              status={calcInputs.cpa < 20 ? 'good' : calcInputs.cpa <= 35 ? 'good' : calcInputs.cpa <= unitEcon.ltvProfit ? 'warning' : 'danger'}
            />
            <KPICard
              label="Status"
              value={
                calcInputs.cpa > unitEcon.ltvProfit
                  ? 'KILL'
                  : calcInputs.cpa > 35
                  ? 'Acceptable'
                  : calcInputs.cpa > 20
                  ? 'Good'
                  : 'Scale Hard'
              }
              status={
                calcInputs.cpa > unitEcon.ltvProfit
                  ? 'danger'
                  : calcInputs.cpa > 35
                  ? 'warning'
                  : 'good'
              }
            />
          </div>

          {/* Tier guidance */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">CPA Tier Guidance</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className={`rounded-lg border-l-4 border-green-500 bg-green-50 px-3 py-2 ${calcInputs.cpa < 20 ? 'ring-2 ring-green-400' : ''}`}>
                <p className="text-sm font-bold text-green-700">Scale Hard</p>
                <p className="text-xs text-green-600">CPA &lt; $20</p>
                <p className="mt-1 text-xs text-gray-600">Increase paid spend aggressively. Very profitable.</p>
              </div>
              <div className={`rounded-lg border-l-4 border-blue-500 bg-blue-50 px-3 py-2 ${calcInputs.cpa >= 20 && calcInputs.cpa <= 35 ? 'ring-2 ring-blue-400' : ''}`}>
                <p className="text-sm font-bold text-blue-700">Good</p>
                <p className="text-xs text-blue-600">CPA $20 -- $35</p>
                <p className="mt-1 text-xs text-gray-600">Healthy range. Continue optimizing creatives.</p>
              </div>
              <div className={`rounded-lg border-l-4 border-yellow-500 bg-yellow-50 px-3 py-2 ${calcInputs.cpa > 35 && calcInputs.cpa <= unitEcon.ltvProfit ? 'ring-2 ring-yellow-400' : ''}`}>
                <p className="text-sm font-bold text-yellow-700">Acceptable</p>
                <p className="text-xs text-yellow-600">CPA $35 -- {fmt$(unitEcon.ltvProfit)}</p>
                <p className="mt-1 text-xs text-gray-600">Monitor closely. Optimize or reduce spend.</p>
              </div>
              <div className={`rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 ${calcInputs.cpa > unitEcon.ltvProfit ? 'ring-2 ring-red-400' : ''}`}>
                <p className="text-sm font-bold text-red-700">Kill</p>
                <p className="text-xs text-red-600">CPA &gt; {fmt$(unitEcon.ltvProfit)}</p>
                <p className="mt-1 text-xs text-gray-600">Losing money per customer. Pause ads immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 6 — Risk Alerts */}
      {/* ================================================================= */}
      <Accordion title="Risk Alerts" badge={riskAlerts.length > 0 ? `${riskAlerts.length} alert${riskAlerts.length > 1 ? 's' : ''}` : undefined}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <NumInput label="Program Week" value={calcInputs.programWeek} onChange={(v) => set({ programWeek: v })} step={1} min={1} max={52} />
            <NumInput label="Winners Count" value={calcInputs.winnersCount} onChange={(v) => set({ winnersCount: v })} step={1} min={0} max={100} />
            <NumInput label="Top 3 Share" value={calcInputs.top3Share} onChange={(v) => set({ top3Share: v })} step={0.01} min={0} max={1} suffix="%" />
            <NumInput label="Videos / Week" value={calcInputs.videosPerWeek} onChange={(v) => set({ videosPerWeek: v })} step={1} min={0} max={1000} />
            <NumInput label="Monthly GMV" value={calcInputs.monthlyGmv} onChange={(v) => set({ monthlyGmv: v })} step={1000} min={0} prefix="$" />
            <NumInput label="Samples / Month" value={calcInputs.samplesPerMonth} onChange={(v) => set({ samplesPerMonth: v })} step={10} min={0} max={5000} />
          </div>

          {riskAlerts.length === 0 ? (
            <Callout type="success" title="No Active Alerts">
              <p>All metrics are within healthy ranges. Keep up the great work.</p>
            </Callout>
          ) : (
            riskAlerts.map((alert, idx) => (
              <Callout key={idx} type={alert.type === 'danger' ? 'danger' : 'warning'} title={alert.title}>
                <p className="mb-2">{alert.message}</p>
                <ul className="list-disc space-y-1 pl-4">
                  {alert.actions.map((action, i) => (
                    <li key={i} className="text-sm">{action}</li>
                  ))}
                </ul>
              </Callout>
            ))
          )}
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 7 — Recommendation Engine */}
      {/* ================================================================= */}
      <Accordion title="Recommendation Engine">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Approval Mode:</span>
            <StatusBadge text={approvalMode.mode} color={approvalMode.color} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Next Actions</p>
            <ol className="list-decimal space-y-1.5 pl-5">
              {nextActions.map((action, idx) => (
                <li key={idx} className="text-sm text-gray-700">{action}</li>
              ))}
            </ol>
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Section 8 — Charts */}
      {/* ================================================================= */}
      <Accordion title="Charts & Gauges">
        <div className="space-y-6">
          {/* Chart 1: GMV Run Rate */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">GMV Run Rate</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gmvChartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => fmt$(v, 0)} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Videos / Week Gauge */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Videos / Week</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={videoChartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, Math.max(prodModel.videosPerWeek * 1.5, 150)]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: '80 Target', position: 'right', fill: '#22c55e', fontSize: 11 }} />
                  <ReferenceLine y={120} stroke="#a855f7" strokeDasharray="4 4" label={{ value: '120 Stretch', position: 'right', fill: '#a855f7', fontSize: 11 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Sample Spend */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Monthly Sample Spend</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleSpendChartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} domain={[0, Math.max(sampleModel.sampleSpend * 1.5, 18000)]} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => fmt$(v, 0)} />
                  <ReferenceLine y={8000} stroke="#22c55e" strokeDasharray="4 4" label={{ value: '$8K Low', position: 'right', fill: '#22c55e', fontSize: 11 }} />
                  <ReferenceLine y={12000} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '$12K High', position: 'right', fill: '#f59e0b', fontSize: 11 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Accordion>

      {/* ================================================================= */}
      {/* Export Buttons */}
      {/* ================================================================= */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={exportJSON}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Calculator className="h-4 w-4" />
          Export JSON
        </button>
        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <TrendingUp className="h-4 w-4" />
          Export CSV
        </button>
      </div>
    </div>
  )
}
