import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useResumeStore } from '@/hooks/useResumeStore';
import { CheckCircle2, AlertCircle, Search } from 'lucide-react';

export default function ATSChecker() {
  const { resumeData } = useResumeStore();
  const [jobRole, setJobRole] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const analyzeResume = () => {
    // Simple local ATS check
    let calculatedScore = 0;
    const newSuggestions: string[] = [];

    if (resumeData.personalDetails.fullName) calculatedScore += 10;
    else newSuggestions.push('Add your full name');

    if (resumeData.personalDetails.email) calculatedScore += 10;
    else newSuggestions.push('Add your email address');

    if (resumeData.summary && resumeData.summary.length > 50) calculatedScore += 15;
    else newSuggestions.push('Add a professional summary (50+ characters)');

    if (resumeData.skills.technical.length >= 5) calculatedScore += 15;
    else newSuggestions.push('Add at least 5 technical skills');

    if (resumeData.workExperience.length >= 1) calculatedScore += 20;
    else newSuggestions.push('Add at least one work experience');

    if (resumeData.education.length >= 1) calculatedScore += 15;
    else newSuggestions.push('Add your education');

    if (resumeData.projects.length >= 1) calculatedScore += 10;
    else newSuggestions.push('Add at least one project');

    if (jobRole && resumeData.summary.toLowerCase().includes(jobRole.toLowerCase())) {
      calculatedScore += 5;
    } else if (jobRole) {
      newSuggestions.push(`Include "${jobRole}" in your summary`);
    }

    setScore(calculatedScore);
    setSuggestions(newSuggestions);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
      <div>
        <h3 className="font-display text-xl font-medium mb-2">ATS Score Checker</h3>
        <p className="text-sm text-muted-foreground">Analyze your resume for ATS compatibility.</p>
      </div>

      <div className="space-y-3">
        <Input
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="Target job role (e.g., Software Engineer)"
        />
        <Button onClick={analyzeResume} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Analyze Resume
        </Button>
      </div>

      {score !== null && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{score}/100</div>
            <Progress value={score} className="h-3" />
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Suggestions:</h4>
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}

          {suggestions.length === 0 && (
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Your resume looks great!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
