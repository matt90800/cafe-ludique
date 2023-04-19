Voici un guide pour créer une clé SSL et l'ajouter en format PKCS#12 à Firefox :

-Ouvrez un terminal bash.

-Générez une paire de clés privées/publiques à l'aide de la commande openssl :

    openssl req -x509 -newkey rsa:4096 -keyout localJson.key -out localJson.crt -days 365

Répondez aux questions que vous serez invité à fournir pour remplir les informations de la demande de certificat.

Créez un fichier PKCS#12 à partir de la clé privée et du certificat avec la commande openssl :

    openssl pkcs12 -export -out localJson.p12 -inkey localJson.key -in localJson.crt

Vous serez invité à fournir un mot de passe pour le fichier PKCS#12, assurez-vous de le noter car vous en aurez besoin pour importer le certificat dans Firefox.

Ouvrez Firefox et allez dans les paramètres de sécurité en tapant "about:preferences#privacy" dans la barre d'adresse.

Sous "Certificats", cliquez sur "Afficher les certificats".

Cliquez sur "Importer" pour ouvrir l'assistant d'importation de certificat.

Sélectionnez le fichier localJson.p12 que vous avez créé précédemment.

Entrez le mot de passe que vous avez défini lors de la création du fichier PKCS#12.

Cochez les cases "Confiance pour identifier les sites web" et "Confiance pour identifier les utilisateurs de messagerie".

Cliquez sur "OK" pour terminer l'importation.

Votre certificat est maintenant prêt à être utilisé avec Firefox.

N'oubliez pas que ce certificat n'est pas émis par une autorité de certification publique, donc il ne sera pas reconnu comme valide par tous les navigateurs et applications. Il est destiné à être utilisé uniquement à des fins de développement et de test en local.