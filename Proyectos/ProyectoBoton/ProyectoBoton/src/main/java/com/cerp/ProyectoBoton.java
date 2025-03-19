package com.cerp;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ProyectoBoton extends JFrame {
    private int contador = 0;
    private JLabel etiquetaContador;
    private JButton botonClick;

    public ProyectoBoton() {
        // Configuración de la ventana principal
        setTitle("Contador de Clicks");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Crear panel con layout
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Crear etiqueta de contador
        etiquetaContador = new JLabel("Contador: 0", SwingConstants.CENTER);
        etiquetaContador.setFont(new Font("Arial", Font.BOLD, 24));
        panel.add(etiquetaContador, BorderLayout.CENTER);

        // Crear botón de click
        botonClick = new JButton("Haz Click Aquí");
        botonClick.setFont(new Font("Arial", Font.PLAIN, 16));
        botonClick.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                contador++;
                actualizarContador();
            }
        });
        panel.add(botonClick, BorderLayout.SOUTH);

        // Agregar panel a la ventana
        add(panel);

        // Mostrar la ventana
        setVisible(true);
    }

    private void actualizarContador() {
        etiquetaContador.setText("Contador: " + contador);
    }

    public static void main(String[] args) {
        // Ejecutar la aplicación
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new ProyectoBoton();
            }
        });
    }
}