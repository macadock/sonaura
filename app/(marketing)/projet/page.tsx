import { HeroImage } from '@/components/marketing/hero-image';
import { ContactForm } from '@/components/marketing/contact-form';

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
        <ContactForm />
      </div>
    </div>
  );
}
