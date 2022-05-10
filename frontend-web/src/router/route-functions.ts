import { RouteLocationNormalized, Router } from "vue-router";

export const RoutesGuards = (router: Router) => ({

    notFoundGuard: (to: RouteLocationNormalized) => {
        const exists = router.getRoutes().some(route => route.name === to.name);
        if (!exists) router.push("/not-found")
    }

})