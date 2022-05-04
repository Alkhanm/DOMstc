import moment from "moment";

export function diaSemana (dia: number): string {
    const semana: string[] = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    return semana[dia];
}

export function mesExtenso (m: number): string {
    const me: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return me[m];
}

export function dateNowToApiStrDate (): string {
    // api date "2021-10-12T00:00:00.000Z"
    return moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
}

export function dateToApiStrDate (v: Date | null): string | null {
    // api date "2021-10-12T00:00:00.000Z"
    let strDate: string | null = null;
    if (v) {
        strDate = moment(v).format("YYYY-MM-DDTHH:mm:ss.SSS");
    }
    return strDate;
}

export function now (): Date {
    return moment().toDate();
}
