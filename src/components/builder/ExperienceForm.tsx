import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';

export default function ExperienceForm() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();
  const { isGenerating, generateBullets } = useAIGeneration();

  const addNew = () => {
    addWorkExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [],
    });
  };

  const handleGenerateBullets = async (expId: string, position: string, company: string) => {
    const content = await generateBullets({ position, company });
    if (content) {
      updateWorkExperience(expId, { description: content });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-medium mb-2">Work Experience</h2>
          <p className="text-muted-foreground">Add your relevant work history.</p>
        </div>
        <Button onClick={addNew} size="sm"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>

      {resumeData.workExperience.map((exp) => (
        <div key={exp.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Experience</h3>
            <Button variant="ghost" size="sm" onClick={() => removeWorkExperience(exp.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input value={exp.position} onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input value={exp.startDate} onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })} placeholder="Jan 2020" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input value={exp.endDate} onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })} placeholder="Present" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Description / Bullet Points</Label>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                disabled={isGenerating || !exp.position}
                onClick={() => handleGenerateBullets(exp.id, exp.position, exp.company)}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                AI Generate
              </Button>
            </div>
            <Textarea 
              value={exp.description} 
              onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })} 
              placeholder="Describe your role and achievements..."
              className="min-h-[120px]"
            />
          </div>
        </div>
      ))}

      {resumeData.workExperience.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          <p>No experience added yet. Click "Add" to get started.</p>
        </div>
      )}
    </div>
  );
}
