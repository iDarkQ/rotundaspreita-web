const baseUrl = process.env.REMINDER_WORKER_URL;
const token = process.env.REMINDER_WORKER_TOKEN;
const pollingInterval = 60_000;

if (!baseUrl || !token) {
  throw new Error(
    "REMINDER_WORKER_URL e REMINDER_WORKER_TOKEN têm de estar configurados.",
  );
}

let stopping = false;
process.on("SIGTERM", () => {
  stopping = true;
});
process.on("SIGINT", () => {
  stopping = true;
});

while (!stopping) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `O processamento dos lembretes devolveu HTTP ${response.status}.`,
      );
    } else {
      const result = await response.json();
      if (result.sent || result.failed) {
        console.info("Resultado do envio de lembretes:", result);
      }
    }
  } catch (error) {
    console.error("Falha ao contactar o serviço de lembretes.", error);
  }

  await new Promise((resolve) => setTimeout(resolve, pollingInterval));
}
