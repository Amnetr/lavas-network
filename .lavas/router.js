import Vue from 'vue';
import Router from 'vue-router';

    
import _9d49a922ebc8a6d77ca82c0a74289b98 from '@/pages/Appshell.vue';
    

    
import _188f01c668c45dcf8004bd99e725d259 from '@/pages/blacklist.vue';
    

    
import _d2462dcf0c7beccd286c658e08187914 from '@/pages/Error.vue';
    

    
import _67830448037326425509e44bce7632b7 from '@/pages/Index.vue';
    

    
import _41952aaa68f4e34029efa3f9196b395d from '@/pages/tcp.vue';
    

    
import _55c04ab208ecdef82d4f29dfa70db1e1 from '@/pages/vgws.vue';
    

    
import _e257cf5bf646ae272479b7d0bd5e9ea2 from '@/pages/video.vue';
    

    
import _89a347a9487ecb93ff80cb0a34d46d81 from '@/pages/whitelist.vue';
    


let routes = [
    {
        "path": "/appshell",
        "component": _9d49a922ebc8a6d77ca82c0a74289b98,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/blacklist",
        "component": _188f01c668c45dcf8004bd99e725d259,
        "meta": {},
        "name": "blacklist"
    },
    {
        "path": "/",
        "component": _67830448037326425509e44bce7632b7,
        "meta": {},
        "name": "index"
    },
    {
        "path": "/tcp",
        "component": _41952aaa68f4e34029efa3f9196b395d,
        "meta": {},
        "name": "tcp"
    },
    {
        "path": "/vgws",
        "component": _55c04ab208ecdef82d4f29dfa70db1e1,
        "meta": {},
        "name": "vgws"
    },
    {
        "path": "/video",
        "component": _e257cf5bf646ae272479b7d0bd5e9ea2,
        "meta": {},
        "name": "video"
    },
    {
        "path": "/whitelist",
        "component": _89a347a9487ecb93ff80cb0a34d46d81,
        "meta": {},
        "name": "whitelist"
    },
    {
        "path": "/error",
        "component": _d2462dcf0c7beccd286c658e08187914,
        "meta": {},
        "name": "error",
        "alias": "*"
    }
];

Vue.use(Router);




const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};



export const keepAlivePages = routes.filter(route => route.keepAlive || route.meta.keepAlive)
                            .map(route => route.name);

export function createRouter() {
    let router = new Router({
        mode: 'history',
        base: '/',
        scrollBehavior,
        routes
    });



    

    router.beforeEach((to, from, next) => {
        if (router.app.$store) {
            if (router.app.$store.state.pageTransition.enable) {
                
                let effect = 'fade';
                
                router.app.$store.commit('pageTransition/setType', 'fade');
                router.app.$store.commit('pageTransition/setEffect', effect);
            }
        }
        next();
    });


    return router;
}
