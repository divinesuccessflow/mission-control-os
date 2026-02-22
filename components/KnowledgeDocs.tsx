'use client';

import { useState } from 'react';
import Card from './ui/Card';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

const docs = [
  {
    id: 'sffcmm',
    title: 'SFFCMM Framework',
    sections: [
      {
        title: 'The Cascade Structure',
        content: `The SFFCMM cascade represents how broad concerns break down into specific actions:

1. **Overarching Area of Concern** - The highest level domain (e.g., "Business Growth")
2. **Area of Concern** - Major category within the overarching area (e.g., "Sales Performance")
3. **Concern** - Specific matter requiring attention (e.g., "Low conversion rate")
4. **Outcome** - The desired end state (e.g., "20% conversion rate")
5. **Result** - Measurable deliverable (e.g., "100 qualified leads per month")
6. **Action** - Concrete task (e.g., "Call 10 prospects today")

Each level links to the one above, creating a traceable chain from strategy to execution.`,
      },
      {
        title: 'Action vs Behavior',
        content: `**Action**: A discrete task with clear completion (e.g., "Write proposal")
**Behavior**: A recurring pattern or practice (e.g., "Review proposals before sending")

Actions complete. Behaviors continue. Both are necessary.`,
      },
      {
        title: 'Occurring',
        content: `"Occurring" means recognizing what IS, not what should be. It's observing reality without judgment:

- "I'm 3 days behind schedule" (occurring)
- vs "I should be further along" (judgment)

Occurring creates transparency and enables action.`,
      },
      {
        title: 'Transparency',
        content: `Full visibility into:
- Current state vs target
- Blockers and risks
- Progress and velocity
- Resource allocation

Transparency prevents surprises and enables course correction.`,
      },
    ],
  },
  {
    id: 'mission-control',
    title: 'Mission Control Thinking',
    sections: [
      {
        title: 'Think from Accomplishment',
        content: `Mission Control thinking reverses typical planning:

**Traditional**: "I need to do X, Y, Z"
**Mission Control**: "When complete, what EXISTS?"

Start with the end state:
- What document/product/system exists?
- What changed in the world?
- What can others see/use/experience?

Then work backward to determine what actions create that existence.`,
      },
      {
        title: 'Not Activity, but Accomplishment',
        content: `Don't track tasks. Track outcomes.

**Activity thinking**: "I worked 8 hours"
**Accomplishment thinking**: "The landing page is live"

Activity can be busy without results. Accomplishment is undeniable proof of value created.`,
      },
      {
        title: 'The Accomplishment Test',
        content: `Before starting any task, complete this sentence:

"When this is done, _____________ will exist."

If you can't fill the blank with something concrete, tangible, and verifiable—rethink the task.`,
      },
    ],
  },
  {
    id: 'pmp',
    title: 'PMP (Project Management Professional)',
    sections: [
      {
        title: '5 Process Groups',
        content: `Every project moves through 5 stages:

1. **Initiating**: Define the project, get authorization, identify stakeholders
2. **Planning**: Set scope, schedule, budget, risks, quality standards
3. **Executing**: Build deliverables, coordinate team, manage expectations
4. **Monitoring**: Track progress, manage changes, control quality
5. **Closing**: Finalize deliverables, transfer ownership, capture lessons

Tasks in Mission Control OS follow these stages.`,
      },
      {
        title: '10 Knowledge Areas',
        content: `PMP defines 10 areas of project management:

1. Integration - Coordinating all elements
2. Scope - What's in/out
3. Schedule - Time management
4. Cost - Budget control
5. Quality - Standards & verification
6. Resources - People, equipment, materials
7. Communications - Information flow
8. Risk - Identify & mitigate threats
9. Procurement - External resources
10. Stakeholders - Manage expectations

Each task should consider relevant knowledge areas.`,
      },
      {
        title: 'Quality Gates',
        content: `Quality gates are checkpoints before advancing:

- **Definition**: Clear acceptance criteria
- **Measurement**: Objective verification method
- **Approval**: Authorized sign-off

In Mission Control OS, tasks require quality gate verification before moving to "Closing."`,
      },
    ],
  },
  {
    id: 'integration',
    title: 'How They Connect',
    sections: [
      {
        title: 'The Unified Pre-Flight Check',
        content: `Every task combines all three frameworks in 5 questions:

1. **CONCERN** (SFFCMM): What area of importance does this address?
2. **ACCOMPLISHMENT** (Mission Control): What exists when complete?
3. **SCOPE** (PMP): What are the acceptance criteria?
4. **PLAYBOOK** (All): Which guides/factors apply?
5. **QUALITY** (PMP): How do we verify it's right?

If all 5 aren't answered, don't start the task.`,
      },
      {
        title: 'Framework Synergy',
        content: `**SFFCMM** provides the hierarchy—connects tasks to strategy
**Mission Control** provides the mindset—focus on what exists
**PMP** provides the process—how to execute reliably

Together:
- Strategy (SFFCMM cascade)
- Outcome clarity (Mission Control)
- Execution discipline (PMP stages)

This is the complete system.`,
      },
      {
        title: 'Daily Practice',
        content: `1. **Morning**: Review cascade—what concerns need attention today?
2. **Before any task**: Pre-flight check (all 5 questions)
3. **During work**: Think "what exists now?" not "what am I doing?"
4. **Moving tasks**: Follow PMP stages, verify quality gates
5. **Evening**: Update progress, record accomplishments

The system works when used daily.`,
      },
    ],
  },
];

export default function KnowledgeDocs() {
  const [openDocs, setOpenDocs] = useState<Set<string>>(new Set(['sffcmm']));
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleDoc = (docId: string) => {
    setOpenDocs(prev => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-gold" />
        <h2 className="text-3xl font-bold">Knowledge Base</h2>
      </div>

      <Card className="bg-gold/10 border-gold/30">
        <h3 className="font-bold mb-2">Framework Reference</h3>
        <p className="text-sm text-gray-300">
          Complete documentation for SFFCMM, Mission Control, and PMP frameworks.
          Click any section to expand.
        </p>
      </Card>

      <div className="space-y-4">
        {docs.map(doc => {
          const isOpen = openDocs.has(doc.id);

          return (
            <Card key={doc.id} className="border-blue/30">
              <button
                onClick={() => toggleDoc(doc.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-blue" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-blue" />
                  )}
                  <h3 className="text-2xl font-bold">{doc.title}</h3>
                </div>
              </button>

              {isOpen && (
                <div className="mt-6 space-y-4">
                  {doc.sections.map((section, idx) => {
                    const sectionId = `${doc.id}-${idx}`;
                    const isSectionOpen = openSections.has(sectionId);

                    return (
                      <div
                        key={sectionId}
                        className="border-l-2 border-border pl-4"
                      >
                        <button
                          onClick={() => toggleSection(sectionId)}
                          className="w-full flex items-center gap-2 text-left mb-2"
                        >
                          {isSectionOpen ? (
                            <ChevronDown className="w-4 h-4 text-gold" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gold" />
                          )}
                          <h4 className="text-lg font-semibold text-gold">
                            {section.title}
                          </h4>
                        </button>

                        {isSectionOpen && (
                          <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                              {section.content}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
