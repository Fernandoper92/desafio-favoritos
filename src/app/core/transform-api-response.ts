import { CharacterResponse } from './interfaces/api-response/character-response';
import { Character } from './interfaces/character';

export function transformCharactersResponse(
  characters: CharacterResponse[],
  listFavoritesId: number[]
): Character[] {
  return characters.map((character: CharacterResponse) => {
    return {
      id: character.id,
      image: character.image,
      name: character.name,
      species: character.species,
      origin: character.origin.name,
      favorite: listFavoritesId.includes(character.id),
    };
  });
}
