import * as vscode from 'vscode';
import { findPhpFile } from '../utils/fileUtils';

export function registerNavigateCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('adobeCommerceTools.navigate', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        const word = document.getText(selection);

        if (word) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const workspaceRoot = workspaceFolders[0].uri.fsPath;
                const phpFilePath = findPhpFile(workspaceRoot, word);
                if (phpFilePath) {
                    vscode.workspace.openTextDocument(phpFilePath).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                } else {
                    vscode.window.showInformationMessage(`PHP file for class ${word} not found.`);
                }
            }
        } else {
            vscode.window.showInformationMessage(`PHP file for class not found.`);
        }
    });

    context.subscriptions.push(disposable);
}