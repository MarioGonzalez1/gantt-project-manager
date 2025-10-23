import { useMemo, useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project, ProjectStatus } from '../data/projects';

interface GanttChartProps {
  projects: Project[];
  onStatusChange?: (projectId: string, newStatus: ProjectStatus) => void;
  onDeleteProject?: (projectId: string) => void;
  onEditProject?: (projectId: string) => void;
  onViewDescription?: (projectId: string) => void;
}

const ALL_STATUSES: ProjectStatus[] = [
  'Planning',
  'Backlog',
  'In Progress',
  'Testing',
  'On Hold',
  'Completed'
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const STATUS_COLORS: Record<string, string> = {
  'Planning': '#8b5cf6',
  'Backlog': '#6b7280',
  'In Progress': '#3b82f6',
  'Testing': '#06b6d4',
  'On Hold': '#f59e0b',
  'Completed': '#10b981'
};

const DEPARTMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Operations': { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
  'Finance': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  'Workshop': { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  'Mexico Operations': { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' },
  'Human Resources': { bg: '#fce7f3', text: '#831843', border: '#f9a8d4' },
  'Safety': { bg: '#dcfce7', text: '#14532d', border: '#86efac' }
};

function parseDateToDayOfYear(dateStr: string): number {
  const [month, day] = dateStr.split('/');
  const monthIndex = parseInt(month) - 1;
  let dayOfYear = parseInt(day);
  for (let i = 0; i < monthIndex; i++) {
    dayOfYear += DAYS_IN_MONTH[i];
  }
  return dayOfYear;
}

function calculateStartDate(dueDate: string, duration: number): string {
  const [month, day, year] = dueDate.split('/');
  const endDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - duration);
  const d = startDate.getDate().toString().padStart(2, '0');
  const m = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const y = startDate.getFullYear();
  return `${d}/${m}/${y}`;
}

function formatDate(dateStr: string): string {
  const [month, day, year] = dateStr.split('/');
  const d = day.padStart(2, '0');
  const m = month.padStart(2, '0');
  return `${d}/${m}/${year}`;
}

function getCurrentDayOfYear(): number {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function GanttChart({ projects, onStatusChange, onDeleteProject, onEditProject, onViewDescription }: GanttChartProps) {
  const [zoomLevel, setZoomLevel] = useState(1.5); // Start at 150%
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const ganttScrollRef = useRef<HTMLDivElement>(null);
  const projectInfoScrollRef = useRef<HTMLDivElement>(null);
  
  const groupedProjects = useMemo(() => {
    const groups: Record<string, Project[]> = {
      'Software Development': [],
      'Business Intelligence': [],
      'Robotic Process Automation': []
    };
    
    projects.forEach(project => {
      if (groups[project.department]) {
        groups[project.department].push(project);
      }
    });
    
    // Sort projects within each group
    Object.keys(groups).forEach(dept => {
      groups[dept].sort((a, b) => {
        const aIsBacklog = a.status === 'Backlog';
        const bIsBacklog = b.status === 'Backlog';
        if (aIsBacklog && !bIsBacklog) return 1;
        if (!aIsBacklog && bIsBacklog) return -1;
        return a.owner.localeCompare(b.owner);
      });
    });
    
    return groups;
  }, [projects]);
  
  const departmentColors: Record<string, string> = {
    'Software Development': '#d1fae5',
    'Business Intelligence': '#dbeafe',
    'Robotic Process Automation': '#e9d5ff'
  };

  const currentDayOfYear = getCurrentDayOfYear();
  const totalDays = 365;

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 5));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1.5));

  // Calculate day width based on zoom
  const dayWidth = 3 * zoomLevel; // Base width 3px per day
  const timelineWidth = totalDays * dayWidth;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Zoom Controls */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between bg-gray-50">
        <div className="text-sm font-medium text-gray-700">Gantt Chart - Daily View</div>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Zoom Out
          </button>
          <span className="text-xs text-gray-600 min-w-[60px] text-center">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={zoomIn}
            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Zoom In
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex border-b border-gray-200 bg-white">
          {/* Fixed Header for Project Info */}
          <div className="bg-gray-50 p-4 border-r border-gray-200" style={{ width: '850px', flexShrink: 0 }}>
            <div className="grid grid-cols-[350px_140px_120px_90px_90px] gap-2 text-xs font-medium text-gray-700">
              <div>Project</div>
              <div>Status</div>
              <div>Department</div>
              <div className="text-center">Start Date</div>
              <div className="text-center">End Date</div>
            </div>
          </div>
          
          {/* Scrollable Header for Timeline */}
          <div 
            ref={headerScrollRef}
            className="bg-gray-50 p-4 overflow-x-auto flex-1"
            onScroll={(e) => {
              if (ganttScrollRef.current) {
                ganttScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
              }
            }}
          >
            <div className="flex" style={{ width: `${timelineWidth}px` }}>
              {MONTHS.map((month, monthIdx) => {
                const daysInMonth = DAYS_IN_MONTH[monthIdx];
                const monthWidth = daysInMonth * dayWidth;
                return (
                  <div key={month} style={{ width: `${monthWidth}px` }} className="border-r border-gray-200 last:border-r-0">
                    <div className="text-xs font-medium text-gray-700 text-center mb-1">{month}</div>
                    <div className="flex">
                      {Array.from({ length: daysInMonth }, (_, dayIdx) => (
                        <div 
                          key={dayIdx} 
                          style={{ width: `${dayWidth}px` }}
                          className="text-[9px] text-gray-500 text-center border-r border-gray-100 last:border-r-0"
                        >
                          {dayIdx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="flex-1 flex overflow-hidden">
          {/* Fixed Project Info Column */}
          <div 
            ref={projectInfoScrollRef}
            style={{ width: '850px', flexShrink: 0 }} 
            className="overflow-y-auto border-r border-gray-200"
            onScroll={(e) => {
              if (ganttScrollRef.current) {
                ganttScrollRef.current.scrollTop = e.currentTarget.scrollTop;
              }
            }}
          >
            {Object.entries(groupedProjects).flatMap(([department, deptProjects]) => deptProjects).map((project: Project) => {
              const startDate = calculateStartDate(project.dueDate, project.duration);
              
              return (
                <div
                  key={`info-${project.id}`}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ height: '56px', padding: '12px' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-[350px_140px_120px_90px_90px] gap-2 items-center flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDescription?.(project.id)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded p-1 transition-colors flex-shrink-0"
                          title="View description"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 truncate" title={project.name}>
                            {project.name}
                          </div>
                          <div className="text-xs text-gray-500">{project.owner}</div>
                        </div>
                      </div>
                      <select
                        value={project.status}
                        onChange={(e) => onStatusChange?.(project.id, e.target.value as ProjectStatus)}
                        className="text-xs font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        style={{ color: STATUS_COLORS[project.status] || '#6b7280' }}
                      >
                        {ALL_STATUSES.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div>
                        {project.clientDepartment ? (
                          <span
                            className="text-xs font-medium px-2 py-1 rounded border truncate inline-block"
                            style={{
                              backgroundColor: DEPARTMENT_COLORS[project.clientDepartment]?.bg || '#f3f4f6',
                              color: DEPARTMENT_COLORS[project.clientDepartment]?.text || '#374151',
                              borderColor: DEPARTMENT_COLORS[project.clientDepartment]?.border || '#d1d5db',
                              maxWidth: '110px'
                            }}
                            title={project.clientDepartment}
                          >
                            {project.clientDepartment}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 text-center">{startDate}</div>
                      <div className="text-xs text-gray-600 text-center">{formatDate(project.dueDate)}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded p-1 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditProject?.(project.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteProject?.(project.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scrollable Gantt Timeline */}
          <div 
            ref={ganttScrollRef}
            className="flex-1 overflow-auto relative"
            onScroll={(e) => {
              // Sync horizontal scroll with header
              if (headerScrollRef.current) {
                headerScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
              }
              // Sync vertical scroll with project info
              if (projectInfoScrollRef.current) {
                projectInfoScrollRef.current.scrollTop = e.currentTarget.scrollTop;
              }
            }}
          >
            {/* Container for all gantt rows */}
            <div className="relative" style={{ width: `${timelineWidth}px` }}>
              {Object.entries(groupedProjects).flatMap(([department, deptProjects]) => deptProjects).map((project: Project) => {
                const endDayOfYear = parseDateToDayOfYear(project.dueDate);
                const startDayOfYear = Math.max(1, endDayOfYear - project.duration);
                const durationDays = endDayOfYear - startDayOfYear;
                
                return (
                  <div
                    key={`gantt-${project.id}`}
                    className="border-b border-gray-200 relative"
                    style={{ height: '56px', padding: '12px' }}
                  >
                    {/* Day grid lines - full width */}
                    <div className="absolute inset-0 pointer-events-none" style={{ width: `${timelineWidth}px` }}>
                      <div className="flex h-full">
                        {Array.from({ length: totalDays }, (_, idx) => (
                          <div 
                            key={idx} 
                            style={{ width: `${dayWidth}px` }}
                            className="border-r border-gray-100 h-full"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Project bar - solid color */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm"
                      style={{
                        left: `${startDayOfYear * dayWidth}px`,
                        width: `${durationDays * dayWidth}px`,
                        backgroundColor: STATUS_COLORS[project.status] || '#6b7280'
                      }}
                    />
                  </div>
                );
              })}

              {/* Today Line - positioned absolutely to cover all rows */}
              <div 
                className="absolute z-30 pointer-events-none bg-red-400"
                style={{
                  left: `${currentDayOfYear * dayWidth}px`,
                  top: 0,
                  height: `${Object.values(groupedProjects).reduce((sum, dept) => sum + dept.length * 56, 0)}px`,
                  width: '2px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

