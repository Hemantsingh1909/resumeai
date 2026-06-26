import { ResumeData } from "@/app/types/resume";

export default function Harvard({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certificates, achievements, languages, links } = data;

  return (
    <div className="p-12 bg-white text-zinc-900 font-serif leading-relaxed text-xs max-w-[21cm] min-h-[29.7cm] box-border print:p-0 mx-auto">
      {/* Centered Name & Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl tracking-tight text-zinc-950 font-normal border-b border-zinc-900 pb-2 mb-2 font-serif uppercase">
          {personalInfo.name}
        </h1>
        <h2 className="text-xs font-sans tracking-widest text-zinc-500 uppercase font-semibold">
          {personalInfo.title}
        </h2>
        
        {/* Contact info list */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-[10px] text-zinc-550 font-sans font-medium">
          <span>{personalInfo.location}</span>
          <span>|</span>
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.website && (
            <>
              <span>|</span>
              <span>{personalInfo.website}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6 text-left">
          <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-center border-b border-zinc-200 pb-1 mb-2 text-zinc-800">
            Professional Summary
          </h3>
          <p className="text-zinc-650 leading-relaxed text-center italic">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-center border-b border-zinc-200 pb-1 mb-3 text-zinc-800">
            Professional Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span className="text-sm">{exp.company}</span>
                  <span className="text-[10px] text-zinc-500 font-sans font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline text-[10px] text-zinc-650 font-sans italic">
                  <span>{exp.position}</span>
                  <span>{exp.location}</span>
                </div>
                <p className="text-zinc-600 leading-relaxed font-serif pt-1 whitespace-pre-line text-left">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-center border-b border-zinc-200 pb-1 mb-3 text-zinc-800">
            Selected Projects
          </h3>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span>{proj.name} {proj.role && <span className="font-normal text-zinc-600">({proj.role})</span>}</span>
                  {proj.url && <span className="text-[10px] text-zinc-500 font-sans font-medium">{proj.url}</span>}
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
          <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-center border-b border-zinc-200 pb-1 mb-2 text-zinc-800">
            Core Skills & Methodologies
          </h3>
          <p className="text-zinc-650 text-center leading-relaxed font-sans text-[11px]">
            {skills.join("  •  ")}
          </p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6 text-left">
          <h3 className="text-[11px] font-sans font-bold uppercase tracking-wider text-center border-b border-zinc-200 pb-1 mb-3 text-zinc-800">
            Education
          </h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span>{edu.school}</span>
                  <span className="text-[10px] text-zinc-500 font-sans font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline text-[10px] text-zinc-650 font-sans">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates & Achievements Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-zinc-200 pt-4">
        {certificates && certificates.length > 0 && (
          <div>
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Certifications
            </h3>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between text-[11px] font-sans">
                  <span>
                    <span className="font-bold text-zinc-800">{cert.name}</span>
                    <span className="text-zinc-500 text-[10px]"> ({cert.issuer})</span>
                  </span>
                  <span className="text-zinc-500 font-mono text-[9px]">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div>
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Key Achievements
            </h3>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[11px] font-sans">
                  <span className="font-bold text-zinc-800 block">{ach.title}</span>
                  <span className="text-zinc-500 leading-normal block">{ach.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages & Links Footnote */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 text-left border-t border-zinc-200 pt-4">
        {languages && languages.length > 0 && (
          <div>
            <h4 className="text-[9px] font-sans font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Languages</h4>
            <div className="flex flex-wrap gap-4 text-[10px] font-sans">
              {languages.map((lang) => (
                <span key={lang.id} className="text-zinc-600">
                  <span className="font-bold text-zinc-800">{lang.language}</span> ({lang.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}

        {links && links.length > 0 && (
          <div>
            <h4 className="text-[9px] font-sans font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Links</h4>
            <div className="flex flex-wrap gap-4 text-[10px] font-sans">
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
