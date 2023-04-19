import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Graph extends JFrame{
    private JButton killServerButton;
    private JLabel https;
    private JLabel http;
    private JLabel label;
    private JPanel contentPane;

    public Graph(String http,String https) {
        Container contentPane=this.getContentPane();
        contentPane.add(this.contentPane);
        this.http.setText(http);
        this.https.setText(https);

        this.setVisible(true);
        this.pack();
        killServerButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
    }
}
