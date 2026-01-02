import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();

  const addNew = () => {
    addCertification({ id: crypto.randomUUID(), name: '', issuer: '', date: '', link: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-medium mb-2">Certifications</h2>
          <p className="text-muted-foreground">Add your certifications and achievements.</p>
        </div>
        <Button onClick={addNew} size="sm"><Plus className="h-4 w-4 mr-2" />Add</Button>
      </div>

      {resumeData.certifications.map((cert) => (
        <div key={cert.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Certification</h3>
            <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Certification Name</Label>
              <Input value={cert.name} onChange={(e) => updateCertification(cert.id, { name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Issuer</Label>
              <Input value={cert.issuer} onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input value={cert.date} onChange={(e) => updateCertification(cert.id, { date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Link (optional)</Label>
              <Input value={cert.link || ''} onChange={(e) => updateCertification(cert.id, { link: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      {resumeData.certifications.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          <p>No certifications added yet.</p>
        </div>
      )}
    </div>
  );
}
