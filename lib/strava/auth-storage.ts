"use client";

import { authResponseSchema, StravaAuthResponse } from "./auth.types";

const storageKeys = {
  authResponse: "stravaAuthResponse",
};

export const storeAuthResponse = (response: any) => {
  if (!response) {
    return;
  }

  const validatedSchema = authResponseSchema.parse(response);

  localStorage?.setItem(
    storageKeys.authResponse,
    JSON.stringify(validatedSchema)
  );
};

export const getStravaCode = (): StravaAuthResponse | null => {
  const storageResult = localStorage?.getItem(storageKeys.authResponse);

  if (!storageResult) {
    console.error("unvarified - no storageResult", storageResult);

    return null;
  }

  const unvarified = JSON.parse(storageResult);

  if (!unvarified) {
    console.error("unvarified - no valid schema", unvarified);
    return null;
  }

  const validatedSchema = authResponseSchema.parse(unvarified);
  return validatedSchema;
};

export const hasStravaCode = () => {
  return getStravaCode() !== null;
};