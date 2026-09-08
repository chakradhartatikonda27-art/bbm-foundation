import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bbmfoundation.online";
  const lastModified = new Date();

  const routes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/our-work`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/stories`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/events`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/donate`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/impact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/transparency`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/get-involved`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/community`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/e-learning`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/hope-groups`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/protection-day`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/roadmap`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/resources/videos`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
