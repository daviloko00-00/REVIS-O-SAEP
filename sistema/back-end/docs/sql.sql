select version();
create database oficina_db;
use oficina_db;

create table clientes(
	id int auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(255) not null,
    telefone varchar(20),
    email varchar(100),
    criado_em timestamp default current_timestamp
     
);

create table veiculos(
	id int auto_increment primary key,
    placa varchar(10) not null unique,
    modelo varchar(50) not null,
    marca varchar(50) not null,
    ano int not null,
    cliente_id int not null,
    foreign key (cliente_id) references clientes (id)
);


create table agendamentos (
	id int auto_increment primary key,
    data_agendamento datetime not null,
    descricao_servico varchar(255) not null,
    veiculo_id int not null,
    foreign key (veiculo_id) references veiculos (id),
    status varchar(50) default 'Agendado'
    
);


create table usuarios (
	id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    criado_em timestamp default current_timestamp
);



insert into usuarios (nome, email, senha) values
('Carlos', 'carlosoficina@gmail.com', '123456 '),
('Verissímo', 'ordemcoficina@gmail.com', '123456 '),
('Rubens', 'rubensoficina@gmail.com', '123456 ');

insert into clientes (nome,cpf,telefone,email) values
('Jones Silva','r5CVuf9O6vpjT9sennyXNtwxp2j1EOgHl6gex14h2VGAngCKuGs6X0oHWtRCkMMP','(19) 98179-5060','jones.silva@gmail.com'),
('Maria Silva','nwzmrfX7NzogumQnGJDZwj8aZrfXHmbWW5/bnGsUf9upPMsZgqBqrPHjhIQPwHX2','(19) 98279-5160','maria.silva@gmail.com'),
('Dante Silva','YniJxAgMgkSZTFFGYX1OBphKE3t1qdtwG5IEATz+jy2XLl0Z4oqQvrPCwvMneiEL','(19) 98179-5067','dante.silva@gmail.com');


insert into veiculos (placa, modelo, marca, ano, cliente_id) values 
('ABC-1D34', 'MONZA', 'CHEVROLET', '2000', '1'),
('DEF-1D34', 'ECLIPSE', 'Mitsubish', '2009', '2'),
('ABF-1D34', 'Civic', 'Honda', '2010', '3');


insert into agendamentos (data_agendamento, descricao_servico, veiculo_id, status) values
('2020-03/15 10:00:00','Troca de óleo e filtro de ar','1', 'Em andamento'),
('2021-03/15 09:45:00','Troca de óleo e filtro de ar','2', 'Agendado'),
('2020-03/15 10:00:00','Troca de óleo e filtro de ar','3', 'Agendado');




 -- 12345678901234567890123456789012 -- 