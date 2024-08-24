import * as vscode from 'vscode';


export function registerUrlDecodeCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('adobeCommerceTools.urlDecode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);

            try {
                const decodedText = decodeURIComponent(selectedText);
                const urlObj = new URL(decodedText);
                const queryParam = urlObj.searchParams.get('query');
                const variablesParam = urlObj.searchParams.get('variables');

                if (queryParam && variablesParam) {
                    let gqlQuery = decodeURIComponent(queryParam);
                    const gqlVariables = JSON.stringify(JSON.parse(decodeURIComponent(variablesParam)), null, 2);

                    // Remove __typename fields
                    gqlQuery = gqlQuery.replace(/__typename\s*/g, '');

                    // Replace \u0021 with !
                    gqlQuery = gqlQuery.replace(/\\u0021/g, '\n');

                    // Beautify the GraphQL query
                    const formattedGqlQuery = beautifyGraphQL(gqlQuery);

                    const result = `Query:\n${formattedGqlQuery}\n\nVariables:\n${gqlVariables}`;

                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, result);
                    });
                } else {
                    vscode.window.showErrorMessage('Failed to extract GraphQL query or variables from the URL');
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to decode URL: ' + error);
            }
        } else {
            vscode.window.showInformationMessage('No text editor is active');
        }
    });

    context.subscriptions.push(disposable);
}

function beautifyGraphQL(query: string): string {
    let indentLevel = 0;
    return query
        .replace(/([,{])/g, '$1\n')
        .replace(/}/g, '\n}')
        .replace(/\n\s*\n/g, '\n')
        .split('\n')
        .map(line => {
            if (line.includes('}')) {
                indentLevel--;
            }
            const indentedLine = '  '.repeat(indentLevel) + line.trim();
            if (line.includes('{')) {
                indentLevel++;
            }
            return indentedLine;
        })
        .join('\n');
}