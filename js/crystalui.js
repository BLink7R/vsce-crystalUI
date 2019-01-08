const vscode = require('vscode');
const fs = require('fs');

const config = exports.config = vscode.workspace.getConfiguration('crystalUI');

function load(extpath) {
    const jsonpath = extpath + '\\json\\crystal-out.json';
    const defaultpic = extpath + '\\img\\backpic.jpg';
    const picpath = config.get("backpicPath");
    if (typeof picpath == "undefined" || picpath == null || picpath == '')
        addCSS(defaultpic);
    else addCSS(picpath);
    if (!config.get('foreground')) addJSON(jsonpath);
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
            console.log(pos2);
            if (pos2 != -1) {
                let pos1 = cssaim.lastIndexOf('$', pos2 - 1);
                console.log(pos2, pos1);
                cssaim = cssaim.substring(0, pos1 - 2) + cssaim.substring(pos2 + 3);
                fs.writeFile(csspath,cssaim, function (err) {
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
            // else we shoule change the css of '#workbench.main.container'
            let _str;
            let cssaim = date.toString('utf8');
            console.log("--", cssaim.lastIndexOf('$'));
            if (cssaim.lastIndexOf('$') != -1) return;
            if (config.get('foreground')) {
                _str = "\n/*$Plugin crystalUI added*/\n\n"
                    + "body {\n"
                    + "	background-image: url(file:///" + picpath + ")!important;\n"
                    + "	background-size: cover!important;"
                    + "}\n\n"
                    + "/*---------------------$*/\n";
            } else {
                _str = "\n/*$Plugin crystalUI added*/\n\n"
                    + "[id=\"workbench.main.container\"] {\n"
                    + "	background-image: url(file:///" + picpath + ")!important;\n"
                    + "	background-size: cover!important;\n"
                    + "}\n\n"
                    + "/*---------------------$*/\n";
            }
            fs.appendFile(csspath, _str, function (err) {
                if (err) {
                    vscode.window.showErrorMessage('Can\'t write the css file');
                }
            });
        }
    });
}

function addJSON(jsonpath) {
    const window = [
        "editor.background",
        "activityBar.background",
        "titleBar.activeBackground",
        "sideBar.background",
    ];
    const lists = [
        "list.hoverBackground",
        "list.inactiveSelectionBackground",
        "list.focusBackground",
        "list.dropBackground",
        "sideBarSectionHeader.background",
        "dropdown.background",
        "dropdown.listBackground",
        "input.background",
    ];
    const invis = [
        "editorGroupHeader.tabsBackground",
        "panel.border"
        // this 2 settings should be set to invisible
    ];
    const solid = ["terminal.background",];
    jsonpath = jsonpath.replace('\\', '/');
    fs.readFile(jsonpath, function (err, date) {
        if (err) {
            vscode.window.showErrorMessage('Can\'t find the theme file');
        } else {
            let themeconf = JSON.parse(date.toString('utf8'));
            addOpacity(themeconf, window, (Math.ceil(config.get('opacity') * 255)).toString(16));
            addOpacity(themeconf, lists, (Math.ceil(config.get('listsOpacity') * 255)).toString(16));
            addOpacity(themeconf, invis, '00');
            addOpacity(themeconf, solid, '');
            //the terminal background can't have a opacity because there is a black block under it
            fs.writeFile(jsonpath, JSON.stringify(themeconf, null, 4), function (err) {
                if (err) {
                    vscode.window.showErrorMessage('Can\'t write the theme file');
                }
            });
        }
    });
}

function addOpacity(jsonobj, arry, val) {
    for (let str of arry) {
        let aim = jsonobj.colors[str];
        if (aim.length == 4) jsonobj.colors[str] = aim + val.substring(0, 2); //#RGBA
        else if (aim.length == 7) jsonobj.colors[str] = aim + val; //#RRGGBBAA
        // console.log(jsonobj.colors[str]);
    }
}
