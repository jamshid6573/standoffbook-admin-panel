import { API_ENDPOINTS } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.serverStats}`,
      {
        // Убираем кэширование, чтобы получать свежие данные
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Ошибка при получении статистики сервера" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ошибка при запросе статистики:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных сервера" },
      { status: 500 }
    );
  }
}


