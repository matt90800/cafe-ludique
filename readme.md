#Créer une clé SSL et l'ajouter en format PKCS#12 à Firefox :

-Ouvrez un terminal bash.

    Déplacez vous avec cd jusqu'à la racine de votre projet.

-Générez une paire de clés privées/publiques à l'aide de la commande keytool :

    keytool -genkeypair -alias localJson -keyalg RSA -keysize 2048 -validity 365 -keystore mykeystore.jks

ou openssl(non testé) :

    openssl req -x509 -newkey rsa:4096 -keyout localJson.key -out localJson.crt -days 365


Répondez aux questions que vous serez invité à fournir pour remplir les informations de la demande de certificat.

Executez la commande suivante si vous souhaitez lire  les clés.

    keytool -list -v -keystore mykeystore.jks



Créez un fichier PKCS#12 à partir de la clé privée et du certificat avec la commande keytool :

    keytool -importkeystore -srckeystore mykeystore.jks -destkeystore localJson.p12 -deststoretype PKCS12

ou openssh(non testé)

    openssl pkcs12 -export -out localJson.p12 -inkey localJson.key -in localJson.crt

Vous serez invité à fournir un mot de passe pour le fichier PKCS#12, assurez-vous de le noter car vous en aurez besoin pour importer le certificat dans Firefox.

Ouvrez Firefox et allez dans les paramètres de sécurité en tapant  

    about:preferences#privacy

dans la barre d'adresse.

Sous "Certificats", cliquez sur "Vos certificats".

Cliquez sur "Importer" pour ouvrir l'assistant d'importation de certificat.

Sélectionnez le fichier localJson.p12 que vous avez créé précédemment.

Entrez le mot de passe que vous avez défini lors de la création du fichier PKCS#12.

<!-- Cochez les cases "Confiance pour identifier les sites web" et "Confiance pour identifier les utilisateurs de messagerie". -->

Cliquez sur "OK" pour terminer l'importation.

Cliquez sur "Serveurs" puis "Ajouter une exception..." pour ouvrir l'assistant d'exception.
Tapez l'URL du site :

    https://localhost:8443
    
Puis cliquez sur "Obtenir le certificat"
Confirmez pour fermer la fenetre.

Votre certificat est maintenant prêt à être utilisé avec Firefox.

N'oubliez pas que ce certificat n'est pas émis par une autorité de certification publique, donc il ne sera pas reconnu comme valide par tous les navigateurs et applications. Il est destiné à être utilisé uniquement à des fins de développement et de test en local.





#Compiler un fichier WAR via la ligne de commande

Ce guide explique comment compiler un fichier WAR via la ligne de commande en utilisant l'outil "jar" fourni avec la JDK de Java.
Étapes

    Assurez-vous que votre application web est configurée correctement et qu'elle contient tous les fichiers nécessaires. En particulier, vous devez avoir un fichier "web.xml" dans le dossier "WEB-INF" de votre application, ainsi que toutes les classes et bibliothèques nécessaires.

    Ouvrez une invite de commande ou un terminal et accédez au dossier racine de votre application web.

    Utilisez la commande "jar" pour créer le fichier WAR. Voici la syntaxe de base :

jar -cvf NomFichier.war *

    "jar" est le nom de l'outil.
    "-c" indique que nous allons créer un nouveau fichier JAR.
    "-v" indique que nous voulons afficher des informations détaillées sur les fichiers ajoutés au fichier WAR.
    "-f" indique que nous allons spécifier un nom de fichier pour le fichier WAR.
    "NomFichier.war" est le nom que vous souhaitez donner à votre fichier WAR.
    "*" indique que nous voulons inclure tous les fichiers du dossier courant dans le fichier WAR.

Par exemple, si votre application web est dans un dossier nommé "MonApp" et que vous souhaitez créer un fichier WAR nommé "MonApp.war", vous pouvez utiliser la commande suivante :

    jar -cvf MonApp.war MonApp/*

    Cette commande créera un fichier WAR nommé "MonApp.war" qui contient tous les fichiers du dossier "MonApp".

    Attendez que la commande "jar" se termine et vérifiez que le fichier WAR a été créé avec succès.

Vous pouvez maintenant déployer votre fichier WAR sur un serveur d'applications Java EE pour exécuter votre application web.
	