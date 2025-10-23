import { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import GanttChart from '@/components/GanttChart';
import AddProjectDialog from '@/components/AddProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog';
import ProjectDescriptionDialog from '@/components/ProjectDescriptionDialog';
import FilterBar, { FilterState } from '@/components/FilterBar';
import { Project, ProjectStatus } from '@/data/projects';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState('Software Development');
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    owners: [],
    statuses: [],
    dateRange: null
  });
  const { projects, loading, useSupabase, addProject, updateProject, deleteProject } = useProjects();
  const { userRole, signOut, canEdit } = useAuth();
  
  const departmentProjects = useMemo(() => {
    return projects.filter(p => p.department === selectedDepartment);
  }, [selectedDepartment, projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...departmentProjects];

    // Filter by client department
    if (filters.departments.length > 0) {
      filtered = filtered.filter(p => {
        const dept = p.clientDepartment || 'Not Assigned';
        return filters.departments.includes(dept);
      });
    }

    // Filter by owner
    if (filters.owners.length > 0) {
      filtered = filtered.filter(p => filters.owners.includes(p.owner));
    }

    // Filter by status
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(p => filters.statuses.includes(p.status));
    }

    // Filter by date range
    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      
      filtered = filtered.filter(p => {
        const [month, day, year] = p.dueDate.split('/');
        const projectDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return projectDate >= startDate && projectDate <= endDate;
      });
    }

    return filtered;
  }, [departmentProjects, filters]);

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    try {
      await updateProject(projectId, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update project status');
    }
  };

  const handleAddProject = async (projectData: {
    name: string;
    owner: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    duration: number;
    department: 'Software Development' | 'Business Intelligence' | 'Robotic Process Automation';
  }) => {
    try {
      // Convert date from YYYY-MM-DD to M/D/YYYY format
      const [year, month, day] = projectData.dueDate.split('-');
      const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;
      
      const newProject: Project = {
        id: `${selectedDepartment.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name: projectData.name,
        risk: 'Low Risk',
        status: projectData.status,
        owner: projectData.owner,
        progress: projectData.progress,
        dueDate: formattedDate,
        duration: projectData.duration,
        department: projectData.department
      };
      
      await addProject(newProject);
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [descriptionProject, setDescriptionProject] = useState<Project | null>(null);

  const handleEditProject = async (projectId: string, updatedData: {
    name: string;
    owner: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    duration: number;
    department: 'Software Development' | 'Business Intelligence' | 'Robotic Process Automation';
  }) => {
    try {
      await updateProject(projectId, updatedData);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    }
  };

  const handleSaveDescription = async (projectId: string, description: string) => {
    try {
      await updateProject(projectId, { description });
    } catch (error) {
      console.error('Error saving description:', error);
      alert('Failed to save description');
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />
      
      <main className="ml-64 p-6 h-screen overflow-hidden flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-normal text-gray-900 mb-1">
              {selectedDepartment}
            </h1>
            <p className="text-sm text-gray-600">
              {filteredProjects.length !== departmentProjects.length ? (
                <span>
                  Showing <strong>{filteredProjects.length}</strong> of <strong>{departmentProjects.length}</strong> projects
                </span>
              ) : (
                <span>{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</span>
              )}
              {useSupabase && <span className="ml-2 text-green-600">● Synced</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userRole && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{userRole.email}</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {userRole.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            )}
            <AddProjectDialog 
              department={selectedDepartment}
              onAddProject={handleAddProject}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
        
        <FilterBar 
          projects={departmentProjects}
          onFilterChange={setFilters}
        />
        
        <div className="flex-1 overflow-hidden">
          <GanttChart 
            projects={filteredProjects}
            onStatusChange={handleStatusChange}
            onDeleteProject={handleDeleteProject}
            onEditProject={(projectId) => {
              const project = projects.find(p => p.id === projectId);
              if (project) setEditingProject(project);
            }}
            onViewDescription={(projectId) => {
              const project = projects.find(p => p.id === projectId);
              if (project) setDescriptionProject(project);
            }}
          />
        </div>
      </main>

      <EditProjectDialog
        project={editingProject}
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
        onEditProject={handleEditProject}
      />

      <ProjectDescriptionDialog
        project={descriptionProject}
        open={!!descriptionProject}
        onOpenChange={(open) => !open && setDescriptionProject(null)}
        onSaveDescription={handleSaveDescription}
      />
    </div>
  );
}

