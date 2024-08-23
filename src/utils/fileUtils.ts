import * as fs from 'fs';
import * as path from 'path';
import { outputChannel } from '../logger';

export function findPhpFile(dir: string, className: string): string | null {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            const result = findPhpFile(filePath, className);
            if (result) {
                return result;
            }
        } else if (file.endsWith('.php') && file.includes(className)) {
            return filePath;
        }
    }
    return null;
}