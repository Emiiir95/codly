import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getI18nProps } from "@/lib/i18n.server";
import { buildI18n } from "@/lib/i18n";
import Seo from "@/components/atoms/Seo";
import BlogArticle from "@/components/organisms/BlogArticle";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath } from "@/lib/routes";
import { SITE, getLocale, type Locale } from "@/lib/site";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string }; locale: string }[] = [];
  for (const locale of SITE.locales) {
    for (const slug of getAllPostSlugs(locale)) {
      paths.push({ params: { slug }, locale });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = (async ({ params, locale }) => {
  const resolved = getLocale(locale);
  const slug = String(params?.slug ?? "");
  const post = await getPostBySlug(resolved, slug);
  if (!post) return { notFound: true };

  const allPosts = getAllPosts(resolved);
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aOverlap = (a.tags ?? []).filter((t) => (post.tags ?? []).includes(t)).length;
      const bOverlap = (b.tags ?? []).filter((t) => (post.tags ?? []).includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, 3);

  return {
    props: {
      ...getI18nProps(locale),
      post,
      related,
    },
  };
}) satisfies GetStaticProps;

export default function BlogPostPage({
  translations,
  locale,
  post,
  related,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = buildI18n(locale, translations);

  const postUrl = `${SITE.domain}${localizedPath("blog", locale)}/${post.slug}`;
  const alternates: Array<{ hrefLang: string; href: string }> = SITE.locales.map(
    (loc: Locale) => ({
      hrefLang: loc,
      href: `${SITE.domain}${localizedPath("blog", loc)}/${post.slug}`,
    }),
  );
  alternates.push({
    hrefLang: "x-default",
    href: `${SITE.domain}${localizedPath("blog", "fr")}/${post.slug}`,
  });

  return (
    <>
      <Seo
        title={`${post.title} — ${t("blog.meta.title")}`}
        description={post.description}
        pageKey="blog"
        locale={locale}
        image={post.cover}
        ogType="article"
        articlePublishedTime={post.date}
        articleTags={post.tags}
        canonicalOverride={postUrl}
        alternatesOverride={alternates}
        jsonLd={[
          breadcrumbJsonLd([
            { name: t("common.home"), path: localizedPath("home", locale) },
            { name: t("blog.breadcrumb"), path: localizedPath("blog", locale) },
            { name: post.title, path: `${localizedPath("blog", locale)}/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.description,
            slug: post.slug,
            locale,
            date: post.date,
            author: post.author,
            cover: post.cover,
            tags: post.tags,
          }),
        ]}
      />
      <BlogArticle post={post} related={related} />
    </>
  );
}
