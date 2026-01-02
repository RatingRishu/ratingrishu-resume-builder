import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();

  const addNew = () => {
    addEducation({ id: crypto.randomUUID(), institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-medium mb-2">Education</h2>
          <p className="text-muted-foreground">Add your educational background.</p>
        </div>
        <Button onClick={addNew} size="sm"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>

      {resumeData.education.map((edu) => (
        <div key={edu.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Education</h3>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, { field: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>GPA (optional)</Label>
              <Input value={edu.gpa || ''} onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      {resumeData.education.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          <p>No education added yet.</p>
        </div>
      )}
    </div>
  );
}
