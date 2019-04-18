const vscode = require('vscode');
const fs = require('fs');

const config = exports.config = vscode.workspace.getConfiguration('crystalUI');

function load(extpath) {
    const picpath = extpath + '\\img';
    addCSS(picpath);
}
exports.load = load;

function close() {
    const csspath = '.\\resources\\app\\out\\vs\\workbench\\workbench.main.css';
    fs.readFile(csspath, function (err, date) {
        if (err) {
            vscode.window.showErrorMessage('Can\'t find the css file');
        } else {
            let cssaim = date.toString('utf8');
            let pos2 = cssaim.lastIndexOf('$');
            if (pos2 != -1) {
                let pos1 = cssaim.lastIndexOf('$', pos2 - 1);
                cssaim = cssaim.substring(0, pos1 - 2) + cssaim.substring(pos2 + 3);
                fs.writeFile(csspath, cssaim, function (err) {
                    if (err) {
                        vscode.window.showErrorMessage('Can\'t delete the css');
                    }
                });
            }
        }
    });
}
exports.close = close;

function addCSS(picpath) {
    const csspath = '.\\resources\\app\\out\\vs\\workbench\\workbench.main.css';
    fs.readFile(csspath, function (err, date) {
        if (err) {
            vscode.window.showErrorMessage('Can\'t find the css file');
        } else {
            // if the backpic is put as a foreground,we can just change the css of 'body'
            // else we shoule change the css of '.monaco-workbench'
            let cssaim = date.toString('utf8');
            let pos2 = cssaim.lastIndexOf('$');
            if (pos2 != -1) {
                let pos1 = cssaim.lastIndexOf('$', pos2 - 1);
                if (pos1 == -1) {
                    vscode.window.showErrorMessage('Seems the css added has been edited.Appended a new css paragraph.');
                } else
                    cssaim = cssaim.substring(0, pos1 - 2) + cssaim.substring(pos2 + 3);
            }
            cssaim += "\n/*$----Plugin crystalUI added---*/\n\n";
            picpath = picpath.replace(/\\/g, '/');
            let winpic = config.get('window.backpic');
            if (isNone(winpic) || winpic == '') winpic = picpath + '/backpic.jpg';
            if (config.get('window.foreground'))
                cssaim += "body {\n"
                    + "\topacity:" + config.get('window.opacity') + "!important;\n"
                    + "\tbackground-image: url('" + winpic + "')!important;\n"
                    + "\tbackground-size: cover!important;\n"
                    + "}\n";
            else {
                cssaim += ".monaco-workbench {\n"
                    + "\tbackground-image: url('" + winpic + "')!important;\n"
                    + "\tbackground-size: cover!important;\n"
                    + "}\n";
                let picarry = config.editor;
                for (let i = 0; i < 3; ++i) {
                    if (isNone(picarry.backpic[i]))
                        continue;
                    if (picarry.backpic[i] == '') picarry.backpic[i] = picpath + '/editor.png';
                    if (isNone(picarry.bkgrdOpacity[i]))
                        picarry.bkgrdOpacity[i] = 0;
                    if (isNone(picarry.bkgrdPosition[i]) || picarry.bkgrdPosition[i] == '')
                        picarry.bkgrdPosition[i] = "right bottom";
                    cssaim += "[id=\"workbench.parts.editor\"] .split-view-view:nth-child(" + (i + 1) + ") .editor-container .overflow-guard>.monaco-scrollable-element::before {\n"
                        + "\tbackground-image: url('" + picarry.backpic[i] + "');\n"
                        + "\tcontent:'';\n"
                        + "\tposition:absolute;\n"
                        + "\twidth:100%;\n"
                        + "\theight:100%;\n"
                        + "\tbackground-position:" + picarry.bkgrdPosition[i] + ";\n"
                        + "\tbackground-repeat:no-repeat;\n"
                        + "\topacity:" + picarry.bkgrdOpacity[i] + ";\n"
                        + "}\n"
                }
            }
            cssaim += "\n/*-----------------------------$*/";
            fs.writeFile(csspath, cssaim, function (err) {
                if (err) {
                    vscode.window.showErrorMessage('Can\'t write the css file');
                }
            });
        }
    });
}


function isNone(x) {
    if (typeof x == "undefined" || x == null)
        return true
    return false
}