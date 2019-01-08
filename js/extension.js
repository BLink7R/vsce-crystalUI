const vscode = require('vscode');
const fs = require('fs');
const crystalUI = require('./crystalui');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const version = vscode.version;
	const extpath = context.asAbsolutePath('.');
	const record = extpath + '\\json\\record.json';
	var date = JSON.parse(fs.readFileSync(record).toString('utf8'));
	if (date.activeTime && date.version != version) {
		vscode.window.showInformationMessage("Seems your vscode has been updated,you can use the command 'open crystal UI' to reload the crystal mode");
	}
	date.version = version;
	date.activeTime++;
	fs.writeFile(record, JSON.stringify(date, null, 4), function (err) {
		if (err) {
			vscode.window.showErrorMessage('Can\'t write the record file');
		}
	});

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
		date.activeTime = 0;
		fs.writeFile(record, JSON.stringify(date, null, 4), function (err) {
			if (err) {
				vscode.window.showErrorMessage('Can\'t write the record file');
			}
		});
		vscode.window.showInformationMessage('Crystal mode closed.', { title: 'Restart vscode' })
			.then(function (item) {
				if (!item) return;
				vscode.commands.executeCommand('workbench.action.reloadWindow');
			});
	}));

}
exports.activate = activate;

function deactivate() {
	console.log('your extension "crystalUI" is deactived!');
}
exports.deactivate = deactivate;
