import { HeroTextSchema } from '@/features/custom-components/components/Hero/HeroText/schema';
import zod from 'zod';
import { CSSProperties } from 'react';

export type HeroTextProps = {
  content: zod.infer<typeof HeroTextSchema>;
  isPreview?: boolean;
};

export const HeroText = ({ content }: HeroTextProps) => {
  const parse = HeroTextSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }

  const { title, subtitle, fullHeight = false, showContact = false } = content;

  return (
    <div
      style={{
        height: fullHeight ? 'calc(100vh - var(--headerHeight))' : undefined,
      }}
      className="flex flex-col items-center justify-center gap-6 px-6 py-12 text-center"
    >
      <h1 className="text-4xl font-semibold">{title}</h1>
      {subtitle && <p className="text-xl font-light">{subtitle}</p>}
      {showContact && <div className="flex flex-col">
        <p>Frank VILIN</p>
        <a className="text-primary" href="tel:+33689210978">
          06 89 21 09 78
        </a>
        <a className="text-primary" href="mailto:frank@sonaura.fr">
          frank@sonaura.fr
        </a>
      </div>}
    </div>
  );
};
