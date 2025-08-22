// app/api/recommend-crop/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

function runPython(state: string) {
  return new Promise<{ stdout: string; stderr: string; code: number }>((resolve) => {
    const projectRoot = process.cwd();
    const appDir = path.join(projectRoot, "app");
    const scriptPath = path.join(process.cwd(), "app", "predict", "mainfn.py")

    // Try a couple of python commands depending on OS
    const candidates: Array<[string, string[]]> =
      process.platform === "win32"
        ? [["python", []], ["py", ["-3"]]]
        : [["python3", []], ["python", []]];

    let tried: string[] = [];

    const trySpawn = (i: number) => {
      if (i >= candidates.length) {
        return resolve({
          stdout: "",
          stderr: `No Python interpreter found. Tried: ${tried.join(", ")}`,
          code: 127,
        });
      }
      const [cmd, extra] = candidates[i];
      tried.push(cmd);

      const proc = spawn(cmd, [...extra, scriptPath, state], { cwd: appDir });

      let stdout = "";
      let stderr = "";

      proc.stdout.on("data", (c) => (stdout += c.toString()));
      proc.stderr.on("data", (c) => (stderr += c.toString()));

      proc.on("error", () => trySpawn(i + 1)); // if this command doesn't exist, try next
      proc.on("close", (code) => resolve({ stdout, stderr, code: code ?? 0 }));
    };

    trySpawn(0);
  });
}

export async function POST(req: Request) {
  const { state } = await req.json();
  if (!state) return NextResponse.json({ error: "State is required" }, { status: 400 });

  const { stdout, stderr, code } = await runPython(state);

  if (code !== 0) {
    console.error("Python exit code:", code, "\nStderr:", stderr);
    return NextResponse.json({ error: "Python script failed", details: stderr }, { status: 500 });
  }

  try {
    const json = JSON.parse(stdout.trim());
    return NextResponse.json(json);
  } catch {
    console.error("Bad JSON from python:\nSTDOUT:", stdout, "\nSTDERR:", stderr);
    return NextResponse.json(
      { error: "Failed to parse Python output", raw: stdout, details: stderr },
      { status: 500 }
    );
  }
}
