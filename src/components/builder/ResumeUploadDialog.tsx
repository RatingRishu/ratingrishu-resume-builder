import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useResumeStore } from '@/hooks/useResumeStore';
import { toast } from 'sonner';

interface ResumeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResumeUploadDialog({ open, onOpenChange }: ResumeUploadDialogProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { 
    setPersonalDetails, 
    setSummary, 
    setSkills,
    addWorkExperience,
    addProject,
    addEducation,
    addCertification,
    resetResume
  } = useResumeStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt')) {
      toast.error('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          resolve(content);
        } else {
          // For binary files (PDF, DOCX), we'll send a message that we need text
          resolve(`[File: ${file.name}] - Please extract text content from this file type: ${file.type}`);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      // Read as text for txt files, as data URL for others
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        reader.readAsText(file); // Attempt to read as text
      }
    });
  };

  const processResume = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    try {
      const fileContent = await extractTextFromFile(selectedFile);
      
      const { data, error } = await supabase.functions.invoke('parse-resume-file', {
        body: { 
          fileContent,
          fileName: selectedFile.name 
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to parse resume');
      }

      if (!data?.data) {
        throw new Error('No data returned from parser');
      }

      const resumeData = data.data;
      
      // Reset current resume data
      resetResume();
      
      // Populate personal details
      if (resumeData.personalDetails) {
        setPersonalDetails(resumeData.personalDetails);
      }
      
      // Set summary
      if (resumeData.summary) {
        setSummary(resumeData.summary);
      }
      
      // Set skills
      if (resumeData.skills) {
        setSkills(resumeData.skills);
      }
      
      // Add work experiences
      if (resumeData.workExperience && Array.isArray(resumeData.workExperience)) {
        resumeData.workExperience.forEach((exp: any) => {
          addWorkExperience({
            id: crypto.randomUUID(),
            company: exp.company || '',
            position: exp.position || '',
            location: exp.location || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: exp.current || false,
            description: exp.description || '',
            bullets: exp.bullets || [],
          });
        });
      }
      
      // Add projects
      if (resumeData.projects && Array.isArray(resumeData.projects)) {
        resumeData.projects.forEach((proj: any) => {
          addProject({
            id: crypto.randomUUID(),
            name: proj.name || '',
            description: proj.description || '',
            technologies: proj.technologies || [],
            link: proj.link || '',
            bullets: proj.bullets || [],
          });
        });
      }
      
      // Add education
      if (resumeData.education && Array.isArray(resumeData.education)) {
        resumeData.education.forEach((edu: any) => {
          addEducation({
            id: crypto.randomUUID(),
            institution: edu.institution || '',
            degree: edu.degree || '',
            field: edu.field || '',
            location: edu.location || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            gpa: edu.gpa || '',
            achievements: edu.achievements || [],
          });
        });
      }
      
      // Add certifications
      if (resumeData.certifications && Array.isArray(resumeData.certifications)) {
        resumeData.certifications.forEach((cert: any) => {
          addCertification({
            id: crypto.randomUUID(),
            name: cert.name || '',
            issuer: cert.issuer || '',
            date: cert.date || '',
            link: cert.link || '',
          });
        });
      }
      
      toast.success('Resume data extracted successfully!');
      onOpenChange(false);
      setSelectedFile(null);
      
    } catch (error) {
      console.error('Error processing resume:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process resume');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Existing Resume
          </DialogTitle>
          <DialogDescription>
            Upload your resume and our AI will extract all the information automatically.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
              ${isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
              ${selectedFile ? 'border-accent bg-accent/5' : ''}
            `}
            onClick={() => document.getElementById('resume-file-input')?.click()}
          >
            <input
              id="resume-file-input"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="space-y-2">
                <FileText className="h-12 w-12 mx-auto text-accent" />
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="font-medium text-foreground">
                  Drop your resume here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC, DOCX, TXT (max 5MB)
                </p>
              </div>
            )}
          </div>
          
          {/* Warning */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="text-sm">
              This will replace your current resume data. Make sure to save any important changes first.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 gradient-bg text-primary-foreground"
              onClick={processResume}
              disabled={!selectedFile || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Extract Data
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
