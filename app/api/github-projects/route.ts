import { NextResponse } from "next/server";

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

    const projects = repos.map((repo: any) => ({
      id: repo.name,
      name: repo.name,
      shortDescription: repo.description || "No description provided.",
      problem: repo.description || "No specific problem documented.",
      type: repo.fork ? "Fork" : "Repository",
      primaryTech: repo.language || "Unknown",
      techStack: repo.language ? [repo.language] : [],
      features: [],
      architecture: "Standard repository architecture.",
      links: {
        github: repo.html_url,
      },
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      isFork: repo.fork,
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching github projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
