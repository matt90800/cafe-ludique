import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsServer;

import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

public class Graph extends JPanel{
    private JPanel contentPane;
    private JLabel warning;
    private JTextField textField;
    private JLabel prompt;
    private JButton startButton;
    private JButton stopButton;
    public JPanel panel;

    private HttpServer httpServer;
    private HttpsServer httpsServer;

    public Graph(String type,Path filePath,String fileType) {
//        warning.setVisible(false);
        ((TitledBorder)panel.getBorder()).setTitle(type);
        ActionListener startListener = null;
        ActionListener stopListener = null;
        switch (type) {
            case ("HTTP") -> {
                startListener = e -> {
                    // Démarrage du serveur HTTP
                    int port = Integer.parseInt(this.textField.getText());
                    try {
                        httpServer=ServerHTTP.create(port,filePath,fileType);
                    } catch (IOException ex) {
                        throw new RuntimeException(ex);
                    }
                    String msg = String.format("Serveur HTTP démarré sur le port %d.", port);
                    System.out.println(msg);
                    this.setMessage(msg);
                    LocalJSONServer.frame.pack();
                };
                stopListener = e -> {
                    httpServer.stop(2);
                    this.setMessage("serveur arreté");
                };
                break;
            }
            case ("HTTPS") -> {
                {
                    startListener = e -> {
                        // Démarrage du serveur HTTPS
                        int port = Integer.parseInt(this.textField.getText());

                        try {
                            httpsServer =ServerHTTPS.create(port,filePath,fileType);
                        } catch (IOException ex) {
                            throw new RuntimeException(ex);
                        } catch (KeyStoreException ex) {
                            throw new RuntimeException(ex);
                        } catch (UnrecoverableKeyException ex) {
                            throw new RuntimeException(ex);
                        } catch (CertificateException ex) {
                            throw new RuntimeException(ex);
                        } catch (NoSuchAlgorithmException ex) {
                            throw new RuntimeException(ex);
                        } catch (KeyManagementException ex) {
                            throw new RuntimeException(ex);
                        }
                        String msg = String.format("Serveur HTTPS démarré sur le port %d.", port);
                        System.out.println(msg);
                        this.setMessage(msg);
                        LocalJSONServer.frame.pack();
                    };
                    stopListener = e -> {
                        httpsServer.stop(2);
                        this.setMessage("serveur arreté");
                    };
                }
                ;
            }
        }


            startButton.addActionListener(startListener);
            stopButton.addActionListener(stopListener);

    }
    public void setMessage(String message){
        warning.setText(message);
        warning.setVisible(true);
    }
}
