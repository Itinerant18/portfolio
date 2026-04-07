import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies external images (especially github.com/user-attachments/assets URLs)
 * to bypass CORS restrictions when loading them in <img> tags.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow proxying from trusted GitHub domains
  const allowedHosts = [
    "github.com",
    "raw.githubusercontent.com",
    "user-images.githubusercontent.com",
    "avatars.githubusercontent.com",
    "objects.githubusercontent.com",
    "private-user-images.githubusercontent.com",
  ];

  try {
    const parsed = new URL(url);
    if (!allowedHosts.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))) {
      return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioProxy/1.0)",
        Accept: "image/*",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
  }
}
