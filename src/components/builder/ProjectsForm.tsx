import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();

  const addNew = () => {
    addProject({ id: crypto.randomUUID(), name: '', description: '', technologies: [], link: '', bullets: [] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-medium mb-2">Projects</h2>
          <p className="text-muted-foreground">Showcase your best work.</p>
        </div>
        <Button onClick={addNew} size="sm"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>

      {resumeData.projects.map((project) => (
        <div key={project.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Project</h3>
            <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Link (optional)</Label>
              <Input value={project.link || ''} onChange={(e) => updateProject(project.id, { link: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} />
          </div>
        </div>
      ))}

      {resumeData.projects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          <p>No projects added yet.</p>
        </div>
      )}
    </div>
  );
}
