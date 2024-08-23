import * as vscode from 'vscode';
import { findPhpFile } from '../utils/fileUtils';
import { outputChannel } from '../logger';

export function registerPhpDefinitionProvider(context: vscode.ExtensionContext) {
    const definitionProvider = vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'php' }, {
        provideDefinition(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            outputChannel.appendLine(`Word under cursor: ${word}`);
            if (word) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders) {
                    const workspaceRoot = workspaceFolders[0].uri.fsPath;
                    const phpFilePath = findPhpFile(workspaceRoot, word);
                    if (phpFilePath) {
                        return new vscode.Location(vscode.Uri.file(phpFilePath), new vscode.Position(0, 0));
                    }
                }
            }
            return null;
        }
    });

    context.subscriptions.push(definitionProvider);
}