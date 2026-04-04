"use client";

import { motion } from "framer-motion";

export default function ReadmeTab() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col overflow-auto bg-[#0d1117] text-[#c9d1d9] font-sans h-full w-full p-6 md:p-10 pb-32 ide-scrollbar">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-[800px] mx-auto flex flex-col gap-10"
      >
        {/* Header Section */}
        <motion.div variants={item} className="flex flex-col items-center gap-4 w-full">
          <img src="https://capsule-render.vercel.app/api?type=waving&color=0:03001e,40:7303c0,80:ec38bc,100:fdeff9&height=240&section=header&text=Aniket%20Karmakar&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Systems%20Architect%20%7C%20AI%2FML%20Engineer%20%7C%20Full-Stack%20Developer&descAlignY=60&descAlign=50&descSize=18" alt="Header" className="w-full rounded-lg" />
          <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&pause=900&color=EC38BC&center=true&vCenter=true&width=760&height=45&lines=Designing+Enterprise+RAG+%26+AI+Systems;Next.js+16+%2B+Spring+Boot+%2B+TypeScript+Fullstack;Industrial+IoT+Platform+Architect;Multilingual+LLM+Pipeline+Engineer;Junior+Executive+Engineer+%40+SEPLe" alt="Typing SVG" className="mt-4 max-w-full" />
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <a href="https://www.linkedin.com/in/itinerant018" target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
            <a href="https://github.com/Itinerant18" target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
            <a href="mailto:itinerant018@gmail.com" className="hover:scale-105 transition-transform"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" /></a>
            <a href="https://github.com/Itinerant18?tab=repositories" target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform"><img src="https://img.shields.io/badge/Portfolio-7303c0?style=for-the-badge&logo=githubpages&logoColor=white" alt="Portfolio" /></a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <a href="https://github.com/Itinerant18" target="_blank" rel="noreferrer"><img src="https://komarev.com/ghpvc/?username=Itinerant18&color=EC38BC&style=flat-square&label=Profile+Views" alt="Profile Views" /></a>
            <a href="https://github.com/Itinerant18?tab=followers" target="_blank" rel="noreferrer"><img src="https://img.shields.io/github/followers/Itinerant18?style=flat-square&color=7303c0&label=Followers&logo=github" alt="Followers" /></a>
            <a href="https://github.com/Itinerant18" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Active%20Since-Nov%202021-EC38BC?style=flat-square" alt="Active Since" /></a>
            <a href="https://github.com/Itinerant18" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Commits-632+-7303c0?style=flat-square&logo=git&logoColor=white" alt="Commits" /></a>
          </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>

        {/* About Me Section */}
        <motion.div variants={item} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-b border-[#30363d] pb-2">
                <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="35" alt="gif" /> 
                About Me
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-[60%] bg-[#161b22] border border-[#30363d] rounded-lg p-5 font-mono text-sm shadow-lg hover:border-[#8b949e] transition-colors">
                    <div className="text-[#ff7b72] mb-1">name: <span className="text-[#c9d1d9]">Aniket Karmakar</span></div>
                    <div className="text-[#ff7b72] mb-1">role: <span className="text-[#c9d1d9]">Junior Executive Engineer — R&D</span></div>
                    <div className="text-[#ff7b72] mb-1">company: <span className="text-[#c9d1d9]">Security Engineers Pvt. Ltd.</span></div>
                    <div className="text-[#ff7b72] mb-3">base: <span className="text-[#c9d1d9]">Kolkata, India 🇮🇳</span></div>
                    
                    <div className="text-[#79c0ff] mb-1">focus:</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Enterprise RAG & LLM pipelines</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Full-stack · Next.js + Spring Boot</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Industrial IoT · ThingsBoard</div>
                    <div className="text-[#c9d1d9] ml-4 mb-3">▸ AI-native product development</div>
                    
                    <div className="text-[#79c0ff] mb-1">currently_building:</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Dexter Tech Support AI (RAG · Sarvam-M)</div>
                    <div className="text-[#c9d1d9] ml-4 mb-3">▸ SWatch360 Flutter mobile client</div>
                    
                    <div className="text-[#79c0ff] mb-1">leveling_up:</div>
                    <div className="text-[#c9d1d9] ml-4">▸ System Design & Distributed Systems</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Kafka · CQRS · Kubernetes</div>
                    <div className="text-[#c9d1d9] ml-4">▸ Multi-Agent AI · LLM Fine-tuning</div>
                </div>
                <div className="w-full md:w-[40%] flex justify-center">
                    <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="280" alt="Coding GIF" className="rounded-xl shadow-2xl" />
                </div>
            </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={item} className="flex flex-col gap-6 text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-white border-b border-[#30363d] pb-2">
                <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="35" alt="gif" /> 
                Tech Stack
            </h2>
            
            <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">🔤 Languages</h3>
                    <img src="https://skillicons.dev/icons?i=java,python,ts,js,dart,cpp,html,css&perline=10" alt="Languages" />
                </div>
                
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">🖥️ Frontend & Mobile</h3>
                    <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,materialui,flutter&perline=10" alt="Frontend" />
                </div>
                
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">⚙️ Backend</h3>
                    <img src="https://skillicons.dev/icons?i=spring,nodejs,fastapi,express&perline=10" alt="Backend" />
                </div>
                
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">🗄️ Databases & Cache</h3>
                    <img src="https://skillicons.dev/icons?i=postgres,mysql,mongodb,redis,supabase&perline=10" alt="DBs" />
                </div>
                
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">☁️ DevOps & Cloud</h3>
                    <img src="https://skillicons.dev/icons?i=docker,githubactions,aws,vercel,nginx,git&perline=10" alt="DevOps" />
                </div>
                
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">🤖 AI · ML · Vector</h3>
                    <div className="flex flex-wrap justify-center gap-2 max-w-[650px]">
                        <img src="https://img.shields.io/badge/LangChain-000000?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/Sarvam--M_LLM-EC38BC?style=for-the-badge" alt="Sarvam-M" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/Pinecone-0EAD69?style=for-the-badge" alt="Pinecone" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/pgvector-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="pgvector" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/Upstash_Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Upstash" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" alt="Ollama" className="hover:scale-105 transition-transform" />
                        <img src="https://img.shields.io/badge/RAG_Pipelines-7303c0?style=for-the-badge" alt="RAG Pipelines" className="hover:scale-105 transition-transform" />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-2">📡 IoT & Hardware</h3>
                    <div className="flex flex-col items-center gap-2">
                        <img src="https://skillicons.dev/icons?i=arduino,raspberrypi&perline=10" alt="IoT" />
                        <div className="flex flex-wrap justify-center gap-2">
                            <img src="https://img.shields.io/badge/ThingsBoard-1E88E5?style=for-the-badge" alt="ThingsBoard" className="hover:scale-105 transition-transform" />
                            <img src="https://img.shields.io/badge/MQTT-660066?style=for-the-badge" alt="MQTT" className="hover:scale-105 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>

        {/* Architecture Mastery */}
        <motion.div variants={item} className="flex flex-col gap-6 text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-white border-b border-[#30363d] pb-2">
                <img src="https://media.giphy.com/media/W5eoZHPpUx9sapR0eu/giphy.gif" width="35" alt="gif" /> 
                Architecture Mastery
            </h2>
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-3">✅ Battle-Tested</h3>
                    <div className="flex flex-wrap justify-center gap-2 max-w-[700px]">
                        {["MVC_Architecture","REST_API_Design","JWT_%2F_OAuth2","Spring_Security","RAG_Pipelines","Semantic_Search","LLM_Orchestration","Docker_Compose","ThingsBoard_IoT","MQTT_Telemetry","SSR_Next.js","Component_Architecture","pgvector_%2F_Vector_DB","Redis_Caching"].map(badge => (
                            <img key={badge} src={`https://img.shields.io/badge/${badge}-%E2%9C%85-2ea44f?style=flat-square`} alt={badge} className="hover:opacity-80 transition-opacity" />
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col items-center mt-2">
                    <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-3">🔥 Currently Learning</h3>
                    <div className="flex flex-wrap justify-center gap-2 max-w-[700px]">
                        {[
                            {n: "System_Design_HLD%2FLLD-75%25", c: "EC38BC"},
                            {n: "CAP_Theorem-55%25", c: "EC38BC"},
                            {n: "Kafka_%2F_Event_Driven-40%25", c: "EC38BC"},
                            {n: "CQRS_Pattern-30%25", c: "7303c0"},
                            {n: "Event_Sourcing-20%25", c: "7303c0"},
                            {n: "HyDE_Retrieval-55%25", c: "EC38BC"},
                            {n: "Multi--Agent_AI-35%25", c: "7303c0"},
                            {n: "LLM_Fine--Tuning-25%25", c: "7303c0"},
                            {n: "Kubernetes-28%25", c: "7303c0"},
                            {n: "Observability-35%25", c: "7303c0"},
                            {n: "Flutter_BLoC_%2F_Riverpod-38%25", c: "EC38BC"},
                            {n: "Flutter_Clean_Arch-48%25", c: "EC38BC"}
                        ].map(badge => (
                            <img key={badge.n} src={`https://img.shields.io/badge/${badge.n}-${badge.c}?style=flat-square`} alt={badge.n} className="hover:opacity-80 transition-opacity" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>

        {/* Analytics */}
        <motion.div variants={item} className="flex flex-col gap-6 text-center">
             <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-white border-b border-[#30363d] pb-2">
                 <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="35" alt="gif" /> 
                 GitHub Analytics
             </h2>
             <div className="flex flex-col items-center gap-5">
                 <div className="flex flex-wrap justify-center gap-4 w-full">
                    <img className="h-44 object-contain rounded-lg" src="https://github-readme-stats-tawny-pi-56.vercel.app/api?username=Itinerant18&theme=tokyonight&hide_border=true&show_icons=true&count_private=true&include_all_commits=true&rank_icon=github" alt="GitHub Stats" />
                    <img className="h-44 object-contain rounded-lg" src="https://github-readme-stats-tawny-pi-56.vercel.app/api/top-langs/?username=Itinerant18&theme=tokyonight&hide_border=true&layout=compact&langs_count=8&card_width=340" alt="Top Languages" />
                 </div>
                 <img className="w-full max-w-[700px] rounded-lg" src="https://streak-stats.demolab.com?user=Itinerant18&theme=tokyonight&hide_border=true&date_format=M%20j%5B%2C%20Y%5D&fire=EC38BC&ring=7303c0&sideLabels=EC38BC&currStreakLabel=EC38BC" alt="Streak" />
                 <img className="w-full max-w-[700px] rounded-lg" src="https://github-readme-activity-graph.vercel.app/graph?username=Itinerant18&theme=tokyo-night&hide_border=true&area=true&color=EC38BC&line=7303c0&point=ffffff" alt="Graph" />
             </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>
        
        {/* Featured Projects */}
        <motion.div variants={item} className="flex flex-col gap-6 items-center w-full">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-white border-b border-[#30363d] pb-2 w-full text-center">
                <img src="https://media.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="35" alt="gif" /> 
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[700px] w-full">
                {[
                    "Swacth360_bot", "SWatch360", "pookies-ai-zone", 
                    "ThingsBoard---Bot", "Financial-Advisor", "HawkEye-Drone"
                ].map(repo => (
                    <a key={repo} href={`https://github.com/Itinerant18/${repo}`} target="_blank" rel="noreferrer" className="transform hover:scale-[1.02] transition-transform w-full">
                        <img src={`https://github-readme-stats-tawny-pi-56.vercel.app/api/pin/?username=Itinerant18&repo=${repo}&theme=tokyonight&hide_border=true&title_color=EC38BC&icon_color=7303c0`} alt={repo} className="w-full rounded-lg" />
                    </a>
                ))}
            </div>
        </motion.div>
        
        <motion.div variants={item} className="w-full flex justify-center mt-4">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>

        {/* Character Sheet */}
        <motion.div variants={item} className="flex flex-col gap-6 items-center">
            <h2 className="text-2xl font-bold text-white border-b border-[#30363d] pb-2 text-center w-full">
                ⚔️ Character Sheet
            </h2>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-[700px]">
                <div className="w-full md:w-1/2 bg-[#161b22] border border-[#30363d] rounded-lg p-5">
                    <h3 className="text-lg font-bold text-white mb-3 text-center">🎮 Genshin Roster</h3>
                    <div className="flex flex-col gap-2">
                        {[
                            { e: "⚡", n: "Raiden Shogun", r: "Main DPS" },
                            { e: "🌿", n: "Tighnari", r: "Sub DPS" },
                            { e: "🔥", n: "Xiangling", r: "Buffer" },
                            { e: "💧", n: "Barbara", r: "Healer" },
                            { e: "🔥", n: "Bennett", r: "ATK Buffer" },
                            { e: "🛡️", n: "Thoma", r: "Shielder" },
                            { e: "🌿", n: "Yaoyao", r: "Dendro Healer" },
                            { e: "❄️", n: "Kaeya", r: "Cryo Flex" }
                        ].map((c, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-[#30363d]/50 pb-1 last:border-0 last:pb-0">
                                <div><span className="mr-2">{c.e}</span><span className="font-semibold text-[#c9d1d9]">{c.n}</span></div>
                                <div className="text-[#8b949e]">{c.r}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 bg-[#161b22] border border-[#30363d] rounded-lg p-5">
                    <h3 className="text-lg font-bold text-white mb-3 text-center">🧙 Dev Stats</h3>
                    <div className="flex flex-col gap-2">
                        {[
                            { e: "⚔️", l: "Level", v: "Junior Executive Eng." },
                            { e: "🏢", l: "Guild", v: "SEPLe — R&D" },
                            { e: "🌟", l: "Class", v: "Full-Stack + RAG Mage" },
                            { e: "🗺️", l: "Server", v: "Kolkata, IN 🇮🇳" },
                            { e: "📦", l: "XP", v: "632+ commits" },
                            { e: "🔭", l: "Quest", v: "Dexter Tech Support AI" },
                            { e: "🌱", l: "Training", v: "Flutter · System Design" },
                            { e: "🎯", l: "Next Boss", v: "Kafka · CQRS · K8s" }
                        ].map((s, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-[#30363d]/50 pb-1 last:border-0 last:pb-0">
                                <div className="flex items-center"><span className="w-6">{s.e}</span><span className="text-[#8b949e]">{s.l}</span></div>
                                <div className="font-medium text-[#c9d1d9] text-right">{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div variants={item} className="w-full flex justify-center mt-4">
            <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" className="w-full h-2 rounded-full opacity-50" alt="divider" />
        </motion.div>
        
        {/* Footer */}
        <motion.div variants={item} className="flex flex-col items-center gap-6 mt-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">🤝 Let's Connect</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.linkedin.com/in/itinerant018" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
                <a href="https://github.com/Itinerant18" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform"><img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
                <a href="mailto:itinerant018@gmail.com" className="hover:scale-110 transition-transform"><img src="https://img.shields.io/badge/Email-Reach_Out-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
            </div>
            <img src="https://img.shields.io/badge/💬_%22Architecture_is_decisions_made_early_—_the_rest_is_just_code.%22-EC38BC?style=for-the-badge&labelColor=03001e&color=7303c0" alt="Quote" className="mt-4 hover:scale-105 transition-transform cursor-pointer" />
            <img src="https://capsule-render.vercel.app/api?type=waving&color=0:fdeff9,40:ec38bc,80:7303c0,100:03001e&height=130&section=footer" className="w-full rounded-b-lg mt-8 opacity-90" alt="Footer" />
        </motion.div>
        
      </motion.div>
    </div>
  );
}
