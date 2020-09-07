const base_url = "https://localhost:5001/v1/";

function loadTableServices(tableId, content){
  var dados = JSON.parse(content);
  var table = document.getElementById(tableId);
  var parameters = {'tabela':tableId, 'conteudo':content, 'caminho':''};
  table.innerHTML = "";
  var head = [[5, "ID"], [20, "Nome"], [45, "Descrição"], [15, "Cliente"], [10, "Veículo"], [5, "Valor"]];
  head.forEach((item, i) => {
    var element = table.incertRow(0).insertCell(i);
    element.width = item[0];
    element.innerText = item[1];
  });
  table.incertRow(1).insertCell(0).innerHTML = '<td><button type="submit" name="button">Cadastrar Novo</button></td>';
  table.incertRow(2).insertCell(1).innerHTML = '<td><input type="text" name="nome" id="nome" placeholder="Nome do Serviço" value=""></td>';
  table.incertRow(3).insertCell(2).innerHTML = '<td><textarea name="descricao" id="descricao" placeholder="Descrição do Serviço" rows="8" cols="80"></textarea></td>';
  table.incertRow(4).insertCell(3).innerHTML = '<td><input type="text" name="nomeCliente" id="nomeCliente" placeholder="Nome do Cliente" value=""></td>';
  table.incertRow(5).insertCell(4).innerHTML = '<td><input type="text" name="placa" id="placa" placeholder="Placa do Veículo" value=""></td>';
  table.incertRow(6).insertCell(5).innerHTML = '<td><input type="number" step="0.01" name="valor" id="valor" placeholder="Valor do Serviço" value=""></td>';
  //alert(dados.length);
  for (var i = 0; i < dados.length; i++) {
    var row = table.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var nomeCliente = dados[i].nomeCliente;
    var placa = dados[i].placa;
    cell1.innerHTML = dados[i].id;
    cell2.innerHTML = dados[i].nome;
    cell3.innerHTML = dados[i].descricao;
    cell4.innerHTML = '<a>'+nomeCliente+'</a>';
    parameters['caminho'] = 'clients/'+dados[i].idCliente;
    cell4.onclick = loadTableConnection(parameters);
    cell5.innerHTML = '<a>'+placa+'</a>';
    parameters['caminho'] = 'clients/'+dados[i].idVeiculo;
    cell4.onclick = loadTableConnection(parameters);
    cell6.innerHTML = "R$"+dados[i].valor;
  }
}

function loadTableVeicleServices(tableId, content){
  var dados = JSON.parse(content);
  var table = document.getElementById(tableId);
  table.innerHTML = "";
  var head = [[10, "ID"], [20, "Placa"], [25, "Marca"], [25, "Modelo"], [10, "Modelo Ano"], [10, "Fabricação"]];
  head.forEach((item, i) => {
    var element = table.incertRow(0).insertCell(i);
    element.width = item[0];
    element.innerText = item[1];
  });
  //alert(dados.length);
  for (var i = 0; i < dados.length; i++) {
    var row = table.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = dados[i].idVeiculo;
    cell2.innerHTML = dados[i].placa;
    cell3.innerHTML = dados[i].marca;
    cell4.innerHTML = dados[i].modelo;
    cell5.innerHTML = dados[i].anoModelo;
    cell6.innerHTML = dados[i].anoFabricacao;
  }
}

function loadTableClientServices(tableId, content){
  var dados = JSON.parse(content);
  var table = document.getElementById(tableId);
  table.innerHTML = "";
  var head = [[5, "ID"], [20, "Nome"], [20, "CPF"], [20, "Telefone"], [35, "Endereço"]];
  head.forEach((item, i) => {
    var element = table.incertRow(0).insertCell(i);
    element.width = item[0];
    element.innerText = item[1];
  });
  //alert(dados.length);
  for (var i = 0; i < dados.length; i++) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = dados[i].id;
    cell2.innerHTML = dados[i].nome;
    cell3.innerHTML = dados[i].cpf;
    cell4.innerHTML = dados[i].telefone;
    cell5.innerHTML = dados[i].endereco;
  }
}

function loadTableConnection(parameters){
  let xhr = new XMLHttpRequest();
  url = base_url+parameters['caminho'];
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() {
      //alert(url);
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      switch (parameters['conteudo']) {
        case "Serviços":
          loadTableServices(parameters['tabela'], xhr.responseText);
          break;
        case "Veiculo-Serviços":
          loadTableVeicleServices(parameters['tabela'], xhr.responseText);
          break;
        case "Cliente-Serviços":
          loadTableClientServices(parameters['tabela'], xhr.responseText);
          break;
      }
    }
  };
  xhr.onerror = function() {
    alert("Request failed");
  };
}
