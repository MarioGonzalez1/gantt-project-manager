import { useState, useMemo } from 'react';
import { Project, ProjectStatus } from '@/data/projects';

interface FilterBarProps {
  projects: Project[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  departments: string[];
  owners: string[];
  statuses: ProjectStatus[];
  dateRange: { start: string; end: string } | null;
}

const ALL_STATUSES: ProjectStatus[] = [
  'Planning',
  'Backlog',
  'In Progress',
  'Testing',
  'On Hold',
  'Completed'
];

const DEPARTMENTS = [
  'Operations',
  'Finance',
  'Workshop',
  'Mexico Operations',
  'Human Resources',
  'Safety',
  'Not Assigned'
];

export default function FilterBar({ projects, onFilterChange }: FilterBarProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedOwner, setSelectedOwner] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Get unique owners from projects
  const uniqueOwners = useMemo(() => {
    const owners = new Set(projects.map(p => p.owner));
    return Array.from(owners).sort();
  }, [projects]);

  const updateFilters = (
    dept: string,
    owner: string,
    status: ProjectStatus | '',
    start: string,
    end: string
  ) => {
    const dateRange = start && end ? { start, end } : null;
    onFilterChange({
      departments: dept ? [dept] : [],
      owners: owner ? [owner] : [],
      statuses: status ? [status] : [],
      dateRange
    });
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    updateFilters(value, selectedOwner, selectedStatus, startDate, endDate);
  };

  const handleOwnerChange = (value: string) => {
    setSelectedOwner(value);
    updateFilters(selectedDepartment, value, selectedStatus, startDate, endDate);
  };

  const handleStatusChange = (value: ProjectStatus | '') => {
    setSelectedStatus(value);
    updateFilters(selectedDepartment, selectedOwner, value, startDate, endDate);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (value && endDate) {
      updateFilters(selectedDepartment, selectedOwner, selectedStatus, value, endDate);
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    if (startDate && value) {
      updateFilters(selectedDepartment, selectedOwner, selectedStatus, startDate, value);
    }
  };

  const clearFilters = () => {
    setSelectedDepartment('');
    setSelectedOwner('');
    setSelectedStatus('');
    setStartDate('');
    setEndDate('');
    onFilterChange({
      departments: [],
      owners: [],
      statuses: [],
      dateRange: null
    });
  };

  const hasActiveFilters = selectedDepartment || selectedOwner || selectedStatus || (startDate && endDate);

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 mb-4">
      <div className="flex items-center gap-6 flex-wrap">
        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer bg-white"
            style={{ minWidth: '140px' }}
          >
            <option value="">All</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Owner Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Owner:</label>
          <select
            value={selectedOwner}
            onChange={(e) => handleOwnerChange(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer bg-white"
            style={{ minWidth: '140px' }}
          >
            <option value="">All</option>
            {uniqueOwners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value as ProjectStatus | '')}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer bg-white"
            style={{ minWidth: '120px' }}
          >
            <option value="">All</option>
            {ALL_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Date Range:</label>
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
            <span className="text-xs text-gray-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs px-3 py-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium ml-auto"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

