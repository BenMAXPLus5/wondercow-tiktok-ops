import { sections } from '../data/sections'
import { ChevronLeft, ChevronRight, CheckCircle, SkipForward } from 'lucide-react'

interface Props {
  currentStep: number
  completedSteps: number[]
  onStepChange: (step: number) => void
  onCompleteStep: (step: number) => void
}

export default function GuidedStepper({ currentStep, completedSteps, onStepChange, onCompleteStep }: Props) {
  const maxStep = sections.length - 1
  const currentSection = sections.find(s => s.step === currentStep)
  const progress = completedSteps.length / sections.length

  return (
    <div className="no-print bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Progress: {completedSteps.length} of {sections.length} steps</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1 mb-3 overflow-x-auto pb-1">
        {sections.map((s) => {
          const isActive = s.step === currentStep
          const isDone = completedSteps.includes(s.step)
          return (
            <button
              key={s.step}
              onClick={() => onStepChange(s.step)}
              className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-brand-500 text-white scale-110 shadow-md'
                  : isDone
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={s.title}
            >
              {isDone ? <CheckCircle size={14} /> : s.step}
            </button>
          )
        })}
      </div>

      {/* Current step info + nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <div className="text-center px-2">
          <p className="text-sm font-semibold text-gray-900">{currentSection?.title}</p>
          <p className="text-xs text-gray-500">{currentSection?.timeEstimate}</p>
        </div>

        <div className="flex items-center gap-2">
          {!completedSteps.includes(currentStep) && (
            <button
              onClick={() => onCompleteStep(currentStep)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition"
            >
              <CheckCircle size={14} /> Done
            </button>
          )}
          <button
            onClick={() => onStepChange(Math.min(maxStep, currentStep + 1))}
            disabled={currentStep === maxStep}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
