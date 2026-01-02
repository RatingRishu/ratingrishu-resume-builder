import { forwardRef } from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

const MinimalTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalDetails, summary, skills, workExperience, projects, education, certifications } = data;

  return (
    <div ref={ref} className="p-12 text-sm">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-tight">{personalDetails.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-gray-500 flex gap-4 text-xs">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.location && <span>{personalDetails.location}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-gray-400 text-xs">{exp.startDate} — {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-gray-500">{exp.company}</p>
              {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-500">{edu.institution}, {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
          <p className="text-gray-600">{[...skills.technical, ...skills.soft].join(' • ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-medium">{proj.name}</h3>
              {proj.description && <p className="text-gray-600">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Certifications</h2>
          {certifications.map((cert) => (
            <p key={cert.id} className="text-gray-600">{cert.name} — {cert.issuer}</p>
          ))}
        </section>
      )}
    </div>
  );
});

MinimalTemplate.displayName = 'MinimalTemplate';

export default MinimalTemplate;
