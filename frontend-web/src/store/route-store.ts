import { ref, Ref } from "vue";

export interface DomStcRoute {
    path: string;
    name: string;
}

interface IRouteStore {
    state: {
        routes: Ref<DomStcRoute[]>
    },
    actions: {
        add: (route: DomStcRoute) => void;
    },
}

const RouteStore: IRouteStore = {
    state: {
        routes: ref([])
    },
    actions: {
        add: (route: DomStcRoute) => {
            RouteStore.state.routes.value = RouteStore.state.routes.value.filter(r => r.name !== route.name);
            RouteStore.state.routes.value.push(route);
        }
    },

}

export {
RouteStore
};
