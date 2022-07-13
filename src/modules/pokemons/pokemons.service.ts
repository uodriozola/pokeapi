import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonClient } from 'pokenode-ts';

@Injectable()
export class PokemonsService {
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll() {
    const api = new PokemonClient();
    return api.listPokemons();
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
