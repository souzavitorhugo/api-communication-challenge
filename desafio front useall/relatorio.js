$(window).on('load', function(){ 

    //inicializacao da func de chamada de grupos
    chamaGrupos()
        .then((GruposItems) => {
            // console.log(GruposItems)
            //for que percorre todos os grupos e mostra em tela 
            for(var i = 0; i<GruposItems.length; i++){
    
                $('#table-main').append(('<div class="half"> <div> <p class="text-center"> Cód Grupos de Itens: ' + GruposItems[i]['Id'] + ' - ' +
                GruposItems[i]['Descricao'] + '</p> <a id="' + GruposItems[i]['Id'] + '" href="#areaMostraItems' + GruposItems[i]['Id'] + '" data-toggle="collapse"' + 
                'role="button" aria-expanded="false" aria-controls="areaMostraItems" class="fas fa-angle-down ml-3"></a> </div>' +
                '<div class="container-items collapse" id="areaMostraItems' +GruposItems[i]['Id'] + '"> </div> </div>'))

                mostraItemGrupo(GruposItems[i]['Id'])

            }
        })
        .catch((error) => {
            console.log(error)
        })

});

function mostraItemGrupo(id) {
    chamaItems()
        .then((Items) => {

            for(var i = 0; i<Items.length; i++){

                if (Items[i]['CodigoGrupoItem'] == id) {
                    var itemSelected = Items[i];

                    var area = document.getElementById('areaMostraItems'+id)

                    var itemDiv = document.createElement('div')
                    itemDiv.setAttribute('class', 'itemDescri')
                    itemDiv.innerHTML = '<p>Descrição: <b>'+ itemSelected['Descricao'] +'</b> </p>'+
                                        '<p>Id: <b>'+ itemSelected['Id'] +'</b> </p>' + 
                                        '<p>Identificação: <b>'+ itemSelected['Identificacao'] +'</b> </p>'+
                                        '<p>Observação: <b>'+ itemSelected['Obs'] +'</b> </p>'+ 
                                        '<p>Status: <b>'+ itemSelected['Ativo'] +'</b> </p>'
                                    
                    // console.log(itemDiv)

                    area.appendChild(itemDiv)

                } 
            }

            // console.log(document.getElementById('areaMostraItems'+id).childNodes)
                if(document.getElementById('areaMostraItems'+id).childNodes.length == 1 ||  document.getElementById('areaMostraItems'+id).childNodes.length == '') {
                    // console.log("vazios")
                    
                    var noItem = document.createElement('div')
                        noItem.setAttribute('class', 'itemDescri')
                        noItem.innerHTML = 'Não há itens cadastrados para este grupo'
    
                        document.getElementById('areaMostraItems'+id).append(noItem)
                }


                // var containersTotal = $('.container-items')

                // for(var i = 0; i<=containersTotal.lenght; i++){
                //     if(containersTotal[i].childNodes.length == 0 || containersTotal[i].childNodes.length == '') {

                //         var noItem = document.createElement('div')
                //         noItem.setAttribute('class', 'itemDescri')
                //         noItem.innerHTML = 'Não há itens cadastrados para este grupo'
    
                //         document.getElementById('areaMostraItems'+id).append(noItem)

                //     }
                // }

                // console.log(containersTotal)

                // if (('.container-items').childNodes.length == 0){

                //     var noItem = document.createElement('div')
                //     noItem.setAttribute('class', 'itemDescri')
                //     noItem.innerHTML = 'Não há itens cadastrados para este grupo'
    
                //     document.getElementById('areaMostraItems'+id).append(noItem)

                // }

        })
        .catch((error) => {
            console.log(error)
        })
}
