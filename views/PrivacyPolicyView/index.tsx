import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from 'components/system/Container';

const PrivacyPolicyView: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '1rem',
        }}
      >
        <Typography variant="h1">Politique de confidentialité</Typography>
      </Box>
      <Box sx={{ whiteSpace: 'break-spaces' }}>
        {
          'Rappel sur le RGPD\n\nDepuis le 25 mai 2018, la loi « Informatique et Libertés » a évolué, avec l’entrée en vigueur du nouveau Règlement Général sur la Protection des Données personnelles.\n\nL’utilisation et la sécurisation de vos données à caractère personnel sont encadrées. Le règlement en assure une meilleure protection.\nNous sommes conscients de l’importance que représente le respect de la confidentialité à vos yeux.\n\nC’est pourquoi, nous souhaitons être les plus transparents concernant nos modalités de collecte, d’utilisation et de stockage de vos informations personnelles.\n\n\nQUELLES SONT LES DONNÉES COLLECTÉES ? \n\nDonnées que vous nous fournissez :\nFormulaires de demande de devis : lors du remplissage  sont collectés vos nom, prénom, adresse électronique, adresse, numéro de téléphone et message. \nLa finalité de cette collecte est de rentrer en contact avec vous et vous répondre.\nFormulaire de commande produit: : lors du remplissage sont collectés vos nom, prénom, adresse électronique, adresse, numéro de téléphone et message. \nLa finalité de cette collecte est  la gestion de l’exécution de vos commandes ainsi que la gestion du paiement des commandes.\nL’exécution du contrat entre vous et nous est la base juridique de ce traitement.\nLa base légale de ce traitement est l’Article 6(1)(b) du Règlement général sur la protection des données (RGPD).\n\nDonnées que nous recueillons\nSur notre site web : nous ne collecterons aucune donnée personnelle vous concernant (par exemple votre nom, adresse, numéro de téléphone ou adresse e-mail), à moins que vous ne choisissiez volontairement de nous les communiquer (par exemple, par le biais de notre formulaire de commande), que vous ne donniez votre accord ou que la réglementation applicable en matière de protection de données personnelles ne nous y autorise. \nLes cookies : voir notre politique COOKIES\n\nUTILISATION DE VOS DONNÉES\nNous utilisons les informations que vous nous transmettez pour répondre à vos questions, traiter vos commandes.\nDe plus, afin de renforcer notre relation commerciale, nous pouvons être amenés à :\nTraiter les données personnelles pour mieux comprendre vos besoins et la manière dont nous pouvons améliorer nos produits et nos services.\n\nBien entendu, à tout moment vous pouvez nous contacter (frank@sonaura.fr) si vous ne souhaitez pas que vos données personnelles soient collectées pour rester en contact.\n\n\n\nPROTECTION DE VOS DONNÉES\nOn s’engage à protéger vos données personnelles. Nous ne procédons pas à la vente, location ou encore à des transferts de base de données à des entreprises tierces.\nAucune de vos données ne sont envoyées à l’internationale.\n\nPartenaires commerciaux :\nCertaines données que nous collectons sont accessibles à nos prestataires de services, agissant en qualité de sous-traitants ou qui concourent administrativement ou techniquement à la réalisation de nos services.\n\nSont notamment concernés :\n\nNotre prestataire d’édition de site web qui n’utilise ou ne conserve aucune donnée personnelle\n\n \n\nCONSERVATION DES DONNÉES\nNous ne conserverons vos données personnelles que pendant la durée nécessaire aux fins de la collecte. \nCela signifie que les données seront détruites ou supprimées de nos systèmes lorsqu’elles ne seront plus nécessaires. \n\nVOS DROITS \nConformément aux dispositions légales et réglementaires applicables, en particulier la loi no 78-17 du 6 janvier 1978 modifiée relative à l’informatique, aux fichiers et aux libertés et le règlement européen 2016/679 du 27 avril 2016 (applicable dès le 25 mai 2018), vous disposez des droits suivants :\nExercer votre droit d’accès, pour connaître les données personnelles qui vous concernent. \nDemander la mise à jour de vos données, si celles-ci sont inexactes. \nDemander la portabilité ou la suppression de vos données. \nDemander la limitation du traitement de vos données. \nVous opposer, pour des motifs légitimes, au traitement de vos données. \nVous opposer ou retirer votre consentement à l’utilisation par nos services de vos coordonnées pour l’envoi de nos promotions, sollicitations via courriers électroniques, appels téléphoniques et courriers postaux.\n\n\nVous pouvez exercer vos droits,\n\nsoit par courriel : frank@sonaura.fr ou par courrier postal à l’adresse suivante :\n\nSonaura\nM. Frank VILIN\n3527, Route des Coulmes\n38470 MALLEVAL-EN-VERCORS\nTel : 04 76 47 49 93\n\n \n\nPour toute information complémentaire ou réclamation, vous pouvez contacter la Commission nationale de l’informatique et des libertés (plus d’informations sur www.cnil.fr).'
        }
      </Box>
    </Container>
  );
};

export default PrivacyPolicyView;
