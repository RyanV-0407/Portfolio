import { useState } from "react";
import { StaggerReveal } from "@/components/StaggerReveal";

const skillsData = [
    // Programming
    { name: "Python", percentage: 88, category: "Programming", abbr: "Py" },
    { name: "Java", percentage: 78, category: "Programming", abbr: "Ja" },
    { name: "C++", percentage: 82, category: "Programming", abbr: "C++" },
    { name: "C", percentage: 76, category: "Programming", abbr: "C" },
    { name: "SQL", percentage: 80, category: "Programming", abbr: "SQL" },
    { name: "JavaScript", percentage: 78, category: "Programming", abbr: "JS" },

    // Machine Learning
    { name: "Scikit-learn", percentage: 87, category: "Machine Learning", abbr: "SK" },
    { name: "LightGBM", percentage: 85, category: "Machine Learning", abbr: "LGB" },
    { name: "TensorFlow / Keras", percentage: 75, category: "Machine Learning", abbr: "TF" },
    { name: "PyTorch", percentage: 72, category: "Machine Learning", abbr: "PT" },
    { name: "Feature Engineering", percentage: 84, category: "Machine Learning", abbr: "FE" },
    { name: "Cosine Similarity", percentage: 86, category: "Machine Learning", abbr: "CS" },

    // Data Analysis
    { name: "Pandas", percentage: 90, category: "Data Analysis", abbr: "PD" },
    { name: "NumPy", percentage: 85, category: "Data Analysis", abbr: "NP" },
    { name: "Matplotlib", percentage: 80, category: "Data Analysis", abbr: "MP" },
    { name: "EDA", percentage: 86, category: "Data Analysis", abbr: "EDA" },
    { name: "Data Cleaning", percentage: 88, category: "Data Analysis", abbr: "DC" },
    { name: "Visualization", percentage: 82, category: "Data Analysis", abbr: "DV" },

    // Web Development
    { name: "Flask", percentage: 84, category: "Web Development", abbr: "Fl" },
    { name: "FastAPI", percentage: 80, category: "Web Development", abbr: "FA" },
    { name: "Streamlit", percentage: 83, category: "Web Development", abbr: "ST" },
    { name: "React.js", percentage: 80, category: "Web Development", abbr: "Re" },
    { name: "HTML", percentage: 92, category: "Web Development", abbr: "HT" },
    { name: "CSS", percentage: 86, category: "Web Development", abbr: "CSS" },
    { name: "Bootstrap", percentage: 80, category: "Web Development", abbr: "BS" },

    // Databases
    { name: "MySQL", percentage: 82, category: "Databases", abbr: "MY" },
    { name: "MongoDB", percentage: 80, category: "Databases", abbr: "MDB" },
    { name: "SQLite", percentage: 78, category: "Databases", abbr: "SQ" },

    // Tools
    { name: "Git", percentage: 84, category: "Tools", abbr: "Git" },
    { name: "GitHub", percentage: 86, category: "Tools", abbr: "GH" },
    { name: "Jupyter Notebook", percentage: 88, category: "Tools", abbr: "JN" },
    { name: "VS Code", percentage: 90, category: "Tools", abbr: "VS" },
    { name: "Kaggle", percentage: 78, category: "Tools", abbr: "KG" },

    // Soft Skills
    { name: "Problem Solving", percentage: 90, category: "Soft Skills", abbr: "PS" },
    { name: "Team Collaboration", percentage: 86, category: "Soft Skills", abbr: "TC" },
    { name: "Time Management", percentage: 84, category: "Soft Skills", abbr: "TM" },
    { name: "Adaptability", percentage: 85, category: "Soft Skills", abbr: "AD" },
];

const categories = ["Programming", "Machine Learning", "Data Analysis", "Web Development", "Databases", "Tools", "Soft Skills"];

export const Skills = () => {
    const [activeTab, setActiveTab] = useState("Programming");

    const filteredSkills =
        activeTab === "All Skills"
            ? skillsData
            : skillsData.filter((s) => s.category === activeTab);

    return (
        <section id="skills" className="py-28 relative overflow-hidden bg-background">
            <span className="watermark -top-8 left-4 md:left-12">03</span>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                <StaggerReveal className="flex flex-col items-center">

                    {/* Header */}
                    <div className="text-center mb-10 w-full relative z-10 section-shell p-6 md:p-8 edge-clip">
                        <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 font-serif relative inline-block">
                            Technical Arsenal
                            <div className="absolute left-1/2 -bottom-2 w-1/3 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-1/2" />
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            A concise view of my technical stack across ML, data, development, and engineering workflow.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14 w-full relative z-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 md:px-5 py-2 rounded-full text-[0.7rem] md:text-xs font-mono tracking-wider transition-all duration-300 ${activeTab === cat
                                        ? "bg-primary text-primary-foreground font-bold shadow-[0_10px_24px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
                                        : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-ink"
                                    }`}
                                data-hover
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full relative z-10">
                        {filteredSkills.map((skill, idx) => (
                            <div
                                key={`${activeTab}-${idx}`}
                                className="bg-card border border-border p-5 rounded-2xl flex flex-col transition-all duration-300 hover:border-primary/55 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_color-mix(in_srgb,var(--color-accent)_24%,transparent)] animate-fade-in"
                                style={{ animationDelay: `${(idx % 12) * 50}ms` }}
                            >
                                {/* Top Row: Icon, Name, % */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Icon Box */}
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-primary text-xs shrink-0 bg-primary/10 border border-primary/20"
                                        >
                                            {skill.abbr}
                                        </div>
                                        {/* Name */}
                                        <h3 className="font-bold text-ink font-sans text-base">
                                            {skill.name}
                                        </h3>
                                    </div>
                                    {/* Percentage */}
                                    <span className="text-muted-foreground text-xs font-mono font-medium">
                                        {skill.percentage}%
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-border/50 h-1.5 rounded-full mb-3 overflow-hidden relative">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out bg-primary"
                                        style={{ width: `${skill.percentage}%` }}
                                    />
                                </div>

                                {/* Bottom Row: Category */}
                                <div className="text-right mt-auto">
                                    <span className="text-[0.6rem] text-muted-foreground uppercase tracking-widest font-mono">
                                        {skill.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coding Profiles */}
                    <div className="mt-14 w-full relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-border" />
                            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Coding Profiles</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {/* LeetCode */}
                            <a
                                href="https://leetcode.com/u/vikramsingh3124k/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(200,134,10,0.15)] transition-all duration-300 group"
                                data-hover
                            >
                                <img src="/leetcode.png" alt="LeetCode" className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity dark:invert" />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-ink text-sm font-sans">LeetCode</span>
                                    <span className="text-[0.6rem] text-muted-foreground font-mono tracking-wider uppercase">100+ problems solved</span>
                                </div>
                            </a>
                            {/* GeeksforGeeks */}
                            <a
                                href="https://www.hackerrank.com/profile/vikramsingh3124k"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(200,134,10,0.15)] transition-all duration-300 group"
                                data-hover
                            >
                                <img src="/gfg.svg" alt="HackerRank" className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-ink text-sm font-sans">HackerRank</span>
                                    <span className="text-[0.6rem] text-muted-foreground font-mono tracking-wider uppercase">5 stars in 4 domains</span>
                                </div>
                            </a>
                        </div>
                    </div>

                </StaggerReveal>
            </div>
        </section>
    );
};
