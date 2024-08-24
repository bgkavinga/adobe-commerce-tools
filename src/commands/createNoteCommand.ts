import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerCreateNoteCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('adobeCommerceTools.createNote', async () => {
        let noteName = await vscode.window.showInputBox({ prompt: 'Enter note name' });
        if (!noteName) {
            noteName = 'notes';
        }
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            const notesDir = path.join(workspaceFolders[0].uri.fsPath, '.vscode', 'notes');
            if (!fs.existsSync(notesDir)) {
                fs.mkdirSync(notesDir, { recursive: true });
            }
            const notePath = path.join(notesDir, `${noteName}.md`);
            let noteContent = `# ${noteName}\n\n`;

            // Extract versions from composer.lock
            const composerLockPath = path.join(workspaceFolders[0].uri.fsPath, 'composer.lock');
            if (fs.existsSync(composerLockPath)) {
                const composerLock = JSON.parse(fs.readFileSync(composerLockPath, 'utf8'));
                const packages = composerLock.packages || [];
                const packageVersions = packages
                    .filter((pkg: any) => [
                        'magento/magento2-base',
                        'magento/magento2-ee-base',
                        'magento/live-search',
                        'magento/product-recommendations',
                        'magento/magento2-b2b-base',
                        'adobe-commerce/catalog-adapter'
                    ].includes(pkg.name))
                    .map((pkg: any) => `${pkg.name}: ${pkg.version}`)
                    .join('\n');
                noteContent += `## Composer Package Versions\n\n${packageVersions}\n\n`;
            }

            if (fs.existsSync(notePath)) {
                const document = await vscode.workspace.openTextDocument(notePath);
                await vscode.window.showTextDocument(document);
            } else {
                fs.writeFileSync(notePath, noteContent);
                const document = await vscode.workspace.openTextDocument(notePath);
                await vscode.window.showTextDocument(document);
            }
        }
    });

    context.subscriptions.push(disposable);
}