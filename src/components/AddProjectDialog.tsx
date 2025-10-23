import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectStatus, ClientDepartment } from '@/data/projects';

const ALL_STATUSES: ProjectStatus[] = [
  'Planning',
  'Backlog',
  'In Progress',
  'Testing',
  'On Hold',
  'Completed'
];

interface AddProjectDialogProps {
  department: string;
  onAddProject: (project: {
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

export default function AddProjectDialog({ department, onAddProject }: AddProjectDialogProps) {
  const [open, setOpen] = useState(false);
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
    status: 'Backlog' as ProjectStatus,
    progress: 0,
    dueDate: '',
    duration: 1,
    department: department as any,
    clientDepartment: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.owner || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    onAddProject(formData);
    
    // Reset form
    setFormData({
      name: '',
      owner: '',
      status: 'Backlog',
      progress: 0,
      dueDate: '',
      duration: 1,
      department: department as any,
      clientDepartment: undefined
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Project - {department}</DialogTitle>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

