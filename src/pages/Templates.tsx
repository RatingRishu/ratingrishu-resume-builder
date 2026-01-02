import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { TemplateId } from '@/types/resume';
import { FileText, ArrowRight, Check, Crown, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  layout: string;
  isPremium: boolean;
}

const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column layout. Perfect for conservative industries.',
    layout: 'Single Column',
    isPremium: false,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean two-column design with a sidebar for skills and contact info.',
    layout: 'Two Column',
    isPremium: false,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Sleek and simple design that lets your content shine.',
    layout: 'Single Column',
    isPremium: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Polished layout with clear sections. Great for senior roles.',
    layout: 'Two Column',
    isPremium: false,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design for C-level and leadership positions.',
    layout: 'Two Column',
    isPremium: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with unique styling for design and marketing roles.',
    layout: 'Single Column',
    isPremium: true,
  },
  {
    id: 'tech',
    name: 'Tech Pro',
    description: 'Optimized for software engineers and IT professionals.',
    layout: 'Two Column',
    isPremium: true,
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Perfect for researchers, professors, and academic positions.',
    layout: 'Single Column',
    isPremium: true,
  },
];

export default function Templates() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  const handleTemplateSelect = (template: TemplateInfo) => {
    if (template.isPremium) {
      toast.info('Premium templates coming soon! Upgrade to unlock.');
      return;
    }
    setSelectedTemplate(template.id);
  };

  const freeTemplates = templates.filter(t => !t.isPremium);
  const premiumTemplates = templates.filter(t => t.isPremium);

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
            
            <Link to="/builder">
              <Button className="gradient-bg text-primary-foreground">
                Continue to Builder
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-medium mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All templates are ATS-friendly and designed to help you stand out while ensuring your resume gets past automated screening.
          </p>
        </div>

        {/* Free Templates */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl font-medium">Free Templates</h2>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Available Now
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                
                {/* Template Preview Mockup */}
                <div className="aspect-[8.5/11] rounded-lg bg-muted mb-4 overflow-hidden border border-border">
                  <TemplateMockup templateId={template.id} isPremium={false} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-medium">{template.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {template.layout}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl font-medium">Premium Templates</h2>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Pro
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="group relative p-5 rounded-2xl border-2 border-border bg-card text-left transition-all duration-300 hover:border-amber-500/50 hover:shadow-md opacity-90"
              >
                <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-amber-600" />
                </div>
                
                {/* Template Preview Mockup */}
                <div className="aspect-[8.5/11] rounded-lg bg-muted mb-4 overflow-hidden border border-border relative">
                  <TemplateMockup templateId={template.id} isPremium={true} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-4">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-medium">{template.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {template.layout}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Upgrade CTA */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl p-8 text-center border border-amber-500/20">
          <Crown className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="font-display text-2xl font-medium mb-2">Unlock Premium Templates</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Get access to all premium templates, priority AI generation, and advanced ATS optimization features.
          </p>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 h-12 px-8">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Pro - Coming Soon
          </Button>
        </div>

        <div className="text-center mt-12">
          <Link to="/builder">
            <Button size="lg" className="gradient-bg text-primary-foreground h-14 px-10">
              Start Building with {templates.find(t => t.id === selectedTemplate)?.name || 'Classic'} Template
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TemplateMockup({ templateId, isPremium }: { templateId: TemplateId; isPremium: boolean }) {
  const accentClass = isPremium ? 'bg-amber-500/20' : 'bg-foreground/20';
  const lineClass = isPremium ? 'bg-amber-500/10' : 'bg-foreground/10';
  
  if (templateId === 'modern' || templateId === 'professional' || templateId === 'executive' || templateId === 'tech') {
    return (
      <div className="h-full flex">
        <div className={`w-1/3 ${isPremium ? 'bg-amber-500/5' : 'bg-foreground/5'} p-3`}>
          <div className={`h-3 w-16 ${accentClass} rounded mb-4`} />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-2 ${lineClass} rounded w-full`} />
            ))}
          </div>
          <div className={`h-3 w-12 ${accentClass} rounded mt-6 mb-3`} />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-2 ${lineClass} rounded w-3/4`} />
            ))}
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className={`h-4 w-32 ${accentClass} rounded mb-2`} />
          <div className={`h-2 w-24 ${lineClass} rounded mb-4`} />
          <div className="space-y-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-2 ${lineClass} rounded`} />
            ))}
          </div>
          <div className={`h-3 w-20 ${accentClass} rounded mt-5 mb-2`} />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className={`h-2.5 w-28 ${isPremium ? 'bg-amber-500/15' : 'bg-foreground/15'} rounded`} />
                <div className={`h-2 ${lineClass} rounded`} />
                <div className={`h-2 ${lineClass} rounded w-5/6`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <div className="text-center mb-4">
        <div className={`h-4 w-32 ${accentClass} rounded mx-auto mb-2`} />
        <div className={`h-2 w-48 ${lineClass} rounded mx-auto`} />
      </div>
      <div className={`h-3 w-16 ${accentClass} rounded mb-2`} />
      <div className="space-y-1 mb-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={`h-2 ${lineClass} rounded`} />
        ))}
      </div>
      <div className={`h-3 w-20 ${accentClass} rounded mb-2`} />
      <div className="space-y-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className={`h-2.5 w-28 ${isPremium ? 'bg-amber-500/15' : 'bg-foreground/15'} rounded`} />
            <div className={`h-2 ${lineClass} rounded`} />
            <div className={`h-2 ${lineClass} rounded w-4/5`} />
          </div>
        ))}
      </div>
    </div>
  );
}
