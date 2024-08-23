import * as vscode from 'vscode';
import { registerNavigateCommand } from './commands/navigateCommand';
import { registerCreateExtensionCommand } from './commands/createExtensionCommand';
import { registerPhpDefinitionProvider } from './providers/phpDefinitionProvider';
import { registerXmlDefinitionProvider } from './providers/xmlDefinitionProvider';
import { outputChannel } from './logger';

export function activate(context: vscode.ExtensionContext) {
    outputChannel.appendLine('Adobe Commerce Tools extension is now active!');
    registerNavigateCommand(context);
    registerCreateExtensionCommand(context);
    registerPhpDefinitionProvider(context);
    registerXmlDefinitionProvider(context)
}

export function deactivate() {}