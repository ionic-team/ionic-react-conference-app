var Route = (function () {
    function Route() {
        this.componentProps = {};
        //@Prop() match: any;
        this.match = {};
    }
    Route.prototype["componentWillLoad"] = function () {
        /*
            this.routerInstance = document.querySelector(this.router)
        
            // HACK
            this.routerInstance.addEventListener('ionRouterNavigation', (e) => {
              this.match = e.detail;
            })
        */
    };
    Route.prototype.render = function () {
        /*
            this.match.url = this.routerInstance.$instance.routeMatch.url;
            const match = this.match
            const ChildComponent = this.component
        
            console.log('Does match match?', match.url, this.url)
        
            //return <p></p>;
        
            if(match.url == this.url) {
              console.log(`  <ion-route> Rendering route ${this.url}`, router, match);
              return (<ChildComponent props={this.componentProps} />);
            } else {
              return null;
            }
        */
    };
    return Route;
}());
export { Route };
