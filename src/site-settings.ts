import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import { z } from "astro/zod";

const text = z.string().trim().min(1);
const link = z
  .object({
    label: text,
    href: z
      .string()
      .regex(
        /^(\/(?!\/)|https?:\/\/|mailto:)/,
        "链接必须是站内路径、HTTP(S) 或邮件地址"
      ),
  })
  .strict();
const schema = z
  .object({
    site: z
      .object({
        title: text,
        author: text,
        description: text,
        url: z.url(),
        base: z
          .string()
          .regex(/^\/(?:[a-zA-Z0-9_-]+\/?)*$/)
          .default("/"),
        lang: text,
        timezone: text,
      })
      .strict(),
    home: z
      .object({
        eyebrow: text,
        title: text,
        description: text,
        categoriesTitle: text,
        recentTitle: text,
      })
      .strict(),
    navigation: z
      .object({
        subtitle: text,
        links: z.array(link),
        secondaryLinks: z.array(link),
      })
      .strict(),
    categories: z
      .array(
        z
          .object({
            id: z
              .string()
              .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "栏目 id 只能使用小写字母、数字和连字符"
              ),
            title: text,
            description: text,
          })
          .strict()
      )
      .min(1)
      .refine(
        items => new Set(items.map(item => item.id)).size === items.length,
        "栏目 id 不能重复"
      ),
    posts: z
      .object({
        perPage: z.number().int().min(1).max(100),
        perIndex: z.number().int().min(1).max(100),
      })
      .strict(),
    categoryPage: z.object({ emptyText: text, moreLabel: text }).strict(),
    footer: z
      .object({
        copyrightStart: z.number().int().min(2000).max(9999),
        searchLabel: text,
      })
      .strict(),
  })
  .strict();

// 构建时读取唯一的配置文件；错误会终止构建，避免发布错误配置。
export const siteSettings = schema.parse(
  parse(readFileSync(resolve(process.cwd(), "site.yaml"), "utf8"))
);
