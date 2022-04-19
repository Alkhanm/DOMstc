
import { computed, ComputedRef, reactive } from "vue";
import { IAlert } from "../domain/interfaces/IAlert";

interface IAlertStore {
    state: {
        list: IAlert[]
    },
    actions: {
        add: (error: IAlert) => void;
        remove: () => void;
        removeAll: () => void;
    },
    getters: {
        getLast: () => ComputedRef<IAlert>;
    }
}

const AlertStore: IAlertStore = {
    state: reactive({
        list: [] as IAlert[]
    }),
    actions: {
        add: (error: IAlert) => {
            AlertStore.state.list.push(error);
        },
        remove: () => {
            AlertStore.state.list.pop()
        },
        removeAll: () => {
            AlertStore.state.list = []
        }
    },
    getters: {
        getLast: () => computed<IAlert>(() => AlertStore.state.list[AlertStore.state.list.length - 1])
    }
}

export {
AlertStore
};
