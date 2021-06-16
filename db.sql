
CREATE TABLE colaboradores (
nome TEXT,
email TEXT,
senha TEXT,
sobrenome TEXT,
pergunta_senha TEXT,
isadmin BOOLEAN,
criado_em TIMESTAMP,
token TEXT,
cpf TEXT PRIMARY KEY
)

CREATE TABLE clientes (
cpf TEXT PRIMARY KEY,
nome TEXT,
sobrenome TEXT,
email TEXT,
telefone TEXT
)

CREATE TABLE produtos (
id INTEGER PRIMARY KEY,
nome TEXT,
valor TEXT,
marca TEXT,
data_cadastro TIMESTAMP,
data_exclusao TIMESTAMP
)

CREATE TABLE vendas (
data_compra TEXT,
quantidade DECIMAL,
forma_pagamento TEXT,
valor_compra DECIMAL,
valor_pago DECIMAL,
vencimento TIMESTAMP,
id INTEGER, PRIMARY KEY,
cpf_cliente TEXT,
cpf_colaborador TEXT,
id_produto INTEGER,
FOREIGN KEY(cpf_cliente) REFERENCES clientes (cpf),
FOREIGN KEY(cpf_colaborador) REFERENCES colaboradores (cpf),
FOREIGN KEY(id_produto) REFERENCES produtos (id)
)
CREATE TABLE movimentacao (
data TIMESTAMP,
quantidade DECIMAL,
tipo TEXT,
id INTEGER PRIMARY KEY,
cpf_colaborador TEXT,
id_produto INTEGER,
id_venda INTEGER,
FOREIGN KEY(cpf_colaborador) REFERENCES colaboradores (cpf),
FOREIGN KEY(id_produto) REFERENCES produtos (id),
FOREIGN KEY(id_venda) REFERENCES vendas (id)
)

