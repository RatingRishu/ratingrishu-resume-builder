import { useResumeStore } from '@/hooks/useResumeStore';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
      {renderTemplate()}
    </div>
  );
}
