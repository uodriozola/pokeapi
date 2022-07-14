import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonClient } from 'pokenode-ts';
import { QueryPokemonDto } from './dto/query-pokemon.dto';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonsService {
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll(query: QueryPokemonDto): Observable<PokemonDto[]> {
    console.log('query', query);
    const cache = 1000 * 60 * 60;
    const api = new PokemonClient({ cacheOptions: { maxAge: cache } });
    return from(api.listPokemons(query.offset * query.limit, query.limit)).pipe(
      switchMap((pokemonList) => {
        const detailsListObservables: Observable<PokemonDto>[] = [];

        for (const pokemon of pokemonList.results) {
          detailsListObservables.push(
            from(api.getPokemonByName(pokemon.name)).pipe(
              map((poke) => new PokemonDto(poke)),
            ),
          );
        }
        return forkJoin(detailsListObservables);
      }),
    );
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
