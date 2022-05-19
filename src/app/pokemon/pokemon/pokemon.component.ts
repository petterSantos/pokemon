import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

 subscriptions$:Subscription[]=[];

  constructor(private poekemonService: PokemonService,
    private readonly fb: FormBuilder) {
      this.form = this.fb.group({
        ataque:['', Validators.required],
        defensa:['', Validators.required],
        nombre:['', Validators.required],
        image:['', Validators.required]
      })
 }

  ngOnInit(): void {
    this.poekemonService.getAllPokemons()
    .subscribe(poke =>{ this.pokemons = poke
    console.log(this.pokemons)})

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

  nuevoPokemon(){
    this.estado = 'nuevo';
  }

  addPOkemon(){
    this.pokemon = {
      ...this.pokemon,
       id:-1,
       name:this.form.get('nombre')?.value,
      image:this.form.get('image')?.value,
      attack:this.form.get('ataque')?.value,
      defense:this.form.get('defensa')?.value,
      idAuthor:1,}

      this.poekemonService.postPokemon(this.pokemon).subscribe(result =>{
        this.estado ='visor'
        this.pokemons?.push(this.pokemon!);
       console.log('estoy aca')
      },
      err => {window.alert(`Error server (post): ${err}`)})

  }
  alerta(value:any){
    alert(value)
  }
}
