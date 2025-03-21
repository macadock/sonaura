import { ProjectForm } from '@/app/(marketing)/projet/components/project-form';
import { HeroImage } from '@/components/marketing/hero-image';

export default function ProjectPage() {
  return (
    <div className={'flex flex-col gap-4'}>
      <HeroImage
        title={
          <h1 className={'text-4xl md:text-6xl font-medium'}>
            Votre projet sur mesure
          </h1>
        }
        subtitle={
          <p className={'text-lg md:text-xl'}>
            {
              "Laissez - nous vos coordonnées et nos équipes d'expert vous contacterons."
            }
          </p>
        }
        image={{
          url: '/assets/image/projet/hero_projet.webp',
        }}
      />
      <div className={'w-full max-w-7xl m-auto p-8'}>
        <ProjectForm />
      </div>
    </div>
  );
}
