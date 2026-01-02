import { useResumeStore } from '@/hooks/useResumeStore';
import { BUILDER_STEPS } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Eye, FileText, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonalDetailsForm from '@/components/builder/PersonalDetailsForm';
import SummaryForm from '@/components/builder/SummaryForm';
import SkillsForm from '@/components/builder/SkillsForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import ProjectsForm from '@/components/builder/ProjectsForm';
import EducationForm from '@/components/builder/EducationForm';
import CertificationsForm from '@/components/builder/CertificationsForm';
import ResumePreview from '@/components/preview/ResumePreview';
import ResumeUploadDialog from '@/components/builder/ResumeUploadDialog';
import { useState } from 'react';

export default function Builder() {
  const { currentStep, setCurrentStep } = useResumeStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const currentStepIndex = BUILDER_STEPS.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / BUILDER_STEPS.length) * 100;

  const goToNext = () => {
    if (currentStepIndex < BUILDER_STEPS.length - 1) {
      setCurrentStep(BUILDER_STEPS[currentStepIndex + 1].id);
    }
  };

  const goToPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(BUILDER_STEPS[currentStepIndex - 1].id);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalDetailsForm />;
      case 'summary':
        return <SummaryForm />;
      case 'skills':
        return <SkillsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'education':
        return <EducationForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return <PersonalDetailsForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg gradient-bg flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">RishuResumeAI</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Upload Resume</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Link to="/preview">
                <Button size="sm" className="gradient-bg text-primary-foreground">
                  <Eye className="h-4 w-4 mr-2" />
                  Full Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm font-medium">
              Step {currentStepIndex + 1} of {BUILDER_STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {BUILDER_STEPS[currentStepIndex].label}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {BUILDER_STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  index === currentStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStepIndex
                    ? 'bg-accent/20 text-accent hover:bg-accent/30'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Form Section */}
          <div className={`flex-1 max-w-2xl ${showPreview ? 'hidden lg:block' : ''}`}>
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentStepIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStepIndex === BUILDER_STEPS.length - 1 ? (
                  <Link to="/preview">
                    <Button className="gradient-bg text-primary-foreground">
                      Preview & Export
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={goToNext} className="gradient-bg text-primary-foreground">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview (Desktop) */}
          <div className={`hidden lg:block flex-1 max-w-xl sticky top-32 h-fit ${showPreview ? '!block' : ''}`}>
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-display text-lg font-medium mb-4 text-center">Live Preview</h3>
              <div className="bg-card rounded-lg shadow-lg overflow-hidden transform scale-[0.6] origin-top">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload Dialog */}
      <ResumeUploadDialog 
        open={showUploadDialog} 
        onOpenChange={setShowUploadDialog} 
      />
    </div>
  );
}
