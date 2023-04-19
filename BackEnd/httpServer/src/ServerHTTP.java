import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Path;

public abstract class ServerHTTP extends HttpServer implements Server {

    public static HttpServer create(int port, Path filePath, String fileType) throws IOException {
        // Création d'un serveur HTTP sur le port 8000
        HttpServer httpserver = HttpServer.create(new InetSocketAddress(port), 0);

        // Mapping de l'URI "/data.json" à un gestionnaire de requêtes
        httpserver.createContext("/", Server.createHandler(null,null));
        httpserver.start();

        return httpserver;
    }

}
