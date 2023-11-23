import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import MainLayout from "./Layouts/MainLayout.vue";

createInertiaApp({
    //need a fuction that will tell inertia where to look for the view components with pages
    resolve: (name) => {
        // every page component needs to be imported
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        // return the specific component for the given page name
        const page = pages[`./Pages/${name}.vue`];
        page.default.layout = page.default.layout || MainLayout; 
        return page
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el);
    },
});
