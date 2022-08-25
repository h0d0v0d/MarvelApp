import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, itemLoading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=f6ce90ebfaaa2fc898cae0d00d44fdf2'
    const _offsetBase = '1300'
 
    const getAllCharacters = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transform)
    };

    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transform(res.data.results[0])
    };

    const getAllComics = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return comicsTransform(res.data.results)
    }

    const _transform = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url, 
            comicsList : char.comics.items
        }
    }

    const comicsTransform = (comics) => {
        return comics.map((oneComics, i) => {
            return (
                {
                    id: oneComics.id,
                    title: oneComics.title,
                    thumbnail: `${oneComics.thumbnail.path}.${oneComics.thumbnail.extension}`,
                    price: oneComics.prices[0].price
                }
            )
        })
    }

    return {
        loading,
        itemLoading,
        error, 
        clearError,
        getAllCharacters, 
        getOneCharacter,
        getAllComics
    }
};

export default useMarvelService;































/* 

getResources = async (url) => {
    const res = await fetch(url);  

    if (!res.ok) {
        throw new Error(`Не получается отправитть запрос на сервер ${url}, стастус ошибки - ${res.status}`);
    }
    return await res.json(); 
};

getSeveralCharcters = async (number) => {
    const res = await this.getResources(`${this._apiBase}characters?limit=${number}&${this._offsetBase}&${this._apiKey}`)
    return res.data.results.map(this._transform)
}

 */



