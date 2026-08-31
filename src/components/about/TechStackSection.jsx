import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";

const TECH_STACK = [
  { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Vite"] },
  { category: "Backend", items: ["Node.js", "Express", "API REST", "JWT", "bcrypt", "Nodemailer"] },
  { category: "Données", items: ["MySQL", "phpMyAdmin", "Merise", "MCD", "MLD", "SQL"] },
  { category: "Outils et méthode", items: ["Git", "GitHub", "Figma", "Trello", "Scrum", "VS Code"] },
];

export default function TechStackSection() {
  return (
    <section className="bg-[#faf9f5] border-t border-b border-[#e6e2da] py-12 md:py-16 px-6" aria-labelledby="tech-heading">
      <div className="max-w-5xl mx-auto space-y-10">
        <SectionHeading id="tech-heading" title="Les technologies que j’utilise" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TECH_STACK.map((group) => (
            <Card key={group.category} padding="p-5 md:p-6" className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">{group.category}</p>
              <ul className="space-y-1.5 text-xs text-[#2c3e2b] font-medium">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
