import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';

interface AIGeneratorDialogProps {
  onGenerated: (content: string) => void;
  type: 'summary' | 'bullets';
  position?: string;
  company?: string;
}

export default function AIGeneratorDialog({ onGenerated, type, position, company }: AIGeneratorDialogProps) {
  const [open, setOpen] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const { isGenerating, generateSummary, generateBullets } = useAIGeneration();

  const handleGenerate = async () => {
    let content: string | null = null;

    if (type === 'summary') {
      if (!jobRole || !experienceLevel) return;
      content = await generateSummary({ jobRole, experienceLevel });
    } else {
      content = await generateBullets({ 
        position: position || jobRole, 
        company 
      });
    }

    if (content) {
      onGenerated(content);
      setOpen(false);
      setJobRole('');
      setExperienceLevel('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {type === 'summary' ? 'Generate Professional Summary' : 'Generate Bullet Points'}
          </DialogTitle>
          <DialogDescription>
            {type === 'summary' 
              ? 'Enter your job role and experience level to generate an ATS-optimized summary.'
              : 'Generate impactful bullet points for your work experience.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="jobRole">
              {type === 'summary' ? 'Target Job Role' : 'Position Title'}
            </Label>
            <Input
              id="jobRole"
              value={type === 'bullets' && position ? position : jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Software Engineer, Product Manager"
              disabled={type === 'bullets' && !!position}
            />
          </div>
          {type === 'summary' && (
            <div className="space-y-2">
              <Label htmlFor="level">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry-level">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid-level">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                  <SelectItem value="executive">Executive (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || (type === 'summary' && (!jobRole || !experienceLevel))}
            className="gradient-bg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
