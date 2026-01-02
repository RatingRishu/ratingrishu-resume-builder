import { forwardRef } from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

const ClassicTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalDetails, summary, skills, workExperience, projects, education, certifications } = data;

  return (
    <div ref={ref} className="p-10 text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{personalDetails.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-gray-600 flex flex-wrap justify-center gap-3">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails.location && <span>• {personalDetails.location}</span>}
        </div>
        <div className="mt-1 text-gray-500 flex flex-wrap justify-center gap-3 text-xs">
          {personalDetails.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails.github && <span>• {personalDetails.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
          {skills.technical.length > 0 && <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>}
          {skills.soft.length > 0 && <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>}
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <strong>{exp.position}</strong>
                <span className="text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <div className="text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</div>
              {exp.description && <p className="mt-1">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <strong>{edu.degree} in {edu.field}</strong>
                <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-gray-600">{edu.institution}</div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <strong>{proj.name}</strong>
              {proj.description && <p className="text-gray-700">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
            </div>
          ))}
        </section>
      )}
    </div>
  );
});

ClassicTemplate.displayName = 'ClassicTemplate';

export default ClassicTemplate;
