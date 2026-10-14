"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/utm";

/** Ничего не рисует: при загрузке сохраняет UTM, реферер и страницу входа в sessionStorage. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
