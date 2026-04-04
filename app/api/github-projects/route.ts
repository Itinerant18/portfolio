import { NextResponse } from "next/server";

function extractTechFromReadme(readmeText: string) {
  const techs: string[] = [];
  const lowerReadme = readmeText.toLowerCase();
  
  const keywords = [
    "supabase", "firebase", "postgresql", "mongodb", "redis", "mysql", "sqlite",
    "docker", "kubernetes", "aws", "google cloud", "azure", "vercel", "netlify",
    "tailwind", "bootstrap", "framer motion", "zustand", "redux", "prisma", "mongoose",
    "openai", "langchain", "huggingface", "pytorch", "tensorflow", "scikit-learn",
    "flask", "django", "fastapi", "express", "nest.js", "capacitor", "expo", "mlkit",
    "socket.io", "webgl", "three.js", "d3.js", "graphql", "apollo", "trpc", "grpc",
    "rabbitmq", "kafka", "elasticsearch", "terraform", "ansible", "jenkins", "github actions"
  ];

  for (const keyword of keywords) {
    if (lowerReadme.includes(keyword)) {
      let label = keyword.charAt(0).toUpperCase() + keyword.slice(1).replace(".js", "JS");
      if (keyword === "aws") label = "AWS";
      if (keyword === "postgresql") label = "PostgreSQL";
      if (keyword === "mongodb") label = "MongoDB";
      if (keyword === "fastapi") label = "FastAPI";
      if (keyword === "mlkit") label = "MLKit";
      techs.push(label);
    }
  }

  return techs;
}

async function fetchPackageJson(username: string, repo: string, branch: string) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/package.json`);
    if (res.ok) {
      const pkg = await res.json();
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const techs: string[] = [];
      
      const map: Record<string, string> = {
        "next": "Next.js",
        "react": "React",
        "typescript": "TypeScript",
        "tailwindcss": "Tailwind",
        "supabase": "Supabase",
        "framer-motion": "Framer Motion",
        "zustand": "Zustand",
        "prisma": "Prisma",
        "lucide-react": "Lucide Icons",
        "axios": "Axios",
        "express": "Express",
        "socket.io": "Socket.io",
        "three": "Three.js"
      };

      for (const [key, val] of Object.entries(map)) {
        if (deps[key]) techs.push(val);
      }
      return techs;
    }
  } catch (e) {
    // console.error(`Error fetching package.json for ${repo}:`, e);
  }
  return [];
}

function parseArchitecture(readmeText: string, language: string) {
  const lowerReadme = readmeText.toLowerCase();
  
  // 1. AI / ML / LLM
  if (lowerReadme.includes("openai") || lowerReadme.includes("llm") || lowerReadme.includes("gpt") || lowerReadme.includes("langchain")) {
    return {
      highLevel: "User Input -> LLM Logic -> AI Response",
      visualFlow: [
        { label: "User", icon: "user" },
        { label: "AI Model", icon: "cpu" },
        { label: "Output", icon: "terminal" }
      ]
    };
  }

  // 2. Mobile / IoT / ESP32
  if (lowerReadme.includes("esp32") || lowerReadme.includes("arduino") || lowerReadme.includes("iot") || lowerReadme.includes("capacitor")) {
    return {
      highLevel: "Mobile App -> IP Discovery -> IoT Command -> Device Control",
      visualFlow: [
        { label: "Native App", icon: "smartphone" },
        { label: "MLKit/P2P", icon: "zap" },
        { label: "ESP32", icon: "cpu" },
        { label: "Device", icon: "power" }
      ]
    };
  }

  // 3. Modern Web App (Next.js / React / Supabase)
  if (language === "TypeScript" || language === "JavaScript" || lowerReadme.includes("react") || lowerReadme.includes("next.js")) {
    return {
      highLevel: "Web Client -> API Route -> Serverless Logic -> Persistence",
      visualFlow: [
        { label: "Web UI", icon: "monitor" },
        { label: "Edge Fn", icon: "server" },
        { label: "Storage", icon: "database" }
      ]
    };
  }

  // 4. Automation / Bots / Scrapers
  if (lowerReadme.includes("bot") || lowerReadme.includes("scrape") || lowerReadme.includes("automation")) {
    return {
      highLevel: "Trigger -> Workflow -> Task Execution -> Result",
      visualFlow: [
        { label: "Trigger", icon: "play" },
        { label: "Workflow", icon: "activity" },
        { label: "Result", icon: "check" }
      ]
    };
  }

  // Default Fallback
  return {
    highLevel: "Standard architecture: Flow depends on specific module execution.",
    visualFlow: [
      { label: "Input", icon: "box" },
      { label: "Process", icon: "settings" },
      { label: "Output", icon: "share" }
    ]
  };
}

export async function GET() {
  const username = "Itinerant18";
  const token = process.env.GITHUB_PAT;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: res.status });
    }

    const repos = await res.json();

    const projectsWithImages = await Promise.all(
      repos.map(async (repo: any) => {
        let previewImage: string | null = null;
        let archInfo = {
          highLevel: "Standard repository architecture.",
          visualFlow: [
            { label: "Client", icon: "monitor" },
            { label: "Service", icon: "server" },
            { label: "Storage", icon: "database" }
          ]
        };
        let extraTechs: string[] = [];
        const defaultBranch = repo.default_branch || "main";
        
        try {
          const readmeRes = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/README.md`,
            { next: { revalidate: 3600 } }
          );

          if (readmeRes.ok) {
            const readmeText = await readmeRes.text();
            
            // Extract preview image
            const imgMatch = readmeText.match(/!\[.*?\]\((.*?)\)|<img[^>]+src=["'](.*?)["']/i);
            if (imgMatch) {
              let imgUrl = (imgMatch[1] || imgMatch[2]).trim();
              if (imgUrl.includes(" ")) imgUrl = imgUrl.split(" ")[0];
              if (!imgUrl.startsWith("http")) {
                imgUrl = imgUrl.replace(/^\.\//, "").replace(/^\//, "");
                imgUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/${imgUrl}`;
              }
              previewImage = imgUrl;
            }

            // Extract dynamic architecture
            archInfo = parseArchitecture(readmeText, repo.language || "");
            
            // Extract tech from readme
            extraTechs = [...extraTechs, ...extractTechFromReadme(readmeText)];
          }
        } catch (e) {
          console.error(`Error fetching README for ${repo.name}:`, e);
        }

        // Fetch package.json dependencies for JS/TS
        if (repo.language === "TypeScript" || repo.language === "JavaScript") {
          const pkgTechs = await fetchPackageJson(username, repo.name, defaultBranch);
          extraTechs = [...extraTechs, ...pkgTechs];
        }

        // Deduplicate techStack
        const fullTechStack = Array.from(new Set([
          repo.language,
          ...(repo.topics || []).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
          ...extraTechs
        ])).filter(Boolean);

        return {
          id: repo.name,
          name: repo.name,
          shortDescription: repo.description || "No description provided.",
          problem: repo.description || "No specific problem documented.",
          type: repo.fork ? "Fork" : "Repository",
          primaryTech: repo.language || "Unknown",
          techStack: fullTechStack,
          features: [],
          architecture: archInfo.highLevel,
          highLevel: archInfo.highLevel,
          visualFlow: archInfo.visualFlow,
          links: {
            github: repo.html_url,
          },
          topics: repo.topics || [],
          updatedAt: repo.updated_at,
          isFork: repo.fork,
          previewImage,
        };
      })
    );

    return NextResponse.json(projectsWithImages);
  } catch (error) {
    console.error("Error fetching github projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
