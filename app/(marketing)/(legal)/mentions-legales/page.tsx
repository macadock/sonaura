import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
};

export default function LegalNoticePage() {
  return (
    <div className={'flex flex-col gap-8 p-6 max-w-7xl m-auto'}>
      <h1 className={'text-3xl text-center'}>Mentions légales</h1>

      <div className={'flex flex-col gap-8'}>
        <section className={'flex flex-col gap-4'}>
          <h1 className="text-2xl font-bold">1. Présentation du site.</h1>
          <p>
            {
              "En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site sonaura.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :"
            }
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Propriétaire :</strong> SONAURA - 3527, Route des Coulmes,
              38470 MALLEVAL-EN-VERCORS - Siret: 80212259800039 - 802 122 598
              R.C.S. Grenoble - SARL - 04 72 41 74 03
            </li>
            <li>
              <strong>Créateur :</strong> BARRIERE Mathieu
            </li>
            <li>
              <strong>Responsable publication :</strong> M. VILIN Frank –
              frank@sonaura.fr
            </li>
            <li>
              <strong>Webmaster :</strong> BARRIERE Mathieu – tech@barriere.me
            </li>
            <li>
              <strong>Hébergeur :</strong> Vercel Inc. - 340 S Lemon Ave #4133 -
              Walnut, CA 91789 <br /> Contenu hébergé en Europe.
            </li>
          </ul>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            2. Conditions générales d’utilisation du site et des services
            proposés.
          </h2>
          <p>
            L’utilisation du site sonaura.fr implique l’acceptation pleine et
            entière des conditions générales d’utilisation ci-après décrites.
            Ces conditions d’utilisation sont susceptibles d’être modifiées ou
            complétées à tout moment, les utilisateurs du site sont donc invités
            à les consulter de manière régulière.
          </p>
          <p>
            Ce site est normalement accessible à tout moment aux utilisateurs.
            Une interruption pour raison de maintenance technique peut être
            toutefois décidée par SONAURA, qui s’efforcera alors de communiquer
            préalablement les dates et heures de l’intervention.
          </p>
          <p>
            Le site est mis à jour régulièrement par M. Vilin. De la même façon,
            les mentions légales peuvent être modifiées à tout moment : elles
            s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le
            plus souvent possible afin d’en prendre connaissance.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            3. Description des services fournis.
          </h2>
          <p>
            Le site sonaura.fr a pour objet de fournir une information
            concernant l’ensemble des activités de la société.
          </p>
          <p>
            SONAURA s’efforce de fournir des informations aussi précises que
            possible. Toutefois, il ne pourra être tenu responsable des
            omissions, des inexactitudes et des carences dans la mise à jour,
            qu’elles soient de son fait ou de celui des tiers partenaires qui
            lui fournissent ces informations.
          </p>
          <p>
            Toutes les informations sont données à titre indicatif, et sont
            susceptibles d’évoluer. Les renseignements figurant sur le site ne
            sont pas exhaustifs et peuvent être modifiés depuis leur mise en
            ligne.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            4. Limitations contractuelles sur les données techniques.
          </h2>
          <p>Le site utilise la technologie JavaScript.</p>
          <p>
            Le site ne pourra être tenu responsable de dommages matériels liés à
            l’utilisation du site. De plus, l’utilisateur du site s’engage à
            accéder au site en utilisant un matériel récent, ne contenant pas de
            virus, et avec un navigateur de dernière génération, mis à jour.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            5. Propriété intellectuelle et contrefaçons.
          </h2>
          <p>
            SONAURA est propriétaire des droits de propriété intellectuelle ou
            détient les droits d’usage sur tous les éléments accessibles sur le
            site, notamment les textes, images, graphismes, logo, icônes, sons,
            logiciels.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable de : SONAURA.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l’un quelconque des
            éléments qu’il contient sera considérée comme constitutive d’une
            contrefaçon et poursuivie conformément aux dispositions des articles
            L.335-2 et suivants du Code de Propriété Intellectuelle.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            6. Limitations de responsabilité.
          </h2>
          <p>
            SONAURA ne pourra être tenue responsable des dommages directs et
            indirects causés au matériel de l’utilisateur, lors de l’accès au
            site sonaura.fr, et résultant soit de l’utilisation d’un matériel ne
            répondant pas aux spécifications indiquées au point 4, soit de
            l’apparition d’un bug ou d’une incompatibilité.
          </p>
          <p>
            SONAURA ne pourra également être tenue responsable des dommages
            indirects (tels par exemple qu’une perte de marché ou perte d’une
            chance) consécutifs à l’utilisation du site sonaura.fr.
          </p>
          <p>
            Des espaces interactifs (possibilité de poser des questions dans
            l’espace contact) sont à la disposition des utilisateurs. SONAURA se
            réserve le droit de supprimer, sans mise en demeure préalable, tout
            contenu déposé dans cet espace qui contreviendrait à la législation
            applicable en France, en particulier aux dispositions relatives à la
            protection des données. Le cas échéant, SONAURA se réserve également
            la possibilité de mettre en cause la responsabilité civile et/ou
            pénale de l’utilisateur, notamment en cas de message à caractère
            raciste, injurieux, diffamant, ou pornographique, quel que soit le
            support utilisé (texte, photographie…).
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            7. Gestion des données personnelles.
          </h2>
          <p>
            {
              "En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995."
            }
          </p>
          <p>
            {
              "A l'occasion de l'utilisation du site sonaura.fr, peuvent êtres recueillies : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site sonaura.fr, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur."
            }
          </p>
          <p>
            {
              "En tout état de cause SONAURA ne collecte des informations personnelles relatives à l'utilisateur que pour le besoin de certains services proposés par le site sonaura.fr. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site sonaura.fr l’obligation ou non de fournir ces informations."
            }
          </p>
          <p>
            Conformément aux dispositions des articles 38 et suivants de la loi
            78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et
            aux libertés, tout utilisateur dispose d’un droit d’accès, de
            rectification et d’opposition aux données personnelles le
            concernant, en effectuant sa demande écrite et signée, accompagnée
            d’une copie du titre d’identité avec signature du titulaire de la
            pièce, en précisant l’adresse à laquelle la réponse doit être
            envoyée.
          </p>
          <p>
            {
              "Aucune information personnelle de l'utilisateur du site sonaura.fr n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat de SONAURA et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site sonaura.fr."
            }
          </p>
          <p>
            Le site susnommé est dispensé de déclaration à la CNIL selon la
            dispense DI-008.
          </p>
          <p>
            Texte officiel: Délibération n°2010-229 du 10/06/2010 dispensant de
            déclaration les traitements automatisés de données à caractère
            personnel mis en oeuvre par des organismes à but non lucratif,
            abrogeant et remplaçant la délibération n°2006-130 du 9 mai 2006
          </p>
          <p>
            Les bases de données sont protégées par les dispositions de la loi
            du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996
            relative à la protection juridique des bases de données.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            8. Liens hypertextes et cookies.
          </h2>
          <p>
            Le site sonaura.fr contient un certain nombre de liens hypertextes
            vers d’autres sites, mis en place avec l’autorisation de SONAURA.
            Cependant, SONAURA n’a pas la possibilité de vérifier le contenu des
            sites ainsi visités, et n’assumera en conséquence aucune
            responsabilité de ce fait.
          </p>
          <p>
            La navigation sur le site sonaura.fr est susceptible de provoquer
            l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un
            cookie est un fichier de petite taille, qui ne permet pas
            l’identification de l’utilisateur, mais qui enregistre des
            informations relatives à la navigation d’un ordinateur sur un site.
            Les données ainsi obtenues visent à faciliter la navigation
            ultérieure sur le site, et ont également vocation à permettre
            diverses mesures de fréquentation.
          </p>

          <p>
            Le refus d’installation d’un cookie peut entraîner l’impossibilité
            d’accéder à certains services. L’utilisateur peut toutefois
            configurer son ordinateur de la manière suivante, pour refuser
            l’installation des cookies :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Internet Explorer : onglet outil (pictogramme en forme de rouage
              en haut a droite) / options internet. Cliquez sur Confidentialité
              et choisissez Bloquer tous les cookies. Validez sur Ok.
            </li>
            <li>
              {
                "Firefox : en haut de la fenêtre du navigateur, cliquez sur le bouton Firefox, puis aller dans l'onglet Options. Cliquer sur l'onglet Vie privée. Paramétrez les Règles de conservation sur : utiliser les paramètres personnalisés pour l'historique. Enfin décochez-la pour désactiver les cookies."
              }
            </li>
            <li>
              {
                "Safari : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par un rouage). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section 'Confidentialité', cliquez sur Paramètres de contenu. Dans la section 'Cookies', vous pouvez bloquer les cookies."
              }
            </li>
            <li>
              {
                "Chrome : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par trois lignes horizontales). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section 'Confidentialité', cliquez sur préférences. Dans l'onglet 'Confidentialité', vous pouvez bloquer les cookies."
              }
            </li>
          </ul>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            9. Droit applicable et attribution de juridiction.
          </h2>
          <p>
            Tout litige en relation avec l’utilisation du site
            http://www.sonaura.fr est soumis au droit français. Il est fait
            attribution exclusive de juridiction aux tribunaux compétents de
            Paris.
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">
            10. Les principales lois concernées.
          </h2>
          <p>
            {
              "Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés."
            }
          </p>
          <p>
            {
              "Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
            }
          </p>
        </section>

        <section className={'flex flex-col gap-4'}>
          <h2 className="text-2xl font-bold">11. Lexique.</h2>
          <p>
            Utilisateur : Internaute se connectant, utilisant le site susnommé.
          </p>
          <p>
            {
              "Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978)."
            }
          </p>
        </section>
      </div>
    </div>
  );
}
