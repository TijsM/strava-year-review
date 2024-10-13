"use server";

import { formatDateAsEpoch } from "../formatDateAsEpoch";
import { checkStravaResponseStatus } from "./authGuard";

type SearchActivitiesParams = {
  token: string;
  before: Date;
  after: Date;
};

export const searchActivities = async ({
  token,
  before,
  after,
}: SearchActivitiesParams) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    headers,
  };

  const AllActivities = [];
  let allFetched = false;
  let page = 1;

  while (!allFetched) {
    const params = new URLSearchParams({
      before: formatDateAsEpoch(before).toString(),
      after: formatDateAsEpoch(after).toString(),
      per_page: "100",
      page: page.toString(),
    });

    const url = `https://www.strava.com/api/v3/activities?${params.toString()}`;

    const response = await fetch(url, options);
    if (!response.ok) {
      allFetched = true;
      console.log("response", response);
      checkStravaResponseStatus(response);
    }
    const json = await response.json();

    AllActivities.push(...json);
    allFetched = json.length < 100;
    page++;
  }

  console.log("search response", AllActivities);
  return AllActivities;
};