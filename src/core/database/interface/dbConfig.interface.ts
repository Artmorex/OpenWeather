export interface IDatabaseConfigAttributes {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number | string;
    dialect?: string;
    urlDatabase?: string;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}

// export interface IDatabaseConfigAttributes {
//     report_id: string,
//     lat: string;
//     lon: string;
//     timezone?: string;
//     timezone_offset?: string;
//     current?: JSON;
//     hourly?: JSON;
//     daily?: JSON;
// }