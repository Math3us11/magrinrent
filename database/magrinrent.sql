-- ============================================================
-- MAGRINRENT - BACKUP / SCRIPT DE CRIAÇÃO DO BANCO
-- Projeto acadêmico: Sistema de aluguel de bicicletas
-- Banco: MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS magrinrent
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE magrinrent;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS alugueis;
DROP TABLE IF EXISTS bicicletas;
DROP TABLE IF EXISTS usuarios;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- TABELA: usuarios
-- Senhas:
-- admin@magrinrent.com   / admin123
-- cliente@magrinrent.com / cliente123
-- ============================================================

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABELA: bicicletas
-- ============================================================

CREATE TABLE bicicletas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  valor_diaria DECIMAL(10,2) NOT NULL,
  status ENUM('Disponível', 'Alugada', 'Manutenção') NOT NULL DEFAULT 'Disponível',
  descricao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABELA: alugueis
-- ============================================================

CREATE TABLE alugueis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  bicicleta_id INT NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  telefone_cliente VARCHAR(30) NOT NULL,
  data_retirada DATE NOT NULL,
  data_devolucao DATE NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  status ENUM('Ativo', 'Finalizado', 'Cancelado') NOT NULL DEFAULT 'Ativo',
  observacao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_alugueis_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),

  CONSTRAINT fk_alugueis_bicicleta
    FOREIGN KEY (bicicleta_id) REFERENCES bicicletas(id)
);

-- ============================================================
-- DADOS INICIAIS: usuarios
-- As senhas estão criptografadas com bcrypt.
-- ============================================================

INSERT INTO usuarios (id, nome, email, senha, tipo) VALUES
(1, 'Administrador MagrinRent', 'admin@magrinrent.com', '$2b$10$7oX/i5AumSWewp3R.2M7AOraq0lIKFkcb4rskHL7rNBNnCYyBzOYe', 'admin'),
(2, 'Cliente Demonstração', 'cliente@magrinrent.com', '$2b$10$tSDKvdr7JTVFkkqRaRDo1.jEJdxd472uV8103eoZ7FHfJ3YUegDOO', 'cliente');

-- ============================================================
-- DADOS INICIAIS: bicicletas
-- Os status estão alinhados com os aluguéis cadastrados abaixo.
-- ============================================================

INSERT INTO bicicletas (id, nome, categoria, valor_diaria, status, descricao) VALUES
(1, 'Bike Urbana Aro 29', 'Urbana', 35.00, 'Alugada', 'Bicicleta confortável para uso urbano, ideal para deslocamentos diários e passeios curtos.'),
(2, 'Mountain Bike Pro', 'Mountain Bike', 50.00, 'Disponível', 'Modelo robusto para trilhas leves, terrenos irregulares e passeios esportivos.'),
(3, 'Bike Elétrica City', 'Elétrica', 80.00, 'Disponível', 'Bicicleta elétrica para trajetos urbanos com assistência ao pedal e maior conforto.'),
(4, 'Bike Infantil', 'Infantil', 20.00, 'Manutenção', 'Bicicleta infantil destinada a crianças, atualmente em manutenção preventiva.'),
(5, 'Speed Road Carbon', 'Speed', 65.00, 'Disponível', 'Modelo speed indicado para treinos, vias asfaltadas e maior desempenho em velocidade.'),
(6, 'Bike Passeio Confort', 'Passeio', 30.00, 'Alugada', 'Bicicleta simples e confortável para passeios em parques, ciclovias e áreas urbanas.');

-- ============================================================
-- DADOS INICIAIS: alugueis
-- Observação:
-- Aluguéis ativos deixam a bicicleta como Alugada.
-- Aluguéis finalizados/cancelados deixam a bicicleta disponível.
-- ============================================================

INSERT INTO alugueis (
  id,
  usuario_id,
  bicicleta_id,
  nome_cliente,
  telefone_cliente,
  data_retirada,
  data_devolucao,
  valor_total,
  status,
  observacao
) VALUES
(1, 2, 1, 'Cliente Demonstração', '(69) 99999-1001', '2026-06-23', '2026-06-25', 70.00, 'Ativo', 'Aluguel ativo para demonstração do fluxo do cliente.'),
(2, 2, 2, 'Cliente Demonstração', '(69) 99999-1001', '2026-06-10', '2026-06-13', 150.00, 'Finalizado', 'Aluguel finalizado usado como exemplo no histórico.'),
(3, 2, 3, 'Cliente Demonstração', '(69) 99999-1001', '2026-06-15', '2026-06-17', 160.00, 'Cancelado', 'Aluguel cancelado para demonstrar controle de status.'),
(4, 1, 6, 'Administrador MagrinRent', '(69) 99999-2002', '2026-06-24', '2026-06-27', 90.00, 'Ativo', 'Registro administrativo de exemplo para apresentação.');

-- Ajusta os próximos IDs do AUTO_INCREMENT
ALTER TABLE usuarios AUTO_INCREMENT = 3;
ALTER TABLE bicicletas AUTO_INCREMENT = 7;
ALTER TABLE alugueis AUTO_INCREMENT = 5;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
