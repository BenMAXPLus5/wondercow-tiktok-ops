import { useState, useRef, useEffect } from 'react'
import { Search, Download, Printer, ToggleLeft, ToggleRight, User, Briefcase, Crown, Menu, X } from 'lucide-react'
import { ViewMode, Role } from '../types'

interface Props {
  mode: ViewMode
  role: Role
  searchQuery: string
  onModeChange: (mode: ViewMode) => void
  onRoleChange: (role: Role) => void
  onSearchChange: (query: string) => void
  onExportJSON: () => void
  onExportCSV: () => void
  onPrint: () => void
  onToggleMobileSidebar: () => void
}

const roles: { value: Role; label: string; icon: typeof User }[] = [
  { value: 'operator', label: 'Operator', icon: Briefcase },
  { value: 'founder', label: 'Founder', icon: User },
  { value: 'ceo', label: 'CEO', icon: Crown },
]

export default function Topbar({
  mode, role, searchQuery,
  onModeChange, onRoleChange, onSearchChange,
  onExportJSON, onExportCSV, onPrint, onToggleMobileSidebar
}: Props) {
  const [showExportMenu, setShowExportMenu] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExportMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="no-print fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 h-16">
      <div className="h-full px-4 flex items-center gap-2">
        {/* Mobile menu toggle */}
        <button onClick={onToggleMobileSidebar} className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700">
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🐄</span>
          <span className="font-bold text-gray-900 hidden sm:inline">WonderCow</span>
          <span className="text-xs text-gray-400 hidden md:inline">TikTok OS</span>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[120px] max-w-[280px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search sections..."
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-gray-50"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Mode toggle */}
        <button
          onClick={() => onModeChange(mode === 'guided' ? 'all' : 'guided')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          title={mode === 'guided' ? 'Switch to All Sections' : 'Switch to Guided Mode'}
        >
          {mode === 'guided' ? <ToggleLeft size={16} className="text-brand-500" /> : <ToggleRight size={16} className="text-gray-400" />}
          <span className="hidden md:inline">{mode === 'guided' ? 'Guided' : 'All'}</span>
        </button>

        {/* Role toggle */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-0.5">
          {roles.map(r => {
            const Icon = r.icon
            return (
              <button
                key={r.value}
                onClick={() => onRoleChange(r.value)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition ${
                  role === r.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={14} />
                <span className="hidden md:inline">{r.label}</span>
              </button>
            )
          })}
        </div>

        {/* Export / Print */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <Download size={14} />
            <span className="hidden md:inline">Export</span>
          </button>
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50">
              <button onClick={() => { onExportJSON(); setShowExportMenu(false) }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Export JSON Snapshot
              </button>
              <button onClick={() => { onExportCSV(); setShowExportMenu(false) }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Export CSV (KPIs)
              </button>
              <hr className="my-1 border-gray-100" />
              <button onClick={() => { onPrint(); setShowExportMenu(false) }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Printer size={14} /> Print Summary
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
