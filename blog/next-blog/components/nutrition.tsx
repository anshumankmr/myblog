"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"

type NutritionData = {
  status: "ok" | "empty" | "private" | "blocked" | "unavailable"
  calories: number | null
  date: string
  checkedAt: string
}
const messages = {
  empty: "I haven’t logged anything for this date yet.",
  private: "My calorie diary is currently private.",
  blocked:
    "MyFitnessPal is temporarily unavailable. You can still open my diary below.",
  unavailable:
    "Calorie totals are unavailable right now. You can still open my diary below.",
}
function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}
async function fetchNutrition(url: string): Promise<NutritionData> {
  const response = await fetch(url)
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("application/json")
  )
    throw new Error("Nutrition unavailable")
  const data: NutritionData = await response.json()
  if (!data || (!Object.hasOwn(messages, data.status) && data.status !== "ok"))
    throw new Error("Invalid nutrition response")
  if (
    data.status === "ok" &&
    (typeof data.calories !== "number" ||
      !Number.isFinite(data.calories) ||
      data.calories < 0)
  )
    throw new Error("Invalid calorie total")
  return data
}

export default function Nutrition() {
  const [date, setDate] = useState("")
  const [today, setToday] = useState("")
  useEffect(() => {
    const current = todayInIndia()
    setDate(current)
    setToday(current)
    let lastDay = current
    const timer = setInterval(() => {
      const next = todayInIndia()
      if (next !== lastDay) {
        const previous = lastDay
        setToday(next)
        setDate(selected => (selected === previous ? next : selected))
        lastDay = next
      }
    }, 60000)
    return () => clearInterval(timer)
  }, [])
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<NutritionData>(
      date ? `/api/nutrition?date=${date}` : null,
      fetchNutrition,
      {
        refreshInterval: 15 * 60 * 1000,
        revalidateOnFocus: false,
        errorRetryCount: 1,
      }
    )
  const diaryUrl = `https://www.myfitnesspal.com/food/diary/anshuman_kmr${
    date ? `?date=${date}` : ""
  }`
  return (
    <div>
      <h3>My calories</h3>
      <div className="nutrition-controls">
        <label htmlFor="nutrition-date">Diary date</label>
        <input
          id="nutrition-date"
          type="date"
          value={date}
          min="2000-01-01"
          max={today || undefined}
          onChange={event => {
            if (event.target.value) setDate(event.target.value)
          }}
        />
        <span className="text-text-meta">India time</span>
      </div>
      <div aria-live="polite" aria-atomic="true" aria-busy={!date || isLoading}>
        {!date || isLoading ? (
          <p className="nutrition-status">Checking my logged calories…</p>
        ) : error ? (
          <p className="nutrition-status">{messages.unavailable}</p>
        ) : data?.status === "ok" ? (
          <>
            <p className="nutrition-total">
              {data.calories?.toLocaleString("en-IN")}{" "}
              <span className="text-base">kcal</span>
            </p>
            <p className="nutrition-status">
              Calories logged on {data.date}. Checked at{" "}
              {new Date(data.checkedAt).toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              IST.
            </p>
          </>
        ) : (
          <p className="nutrition-status">
            {data ? messages[data.status] : messages.unavailable}
          </p>
        )}
      </div>
      <div className="mt-3 flex items-center gap-5 flex-wrap text-sm">
        <a href={diaryUrl} target="_blank" rel="noopener noreferrer">
          See my calorie diary →
        </a>
        <button
          type="button"
          className="btn-ghost !text-sm"
          disabled={!date || isValidating}
          onClick={() => void mutate()}
        >
          {isValidating ? "Checking…" : "Check again"}
        </button>
      </div>
    </div>
  )
}
