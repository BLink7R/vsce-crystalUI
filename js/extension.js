const vscode = require('vscode');
const fs = require('fs');
const crystalUI = require('./crystalui');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const extpath = context.asAbsolutePath('.');

	context.subscriptions.push(vscode.commands.registerCommand('extension.openCrystalUI', function () {
		crystalUI.load(extpath);
		vscode.window.showInformationMessage('Crystal mode opend.Choose the "crystal ui" theme and you can see what has happened!'
			, { title: 'Restart vscode' })
			.then(function (item) {
				if (!item) return;
				vscode.commands.executeCommand('workbench.action.reloadWindow');
			});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.clsCrystalUI', function () {
		crystalUI.close();
		vscode.window.showInformationMessage('Crystal mode closed.', { title: 'Restart vscode' })
			.then(function (item) {
				if (!item) return;
				vscode.commands.executeCommand('workbench.action.reloadWindow');
			});
	}));

}
exports.activate = activate;

function deactivate() {
	console.log('The extension "crystalUI" is deactived!');
}
exports.deactivate = deactivate;
