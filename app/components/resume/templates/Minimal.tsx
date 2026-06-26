import { ResumeData } from "@/app/types/resume";

export default function Minimal({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages, links } = data;

  return (
    <div className="p-12 bg-white text-zinc-800 font-sans leading-relaxed text-[11px] max-w-[21cm] min-h-[29.7cm] box-border print:p-0 mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b border-zinc-150 pb-6 mb-6 gap-4">
        <div className="text-left">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">{personalInfo.name}</h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">{personalInfo.title}</p>
        </div>
        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1 text-[10px] text-zinc-500 font-mono">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Grid structure for a cleaner feel */}
      <div className="space-y-6">
        {/* Summary */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">About</h3>
            <p className="md:col-span-3 text-zinc-650 leading-relaxed font-normal">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Experience</h3>
            <div className="md:col-span-3 space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                    <span>{exp.position} at {exp.company}</span>
                    <span className="text-[9px] text-zinc-400 font-mono">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-[10px] text-zinc-450 italic">{exp.location}</div>
                  <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-left mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Projects</h3>
            <div className="md:col-span-3 space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                    <span>{proj.name} {proj.role && <span className="font-normal text-zinc-500">({proj.role})</span>}</span>
                    {proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="text-[9px] text-zinc-400 font-mono hover:underline">{proj.url}</a>}
                  </div>
                  <p className="text-zinc-600 leading-relaxed text-left mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Skills</h3>
            <div className="md:col-span-3 flex flex-wrap gap-x-4 gap-y-1.5 text-zinc-600">
              {skills.map((skill) => (
                <span key={skill} className="font-medium">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Education</h3>
            <div className="md:col-span-3 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                    <span>{edu.degree} in {edu.fieldOfStudy}</span>
                    <span className="text-[9px] text-zinc-400 font-mono">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500">{edu.school} — {edu.location}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Achievements Split */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Accomplishments</h3>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates && certificates.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold uppercase text-zinc-400">Certifications</h4>
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-[10px] leading-snug">
                    <span className="font-semibold text-zinc-800">{cert.name}</span>
                    <span className="text-zinc-500 block text-[9px]">{cert.issuer} | {cert.date}</span>
                  </div>
                ))}
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold uppercase text-zinc-400">Key Focuses</h4>
                {achievements.map((ach) => (
                  <div key={ach.id} className="text-[10px] leading-snug">
                    <span className="font-semibold text-zinc-800">{ach.title}</span>
                    <span className="text-zinc-500 block text-[9px]">{ach.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Languages & Links Split */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left border-t border-zinc-100 pt-5">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Presence</h3>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages && languages.length > 0 && (
              <div>
                <h4 className="text-[9px] font-bold uppercase text-zinc-400 mb-1.5">Languages</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
                  {languages.map((lang) => (
                    <span key={lang.id} className="text-zinc-600">
                      <span className="font-semibold text-zinc-800">{lang.language}</span> ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {links && links.length > 0 && (
              <div>
                <h4 className="text-[9px] font-bold uppercase text-zinc-400 mb-1.5">Links</h4>
                <div className="flex flex-col gap-1 text-[10px]">
                  {links.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-zinc-650 hover:underline">
                      {link.label} — {link.url}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
