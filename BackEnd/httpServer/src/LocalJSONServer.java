import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
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
import javax.swing.*;

import com.sun.net.httpserver.*;

public class LocalJSONServer {
    static JFrame frame;
    public static void main(String[] args) throws Exception {

        if (GraphicsEnvironment.isHeadless()) {
            System.out.println("This is a headless computer.");
        } else {
            frame = new JFrame("Server Manager");
            Container contentPane = frame.getContentPane();
            contentPane.setLayout(new FlowLayout(FlowLayout.LEADING)); // direction horizontale, alignement à gauche

            JPanel mainPanel = new JPanel();
            JButton httpButton =new JButton("Create HTTP server"); // Define the action
            JButton httpsButton=new JButton("Create HTTPS server");
            Path jsonPath = Paths.get("boardgames.json");
            String fileType="json";
            mainPanel.add(httpButton);
            mainPanel.add(httpsButton);
            httpButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    contentPane.add(new Graph("HTTP",jsonPath,fileType).panel,1);
                    frame.revalidate();
                    frame.pack();
                }
            });
            httpsButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    contentPane.add(new Graph("HTTPS",jsonPath,fileType).panel,1);
                    frame.pack();
                }
            });

            contentPane.add(mainPanel);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.pack();
            frame.setVisible(true);        }



    }
}
