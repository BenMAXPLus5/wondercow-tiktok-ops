import React from 'react'
import { SectionData, Role } from '../types'
import Accordion from './Accordion'
import Checklist from './Checklist'
import Callout from './Callout'
import { Clock, Target, HelpCircle } from 'lucide-react'

interface Props {
  section: SectionData
  role: Role
  checklistState: Record<string, boolean>
  onCheckChange: (id: string, val: boolean) => void
  searchQuery?: string
  isGuidedActive?: boolean
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query || query.length < 2) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
  )
}

function renderMarkdown(content: string, query: string): React.ReactNode {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let tableRows: string[][] = []
  let inTable = false

  const flushTable = () => {
    if (tableRows.length === 0) return
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
        <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              {tableRows[0].map((cell, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 border-b">{highlightText(cell.trim(), query)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(1).map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-gray-600 border-b border-gray-100">{highlightText(cell.trim(), query)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableRows = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Table row
    if (line.startsWith('|') && line.endsWith('|')) {
      // Skip separator rows
      if (line.match(/^\|[\s\-|]+\|$/)) continue
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      tableRows.push(cells)
      inTable = true
      continue
    } else if (inTable) {
      flushTable()
      inTable = false
    }

    // Heading
    if (line.startsWith('## ')) {
      elements.push(<h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{highlightText(line.slice(3), query)}</h3>)
    } else if (line.startsWith('### ')) {
      elements.push(<h4 key={i} className="text-base font-semibold text-gray-800 mt-4 mb-1">{highlightText(line.slice(4), query)}</h4>)
    }
    // Bullet
    else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2 ml-4 my-0.5">
          <span className="text-brand-500 mt-1.5 text-xs">●</span>
          <span className="text-gray-700 text-sm">{renderInline(line.slice(2), query)}</span>
        </div>
      )
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)/)
      if (match) {
        elements.push(
          <div key={i} className="flex items-start gap-2 ml-4 my-0.5">
            <span className="text-brand-600 font-semibold text-sm min-w-[1.5rem]">{match[1]}.</span>
            <span className="text-gray-700 text-sm">{renderInline(match[2], query)}</span>
          </div>
        )
      }
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />)
    }
    // Regular paragraph
    else {
      elements.push(<p key={i} className="text-gray-700 text-sm my-1">{renderInline(line, query)}</p>)
    }
  }

  if (inTable) flushTable()

  return <>{elements}</>
}

function renderInline(text: string, query: string): React.ReactNode {
  // Handle **bold** and `code`
  const parts: React.ReactNode[] = []
  const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(highlightText(text.slice(lastIndex, match.index), query))
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold text-gray-900">{highlightText(match[2], query)}</strong>)
    } else if (match[3]) {
      parts.push(<code key={match.index} className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-brand-700">{highlightText(match[3], query)}</code>)
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(highlightText(text.slice(lastIndex), query))
  }
  return <>{parts}</>
}

export default function SectionRenderer({ section, role, checklistState, onCheckChange, searchQuery = '', isGuidedActive }: Props) {
  const completedCount = section.checklist.filter(c => checklistState[c.id]).length
  const totalCount = section.checklist.length
  const isComplete = completedCount === totalCount && totalCount > 0
  const isRelevant = section.roles.includes(role)

  return (
    <div
      id={`section-${section.id}`}
      className={`scroll-mt-20 transition-opacity ${isRelevant ? 'opacity-100' : 'opacity-60'} ${isGuidedActive ? 'ring-2 ring-brand-400 ring-offset-4 rounded-xl' : ''}`}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Step {section.step}
                </span>
                {isComplete && (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Complete
                  </span>
                )}
                {section.roles.map(r => (
                  <span key={r} className={`text-xs px-2 py-0.5 rounded-full ${
                    r === 'operator' ? 'bg-blue-50 text-blue-600' :
                    r === 'founder' ? 'bg-purple-50 text-purple-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>{r}</span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{highlightText(section.title, searchQuery)}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{highlightText(section.subtitle, searchQuery)}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={14} /> {section.timeEstimate}</span>
              {totalCount > 0 && (
                <span className="flex items-center gap-1"><Target size={14} /> {completedCount}/{totalCount}</span>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Objective */}
          <Callout type="info" title="Objective">
            <p className="text-sm">{highlightText(section.objective, searchQuery)}</p>
          </Callout>

          {/* Why it matters */}
          <Accordion title="Why It Matters" badge="Context" defaultOpen={false}>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <HelpCircle size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
              <span>{highlightText(section.whyItMatters, searchQuery)}</span>
            </div>
          </Accordion>

          {/* Checklist */}
          {section.checklist.length > 0 && (
            <Accordion title="Checklist" badge={`${completedCount}/${totalCount}`} defaultOpen={true}>
              <Checklist
                items={section.checklist}
                checked={checklistState}
                onChange={onCheckChange}
              />
            </Accordion>
          )}

          {/* Main Content */}
          <Accordion title="Full Details" defaultOpen={isGuidedActive || false}>
            <div className="prose-sm max-w-none">
              {renderMarkdown(section.content, searchQuery)}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
