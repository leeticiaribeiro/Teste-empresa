function loadDoc() { //funcao para carregar o documento, abrir o xml
  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (!xhttp) {
    console.log('XMLHttpRequest error. Request stopped.');
    return false;
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      nutritions(this); //chama a funcao nutritions e passa o xml como parametro
    }
  };
  xhttp.open("GET", "nutrition.xml", true); //inicializa solicitação recém-criada
  xhttp.send();
}


function nutritions(xml) {
  var i;                               //declara um indice que sera usado posteiormente
  var nutrition_doc = xml.responseXML; //recebe o xml
  if (!nutrition_doc) {                //faz verificacao
    console.log('XMLHttpRequest error. Reguest stopped.');
    return false;
  }
    
    
  var valor = nutrition_doc.getElementsByTagName("daily-values");                      //varivael valor recebe o primeiro elemento com a tag daily-values
  var res_valor = nutrition_doc.getElementsByTagName("daily-values")[0].childNodes;    //variavel res_valor recebe recebe o elemento do nodo/tag seguinte 
  var tab_valor_diario = "<thead><tr>";                                                //esta etapa começa a criar e preencher o cabeçalho da tabela
  for (i = 0; i < res_valor.length; i++) {                                             //loop de acordo com o numero dos elementos dentro da tag total-fat
    if (res_valor[i].tagName !== undefined) {
      tab_valor_diario += "<th>" + res_valor[i].tagName + "</th>";                     //preenche a linha da tabela do cabeçalho pegando cada conteudo de res_valor
    }
  }
  tab_valor_diario += "</tr></thead>";
  for (i = 0; i < valor.length; i++) {                                  //loop para preencher o corpo da tabela, com o tam de acordo com o tam de valor (daily-values)
    tab_valor_diario += "<tr><td>" +
      valor[i].getElementsByTagName("total-fat")[0].childNodes[0].nodeValue +   //preenche a tabela pegando o conteudo do nodo/tag referente a comparação acessada
      "</td><td>" +
      valor[i].getElementsByTagName("saturated-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      valor[i].getElementsByTagName("cholesterol")[0].childNodes[0].nodeValue +
      "</td><td>" +
      valor[i].getElementsByTagName("sodium")[0].childNodes[0].nodeValue +
      "</td><td>" +
      valor[i].getElementsByTagName("carb")[0].childNodes[0].nodeValue +
      "</td><td>" +
      valor[i].getElementsByTagName("fiber")[0].childNodes[0].nodeValue +
      "</td><td>" +
      valor[i].getElementsByTagName("protein")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }

  tab_valor_diario += "</tbody>";
  document.getElementById("daily").innerHTML = tab_valor_diario;
    
                                                                                //basicamente a mesma lógica aplicada anteriormente
    
    
  var elemento = nutrition_doc.getElementsByTagName("food");                    //variavel elemento recebe o primeiro elemento com a tag food do xml
  var res_elemento = nutrition_doc.getElementsByTagName("food")[0].childNodes;  //variavel res_elemento recebe o elemento do nodo/tag seguinte 
  var tabela = "<thead><tr>";                                                   //esta etapa começa a criar e preencher o cabeçalho da tabela
  for (i = 0; i < res_elemento.length; i++) {                                   //loop de acordo com o numero dos elementos dentro da tag nome
    if (res_elemento[i].tagName !== undefined) {
      tabela += "<th>" + res_elemento[i].tagName + "</th>";                     //preenche a linha da tabela do cabeçalho pegando cada conteudo de res_elemento
    }
  }
  tabela += "</tr></thead>";
  for (i = 0; i < elemento.length; i++) {                                       //loop para preencher o corpo da tabela, com o tam de acordo com o tam de elemento (food)
    tabela += "<tr><td>" +
      elemento[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +     //preenche a tabela pegando o conteudo do nodo/tag referente a comparação acessada
      "</td><td>" +
      elemento[i].getElementsByTagName("mfr")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("serving")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("calories")[0].getAttribute("fat") + "/" +
      elemento[i].getElementsByTagName("calories")[0].getAttribute("total") +
      "</td><td>" +
      elemento[i].getElementsByTagName("total-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("saturated-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("cholesterol")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("sodium")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("carb")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("fiber")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("protein")[0].childNodes[0].nodeValue +
      "</td><td>" +
      elemento[i].getElementsByTagName("vitamins")[0].childNodes[1].tagName + ": " +
      elemento[i].getElementsByTagName("vitamins")[0].childNodes[1].textContent + " | " +
      elemento[i].getElementsByTagName("vitamins")[0].childNodes[3].tagName + ": " +
      elemento[i].getElementsByTagName("vitamins")[0].childNodes[1].textContent +
      "</td><td>" +
      elemento[i].getElementsByTagName("minerals")[0].childNodes[1].tagName + ": " +
      elemento[i].getElementsByTagName("minerals")[0].childNodes[1].textContent + " | " +
      elemento[i].getElementsByTagName("minerals")[0].childNodes[3].tagName + ": " +
      elemento[i].getElementsByTagName("minerals")[0].childNodes[1].textContent +
      "</td></tr>";
  }
  tabela += "</tbody>";
  document.getElementById("tab").innerHTML = tabela;
    
  
}

loadDoc();

$(function()     //Uso do plugin tableorter jQuery para ordenar a tabela de acordo com cada coluna desejada
 {
   $('.ordenar').tablesorter(); 
});
