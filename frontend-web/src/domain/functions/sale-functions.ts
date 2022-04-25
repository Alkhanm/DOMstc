
import { computed, ComputedRef } from "vue";
import { ISale } from "../interfaces/ISale";

function useSaleInfo(sale: ComputedRef<ISale | undefined>) {
    const salePrice = computed(() => sale.value?.items
        .map(item => item.product.salePrice * item.quantity)
        .reduce((previous, current) => previous + current, 0) || 0
    )
    const saleTitle = computed(() => {
        let title = "";
        const items = sale.value?.items ? sale.value.items : [];
        const size = items.length;
        if (sale.value?.description) return sale.value.description
        if (size >= 1) title = `${title}${items[0].product.description}`;
        if (size >= 2) title = `${title}, ${items[1].product.description}`;
        if (size >= 3) title = `${title}, ${items[2].product.description}`;
        title.toUpperCase()
        if (size >= 4) title = `${title} e mais ${size - 3}`;
        return title;
    })
    const saleProductQnt = computed(() => sale.value?.items
        .map(sale => sale.quantity)
        .reduce((previous, current) => previous + current) || 0
    );
    return {
        salePrice,
        saleTitle,
        saleProductQnt,
    }
}

export const SaleFunctions = {
    useSaleInfo
}