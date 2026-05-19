export declare const env: {
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    jwtSecret: string;
    googleClientIds: string[];
    db: {
        host: string;
        port: number;
        user: string;
        pass: string;
        name: string;
    };
    rabbitmq: {
        url: string;
    };
    smtp: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
    };
};
