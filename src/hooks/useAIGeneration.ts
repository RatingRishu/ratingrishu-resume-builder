import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GenerateSummaryParams {
  jobRole: string;
  experienceLevel: string;
}

interface GenerateBulletsParams {
  position: string;
  company?: string;
  currentDescription?: string;
}

interface OptimizeContentParams {
  targetRole: string;
  currentDescription: string;
}

export function useAIGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async ({ jobRole, experienceLevel }: GenerateSummaryParams): Promise<string | null> => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-resume-content', {
        body: { type: 'summary', jobRole, experienceLevel }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      toast.success('Summary generated successfully!');
      return data.content;
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate summary');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBullets = async ({ position, company, currentDescription }: GenerateBulletsParams): Promise<string | null> => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-resume-content', {
        body: { type: 'bullets', position, company, currentDescription }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      toast.success('Bullet points generated!');
      return data.content;
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate bullets');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const optimizeContent = async ({ targetRole, currentDescription }: OptimizeContentParams): Promise<string | null> => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-resume-content', {
        body: { type: 'optimize', targetRole, currentDescription }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      toast.success('Content optimized!');
      return data.content;
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to optimize content');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateSummary,
    generateBullets,
    optimizeContent,
  };
}
