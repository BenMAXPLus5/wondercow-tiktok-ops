import React, { useState } from 'react';
import { MessageSquare, Filter } from 'lucide-react';
import { templates, Template } from '../data/templates';
import CopyButton from './CopyButton';
import { Role } from '../types';

interface TemplateLibraryProps {
  role: Role;
}

const CATEGORIES = ['All', 'Acquisition', 'Follow-Up', 'Growth', 'Retention', 'LIVE'] as const;

const categoryColors: Record<string, string> = {
  Acquisition: 'bg-green-100 text-green-800',
  'Follow-Up': 'bg-yellow-100 text-yellow-800',
  Growth: 'bg-indigo-100 text-indigo-800',
  Retention: 'bg-pink-100 text-pink-800',
  LIVE: 'bg-red-100 text-red-800',
};

const roleBadgeColors: Record<string, string> = {
  operator: 'bg-blue-100 text-blue-800',
  founder: 'bg-purple-100 text-purple-800',
  ceo: 'bg-amber-100 text-amber-800',
};

export default function TemplateLibrary({ role }: TemplateLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered =
    activeCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Template Library</h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-gray-500" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((template) => {
          const matchesRole = template.roles.includes(role);

          return (
            <div
              key={template.id}
              className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${
                matchesRole ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Card Header */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {template.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Category badge */}
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        categoryColors[template.category] ??
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {template.category}
                    </span>

                    {/* Role badges */}
                    {template.roles.map((r) => (
                      <span
                        key={r}
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          roleBadgeColors[r] ?? 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <CopyButton text={template.content} label="Copy" />
              </div>

              {/* Template Content */}
              <pre className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 font-mono text-sm leading-relaxed text-gray-700">
                {template.content}
              </pre>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No templates found for the selected category.
        </p>
      )}
    </div>
  );
}
