import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiGit,
  SiGithub,
  SiFigma,
  SiCanva,
  SiPostman } from
'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import type { IconType } from 'react-icons';
type Skill = {
  name: string;
  icon: IconType;
  color: string;
};
const skills: Skill[] = [
{
  name: 'HTML5',
  icon: SiHtml5,
  color: '#E34F26'
},
{
  name: 'CSS3',
  icon: SiCss,
  color: '#1572B6'
},
{
  name: 'JavaScript',
  icon: SiJavascript,
  color: '#F7DF1E'
},
{
  name: 'React.js',
  icon: SiReact,
  color: '#61DAFB'
},
{
  name: 'Tailwind CSS',
  icon: SiTailwindcss,
  color: '#38BDF8'
},
{
  name: 'Python',
  icon: SiPython,
  color: '#3776AB'
},
{
  name: 'Django',
  icon: SiDjango,
  color: '#44B78B'
},
{
  name: 'Node.js',
  icon: SiNodedotjs,
  color: '#5FA04E'
},
{
  name: 'Express.js',
  icon: SiExpress,
  color: '#E5E7EB'
},
{
  name: 'Flutter',
  icon: SiFlutter,
  color: '#48B9F2'
},
{
  name: 'MySQL',
  icon: SiMysql,
  color: '#4FA8D8'
},
{
  name: 'SQLite',
  icon: SiSqlite,
  color: '#5FB3DE'
},
{
  name: 'MongoDB',
  icon: SiMongodb,
  color: '#47A248'
},
{
  name: 'Figma',
  icon: SiFigma,
  color: '#F24E1E'
},
{
  name: 'Canva',
  icon: SiCanva,
  color: '#00C4CC'
},
{
  name: 'Git',
  icon: SiGit,
  color: '#F05032'
},
{
  name: 'GitHub',
  icon: SiGithub,
  color: '#F3F4F6'
},
{
  name: 'Visual Studio Code',
  icon: VscVscode,
  color: '#0EA5E9'
},
{
  name: 'Postman',
  icon: SiPostman,
  color: '#FF6C37'
}];

// Split into two rows so they can scroll in opposite directions.
const rowOne = skills.filter((_, i) => i % 2 === 0);
const rowTwo = skills.filter((_, i) => i % 2 !== 0);
function LogoChip({ skill, compact = false }: { skill: Skill; compact?: boolean }) {
  const Icon = skill.icon;
  const size = compact ? 44 : 60;
  return (
    <div className={`group/chip shrink-0 flex flex-col items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      <div
        title={skill.name}
        className={`group/chip flex items-center justify-center rounded-3xl glass-card border-white/10 hover:border-purple-500/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] hover:scale-110 transition-all duration-300 ${
          compact ? 'w-20 h-20' : 'w-28 h-28 md:w-32 md:h-32'
        }`}>
        <Icon
          size={size}
          color={skill.color}
          aria-label={skill.name}
          role="img"
          className="opacity-90 group-hover/chip:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        />
      </div>
      {compact && (
        <span className="text-[10px] text-gray-400 text-center max-w-[72px] leading-tight">
          {skill.name}
        </span>
      )}
    </div>
  );
}
function MarqueeRow({
  items,
  direction,
}: {
  items: Skill[];
  direction: 'left' | 'right';
}) {
  return (
    <div className="marquee-row marquee-mask relative w-full overflow-hidden py-2">
      <div
        className={`marquee-track flex w-max flex-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}>
        <div className="marquee-set flex shrink-0 items-center gap-8 md:gap-10 pr-8 md:pr-10">
          {items.map((skill) => (
            <LogoChip key={skill.name} skill={skill} />
          ))}
        </div>
        <div
          className="marquee-set flex shrink-0 items-center gap-8 md:gap-10 pr-8 md:pr-10"
          aria-hidden="true">
          {items.map((skill) => (
            <LogoChip key={`dup-${skill.name}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative bg-[#050505] overflow-hidden">
      
      {/* Background depth */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 mix-blend-screen">
        <img
          src="/2.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover" />
        
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-purple-700/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          className="mb-16 text-center max-w-7xl mx-auto px-6 md:px-12">
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]"></div>
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm md:text-base">
            A toolkit I use to design, build, and ship modern web and mobile
            applications.
          </p>
        </motion.div>

        {/* Moving logo rows */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="hidden md:flex flex-col gap-6 md:gap-8">
          <MarqueeRow items={rowOne} direction="left" />
          <MarqueeRow items={rowTwo} direction="right" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:hidden px-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <LogoChip key={skill.name} skill={skill} compact />
          ))}
        </motion.div>
      </div>
    </section>);

}