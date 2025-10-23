import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Project, ProjectStatus, ClientDepartment } from '@/data/projects';

const ALL_STATUSES: ProjectStatus[] = [
  'Planning',
  'Backlog',
  'In Progress',
  'Testing',
  'On Hold',
  'Completed'
];

interface EditProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProject: (projectId: string, updatedData: {
    name: string;
    owner: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    duration: number;
    department: 'Software Development' | 'Business Intelligence' | 'Robotic Process Automation';
    clientDepartment?: ClientDepartment;
  }) => void;
}

export default function EditProjectDialog({ project, open, onOpenChange, onEditProject }: EditProjectDialogProps) {
  const [formData, setFormData] = useState<{
    name: string;
    owner: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    duration: number;
    department: 'Software Development' | 'Business Intelligence' | 'Robotic Process Automation';
    clientDepartment?: ClientDepartment;
  }>({
    name: '',
    owner: '',
    status: 'In Progress' as ProjectStatus,
    progress: 0,
    dueDate: '',
    duration: 1,
    department: 'Business Intelligence',
    clientDepartment: undefined
  });

  // Update form data when project changes
  useEffect(() => {
    if (project) {
      // Convert M/D/YYYY to YYYY-MM-DD for input
      const [month, day, year] = project.dueDate.split('/');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      setFormData({
        name: project.name,
        owner: project.owner,
        status: project.status,
        progress: project.progress,
        dueDate: formattedDate,
        duration: project.duration,
        department: project.department,
        clientDepartment: project.clientDepartment
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project || !formData.name || !formData.owner || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert date from YYYY-MM-DD to M/D/YYYY format
    const [year, month, day] = formData.dueDate.split('-');
    const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

    onEditProject(project.id, {
      ...formData,
      dueDate: formattedDate
    });
    
    onOpenChange(false);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Owner <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Enter owner name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ALL_STATUSES.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Progress (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Duration (days)
            </label>
            <Input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
              placeholder="1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Executing Department <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Software Development">Software Development</option>
              <option value="Business Intelligence">Business Intelligence</option>
              <option value="Robotic Process Automation">Robotic Process Automation</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Client Department
            </label>
            <select
              value={formData.clientDepartment || ''}
              onChange={(e) => setFormData({ ...formData, clientDepartment: e.target.value as ClientDepartment || undefined })}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Department --</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Workshop">Workshop</option>
              <option value="Mexico Operations">Mexico Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Safety">Safety</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

