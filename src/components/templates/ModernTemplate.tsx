import { forwardRef } from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

const ModernTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalDetails, summary, skills, workExperience, projects, education, certifications } = data;

  return (
    <div ref={ref} className="flex min-h-full text-sm">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-4">{personalDetails.fullName || 'Your Name'}</h1>
        
        <div className="space-y-4 text-slate-300 text-xs">
          <div>
            <h3 className="text-white font-semibold mb-2 uppercase text-xs tracking-wider">Contact</h3>
            {personalDetails.email && <p>{personalDetails.email}</p>}
            {personalDetails.phone && <p>{personalDetails.phone}</p>}
            {personalDetails.location && <p>{personalDetails.location}</p>}
            {personalDetails.linkedin && <p>{personalDetails.linkedin}</p>}
            {personalDetails.github && <p>{personalDetails.github}</p>}
          </div>

          {skills.technical.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2 uppercase text-xs tracking-wider">Technical Skills</h3>
              <div className="space-y-1">
                {skills.technical.map((skill) => <p key={skill}>{skill}</p>)}
              </div>
            </div>
          )}

          {skills.soft.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2 uppercase text-xs tracking-wider">Soft Skills</h3>
              <div className="space-y-1">
                {skills.soft.map((skill) => <p key={skill}>{skill}</p>)}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2 uppercase text-xs tracking-wider">Certifications</h3>
              {certifications.map((cert) => (
                <p key={cert.id}>{cert.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {summary && (
          <section className="mb-5">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-3">Summary</h2>
            <p className="text-gray-600">{summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-3">Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-500">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                {exp.description && <p className="mt-1 text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-500">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-3">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold">{proj.name}</h3>
                {proj.description && <p className="text-gray-600">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate;
