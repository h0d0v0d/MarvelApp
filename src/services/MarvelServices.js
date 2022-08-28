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

    const getOneCharacter = async (id, comics) => {
        const char = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        if (comics) {
            const comics = await request(`${_apiBase}/characters/${id}/comics?${_apiKey}`)
            return _transform(
                char.data.results[0],
                comics.data.results
            )
        } else {
            return _transform(char.data.results[0],)
        }
    };

    const getAllComics = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_comicsTransform)
    }

    const getOneComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _comicsTransform(res.data.results[0])
    }

    const _transform = (char, comicslist) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url, 
            comicsList : typeof(comicslist) === 'object' ?
            comicslist.map((item) => {
                return {
                    id: item.id,
                    title: item.title
                }
            })
            : null
        }
    }

    const _comicsTransform = (comic) => {
        return (
            {
                id: comic.id,
                title: comic.title,
                description: comic.description,
                thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                price: comic.prices[0].price,
                pageCount: `${comic.pageCount} pages`
            }
        )
    }

    return {
        loading,
        itemLoading,
        error, 
        clearError,
        getAllCharacters, 
        getOneCharacter,
        getAllComics,
        getOneComics
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



