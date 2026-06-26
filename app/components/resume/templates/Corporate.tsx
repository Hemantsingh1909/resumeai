import { ResumeData } from "@/app/types/resume";

export default function Corporate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages, links } = data;

  return (
    <div className="p-10 bg-white text-zinc-800 font-sans leading-normal text-xs max-w-[21cm] min-h-[29.7cm] box-border print:p-0 mx-auto">
      {/* Top Header Card */}
      <div className="bg-zinc-100 p-6 border-b-4 border-zinc-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 rounded-sm text-left">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase">{personalInfo.name}</h1>
          <h2 className="text-xs font-semibold text-zinc-650 mt-0.5 uppercase tracking-wider">{personalInfo.title}</h2>
        </div>
        <div className="flex flex-wrap md:flex-col gap-x-4 gap-y-1 text-[11px] text-zinc-600 font-mono">
          <span>📧 {personalInfo.email}</span>
          <span>📞 {personalInfo.phone}</span>
          <span>📍 {personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white bg-zinc-700 px-3 py-1 rounded-sm inline-block mb-3">
            Summary
          </h3>
          <p className="text-zinc-650 leading-relaxed font-normal pl-2">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white bg-zinc-700 px-3 py-1 rounded-sm inline-block mb-3">
            Experience
          </h3>
          <div className="space-y-4 pl-2">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10px] text-zinc-450 italic mb-1.5">{exp.location}</div>
                <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-left">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white bg-zinc-700 px-3 py-1 rounded-sm inline-block mb-3">
            Projects
          </h3>
          <div className="space-y-3 pl-2">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span>{proj.name} {proj.role && <span className="font-normal text-zinc-500">({proj.role})</span>}</span>
                  {proj.url && <span className="text-[10px] text-zinc-450 font-mono font-medium">{proj.url}</span>}
                </div>
                <p className="text-zinc-600 leading-relaxed text-left">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white bg-zinc-700 px-3 py-1 rounded-sm inline-block mb-3">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2 pl-2">
            {skills.map((skill) => (
              <span key={skill} className="text-[10px] bg-zinc-100 text-zinc-700 border border-zinc-200 px-2.5 py-0.5 rounded-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white bg-zinc-700 px-3 py-1 rounded-sm inline-block mb-3">
            Education
          </h3>
          <div className="space-y-3 pl-2">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-medium">{edu.school} — {edu.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Split Grid for Certificates & Accomplishments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-zinc-200 pt-4 pl-2">
        {certificates && certificates.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-750 mb-2 border-b border-zinc-150 pb-1">Certifications</h4>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between text-[11px]">
                  <span>
                    <span className="font-bold text-zinc-800">{cert.name}</span>
                    <span className="text-zinc-500 text-[10px]"> ({cert.issuer})</span>
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-750 mb-2 border-b border-zinc-150 pb-1">Achievements</h4>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[11px]">
                  <span className="font-bold text-zinc-800 block">{ach.title}</span>
                  <span className="text-zinc-500 leading-normal block">{ach.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Languages and Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-zinc-200 pt-4 text-left pl-2">
        {languages && languages.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Languages</h4>
            <div className="flex flex-wrap gap-4 text-[11px]">
              {languages.map((lang) => (
                <span key={lang.id} className="text-zinc-650">
                  <span className="font-bold text-zinc-800">{lang.language}</span> ({lang.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}

        {links && links.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 mb-1.5">Links & Portfolio</h4>
            <div className="flex flex-wrap gap-4 text-[11px]">
              {links.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-zinc-650 hover:underline">
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
