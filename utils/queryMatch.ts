export const queryMatch =
    (label: string, query: string) =>
        query.length < 2 || label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
