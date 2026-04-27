import {
  certifications,
  contactDetails,
  educationTimeline,
  experienceTimeline,
  portfolioProfile,
  portfolioProjects,
  skillMatrix,
} from "@/data/content";
import { NextRequest } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function buildSystemPrompt() {
  const SYSTEM_PROMPT = `You are Aniket Karmakar's AI portfolio assistant. Answer ONLY about Aniket. Never hallucinate.

## IDENTITY
- **Name:** Aniket Karmakar (He/Him)
- **Role:** Front-end UI Developer | React.js | Web Designer | Full-Stack | AI/ML
- **Current:** Junior Software Engineer @ SEPLE, Noida
- **Location:** Kolkata, West Bengal, India
- **Open to:** Full-time & Internship

## PORTFOLIO DATA
${portfolioProfile.summary}

## PROJECTS (${portfolioProjects.length})
${portfolioProjects.map((project) => `**${project.name}** (${project.year})
 Stack: ${project.stack.join(", ")}
 ${project.summary}
 Impact: ${project.impact.join(", ")}`).join("\n\n")}

## SKILLS
 Languages: ${skillMatrix.languages.join(", ")}
 Frontend: ${skillMatrix.frontend.join(", ")}
 Backend: ${skillMatrix.backend.join(", ")}
 AI/ML: ${skillMatrix.aiAndData.join(", ")}
 Tools: ${skillMatrix.tooling.join(", ")}

## EXPERIENCE
${experienceTimeline.map((entry) => `**${entry.company}** | ${entry.role}
${entry.period}  ${entry.location}
 ${entry.wins.join("\n ")}`).join("\n\n")}

## EDUCATION
${educationTimeline.map((entry) => `**${entry.institution}** | ${entry.degree}
${entry.period}${"grade" in entry && entry.grade ? `  Grade: ${entry.grade}` : ""}`).join("\n\n")}

## CERTIFICATIONS
${certifications.map((cert) => ` ${cert.name} — ${cert.issuer} (${cert.date})`).join("\n")}

## CONTACT
 Email: ${contactDetails.email}
 GitHub: ${contactDetails.github}
 LinkedIn: ${contactDetails.linkedin}
 Phone: ${contactDetails.phone}

## RESPONSE RULES (STRICT)
1. **MAX 2-3 sentences** for casual questions
2. **MAX 4-5 sentences** for detailed questions
3. Use **bold** for names/tech, \`code\` for technologies
4. Use bullet points () for lists — NEVER numbered
5. ONE blank line max between sections
6. Links: [GitHub](url) format only
7. Keep answers scannable — short paragraphs
8. Tone: quick, professional, like a Slack message`;

  return SYSTEM_PROMPT;
}

function parseSSE(buffer: string) {
  const events = buffer.split("\n\n");
  return {
    completeEvents: events.slice(0, -1),
    remainder: events.at(-1) ?? "",
  };
}

function extractDeltaText(eventBlock: string) {
  const data = eventBlock
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6))
    .join("\n");

  if (!data || data === "[DONE]") {
    return "";
  }

  try {
    const parsed = JSON.parse(data) as {
      choices?: Array<{
        delta?: {
          content?: string;
        };
      }>;
    };

    return parsed.choices?.[0]?.delta?.content ?? "";
  } catch {
    return "";
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = Array.isArray(body.messages)
    ? body.messages.filter(
        (message): message is ChatMessage =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      )
    : [];

  const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(),
        },
        ...messages,
      ],
      stream: true,
    }),
  });

  if (!openAIResponse.ok || !openAIResponse.body) {
    const error = await openAIResponse.text();
    return Response.json(
      { error: error || "AI service unavailable" },
      { status: openAIResponse.status || 502 },
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = openAIResponse.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const parsed = parseSSE(buffer);
          buffer = parsed.remainder;

          for (const event of parsed.completeEvents) {
            const text = extractDeltaText(event);

            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
              );
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              error: error instanceof Error ? error.message : "Stream failed",
            })}\n\n`,
          ),
        );
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
