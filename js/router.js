var Router = function (options) {
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    this.init();
}

Router.prototype = {
    init: function () {
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function () {
        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        let route = this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });
        return route;
    },
    getRouteParams(route, url) {
        var params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        let previousRoute = this.findPreviousActiveRoute();
        let newRoute = this.findNewActiveRoute(url);
        let routeParams = this.getRouteParams(newRoute, url);
        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
            this.currentRoute = newRoute;
            this.currentRouteParams = routeParams;
        });
    },
};

var router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onEnter: () => {document.querySelector('#about').style.display = 'block';
                        render.cloasGameOver();
                       },
        onLeave: () => document.querySelector('#about').style.display = 'none'
    }, {
        name: 'game',
        match: (text) => text === 'game',
        onEnter: () => {

            document.querySelector('#game').style.display = 'block';
            render.setSizeField();

            player.startGame();

        },
        onLeave: () =>{
            document.querySelector('#game').style.display = 'none';
            player.stop();
			
        }
    },{
        name: 'records',
        match: (text) => text === 'records',
        onEnter: () => {
            render.cloasGameOver();
            document.querySelector('#records').style.display = 'block';
            render.outPutRecord();
        },
        onLeave: () => 
        document.querySelector('#records').style.display = 'none'

    }]
});