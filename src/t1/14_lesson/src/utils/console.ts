import * as readline from 'readline';

class ConsoleReadline {
    private rl: readline.Interface;
    
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    async read(query: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(query, resolve);
        });
    }
    
    close(): void {
        this.rl.close();
    }
}

export const consoleReadline = new ConsoleReadline();