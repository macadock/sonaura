import { Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Items = [
  {
    href: '/mentions-legales',
    title: 'Mentions légales',
  },
  {
    href: '/politique-de-confidentialite',
    title: 'Politique de confidentialité',
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col justify-center items-center md:items-stretch gap-6 p-8 border-t mt-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center md:justify-between max-w-7xl m-auto md:w-full">
        <Image src="/logos/logo.svg" alt="Sonaura" width="130" height="130" />
        <nav className="flex flex-col md:flex-row items-center text-sm gap-4">
          {Items.map(({ href, title }) => (
            <a key={title} href={href}>
              <p>{title}</p>
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-3 text-xs text-center md:px-20">
        <div className="flex gap-2 items-center justify-center">
          <Link href="https://www.instagram.com/sonaura.fr/" target="_blank">
            <Instagram
              strokeWidth={'0.0625rem'}
              className="text-primary"
              size={'2rem'}
            />
          </Link>
          <Link
            href="http://www.linkedin.com/in/bang-olufsen-auvergne-rhône-alpes-sonaura-a994b2226"
            target="_blank"
          >
            <Linkedin
              strokeWidth={'0.0625rem'}
              className="text-primary"
              size={'2rem'}
            />
          </Link>
        </div>
        <p>{`© Sonaura. ${year}, Tous droits réservés`}</p>
        <p>
          Lorsque vous visitez ou interagissez avec notre site, nous ou nos
          prestataires peuvent utiliser des cookies pour stocker des
          informations afin de vous offrir une expérience plus agréable.
        </p>
      </div>
    </footer>
  );
};
