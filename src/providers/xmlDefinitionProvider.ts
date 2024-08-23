import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { outputChannel } from '../logger';


export function registerXmlDefinitionProvider(context: vscode.ExtensionContext) {
    const definitionProvider = vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'xml' }, {
        provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
            const range = document.getWordRangeAtPosition(position, /[A-Za-z0-9_\\/:.]+/);
            const word = document.getText(range);

        if (!word) {
            return null;
        }

        
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return null;
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;

        let filePath: string | null = null;

        if (word.endsWith('.phtml')) {
            filePath = findPhtmlFile(workspaceRoot, word);
        } else if (word.includes('\\')) {
            filePath = findPhpFile(workspaceRoot, word);
        }

        if (filePath) {
            return new vscode.Location(vscode.Uri.file(filePath), new vscode.Position(0, 0));
        }

        return null;
        }
    });

    context.subscriptions.push(definitionProvider);
}

function findPhpFile(workspaceRoot: string, className: string): string | null {
    const classPath = className.replace(/\\/g, path.sep) + '.php';
    // Check in app/code directory
    const phpClassPathAppCode = path.join(workspaceRoot, 'app', 'code', classPath);
    if (fs.existsSync(phpClassPathAppCode)) {
        return phpClassPathAppCode;
    }

    // Check in vendor directory
    const phpClassPathVendor = path.join(workspaceRoot, 'vendor', classPath);
    if (fs.existsSync(phpClassPathVendor)) {
        return phpClassPathVendor;
    }

    // Handle Magento namespace
    if (className.startsWith('Magento\\')) {
        const magentoClassPath = className.replace('Magento\\', 'magento/module-').replace(/\\/g, path.sep) + '.php';
        const phpClassPathMagento = path.join(workspaceRoot, 'vendor', magentoClassPath);
        if (fs.existsSync(phpClassPathMagento)) {
            return phpClassPathMagento;
        }
    }
    return null;
}

const findPhtmlFile = (workspaceRoot: string, fileName: string): string | null => {
    if (fileName.includes('::')) {
        const [namespace, relativePath] = fileName.split('::');
        const modulePath = namespace.replace('Magento_', '').toLowerCase();
        const templatePathVendor = path.join(workspaceRoot, 'vendor', `magento/module-${modulePath}`, 'view', 'frontend', 'templates', relativePath.replace(/\//g, path.sep));
        if (fs.existsSync(templatePathVendor)) {
            return templatePathVendor;
        }
    }

    const templatePathAppCode = path.join(workspaceRoot, 'app', 'code', 'Vendor', 'Module', 'view', 'frontend', 'templates', fileName.replace(/\//g, path.sep));
    if (fs.existsSync(templatePathAppCode)) {
        return templatePathAppCode;
    }

    return null;
};