//FUNCAO UTILIZADA PARA FAZER A REQ PRA API DOS GRUPOS COM CALLBACK DE TODOS OS GRUPOS
function chamaGrupos(){
    //COMO PARTE DE UM AJAX, É NECESSARIO O Promise 
    return new Promise((resolve, reject) => {
        $.ajax({
            url:'https://app.doo.com.br/iq2/api/GrupoItem/',
            method: 'GET',
            dataType: 'JSON',
            headers:{
                'ClientId':'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7',
                'ClientSecret':'f5b65bfe-f38d-433f-903f-81c47bdc4e69',
                'Content-Type':'application/json'
            },
            success: function(data) {
                let information = data;
                var GruposItems = information['Content'];
                resolve(GruposItems);
                // console.log(GruposItems);
            },
            error: function(error){
                console.log('Não foi possível buscar os grupos')

                reject(error)
            }
        })
    })
}

//FUNCAO UTILIZADA PARA FAZER A REQ PRA API DOS ITENS COM CALLBACK DE TODOS OS ITENS
function chamaItems(){
    //COMO PARTE DE UM AJAX, É NECESSARIO O Promise 
    return new Promise((resolve, reject) => {
        //GET NA API NOS ITENS JA CADASTRADOS 
        $.ajax({
            url:'https://app.doo.com.br/iq2/api/Item/',
            method: 'GET',
            dataType: 'JSON',
            headers:{
                'ClientId':'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7',
                'ClientSecret':'f5b65bfe-f38d-433f-903f-81c47bdc4e69',
                'Content-Type':'application/json'
            },
            success: function(data) {
                let information = data;
                let Items = information['Content']
                resolve(Items);        
                console.log(Items);     
            },
            error: function(error){
                console.log('Não foi possível buscar os itens')

                reject(error)
            }
        })
    })
}

//FUNCAO QUE INICIA AO CARREGAR A PAGINA
$(window).on('load', function(){ 
    //inicializacao da func de chamada de grupos
    chamaGrupos()
        .then((GruposItems) => {
            console.log(GruposItems)
            //for que percorre todos os grupos e mostra em tela 
            for(var i = 0; i<GruposItems.length; i++){
    
                $('#groups').append(('<div class="items-linhas"> <p class="text-center"> Cód Grupos de Itens: ' + GruposItems[i]['Id'] + ' - ' + GruposItems[i]['Descricao'] + '<a id="' + GruposItems[i]['Id'] + '" href="#areaComandoGrupo' + GruposItems[i]['Id'] + '" data-toggle="collapse"' + 
                    'role="button" aria-expanded="false" aria-controls="areaComandoGrupo" class="fas fa-angle-down ml-3"></a> </p> <div id="areaComandoGrupo' +GruposItems[i]['Id'] + '" class="collapse"> <div class="d-flex flex-column align-items-center"> <button id="' + GruposItems[i]['Id'] + '" class="button-comando bg-color1"' + 
                    'onclick="alteraGrupo(' + GruposItems[i]['Id'] + ')" data-toggle="modal" data-target="#modalAlteraGrupo"> Alterar Grupo de Item </button>'+
                    ' <small class="text-center my-2"> A cada alteração, <br> favor recarregar a página (CTRL + F5 ou CTRL + SHIFT + R) </small> </div> </div> </div> '))
            
                $('#CodigoGrupoItem').append(('<option value="' + GruposItems[i]['Id'] + '">' + GruposItems[i]['Id'] + ' - ' + GruposItems[i]['Descricao'] + '</option>'))
            
                $('#novoCodigoGrupoItem').append(('<option value="' + GruposItems[i]['Id'] + '">' + GruposItems[i]['Id'] + ' - ' + GruposItems[i]['Descricao'] + '</option>'))
                
            }
        })
        .catch((error) => {
            console.log(error)
        })

    //inicializacao da func de chamada de itens
    chamaItems()
        .then((Items) => {
            // console.log(items)
            //for que percorre todos os itens e mostra em tela 

            for(var i = 0; i<Items.length; i++){
        
            $('#items').append(('<div class="items-linhas"> <p class="text-center"> Cód Item: ' + Items[i]['Id'] + ' - ' + Items[i]['Descricao'] + '<a id="' + Items[i]['Id'] + '" href="#areaComandoItem' + Items[i]['Id'] + '" data-toggle="collapse"' + 
            'role="button" aria-expanded="false" aria-controls="areaComandoItem" class="fas fa-angle-down ml-3"></a> </p> <div id="areaComandoItem' +Items[i]['Id'] + '" class="collapse"> <div class="d-flex flex-column align-items-center"> <button id="' + Items[i]['Id'] + '" class="button-comando bg-color1"' + 
            'onclick="alteraItem(' + Items[i]['Id'] + ')" data-toggle="modal" data-target="#modalAlteraItem"> Alterar Item </button>'+
            ' <small class="text-center my-2"> A cada alteração, <br> favor recarregar a página (CTRL + F5 ou CTRL + SHIFT + R) </small> </div> </div> </div> '))
            }
        })
        .catch((error) => {
            console.log(error)
        })
    
});

//CADASTRO DE GRUPOS
$('#form-cadastro-grupo').on('submit', function (e) {
    e.preventDefault();
    //pede a confirmacao do cadastro
    let go = confirm("Você confima a adição desse Grupo?")

    if(go){

        //traz os dados que foram submitados, prepara e os envia para a api
        let dados = $(this);
        // console.log(dados)
        // console.log(dados[0][0]['value'])
        // console.log(dados[0][1]['value'])
    
        var request = new XMLHttpRequest();
    
        request.open('POST', 'https://app.doo.com.br/iq2/api/GrupoItem/');
    
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('ClientId', 'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7');
        request.setRequestHeader('ClientSecret', 'f5b65bfe-f38d-433f-903f-81c47bdc4e69');
    
        request.onreadystatechange = function () {

            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);

                alert('Cadastro bem sucedido')
                window.location.reload(true);             
            }
        };
    
        var body = {
            'Descricao': dados[0][0]['value'],
            'Ativo': dados[0][1]['value']
        };
    
        request.send(JSON.stringify(body))
        
    } else {
        alert('Operação Cancelada')
    }

});

//CADASTRO DE ITENS
$('#form-cadastro-item').on('submit', function (e) {
    e.preventDefault();
    //pede a confirmacao do cadastro
    let go = confirm("Você confima a adição desse Item?")

    if(go){

        //traz os dados que foram submitados, prepara e os envia para a api
        let dados = $(this);

        console.log(dados)
        
        var request = new XMLHttpRequest();
        
        request.open('POST', 'https://app.doo.com.br/iq2/api/Item/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('ClientId', 'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7');
        request.setRequestHeader('ClientSecret', 'f5b65bfe-f38d-433f-903f-81c47bdc4e69');
        
        request.onreadystatechange = function () {
    
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);

                alert('Cadastro bem sucedido')
                window.location.reload(true);         
            }
        };
            var body = {
                'Descricao': dados[0][0]['value'],
                'Identificacao': dados[0][1]['value'],
                'Ativo': dados[0][2]['value'],
                'CodigoGrupoItem': dados[0][3]['value'],
                'Obs': dados[0][4]['value'],
            };
        
            if(request.send(JSON.stringify(body))){
                window.location.href='./index.html';
            }

    } else {
        alert('Operação Cancelada')
    }
    
});

//FUNCAO PARA ALTERAR ITENS COM PARAMETRO PASSADO PELO BOTAO INCIALIZADO
function alteraItem(id){

    //inicializa a funcao de chamada de itens novamente
    chamaItems()
        .then((Items) => {
            console.log(Items)
            console.log(id)

            //percorre a lista retornada, e quando achar o parametro de id igual ao passado na inicializacao da funcao,
            //atrela os dados aos inputs do modal para liberar a alteração

            for(var i = 0; i<Items.length; i++){
        
                if (Items[i]['Id'] == id) {
                    var itemSelected = Items[i];
                    $('#novoDescricaoItem').attr('value', itemSelected['Descricao'])
                    $('#novoIdentificadorItem').attr('value', itemSelected['Identificacao'])
                    $('.novoAtivo').attr('selected', itemSelected['Ativo'])
                    $('#novoCodigoGrupoItem').attr('value', itemSelected['CodigoGrupoItem'])
                    $('#novoObservacaoItem').append(itemSelected['Obs'])
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })

        //evento ao submitar o formulario de alteracao de item
    $('#form-altera-item').on('submit', function (e) {

            e.preventDefault();
            //pede a confirmacao
            let go = confirm("Você confima a edição desse Item?")
        
            if(go){
                //prepara os dados e envia
                let dados = $(this);
        
                // console.log(dados)
                
                var request = new XMLHttpRequest();
                
                request.open('PUT',  'https://app.doo.com.br/iq2/api/Item/'+id);
                
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('ClientId', 'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7');
                request.setRequestHeader('ClientSecret', 'f5b65bfe-f38d-433f-903f-81c47bdc4e69');
                
                request.onreadystatechange = function () {
            
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        console.log('Body:', this.responseText);

                        window.location.reload();                   
                    }
                };
                    var body = {
                        'Descricao': dados[0][0]['value'],
                        'Identificacao': dados[0][1]['value'],
                        'Ativo': dados[0][2]['value'],
                        'CodigoGrupoItem': dados[0][3]['value'],
                        'Obs': dados[0][4]['value'],
                    };
                
                    request.send(JSON.stringify(body))
        
            } else {
                alert('Operação Cancelada')
                window.location.href='index.html';

            }
            
        });

}

//ALTERACAO DE GRUPOS NAO ESTAVA PREVISTA NA DOC DA API, E TAMBÉM NAO FUNCIONOU SEGUINDO A LÓGICA DOS ITENS
// //FUNCAO PARA ALTERAR GRUPOS COM PARAMETRO PASSADO PELO BOTAO INCIALIZADO
// function alteraGrupo(id){
//     //inicializa a funcao de chamada de itens novamente
//     chamaGrupos()
//         .then((GruposItems) => {
//             console.log(GruposItems)
//             console.log(id)

//             //percorre a lista retornada, e quando achar o parametro de id igual ao passado na inicializacao da funcao,
//             //atrela os dados aos inputs do modal para liberar a alteração
//             for(var i = 0; i<GruposItems.length; i++){
        
//                 if (GruposItems[i]['Id'] == id) {
//                     var grupoSelected = GruposItems[i];
//                     $('#novoNomeGrupo').attr('value', grupoSelected['Descricao'])
//                     $('#novoStatusGrupo').attr('selected', grupoSelected['Ativo'])
//                 }

//             }
//         })
//         .catch((error) => {
//             console.log(error)
//         })

//     //evento ao submitar o formulario de alteracao de item
//     $('#form-altera-grupo').on('submit', function (e) {

//             e.preventDefault();
//             //pede a confirmacao
      
//             let go = confirm("Você confima a edição desse Grupo?")
        
//             if(go){
//                 //prepara os dados e envia    
//                 let dados = $(this);
                        
//                 var request = new XMLHttpRequest();
                
//                 request.open('PUT', 'https://app.doo.com.br/iq2/api/GrupoItem/'+id);
                
//                 request.setRequestHeader('Content-Type', 'application/json');
//                 request.setRequestHeader('ClientId', 'ea648a9b-d102-4190-bb0f-85fd8c3f5ce7');
//                 request.setRequestHeader('ClientSecret', 'f5b65bfe-f38d-433f-903f-81c47bdc4e69');
                
//                 request.onreadystatechange = function () {
            
//                     if (this.readyState === 4) {
//                         console.log('Status:', this.status);
//                         console.log('Headers:', this.getAllResponseHeaders());
//                         console.log('Body:', this.responseText);

//                         // window.location.reload();                    
//                     }
//                 };
//                 var body = {
//                     'Descricao': dados[0][0]['value'],
//                     'Ativo': dados[0][1]['value']
//                 };
                
//                 request.send(JSON.stringify(body))
        
//             } else {
//                 alert('Operação Cancelada')
//                 // window.location.href='index.html';

//             }
            
//         });

// }






