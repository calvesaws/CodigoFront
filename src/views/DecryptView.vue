<template>
  <div class="divbackground">
    <div class="center">
      <img src="../assets/logo-3.png" >
       <br>
 <form method="post" class="form-group" @submit.prevent="get">
         <h7><b>Receba sua mensagem com segurança</b></h7><br><br>
    <label for="lname" class="form-label" ><b>ID da mensagem:</b></label><br>
   <input type="text" class="form-control" id="fid" name="fid"   v-model="form.fid"   ><br>
   <label for="lname" class="form-label"><b>Senha:</b></label><br>
  <input type="password" class="form-control" id="fsenha" name="fsenha" v-model="form.fsenha" ><br>
    <input type="submit" class="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#exampleModal"  value="Verificar Mensagem"><br>

</form>
</div>

   <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Informação da Mensagem</h5>


        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

          <div v-show="form.mensagem == ''"  class="spinner-border" role="status">
  <span class="sr-only"></span>
</div>


<div v-show="form.mensagem != ''"> 
  <form method="post" class="form-group" @submit.prevent="apagar">
               <div v-if="form.error == ''">

                <h5 class="link" id="link"><b>Quantidade de tentativas:</b> {{ form.visualizacoes }}</h5>

                <label for="lname" class="form-label" ><h5 class="link" id="link"><b>Data de expiração:</b> {{ form.data }}</h5> </label><br>


                <h5 class="link" id="link"><b>Quantidade de tentativas máxima:</b> {{ form.visualizacoes_max }}</h5>

                 <br><br>
          <button type="button" v-clipboard:copy="form.mensagem"    v-clipboard:success="onCopy"  v-clipboard:error="onError" class="btn btn-primary">Copiar Mensagem</button>
                    <button  type="submit" @submit.prevent="apagar"  class="btn btn-danger" data-target="#deletemodal">Eliminar mensagem</button>
                   <br><br><br>
                   <h5 v-if="form.mostramensagemdelete">Mensagem excluída com sucesso.  </h5>
              <br><br>
                    </div>
                    <div v-else>
                      <h5> Solicitação Inválida. </h5>
                      <br><br>
                      <h5> <b>Mensagem: </b> {{ form.mensagem }} </h5>
                      </div>
    </form>

      </div>
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
 
</div>


    </div>


</template>


<script>

import axios from 'axios';

export default {
    name: 'GetFormAxios',
    data(){
        return{
            form: {
                fid: this.$route.params.id,
                fsenha: '',
                error: '',
                mensagem: '',
                visualizacoes: '',
                visualizacoes_max : '',
                data: '',
                mostramensagemdelete: false

            }
        }
    },

methods: {

  apagar() {

    let error = '';
 console.log(this.form.fid)
     axios.delete("https://d9ej61b4ah.execute-api.us-east-1.amazonaws.com/Teste/deletemensagem/"+ this.form.fid,{

  params: {
    senha: this.form.fsenha,
  },
   }).then(response => { 
    
    this.form.retorno = ( response.data);
    this.form.mostramensagemdelete = true;
}
     ).catch(function (error) {
    if (error.response) {
      
     
      error = error.response.data;
    } else if (error.request) {
    
      error = error.request;
    } else {
      console.log('Error', error.message);
    
      error = error.message;
    }
    console.log(error.config);

  });

   this.form.error = error;
  },

  async get() {

    let errore = '';
   
    await axios.get("https://d9ej61b4ah.execute-api.us-east-1.amazonaws.com/Teste/ListarMensagem/"+ this.form.fid,{

  params: {
    senha: this.form.fsenha,
  },
 }).then(response => { 
   this.form.mensagem = ( response.data.mensagem);
    this.form.visualizacoes = ( response.data.visualizacoes);
    this.form.visualizacoes_max = ( response.data.visualizacoes_max);
    this.form.data = ( response.data.minutos);


  }).catch(function (error) {
    if (error.response) {
    
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      error = error.response.data;
    } else if (error.request) {
   
      console.log(error.request);
      errore = error.request;
    } else {
      console.log('Error', error.message);

      errore = error.message;
    }
    console.log(error.config);


  });


  if (this.form.mensagem == "Mensagem não existe"){
       errore = "Mensagem não existe";
  }

  if (this.form.mensagem == "Senha Incorreta"){
       errore = "Senha Incorreta";
  }

    if (this.form.mensagem == "A mensagem passou do limite de visualizacao"){
       errore = "A mensagem passou do limite de visualização";
  }

    if (this.form.mensagem == "Mensagem foi expirada"){
       errore = "A Mensagem foi expirada";
  }


 this.form.error = errore;
 

   }}
}
</script>

<style scoped>

.center {
margin: auto;
width: 35%;
border: 5px solid black ;
padding: 3%;
background: blank !important;
height: 50%;
border-radius: 25px;

}

 .divbackground {
background: url(../assets/formbackground3.jpg) no-repeat  ;
padding: 120px;


 }

</style>