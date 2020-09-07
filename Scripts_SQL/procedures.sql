use db_megalaudo;

delimiter &&
	create procedure pegarServicos ()
    begin
		select S.idServico, S.Nome, S.Descricao, V.idVeiculo, V.placa, C.idCliente, C.Nome, S.Valor from Servico S
		inner join Cliente C on C.idCliente = S.Cliente_idCliente
		inner join Veiculo V on V.idVeiculo = S.Veiculo_idVeiculo
        where 1;
    end
&&

delimiter &&
	create procedure pegarServicosCliente (idcliente int)
    begin
		select S.idServico, S.Nome, S.Descricao, C.idCliente, C.Nome, S.Valor from Servico S
		inner join Cliente C on C.idCliente = S.Cliente_idCliente
        where C.Cliente_idCliente = idcliente;
    end
&&

delimiter &&
	create procedure pegarServicosVeiculo (idveiculo int)
    begin
		select S.idServico, S.Nome, S.Descricao, V.idVeiculo, V.Nome, S.Valor from Servico S
		inner join Veiculo V on V.idVeiculo = S.Veiculo_idVeiculo
        where S.Veiculo_idVeiculo = idveiculo;
    end
&&

delimiter &&
create procedure inserirCliente (nome varchar(45), cpf varchar(11), telefone varchar(45), endereco varchar(450))
	begin
		insert into Cliente values(null, nome, cpf, telefone, endereco);
    end
&&

delimiter &&
create procedure inserirVeiculo (placa varchar(8), modelo varchar(45), marca varchar(45), anoModelo year, anoFabricacao year)
	begin
		insert into Veiculo values(null, placa, modelo, marca, anoModelo, anoFabricacao);
    end
&&

delimiter &&
create procedure inserirServico (nome varchar(45), descricao varchar(450), nomeCliente varchar(45), placaVeiculo varchar(9), valor double(10,2))
	begin
		insert into Servico values(null, nome, descricao, 
			(select idVeiculo from Veiculo where Placa = placaVeiculo), 
            (select idCliente from Cliente where Nome = nomeCliente), valor);
    end
&&

delimiter &&
create procedure atualizarServico (id int, campo int, dado varchar(450))
	begin
    case campo
		when 1 then
			update Servico set Nome = dado where idServico = id;
		when 2 then
			update Servico set Descricao = dado where idServico = id;
		when 3 then
			update Servico set Veiculo_idVeiculo = cast(dado as unsigned) where idServico = id;
		when 4 then
			update Servico set Cliente_idCliente = cast(dado as unsigned) where idServico = id;
		when 5 then
			update Servico set Valor = cast(dado as decimal(10,2)) where idServico = id;
		end case;
    end
&&

delimiter &&
create procedure atualizarVeiculo (id int, campo int, dado varchar(450))
	begin
    case campo
		when 1 then
			update Veiculo set placa = dado where idVeiculo = id;
		when 2 then
			update Veiculo set marca = dado where idVeiculo = id;
		when 3 then
			update Veiculo set modelo = dado where idVeiculo = id;
		when 4 then
			update Veiculo set anoModelo = year(cast(dado as date)) where idVeiculo = id;
		when 5 then
			update Veiculo set anoFabricacao = year(cast(dado as date)) where idVeiculo = id;
		end case;
    end
&&

delimiter &&
create procedure atualizarCliente (id int, campo int, dado varchar(450))
	begin
    case campo
		when 1 then
			update Cliente set Nome = dado where idServico = id;
		when 2 then
			update Cliente set cpf = dado where idServico = id;
		when 3 then
			update Cliente set telefone = dado where idServico = id;
		when 4 then
			update Cliente set endereco = dado where idServico = id;
		end case;
    end
&&

delimiter &&
create procedure excluirCliente (id int)
	begin
		delete from Cliente where idCliente = id;
    end
&&

delimiter &&
create procedure excluirServico (id int)
	begin
		delete from Servico where idServico = id;
    end
&&

delimiter &&
create procedure excluirVeiculo (id int)
	begin
		delete from Veiculo where idVeiculo = id;
    end
&&