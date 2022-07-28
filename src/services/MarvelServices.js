class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=f6ce90ebfaaa2fc898cae0d00d44fdf2'
    _offsetBase = '1300'
 
    getResources = async (url) => {
        const res = await fetch(url);  
    
        if (!res.ok) {
            throw new Error(`Не получается отправитть запрос на сервер ${url}, стастус ошибки - ${res.status}`);
        }
        return await res.json(); 
    };
 
    getAllCharacters = async (offset = this._offsetBase) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transform)
    };

    getOneCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transform(res.data.results[0])
    };

    getSeveralCharcters = async (number) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=${number}&${this._offsetBase}&${this._apiKey}`)
        return res.data.results.map(this._transform)
    }

    _transform = (char) => {
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
};

export default MarvelService;




