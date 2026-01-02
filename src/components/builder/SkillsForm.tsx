import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useResumeStore } from '@/hooks/useResumeStore';
import { X, Plus } from 'lucide-react';

export default function SkillsForm() {
  const { resumeData, setSkills } = useResumeStore();
  const [technicalInput, setTechnicalInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const addTechnicalSkill = () => {
    if (technicalInput.trim()) {
      setSkills({ technical: [...resumeData.skills.technical, technicalInput.trim()] });
      setTechnicalInput('');
    }
  };

  const addSoftSkill = () => {
    if (softInput.trim()) {
      setSkills({ soft: [...resumeData.skills.soft, softInput.trim()] });
      setSoftInput('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    setSkills({ technical: resumeData.skills.technical.filter(s => s !== skill) });
  };

  const removeSoftSkill = (skill: string) => {
    setSkills({ soft: resumeData.skills.soft.filter(s => s !== skill) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills.</p>
      </div>

      <div className="space-y-4">
        <Label>Technical Skills</Label>
        <div className="flex gap-2">
          <Input
            value={technicalInput}
            onChange={(e) => setTechnicalInput(e.target.value)}
            placeholder="e.g., JavaScript, React"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnicalSkill())}
          />
          <Button type="button" onClick={addTechnicalSkill} size="icon"><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.technical.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <button onClick={() => removeTechnicalSkill(skill)}><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Soft Skills</Label>
        <div className="flex gap-2">
          <Input
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            placeholder="e.g., Leadership, Communication"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftSkill())}
          />
          <Button type="button" onClick={addSoftSkill} size="icon"><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.soft.map((skill) => (
            <Badge key={skill} variant="outline" className="gap-1">
              {skill}
              <button onClick={() => removeSoftSkill(skill)}><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
