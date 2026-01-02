import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/hooks/useResumeStore';

export default function PersonalDetailsForm() {
  const { resumeData, setPersonalDetails } = useResumeStore();
  const { personalDetails } = resumeData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium mb-2">Personal Details</h2>
        <p className="text-muted-foreground">Let's start with your basic information.</p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalDetails.fullName}
            onChange={(e) => setPersonalDetails({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalDetails.email}
              onChange={(e) => setPersonalDetails({ email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={personalDetails.phone}
              onChange={(e) => setPersonalDetails({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalDetails.location}
            onChange={(e) => setPersonalDetails({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (optional)</Label>
            <Input
              id="linkedin"
              value={personalDetails.linkedin || ''}
              onChange={(e) => setPersonalDetails({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub (optional)</Label>
            <Input
              id="github"
              value={personalDetails.github || ''}
              onChange={(e) => setPersonalDetails({ github: e.target.value })}
              placeholder="github.com/johndoe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            value={personalDetails.website || ''}
            onChange={(e) => setPersonalDetails({ website: e.target.value })}
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  );
}
