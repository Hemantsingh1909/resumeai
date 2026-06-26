import { ResumeData } from "@/app/types/resume";

export default function ATSClassic({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages, links } = data;

  return (
    <div className="p-10 bg-white text-black font-sans leading-normal text-xs max-w-[21cm] min-h-[29.7cm] box-border print:p-0 mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-zinc-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-zinc-900">{personalInfo.name}</h1>
        <h2 className="text-sm font-semibold text-zinc-650 mt-1 uppercase tracking-wider">{personalInfo.title}</h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2.5 text-[11px] text-zinc-600 font-mono">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && (
            <>
              <span>•</span>
              <span>{personalInfo.website}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Professional Summary</h3>
          <p className="text-zinc-650 leading-relaxed text-left">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-5 text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Work Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-800">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="text-[10px] text-zinc-550 font-mono font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10px] text-zinc-550 italic mb-1.5">{exp.location}</div>
                <p className="text-zinc-650 leading-relaxed whitespace-pre-line text-left">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-5 text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Projects</h3>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-800">
                  <span>{proj.name} {proj.role && <span className="font-normal text-zinc-600">({proj.role})</span>}</span>
                  {proj.url && <span className="text-[10px] text-zinc-550 font-mono font-medium">{proj.url}</span>}
                </div>
                <p className="text-zinc-650 leading-relaxed text-left">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-5 text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Core Skills</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-zinc-650">
            {skills.map((skill) => (
              <span key={skill} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-5 text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-800">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  <span className="text-[10px] text-zinc-550 font-mono font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-[10px] text-zinc-550 flex justify-between items-baseline">
                  <span>{edu.school} — {edu.location}</span>
                </div>
                {edu.description && (
                  <p className="text-zinc-650 leading-relaxed mt-1 text-left">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates & Achievements Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {certificates && certificates.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Certifications</h3>
            <div className="space-y-2 text-zinc-650">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-zinc-850">{cert.name}</span>
                    <span className="text-zinc-500"> ({cert.issuer})</span>
                  </div>
                  <span className="font-mono text-zinc-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-300 pb-1 mb-2 text-zinc-800">Key Achievements</h3>
            <div className="space-y-2 text-zinc-650">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[11px]">
                  <span className="font-bold text-zinc-850 block">{ach.title}</span>
                  <span className="text-zinc-550">{ach.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages & Links Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 text-left border-t border-zinc-200 pt-4">
        {languages && languages.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-850 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-4 text-[11px]">
              {languages.map((lang) => (
                <span key={lang.id} className="text-zinc-650">
                  <span className="font-semibold text-zinc-850">{lang.language}</span> ({lang.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}

        {links && links.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-850 mb-2">Links & Portfolio</h4>
            <div className="flex flex-wrap gap-4 text-[11px]">
              {links.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-zinc-650 hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
