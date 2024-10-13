import { z } from "zod";

const mapSchema = z.object({
  id: z.string(),
  summary_polyline: z.string().nullable(),
  resource_state: z.number(),
});

const athleteSchema = z.object({
  id: z.number(),
  resource_state: z.number(),
});

const activityTypeSchema = z.enum(["Run", "Swim", "Ride"]);

const activitySchema = z.object({
  resource_state: z.number(),
  athlete: athleteSchema,
  name: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  total_elevation_gain: z.number(),
  type: activityTypeSchema,
  sport_type: z.string(),
  workout_type: z.nullable(z.any()),
  id: z.union([z.string(), z.number()]),
  external_id: z.string(),
  upload_id: z.union([z.string(), z.number()]),
  start_date: z.string(),
  start_date_local: z.string(),
  timezone: z.string(),
  utc_offset: z.number(),
  start_latlng: z.nullable(z.any()),
  end_latlng: z.nullable(z.any()),
  location_city: z.nullable(z.string()),
  location_state: z.nullable(z.string()),
  location_country: z.string(),
  achievement_count: z.number(),
  kudos_count: z.number(),
  comment_count: z.number(),
  athlete_count: z.number(),
  photo_count: z.number(),
  map: mapSchema,
  trainer: z.boolean(),
  commute: z.boolean(),
  manual: z.boolean(),
  private: z.boolean(),
  flagged: z.boolean(),
  gear_id: z.string(),
  from_accepted_tag: z.boolean(),
  average_speed: z.number(),
  max_speed: z.number(),
  average_cadence: z.number(),
  average_watts: z.number(),
  weighted_average_watts: z.number(),
  kilojoules: z.number(),
  device_watts: z.boolean(),
  has_heartrate: z.boolean(),
  average_heartrate: z.number().optional(),
  max_heartrate: z.number(),
  max_watts: z.number(),
  pr_count: z.number(),
  total_photo_count: z.number(),
  has_kudoed: z.boolean(),
  suffer_score: z.number(),
});

export type StravaActivity = z.infer<typeof activitySchema>;
export const supportedActivityTypes = ["Run", "Swim", "Ride"] as ActivityType[];

export type ActivityType = z.infer<typeof activityTypeSchema>;
