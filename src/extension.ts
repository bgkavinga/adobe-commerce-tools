import * as vscode from 'vscode';
import { registerNavigateCommand } from './commands/navigateCommand';
import { registerCreateExtensionCommand } from './commands/createExtensionCommand';
import { registerPhpDefinitionProvider } from './providers/phpDefinitionProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Adobe Commerce Tools extension is now active!');

    registerNavigateCommand(context);
    registerCreateExtensionCommand(context);
    registerPhpDefinitionProvider(context);
}

export function deactivate() {}