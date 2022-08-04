

<template>
<div class="divbackground">
  
 
  <div class="center">
    <br>
    <br>
    <img src="../assets/logo-3.png" >

    <br>

    
    <form method="post" data-toggle="validator" class="form-group needs-validation"  @submit.prevent="post"> 

      <h7><b> Guarde sua mensagem para compartilhar com segurança</b></h7><br><br>

<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="picked">



  <label class="form-check-label" for="flexCheckDefault">
    <b>  O que você deseja compartilhar é uma senha? </b>
  </label><br><br>

      
     <label for="fname" class="form-label"><b>Mensagem:</b></label><br>
     <textarea  name="message" placeholder="informe a mensagem a ser compartilhada, caso a informação for do tipo senha, informar a senha com no minimo 8 caracteres, sendo uma maiuscula, uma minuscula, um número e um  caracter especial" 
     class="form-control" maxlength="100" rows="5" wrap="soft" id="fmessage" v-model="fmessage" required > </textarea><br>


    <label for="lname" class="form-label"><b>Senha:</b></label><br>
    <input align=center  type="password" class="form-control "   id="fsenha" name="fsenha"  v-model="fsenha" required> <br><br>


      <label for="lname" class="form-label"><b>Tempo de expiração em minutos:</b></label><br>
  <input type="number"  min="1"  class="form-control" id="fexpiracao" name="fexpiracao"  v-model="fexpiracao" required><br><br>


     <label for="lname" class="form-label"><b>Quantidade de visualizações:</b></label><br>
  <input type="number"   min="1" class="form-control" id="fvisualizacao" required name="fvisualizacao" v-model="fvisualizacao" ><br> 


    <button type="submit" class="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#exampleModal">Guardar Mensagem</button>
    <br> <br> 
    </form>



    <!-- Modal -->
<div  class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    
  <div  class="modal-dialog">
    <div   class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Informação para compartilhamento</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- <h5 class="link" id="link">{{ form.url }}/decrypt/{{ form.retorno }}</h5> -->
               <div v-if="form.id == '' && form.error == ''"  class="spinner-border" role="status">
                              
                     </div>
                    <div v-else>

                  <div v-if="form.error == ''">

               <br><br>
                <h5 class="link" id="link"><b>Link: </b> {{ form.link }}</h5>
                <br><br>
                <h5><b>Numero de Visualizações: </b>{{ form.fvisualizacao }}</h5>
                <h5><b>Data de expiracao:</b> {{ form.data }}</h5>
                


                 <br><br>
                <button type="button" v-clipboard:copy="form.link"    v-clipboard:success="onCopy"  v-clipboard:error="onError" class="btn btn-primary">Copy Link</button>
              </div>
                <div v-else>
                 
                          <h5>ERRO: {{ form.error }}</h5>
                          </div>


                  </div>
                  </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
<div  >
   </div>


</div>


</div >
  </div>





 
</template>


<script>


import axios from 'axios';

export default {
    name: 'PostFormAxios',
    data(){
        return{
            form: {
                fmessage: '',
                fsenha: 0,
                fexpiracao: 1,
                fvisualizacao: 1,
                retorno: '',
                data:'',
                url: window.location.origin,
                id: '',
                link: '',
                error: '',
                picked:''              
            }
        }
    },
 methods: {

           onError: function (e) {
                alert('Failed to copy the text to the clipboard')

                console.log(e);
            },


     onCopy: function (e) {
                alert('Você copiou o link: ' + e.text,'com sucesso')
     },
  getlink() {
    this.form.link = this.form.url.concat("/decrypt/",this.form.id);

  },
    async post() {

      console.log("Picked" + this.picked)

      if (this.picked){

     
                    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");



   console.log("Escolha do formulario" + this.fmessage.length)
      if(this.fmessage.length < 8)
{
    this.form.error = "A senha deve conter no minímo 8 digitos!"
    return false;
}
else if(!regex.test(this.fmessage))
{
    this.form.error = "A senha deve conter no mínimo 1 caracteres em maiúsculo, 1 números e 1 caractere especial!"
    return false;
}
      }

 const message = { mensagem: this.fmessage , senha: this.fsenha, tempo: parseInt(this.fexpiracao) ,  visualizacoes_max: parseInt(this.fvisualizacao) };
 let errore = '';


  
    await axios.post("https://d9ej61b4ah.execute-api.us-east-1.amazonaws.com/Teste/GravarMensagem", message).then(response => { 
    this.form.id = response.data.body.id ;
    this.form.data = response.data.body.minutos ;
    this.form.fvisualizacao = response.data.body.visualizacoes_max ;

   }) .catch(function (error) {
    if (error.response) {
   
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      errore = error.response.data;
    } else if (error.request) {

      console.log(error.request);
      errore = error.request;
    } else {
      console.log('Error', error.message);
   
      errore = error.message;
    }
    console.log(error.config);

  });
  this.form.link = this.form.url.concat("/decrypt/",this.form.id);

  if (this.form.mensagem)
 this.form.error = errore;
    

    

  // 
   }}}
</script>

<style scoped>

.center {
margin: auto;
width: 40%;
border-radius: 25px;

border: 5px solid black ;
/* padding: 40px; */
 padding: 0.5%; 

background: blank !important;
height: 10%;

}



 .divbackground {
background: url(../assets/formbackground3.jpg) no-repeat  ;
height: 100%;
width: 100%;
object-fit: fill;
 }

 .inputsize {
   width: 30%;
text-align: center;
 }

</style>






