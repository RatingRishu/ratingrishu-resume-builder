import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/hooks/useResumeStore';
import AIGeneratorDialog from './AIGeneratorDialog';

export default function SummaryForm() {
  const { resumeData, setSummary } = useResumeStore();

  const handleAIGenerated = (content: string) => {
    setSummary(content);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-medium mb-2">Professional Summary</h2>
          <p className="text-muted-foreground">Write a brief summary of your professional background.</p>
        </div>
        <AIGeneratorDialog type="summary" onGenerated={handleAIGenerated} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Experienced software engineer with 5+ years..."
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
}
