import { nameToTitle } from "@/lib/utils";
import {
  ConditionalProperty,
  defineArrayMember,
  defineField,
  defineType,
  Rule,
  StringRule,
  ValidationBuilder,
  type DocumentDefinition,
} from "sanity";

export function internalTitle({
  group,
  initialValue,
  name = "internalTitle",
  title,
}: {
  group?: string;
  initialValue?: string;
  name?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "string",
    group,
    initialValue,
  });
}

export function string({
  name = "string",
  group,
  initialValue,
  title,
  validation,
  is,
}: {
  name?: string;
  group?: string;
  initialValue?: string;
  title?: string;
  validation?: ValidationBuilder<StringRule, string>;
  is?: "email";
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "string",
    group,
    initialValue,
    validation:
      validation || (is === "email" ? (Rule) => Rule.email() : undefined),
  });
}

export function title({
  group,
  initialValue,
  name = "title",
  title,
}: {
  group?: string;
  initialValue?: string;
  name?: string;
  title?: string;
} = {}) {
  return string({ name, group, initialValue, title });
}

export function language({
  group,
  hidden = true,
  initialValue = "no",
  name = "language",
  title,
}: {
  group?: string;
  hidden?: boolean;
  initialValue?: string;
  name?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "string",
    group,
    hidden,
    initialValue,
  });
}

export function image({
  name = "image",
  group,
  hotspot = true,
  title,
}: {
  name?: string;
  group?: string;
  hotspot?: boolean;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "image",
    group,
    options: {
      hotspot,
    },
  });
}

export function youtubeVideo({
  name = "video",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "youtubeVideo",
    group,
  });
}

export function slug({
  name = "slug",
  group,
  source,
  title,
}: {
  name?: string;
  group?: string;
  source?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "slug",
    group,
    options: {
      source,
    },
  });
}

export function choice({
  name = "variant",
  group,
  options,
  initialValue,
  title,
}: {
  name?: string;
  group?: string;
  options: string[] | { title: string; value: string }[];
  initialValue?: string;
  title?: string;
}) {
  const _initialValue = !initialValue
    ? typeof options[0] === "string"
      ? options[0]
      : options[0].value
    : initialValue;
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "string",
    group,
    options: {
      list: options,
    },
    initialValue: _initialValue,
  });
}

export function url({
  name = "url",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "url",
    group,
  });
}

export function seo({
  name = "seo",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "seo",
    group,
  });
}

export function portableText({
  name = "content",
  group,
  title,
  type = "simple",
}: {
  name?: string;
  group?: string;
  title?: string;
  type?: "simple" | "builder" | "full";
} = {}) {
  const typeMap = {
    simple: "simpleBlockContent",
    builder: "builderBlockContent",
    full: "defaultBlockContent",
  };

  return defineField({
    name,
    title: title || nameToTitle(name),
    type: typeMap[type],
    group,
  });
}

export function simpleBlockContent({
  name = "content",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "simpleBlockContent",
    group,
  });
}

export function sectionId({
  name = "sectionId",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "string",
    group,
  });
}

export function pageBuilder({
  name = "pageBuilder",
  group,
  hidden,
  title,
}: {
  name?: string;
  group?: string;
  hidden?: ConditionalProperty;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "pageBuilder",
    group,
    hidden,
  });
}

export function buttons({
  name = "links",
  group,
  title,
}: {
  name?: string;
  group?: string;
  title?: string;
} = {}) {
  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "array",
    group,
    of: [defineArrayMember({ type: "button" })],
  });
}

export const BLOCK_ANNOTATIONS = [
  {
    name: "internalLink",
    type: "internalLink",
    title: "Internal Link",
  },
  {
    name: "externalLink",
    type: "externalLink",
    title: "External Link",
  },

  {
    name: "fileLink",
    type: "fileLink",
    title: "File Link",
  },
  {
    name: "anchorLink",
    type: "anchorLink",
    title: "Anchor Link",
  },
];

export function reference({
  name,
  group,
  title,
  to = [],
  isArray = false,
  hidden,
}: {
  name: string;
  group?: string;
  title?: string;
  to?: string[] | string;
  isArray?: boolean;
  hidden?: ConditionalProperty;
}) {
  const types = Array.isArray(to)
    ? to.map((type) => ({ type }))
    : [{ type: to }];

  if (isArray) {
    return defineField({
      name,
      title: title || nameToTitle(name),
      type: "array",
      group,
      of: [defineArrayMember({ type: "reference", to: types })],
      hidden,
    });
  }

  return defineField({
    name,
    title: title || nameToTitle(name),
    type: "reference",
    group,
    to: types,
    hidden,
  });
}

export type DefineResourceArgs = Omit<DocumentDefinition, "type">;

export function defineResource(args: DefineResourceArgs) {
  const _title = args.title || nameToTitle(args.name);

  return defineType({
    ...args,
    name: args.name,
    title: _title,
    type: "document",
    icon: args.icon,
    groups: [
      {
        title: "Content",
        name: "content",
        default: true,
      },
      {
        title: "SEO",
        name: "seo",
      },
      ...(args.groups ?? []),
    ],
    fields: [
      language(),
      title({ group: "content" }),
      slug({ group: "content", source: "title" }),
      ...args.fields,
      seo({ group: "seo" }),
    ],
  });
}
