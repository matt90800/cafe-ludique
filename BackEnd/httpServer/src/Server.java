import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpsServer;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public interface Server {



    static HttpHandler createHandler(Path filePath, String type) throws IOException {

    /*  types d'entetes de contenu
        text/plain : texte brut
        text/html : code HTML
        application/json : données JSON
        application/xml : données XML
        image/jpeg : image JPEG
        image/png : image PNG
        audio/mpeg : fichier audio MPEG
        video/mp4 : fichier vidéo MP4
        application/pdf : fichier PDF
        application/zip : archive ZIP*/

        Path jsonPath = Paths.get("boardgames.json");
        byte[] data = Files.readAllBytes(jsonPath);
        return exchange -> {
            // Définition des entêtes HTTP pour la réponse
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*"); // Autorisation de tous les domaines à accéder à la ressource
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.getResponseHeaders().set("Content-Length", String.valueOf(data.length));

            // Envoi de la réponse HTTP avec le contenu JSON
            exchange.sendResponseHeaders(200, data.length);
            exchange.getResponseBody().write(data);
            exchange.close();
        };
    }
}
