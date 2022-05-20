import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/shared/interfaces';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  form: FormGroup;
 public pokemon?:Pokemon;
 public pokemons?:Pokemon[];
 estado:string = 'visor';
 ataqueValor:number=0;
 defensaValor:number=0;
 buscarValor: string ='';
 subscriptions$:Subscription[]=[];

  constructor(private poekemonService: PokemonService,
    private readonly fb: FormBuilder) {
      this.form = this.fb.group({
        id:[-1,Validators.required],
        ataque: [0, Validators.required],
        defensa:[0, Validators.required],
        nombre:['', Validators.required],
        image:['', Validators.required]
      })
 }

  ngOnInit(): void {
    this.cargarDatos();

    this.subscriptions$.push(
       this.form.get('ataque')!.valueChanges.subscribe((value)=>{
         if(value){this.ataqueValor = value}
       })
    );

    this.subscriptions$.push(
      this.form.get('defensa')!.valueChanges.subscribe((value)=>{
        if(value){this.defensaValor = value}
      })
   )
  }

 cargarDatos(){
  this.poekemonService.getAllPokemons()
  .subscribe(poke =>{ this.pokemons = poke})

 }

  nuevoPokemon(){
    this.estado = 'nuevo';
    this.form.value.nombre = '';
    this.form.value.image = '';
    this.form.value.ataque = 0;
    this.form.value.defensa.value = 0;
    this.ataqueValor = 0;
    this.defensaValor = 0;
  }

  addPOkemon(){
    this.pokemon = {
      id:-1,
      name:this.form.get('nombre')?.value,
      image:this.form.get('image')?.value,
      type: 'normal',
      hp: 50,
      attack:this.form.get('ataque')?.value,
      defense:this.form.get('defensa')?.value,
      created_at: new Date(),
      updated_at: new Date(),
      idAuthor:1
      };

      if(this.estado == 'nuevo'){
      this.poekemonService.postPokemon(this.pokemon).subscribe(result =>{
        this.estado ='visor'
        this.pokemons?.push(this.pokemon!);
       console.log('estoy aca')
      },
      err => {window.alert(`Error server (post): ${err}`)})
     }else if(this.estado == 'editar'){this.update(this.form.get('id')?.value,this.pokemon)}
  }

  cancelar(){
    this.estado = 'visor';
  }

  editarPokemon(id:any){
     this.estado = 'editar'
     console.log('editar Poks1: ',this.pokemons)
     console.log('editar Poks1 id: ',id)
     this.poekemonService.getPokemon(id).subscribe(resp =>{
      this.form.controls['id'].setValue(resp.id);
      this.form.controls['nombre'].setValue(resp.name);
      this.form.controls['image'].setValue(resp.image);
      this.form.controls['ataque'].setValue(resp.attack);
      this.form.controls['defensa'].setValue(resp.defense);
     })
  }

update(id:any,poke:Pokemon){
     this.poekemonService.editPokemon(id,poke).subscribe(resp => {
      this.cargarDatos();
      this.estado = "visor";
      alert('Se actualizó el pokemon');
    })
}

eliminarPokemon(id:any){
     if (confirm('¿Esta seguro de eliminar ese Pokemon?')){
        this.poekemonService.delete(id).subscribe(resp =>{
          this.cargarDatos();
          alert('Se elimino con exito el pokemon');
     })
     }
  }

buscar(valor:any){
  if(valor.keyCode ===13){
    if(this.buscarValor)
      {this.pokemons = this.pokemons?.filter(pok => pok.name == this.buscarValor)}
     else if(this.buscarValor =='') {this.cargarDatos()}
  }
  }
}
