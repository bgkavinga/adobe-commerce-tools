import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function registerCreateExtensionCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('adobeCommerceTools.createAdobeCommerceExtension', async () => {
        const extensionName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the Adobe Commerce extension',
            placeHolder: 'Vendor_Module'
        });

        if (!extensionName) {
            vscode.window.showErrorMessage('Extension name is required');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder is open');
            return;
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        const extensionPath = path.join(workspaceRoot, 'app', 'code', ...extensionName.split('_'));

        if (fs.existsSync(extensionPath)) {
            vscode.window.showErrorMessage('Extension already exists');
            return;
        }

        // Create necessary directories recursively
        fs.mkdirSync(path.join(extensionPath, 'etc'), { recursive: true });
        fs.mkdirSync(path.join(extensionPath, 'Controller'), { recursive: true });
        fs.mkdirSync(path.join(extensionPath, 'Model'), { recursive: true });
        fs.mkdirSync(path.join(extensionPath, 'view', 'frontend', 'templates'), { recursive: true });

        fs.writeFileSync(path.join(extensionPath, 'registration.php'), `<?php
use Magento\\Framework\\Component\\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::MODULE,
    '${extensionName}',
    __DIR__
);`);

        fs.writeFileSync(path.join(extensionPath, 'etc', 'module.xml'), `<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="${extensionName}" />
</config>`);

        vscode.window.showInformationMessage(`Adobe Commerce extension ${extensionName} created successfully`);
    });

    context.subscriptions.push(disposable);
}