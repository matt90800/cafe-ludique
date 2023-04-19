import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyStore;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.TrustManagerFactory;

import com.sun.net.httpserver.*;

public class LocalJSONServer {
    public static void main(String[] args) throws Exception {
        // Configuration du keystore et du mot de passe du keystore
        char[] keystorePassword = "azerty".toCharArray();
        KeyStore keystore = KeyStore.getInstance("JKS");
        keystore.load(Files.newInputStream(Paths.get("mykeystore.jks")), keystorePassword);

        // Configuration du KeyManager pour le serveur HTTPS
        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyManagerFactory.init(keystore, keystorePassword);

        // Configuration du TrustManager pour le serveur HTTPS
        TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        trustManagerFactory.init(keystore);

        // Configuration du SSLContext avec le KeyManager et le TrustManager
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);
        int port=8443;
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
        server.createContext("/data", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                // Lecture du fichier JSON local
                Path path = Paths.get("boardgames.json");
                byte[] data = Files.readAllBytes(path);

                // Définition des entêtes HTTP pour la réponse
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*"); // Autorisation de tous les domaines à accéder à la ressource
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.getResponseHeaders().set("Content-Length", String.valueOf(data.length));

                // Envoi de la réponse HTTP avec le contenu JSON
                exchange.sendResponseHeaders(200, data.length);
                exchange.getResponseBody().write(data);
                exchange.close();
            }
        });

        // Démarrage du serveur HTTPS
        server.setExecutor(null); // Utilisation de l'Executor par défaut
        server.start();
        System.out.printf("Serveur HTTPS démarré sur le port %d.",port);
    }
}
