import { API_ENDPOINTS } from "@/lib/config"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const response = await fetch(`${API_ENDPOINTS.types}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorData },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating type:", error)
    return NextResponse.json({ error: "Failed to update type" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const response = await fetch(`${API_ENDPOINTS.types}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorData },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting type:", error)
    return NextResponse.json({ error: "Failed to delete type" }, { status: 500 })
  }
}
