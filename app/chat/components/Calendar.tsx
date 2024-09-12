// app/chat/components/Calendar.tsx
"use client";

import React from "react";
import { Calendar } from "@/app/components/ui/calendar";

interface CalendarCompProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function CalendarComp({ date, setDate }: CalendarCompProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md bg-customBlack2 text-foreground"
    />
  );
}
