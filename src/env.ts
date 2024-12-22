import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const env = {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

export const env = validateEnv();
