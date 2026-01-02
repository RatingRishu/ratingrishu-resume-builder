import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { FileText, Download, ArrowLeft, FileType, Sparkles } from 'lucide-react';
import ResumePreview from '@/components/preview/ResumePreview';
import ATSChecker from '@/components/preview/ATSChecker';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export default function Preview() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showATSChecker, setShowATSChecker] = useState(false);

  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'professional', name: 'Professional' },
  ] as const;

  const exportToPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsExporting(true);
    toast.loading('Generating PDF...');

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
      
      toast.dismiss();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to export PDF. Please try again.');
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/builder">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 border-l border-border pl-4">
                <span className="text-sm text-muted-foreground">Template:</span>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as typeof selectedTemplate)}
                  className="text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowATSChecker(!showATSChecker)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                ATS Check
              </Button>
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="gradient-bg text-primary-foreground"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Resume Preview */}
          <div className="flex-1 flex justify-center">
            <div className="bg-card shadow-2xl rounded-lg overflow-hidden">
              <div ref={resumeRef}>
                <ResumePreview />
              </div>
            </div>
          </div>

          {/* ATS Checker Sidebar */}
          {showATSChecker && (
            <div className="w-96 shrink-0">
              <ATSChecker />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Template Selector */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 glass border-t border-border p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedTemplate === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
