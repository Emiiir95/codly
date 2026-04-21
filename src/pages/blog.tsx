import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import BlogContent from "@/components/organisms/BlogContent";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";
import { getAllPosts } from "@/lib/blog";
import { getLocale } from "@/lib/site";

export const getStaticProps = (async ({ locale }) => {
  const resolved = getLocale(locale);
  const posts = getAllPosts(resolved);
  return {
    props: {
      ...getI18nProps(locale),
      posts,
    },
  };
}) satisfies GetStaticProps;

export default function BlogPage({
  translations,
  locale,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);
  return (
    <>
      <Seo
        title={t("blog.meta.title")}
        description={t("blog.meta.description")}
        pageKey="blog"
        locale={locale}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            { name: t("blog.breadcrumb"), path: localizedPath("blog", locale) },
          ]),
        ]}
      />
      <BlogContent posts={posts} />
    </>
  );
}
