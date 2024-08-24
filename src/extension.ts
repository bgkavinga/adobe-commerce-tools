import * as vscode from 'vscode';
import { registerCreateExtensionCommand } from './commands/createExtensionCommand';
import { registerPhpDefinitionProvider } from './providers/phpDefinitionProvider';
import { registerXmlDefinitionProvider } from './providers/xmlDefinitionProvider';
import {registerCreateNoteCommand} from './commands/createNoteCommand';
import {registerUrlDecodeCommand} from './commands/urlDecode';
import { outputChannel } from './logger';

export function activate(context: vscode.ExtensionContext) {
    outputChannel.appendLine('Adobe Commerce Tools extension is now active!');
    registerCreateExtensionCommand(context);
    registerPhpDefinitionProvider(context);
    registerXmlDefinitionProvider(context)
    registerCreateNoteCommand(context);
    registerUrlDecodeCommand(context)
}

export function deactivate() {}