import { sections } from '../data/sections'
import { ViewMode, Role } from '../types'
import { CheckCircle, Circle, ChevronRight } from 'lucide-react'

interface Props {
  mode: ViewMode
  role: Role
  currentStep: number
  completedSteps: number[]
  checklistState: Record<string, boolean>
  onStepClick: (step: number) => void
}

export default function Sidebar({ mode, role, currentStep, completedSteps, checklistState, onStepClick }: Props) {
  return (
    <nav className="sidebar-toc w-64 flex-shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white">
      <div className="p-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contents</h3>
        <div className="space-y-0.5">
          {sections.map((section) => {
            const isActive = mode === 'guided' && currentStep === section.step
            const isCompleted = completedSteps.includes(section.step)
            const isRelevant = section.roles.includes(role)
            const totalChecks = section.checklist.length
            const doneChecks = section.checklist.filter(c => checklistState[c.id]).length

            return (
              <button
                key={section.id}
                onClick={() => {
                  onStepClick(section.step)
                  document.getElementById(`section-${section.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all group
                  ${isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  ${!isRelevant ? 'opacity-50' : ''}
                `}
              >
                <span className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : isActive ? (
                    <ChevronRight size={16} className="text-brand-500" />
                  ) : (
                    <Circle size={16} className="text-gray-300" />
                  )}
                </span>
                <span className="flex-1 truncate">
                  <span className="text-xs text-gray-400 mr-1">{section.step}.</span>
                  {section.title}
                </span>
                {totalChecks > 0 && (
                  <span className={`text-xs flex-shrink-0 ${doneChecks === totalChecks ? 'text-green-500' : 'text-gray-400'}`}>
                    {doneChecks}/{totalChecks}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Quick links */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Links</h3>
          <div className="space-y-1">
            {[
              { id: 'command-center-section', label: 'Command Center' },
              { id: 'template-library-section', label: 'Template Library' },
              { id: 'ceo-dashboard-section', label: 'CEO Dashboard' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
