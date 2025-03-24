import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={'flex flex-col gap-8 p-6 max-w-7xl m-auto'}>
      <h1 className={'text-3xl text-center'}>Politique de confidentialité</h1>

      <div className={'flex flex-col gap-8'}>
        <section className={'flex flex-col gap-4'}>
          <h1 className="text-2xl font-bold">Rappel sur le RGPD</h1>
          <p>
            {
              'Depuis le 25 mai 2018, la loi « Informatique et Libertés » a évolué, avec l’entrée en vigueur du nouveau Règlement Général sur la Protection des Données personnelles.'
            }
          </p>
          <p>
            {
              'L’utilisation et la sécurisation de vos données à caractère personnel sont encadrées. Le règlement en assure une meilleure protection. Nous sommes conscients de l’importance que représente le respect de la confidentialité à vos yeux.'
            }
          </p>
          <p>
            C’est pourquoi, nous souhaitons être les plus transparents
            concernant nos modalités de collecte, d’utilisation et de stockage
            de vos informations personnelles.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            Quelles sont les données collectées ?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Données que vous nous fournissez : </strong> Formulaires
              de demande de devis : lors du remplissage sont collectés vos nom,
              prénom, adresse électronique, adresse, numéro de téléphone et
              message. La finalité de cette collecte est de rentrer en contact
              avec vous et vous répondre. Formulaire de commande produit: : lors
              du remplissage sont collectés vos nom, prénom, adresse
              électronique, adresse, numéro de téléphone et message. La finalité
              de cette collecte est la gestion de l’exécution de vos commandes
              ainsi que la gestion du paiement des commandes. L’exécution du
              contrat entre vous et nous est la base juridique de ce traitement.
              La base légale de ce traitement est l’Article 6(1)(b) du Règlement
              général sur la protection des données (RGPD).
            </li>
            <li>
              <strong>Données que nous recueillons : </strong> Sur notre site
              web : nous ne collecterons aucune donnée personnelle vous
              concernant (par exemple votre nom, adresse, numéro de téléphone ou
              adresse e-mail), à moins que vous ne choisissiez volontairement de
              nous les communiquer (par exemple, par le biais de notre
              formulaire de commande), que vous ne donniez votre accord ou que
              la réglementation applicable en matière de protection de données
              personnelles ne nous y autorise. Les cookies : voir notre
              politique COOKIES
            </li>
          </ul>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">Utilisation de vos données</h2>
          <p>
            Nous utilisons les informations que vous nous transmettez pour
            répondre à vos questions, traiter vos commandes. De plus, afin de
            renforcer notre relation commerciale, nous pouvons être amenés à :
            Traiter les données personnelles pour mieux comprendre vos besoins
            et la manière dont nous pouvons améliorer nos produits et nos
            services.
          </p>
          <p>
            Bien entendu, à tout moment vous pouvez nous contacter
            (frank@sonaura.fr) si vous ne souhaitez pas que vos données
            personnelles soient collectées pour rester en contact.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">Protection de vos données</h2>
          <p>
            On s’engage à protéger vos données personnelles. Nous ne procédons
            pas à la vente, location ou encore à des transferts de base de
            données à des entreprises tierces. Aucune de vos données ne sont
            envoyées à l’internationale.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Partenaires commerciaux : </strong> Certaines données que
              nous collectons sont accessibles à nos prestataires de services,
              agissant en qualité de sous-traitants ou qui concourent
              administrativement ou techniquement à la réalisation de nos
              services.
            </li>
            <li>
              <strong>Sont notamment concernés : </strong> Notre prestataire
              d’édition de site web qui n’utilise ou ne conserve aucune donnée
              personnelle
            </li>
          </ul>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">Conservation des données</h2>
          <p>
            Nous ne conserverons vos données personnelles que pendant la durée
            nécessaire aux fins de la collecte.
          </p>
          <p>
            Cela signifie que les données seront détruites ou supprimées de nos
            systèmes lorsqu’elles ne seront plus nécessaires.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">Vos droits</h2>
          <p>
            Conformément aux dispositions légales et réglementaires applicables,
            en particulier la loi no 78-17 du 6 janvier 1978 modifiée relative à
            l’informatique, aux fichiers et aux libertés et le règlement
            européen 2016/679 du 27 avril 2016 (applicable dès le 25 mai 2018),
            vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Exercer votre droit d’accès, pour connaître les données
              personnelles qui vous concernent.
            </li>
            <li>
              Demander la mise à jour de vos données, si celles-ci sont
              inexactes.
            </li>
            <li>Demander la portabilité ou la suppression de vos données.</li>
            <li>Demander la limitation du traitement de vos données.</li>
            <li>
              Vous opposer, pour des motifs légitimes, au traitement de vos
              données.
            </li>
            <li>
              Vous opposer ou retirer votre consentement à l’utilisation par nos
              services de vos coordonnées pour l’envoi de nos promotions,
              sollicitations via courriers électroniques, appels téléphoniques
              et courriers postaux.
            </li>
          </ul>
          <p>Vous pouvez exercer vos droits,</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Soit par courriel électronique</strong> : frank@sonaura.fr
            </li>
            <li>
              <strong>
                {"Soit par courrier postal à l'adresse suivante :"}
              </strong>
              <br />
              SONAURA
              <br /> M. Frank VILIN
              <br />
              3527, Route des Coulmes
              <br />
              38470 MALLEVAL-EN-VERCORS
              <br />
              Tel : 04 76 47 49 93
            </li>
          </ul>
        </section>
        <section className={'flex flex-col gap-4'}>
          <p>
            Pour toute information complémentaire ou réclamation, vous pouvez
            contacter la Commission nationale de l’informatique et des libertés
            (plus d’informations sur www.cnil.fr).
          </p>
        </section>
      </div>
    </div>
  );
}
