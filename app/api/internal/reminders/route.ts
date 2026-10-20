import { dispatchDueReminders } from "@/app/_services/server/push-reminder-service";
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAuthorized = (authorization: string | null) => {
  const expectedToken = process.env.REMINDER_WORKER_TOKEN;
  const providedToken = authorization?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || !providedToken) return false;

  const expected = Buffer.from(expectedToken);
  const provided = Buffer.from(providedToken);
  return (
    expected.length === provided.length && timingSafeEqual(expected, provided)
  );
};

export async function POST(request: Request) {
  if (!isAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const result = await dispatchDueReminders();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Falha ao processar os lembretes push agendados.", error);
    return NextResponse.json(
      { error: "Não foi possível processar os lembretes agendados." },
      { status: 500 },
    );
  }
}
