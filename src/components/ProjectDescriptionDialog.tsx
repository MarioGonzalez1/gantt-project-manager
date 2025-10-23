import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Project } from '@/data/projects';

interface ProjectDescriptionDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDescription: (projectId: string, description: string) => void;
}

export default function ProjectDescriptionDialog({ 
  project, 
  open, 
  onOpenChange, 
  onSaveDescription 
}: ProjectDescriptionDialogProps) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setDescription(project.description || '');
    }
  }, [project]);

  const handleSave = () => {
    if (project) {
      onSaveDescription(project.id, description);
      onOpenChange(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">
            {project.name}
          </DialogTitle>
          <div className="text-sm text-gray-500 mt-1">
            Owner: {project.owner}
          </div>
        </DialogHeader>
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Project Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description..."
            className="w-full min-h-[200px] text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

