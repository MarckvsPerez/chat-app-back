import * as dotenv from 'dotenv';

export class EnvironmentConfig {
    private readonly requiredEnvVars: string[] = [
        'SERVER_PORT',
    ];

    public serverPort: string;


    constructor() {
        dotenv.config();
        this.serverPort = '';
        this.checkRequiredEnvVars();
    }

    private checkRequiredEnvVars(): void {
        this.requiredEnvVars.forEach((envVar) => {
            const value = process.env[envVar];
            if (value == null) {
                throw new Error(`Missing required environment variable: ${envVar}`);
            }
            this.setEnvVar(envVar, value);
        });
    }

    private setEnvVar(envVar: string, value: string): void {
        switch (envVar) {
            case 'SERVER_PORT':
                this.serverPort = value;
                break;
        }
    }
}