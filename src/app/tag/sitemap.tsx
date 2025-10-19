import type { MetadataRoute } from "next";
import urlJoin from "url-join";
import { config } from "@/config";
import { getAllTags } from "@/lib/posts-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getAllTags();
  return [
    {
      url: urlJoin(config.baseUrl, "tag"),
      lastModified: new Date(),
      priority: 0.8,
    },
    ...result.tags.map((tag) => {
      return {
        url: urlJoin(config.baseUrl, "tag", tag.name),
        lastModified: new Date(),
        priority: 0.8,
      };
    }),
  ];
}
