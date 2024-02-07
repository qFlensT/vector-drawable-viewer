declare module "vector-drawable-svg" {
  export function transform(
    content: string,
    options?: { pretty: boolean; override: Record<string, string> },
  ): string;
}
