const buildConfig = () => {
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "My Blog";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Author";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "My Blog";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "A blog powered by Next.js and Markdown.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description: defaultDescription,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
  };
};

export const config = buildConfig();
