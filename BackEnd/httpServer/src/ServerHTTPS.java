import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.TrustManagerFactory;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.CertificateException;

public abstract class ServerHTTPS extends HttpsServer implements Server {

    public static HttpsServer create(int port,Path filePath,String fileType) throws IOException, KeyStoreException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException, KeyManagementException {


        // Configuration du keystore et du mot de passe du keystore
        char[] keystorePassword = "azerty".toCharArray();
        KeyStore keystore = KeyStore.getInstance("JKS");
        Path path = Paths.get("mykeystore.jks");

        keystore.load(Files.newInputStream(path), keystorePassword);

        //JOptionPane.showMessageDialog(null, "Merci de vérifier le certificat SSL 'mykeystore.jks' dans le dossier contenant le '.JAR'");
        // Configuration du KeyManager pour le serveur HTTPS
        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyManagerFactory.init(keystore, keystorePassword);

        // Configuration du TrustManager pour le serveur HTTPS
        TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        trustManagerFactory.init(keystore);

        // Configuration du SSLContext avec le KeyManager et le TrustManager
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);

        // Création d'un serveur HTTPS sur le port 8443
        HttpsServer server = HttpsServer.create(new InetSocketAddress(port), 0);

        // Configuration de l'HttpsConfigurator pour le serveur HTTPS
        SSLParameters sslParams = sslContext.getDefaultSSLParameters();
        HttpsConfigurator httpsConfigurator = new HttpsConfigurator(sslContext) {
            public void configure(HttpsParameters params) {
                params.setSSLParameters(sslParams);
            }
        };
        server.setHttpsConfigurator(httpsConfigurator);

        // Mapping de l'URI "/data.json" à un gestionnaire de requêtes
        server.createContext("/", Server.createHandler(null,null));

        // Utilisation de l'Executor par défaut
        server.setExecutor(null);
        server.start();
    return server;
    }
}
