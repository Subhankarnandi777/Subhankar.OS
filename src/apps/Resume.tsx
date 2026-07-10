'use client';
import React from 'react';
import { Download, GraduationCap, Briefcase, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: "B.Tech in Computer Science Engineering (AI & ML)",
    institution: "Institute of Engineering & Management (IEM), Kolkata",
    duration: "2024 - 2028",
    score: "CGPA: 8.51 / 10.0",
    description: "Currently pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning."
  },
  {
    degree: "Higher Secondary Examination (WB Board) — Class 12th",
    institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House",
    duration: "Mar 2024",
    score: "Score: 80.8%",
    description: "Successfully completed the Higher Secondary Examination under the West Bengal Council of Higher Secondary Education in 2024, achieving a score of 80.8%. Demonstrated strong academic performance with focused interest in Science and Mathematics, forming the foundation for pursuing a degree in Computer Science and Engineering (AI & ML specialization)."
  },
  {
    degree: "Secondary Examination (WB Board) — Class 10th",
    institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House",
    duration: "Mar 2022",
    score: "Score: 76.57%",
    description: "Successfully completed the Secondary School Examination under the West Bengal Board of Secondary Education in 2022, achieving a score of 76.57%. Reflects consistent academic performance and a solid foundation in core subjects, fostering an early interest in Science and Technology."
  }
];

const experienceData = [
  {
    role: "Winter Intern",
    company: "Innovation & Entrepreneurship Development Center, IEM Kolkata",
    duration: "Dec 2024 - Apr 2025",
    description: "Worked on AI & ML projects, contributing to technology solutions in the department."
  }
];

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Subhankar_Nandi_(CV).pdf';
    link.download = 'Subhankar_Nandi_(CV).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#050505] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 bg-[#050505]/90 backdrop-blur-sm border-b border-white/10">
        <h2 className="text-xl font-bold text-cyan flex items-center gap-2">
          <BookOpen size={20} /> Curriculum Vitae
        </h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 rounded-lg transition-colors text-sm font-medium cursor-pointer"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div className="px-8 py-8 max-w-4xl mx-auto space-y-12">

        {/* Education */}
        <section>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="text-cyan w-5 h-5" /> Education
          </h3>
          <div className="space-y-6 border-l-2 border-white/10 pl-6 ml-2">
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute left-[-35px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-cyan shadow-[0_0_8px_rgba(0,255,255,0.4)]" />
                <div className="bg-white/5 border border-white/10 hover:border-cyan/30 rounded-xl p-5 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h4 className="text-white font-bold text-base leading-snug">{edu.degree}</h4>
                    <span className="text-xs font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded-full shrink-0">{edu.duration}</span>
                  </div>
                  <p className="text-cyan text-sm font-medium mb-1">{edu.institution}</p>
                  <p className="text-gray-400 text-xs font-mono mb-3">{edu.score}</p>
                  <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-cyan/20 pl-3">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
            <Briefcase className="text-purple w-5 h-5" /> Work Experience
          </h3>
          <div className="space-y-6 border-l-2 border-white/10 pl-6 ml-2">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute left-[-35px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-purple shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                <div className="bg-white/5 border border-white/10 hover:border-purple/30 rounded-xl p-5 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h4 className="text-white font-bold text-base">{exp.role}</h4>
                    <span className="text-xs font-mono text-purple bg-purple/10 px-2 py-0.5 rounded-full shrink-0">{exp.duration}</span>
                  </div>
                  <p className="text-purple text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section>
          <div className="bg-linear-to-br from-cyan/10 to-purple/10 border border-cyan/20 rounded-2xl p-6 text-center">
            <Award className="w-8 h-8 text-cyan mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Want the full CV?</h3>
            <p className="text-gray-400 text-sm mb-4">Download a complete copy of my resume including all projects, certifications, and achievements.</p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-black font-bold rounded-xl hover:bg-cyan/80 transition-colors cursor-pointer"
            >
              <Download size={18} /> Download Subhankar_Nandi_(CV).pdf
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
