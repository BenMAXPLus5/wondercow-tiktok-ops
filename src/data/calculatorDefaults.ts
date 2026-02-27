import { CalcInputs } from '../types'

export const defaultCalcInputs: CalcInputs = {
  price: 49,
  cogs: 12.98,
  firstCommission: 0.50,
  repeatCommission: 0.25,
  purchasesTotal: 3,
  samplesPerDay: 25,
  postRate: 0.30,
  sampleUnitCost: 12.98,
  avgVideosPerCreator: 2.5,
  activeCreators: 50,
  avgGmvPerCreator: 400,
  programWeek: 1,
  winnersCount: 0,
  top3Share: 0.40,
  videosPerWeek: 80,
  monthlyGmv: 0,
  cpa: 25,
  samplesPerMonth: 750,
}

export function computeUnitEconomics(inputs: CalcInputs) {
  const profitFirst = inputs.price * (1 - inputs.firstCommission) - inputs.cogs
  const profitRepeat = inputs.price * (1 - inputs.repeatCommission) - inputs.cogs
  const ltvRevenue = inputs.price * inputs.purchasesTotal
  const ltvProfit = profitFirst + (inputs.purchasesTotal - 1) * profitRepeat
  const blendedMargin = ltvRevenue > 0 ? ltvProfit / ltvRevenue : 0
  return { profitFirst, profitRepeat, ltvRevenue, ltvProfit, blendedMargin }
}

export function computeSampleModel(inputs: CalcInputs) {
  const monthlySamples = inputs.samplesPerDay * 30
  const sampleSpend = monthlySamples * inputs.sampleUnitCost
  const costPerPostingCreator = inputs.postRate > 0 ? inputs.sampleUnitCost / inputs.postRate : 0
  return { monthlySamples, sampleSpend, costPerPostingCreator }
}

export function computeProductionModel(inputs: CalcInputs) {
  const postingCreatorsPerWeek = (inputs.samplesPerDay * 7) * inputs.postRate
  const videosPerWeek = postingCreatorsPerWeek * inputs.avgVideosPerCreator
  let status: string
  if (videosPerWeek < 60) status = 'RISK'
  else if (videosPerWeek < 100) status = 'MODERATE'
  else if (videosPerWeek < 150) status = 'ON TRACK ($200K)'
  else status = 'BREAKOUT'
  return { postingCreatorsPerWeek, videosPerWeek, status }
}

export function computeRevenueForecast(inputs: CalcInputs) {
  const gmvEstimate = inputs.activeCreators * inputs.avgGmvPerCreator
  return { gmvEstimate }
}

export function computeRiskAlerts(inputs: CalcInputs) {
  const alerts: { type: 'danger' | 'warning' | 'info'; title: string; message: string; actions: string[] }[] = []

  if (inputs.postRate < 0.25) {
    alerts.push({
      type: 'danger',
      title: 'Activation Risk: Post Rate Below 25%',
      message: `Current post rate: ${(inputs.postRate * 100).toFixed(0)}%. This means you're burning samples without enough content output.`,
      actions: [
        'Switch to Tight approval mode immediately',
        'Audit last 50 approvals for quality issues',
        'Test new follow-up message variants',
        'Reduce daily approvals until rate recovers above 30%',
      ],
    })
  }

  if (inputs.videosPerWeek < 60) {
    alerts.push({
      type: 'danger',
      title: 'Production Risk: Videos/Week Below 60',
      message: `Current: ${inputs.videosPerWeek} videos/week. Minimum for growth is 60; target is 80–120.`,
      actions: [
        'Increase daily invites to 40+ for 2 weeks',
        'Trigger Sprint Week immediately',
        'Audit follow-up cadence',
        'Consider posting bonus ($25–$50 per first video)',
      ],
    })
  }

  if (inputs.programWeek >= 8 && inputs.winnersCount === 0) {
    alerts.push({
      type: 'warning',
      title: 'Winner Risk: No Winners After Week 8',
      message: 'Program has been running 8+ weeks with zero $5K+/month creators.',
      actions: [
        'Double down on top 5 Performers',
        'Increase Spark Ads budget for Performer content',
        'Ramp GMV Max by 20–30%',
        'Offer exclusive commission rates to top 5',
      ],
    })
  }

  if (inputs.top3Share > 0.70) {
    alerts.push({
      type: 'warning',
      title: 'Concentration Risk: Top 3 > 70% GMV',
      message: `Top 3 creators account for ${(inputs.top3Share * 100).toFixed(0)}% of GMV. Portfolio is fragile.`,
      actions: [
        'Increase investment in 10–15 mid-tier creators',
        'Send upgraded product and request variants',
        'Run Sprint Week focused on diversification',
        'Goal: reduce below 50% within 4 weeks',
      ],
    })
  }

  const { ltvProfit } = computeUnitEconomics(inputs)
  if (inputs.cpa > ltvProfit && inputs.cpa > 0) {
    alerts.push({
      type: 'danger',
      title: `CPA Exceeds LTV Profit ($${ltvProfit.toFixed(2)})`,
      message: `Current CPA: $${inputs.cpa}. You are losing money on each acquired customer.`,
      actions: [
        'Pause all Spark Ads immediately',
        'Reduce GMV Max budget by 50%',
        'Refocus on organic for 2–4 weeks',
        'Only reactivate on 10K+ organic view content',
      ],
    })
  }

  const sampleSpend = inputs.samplesPerMonth * inputs.sampleUnitCost
  if (sampleSpend > 15000 && inputs.monthlyGmv < 100000) {
    alerts.push({
      type: 'warning',
      title: 'Sample Spend Warning: >$15K with Flat GMV',
      message: `Monthly sample spend: $${sampleSpend.toLocaleString()}. GMV: $${inputs.monthlyGmv.toLocaleString()}. Spending too much on samples relative to revenue.`,
      actions: [
        'Reduce daily approvals',
        'Tighten approval criteria',
        'Review post rate and follow-up effectiveness',
        'Only acceptable if GMV is rising proportionally',
      ],
    })
  }

  return alerts
}

export function computeApprovalMode(postRate: number): { mode: string; color: string } {
  if (postRate >= 0.35) return { mode: 'Aggressive', color: 'green' }
  if (postRate >= 0.30) return { mode: 'Normal', color: 'blue' }
  if (postRate >= 0.25) return { mode: 'Watch', color: 'yellow' }
  return { mode: 'Tight', color: 'red' }
}

export function computeNextActions(inputs: CalcInputs): string[] {
  const actions: string[] = []
  const { mode } = computeApprovalMode(inputs.postRate)

  if (inputs.videosPerWeek < 60) {
    actions.push('URGENT: Trigger Sprint Week — videos/week is critically low')
    actions.push('Increase daily invites to 40+ per day')
  } else if (inputs.videosPerWeek < 80) {
    actions.push('Increase daily approvals by 10–20%')
    actions.push('Review follow-up cadence for gaps')
  }

  if (inputs.postRate < 0.25) {
    actions.push('Switch to Tight approval mode immediately')
    actions.push('Audit last 50 creator approvals for quality')
  }

  if (inputs.programWeek >= 8 && inputs.winnersCount === 0) {
    actions.push('Increase Spark Ads testing on top Performer content')
    actions.push('Ramp GMV Max budget by 20–30%')
  }

  if (inputs.top3Share > 0.70) {
    actions.push('Develop mid-tier creators urgently — portfolio is fragile')
    actions.push('Send product upgrades to 10–15 Activated creators')
  }

  if (mode === 'Aggressive') {
    actions.push('Approval mode: Aggressive — approve more liberally')
  }

  if (inputs.videosPerWeek >= 80 && inputs.activeCreators >= 5) {
    actions.push('LIVE readiness: start scheduling 2 LIVEs/week')
  }

  if (inputs.videosPerWeek >= 120) {
    actions.push('Increase GMV Max budget — content volume supports scaling')
  }

  if (actions.length === 0) {
    actions.push('System is healthy — maintain current cadence')
    actions.push('Review portfolio for winner development opportunities')
  }

  return actions.slice(0, 10)
}
