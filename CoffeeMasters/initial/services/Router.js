const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            });
        });  
        // It listen for history changes
        window.addEventListener('popstate',  event => {
            Router.go(event.state.route, false);
        });
        // Process initial URL   
        Router.go(location.pathname);
    },
    setMetadata(title, color) {
        document.title = `${title}`
        document.querySelector("meta[name=theme-color]").content = color;
    },
    go: async (route, addToHistory=true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                Router.setMetadata("Menu", "#43281C");
                break;
            case "/order":
                await import("import OrderPage from './components/OrderPage.js'")
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {                
                    pageElement = document.createElement("details-page");
                    pageElement.dataset.productId = route.substring(route.lastIndexOf("-")+1);
                }
                break;   
        }
        if (pageElement) {
            function changePage() {
                // get current page element            
                let currentPage = document.querySelector("main").firstElementChild; 
                if (currentPage) {
                    currentPage.remove();
                    document.querySelector("main").appendChild(pageElement);
                } else {
                    document.querySelector("main").appendChild(pageElement);
                }
            }
            document.startViewTransition(() => changePage());
        }

        window.scrollX = 0;
    }
}

export default Router;