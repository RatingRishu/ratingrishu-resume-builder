import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Shield,
  LayoutTemplate,
  Linkedin,
  Github,
  Heart
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Multi-Step Builder',
    description: 'Guided form to capture personal details, skills, experience, projects, education & certifications.',
  },
  {
    icon: LayoutTemplate,
    title: 'ATS-Friendly Templates',
    description: 'Clean layouts with no tables, icons, or graphics — optimized for recruiters & ATS systems.',
  },
  {
    icon: Sparkles,
    title: 'AI Content Generator',
    description: 'Generate professional summaries, role-based bullet points with action verbs & quantified impact.',
  },
  {
    icon: Zap,
    title: 'Live Preview',
    description: 'See your resume update in real-time as you type with inline section editing.',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download your polished resume as PDF or DOCX with a single click.',
  },
  {
    icon: Shield,
    title: 'ATS Score Checker',
    description: 'Get a score from 0–100 with missing keywords suggestions to improve your chances.',
  },
];

const steps = [
  { number: '01', title: 'Enter Your Details', description: 'Fill in your professional information step by step' },
  { number: '02', title: 'Choose a Template', description: 'Pick from our ATS-optimized designs' },
  { number: '03', title: 'AI Enhancement', description: 'Let AI polish your content for impact' },
  { number: '04', title: 'Download & Apply', description: 'Export and start applying to jobs' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold">RishuResumeAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/templates">
              <Button variant="ghost" className="hidden sm:inline-flex">Templates</Button>
            </Link>
            <Link to="/builder">
              <Button className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity">
                Build Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Create a Resume That
              <br />
              <span className="gradient-text">Gets You Hired</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Build ATS-friendly resumes in minutes using AI — designed by a developer, for real job seekers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/builder">
                <Button size="lg" className="gradient-bg text-primary-foreground hover:opacity-90 h-14 px-8 text-lg">
                  Build My Resume Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>No Sign Up Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>ATS Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-medium mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to your perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-4" />
                )}
                <div className="text-6xl font-display font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="font-display text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto mb-10">
            Help freshers and professionals create real, ATS-optimized resumes quickly and confidently.
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 h-14 px-10 text-lg">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-semibold">RishuResumeAI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com/in/rishabhkumar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
              <a 
                href="https://github.com/RatingRishu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>

            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by Rishabh Kumar (RatingRishu)
              </p>
              <p>© {new Date().getFullYear()} RishuResumeAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
