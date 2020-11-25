var app = new Vue({
    el: '#root',
    data: {
        search : '',
        movies : [],
        tvShow: [],
        allMedia: [],
        baseUrl : ''
    },
    methods: {
        getSearch() {
            if (this.search != '') {
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: 'ada6c56530afc32ccfe291574cf9f8fa',
                            query: this.search,
                            language: 'it'
                        }
                    }).then((response) => {
                        this.catalog = response.data.results;
                        //reset dell'input search
                        this.search = '';
                    });
                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params:{
                            api_key: 'ada6c56530afc32ccfe291574cf9f8fa',
                            query: this.search,
                            language: 'it'
                        }
                    })
                    .then((response) => {
                        // Assegno al risultato dell'api all'array serie
                        this.tvShow = response.data.results;
                        // Assegno ad uno nuovo array il risultato dei due array film e serie
                        this.allMedia = this.movies.concat(this.tvShow);
                        //reset dell'input search
                        this.search = '';
                    });
            } else {
                this.allMedia = [];
            }
        },
        getVote(vote_average) {
            return Math.round((vote_average * 5) / 10);
        }
    },
    mounted() {
        //Chiamo API su configuration per ottenere il base URL per visualizzare le img dei poster per ogni movie
        axios
        .get('https://api.themoviedb.org/3/configuration', {
            params: {
                api_key: 'ada6c56530afc32ccfe291574cf9f8fa'
            }
        })
        .then((response) => {
            this.baseUrl = response.data.images.base_url;
        });
    }

});
