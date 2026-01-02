import { forwardRef } from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

const ProfessionalTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalDetails, summary, skills, workExperience, projects, education, certifications } = data;

  return (
    <div ref={ref} className="flex min-h-full text-sm">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-900 text-white p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">{personalDetails.fullName || 'Your Name'}</h1>
        </div>
        
        <div className="space-y-5 text-blue-100 text-xs">
          <div>
            <h3 className="text-white font-bold mb-2 uppercase text-xs">Contact</h3>
            <div className="space-y-1">
              {personalDetails.email && <p>{personalDetails.email}</p>}
              {personalDetails.phone && <p>{personalDetails.phone}</p>}
              {personalDetails.location && <p>{personalDetails.location}</p>}
              {personalDetails.linkedin && <p>{personalDetails.linkedin}</p>}
            </div>
          </div>

          {skills.technical.length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-2 uppercase text-xs">Skills</h3>
              {skills.technical.map((skill) => (
                <div key={skill} className="mb-1">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-2 uppercase text-xs">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-medium text-white">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="text-blue-300">{edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-2 uppercase text-xs">Certifications</h3>
              {certifications.map((cert) => (
                <p key={cert.id} className="mb-1">{cert.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Professional Summary</h2>
            <p className="text-gray-600">{summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Work Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-5 border-l-2 border-blue-200 pl-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-blue-700 font-medium">{exp.company}</p>
                {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-3">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                {proj.description && <p className="text-gray-600">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
});

ProfessionalTemplate.displayName = 'ProfessionalTemplate';

export default ProfessionalTemplate;
