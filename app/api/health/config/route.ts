import { NextResponse } from "next/server";

type CheckGroup = {
  name: string;
  required: string[];
  optional?: string[];
};

const groups: CheckGroup[] = [
  {
    name: "core",
    required: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
    optional: ["SUPABASE_SERVICE_ROLE_KEY"],
  },
  {
    name: "github_projects_api",
    required: [],
    optional: ["GITHUB_PAT", "GITHUB_TOKEN"],
  },
  {
    name: "architecture_sync_api",
    required: ["SUPABASE_SERVICE_ROLE_KEY"],
    optional: ["ARCH_SYNC_TOKEN", "GITHUB_PAT", "GITHUB_TOKEN"],
  },
];

function isSet(name: string) {
  const value = process.env[name];
  return Boolean(value && value.trim().length > 0);
}

export async function GET() {
  const report = groups.map((group) => {
    const missingRequired = group.required.filter((name) => !isSet(name));
    const missingOptional = (group.optional ?? []).filter((name) => !isSet(name));

    return {
      name: group.name,
      required: group.required,
      optional: group.optional ?? [],
      missingRequired,
      missingOptional,
      ok: missingRequired.length === 0,
    };
  });

  const missingAllRequired = report.flatMap((group) => group.missingRequired);

  return NextResponse.json(
    {
      status: missingAllRequired.length === 0 ? "ok" : "missing_required_env",
      timestamp: new Date().toISOString(),
      checks: report,
      missingRequiredUnique: Array.from(new Set(missingAllRequired)),
      note: "This endpoint reports only env var names/status, never secret values.",
    },
    { status: 200 },
  );
}
