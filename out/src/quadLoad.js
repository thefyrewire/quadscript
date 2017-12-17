"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process")
const path = require("path");
const vscode = require("vscode");
const fs = require("fs")
let objects;
let oc = vscode.window.createOutputChannel('QuadScript Objects');
let statusBarObjectsButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
let statusBarReloadButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

function main() {
    const config = vscode.workspace.getConfiguration('quadscript');
    const getObjects = config.get('getObjects');
    if (getObjects == false) {
        statusBarObjectsButton.text = '$(check)  Enable Objects';
        statusBarObjectsButton.command = 'quadscript.enableObjects';
        statusBarObjectsButton.tooltip = 'Enable getting objects';
        statusBarObjectsButton.show();
        statusBarReloadButton.hide();
    } else {
        statusBarObjectsButton.text = '$(x)  Disable Objects';
	    statusBarObjectsButton.command = 'quadscript.disableObjects';
        statusBarObjectsButton.tooltip = 'Disable getting objects';
        statusBarObjectsButton.show();
        statusBarReloadButton.show();
        statusBarReloadButton.tooltip = 'Reload window to refresh objects';
        oc.show(false);
    }
    statusBarReloadButton.text = '$(sync)  Reload';
    statusBarReloadButton.command = 'workbench.action.reloadWindow';
    return [
        vscode.commands.registerCommand("quadscript.enableObjects", enableObjects),
        vscode.commands.registerCommand("quadscript.disableObjects", disableObjects)
	];
}

function enableObjects() {
    try {
        const config = vscode.workspace.getConfiguration('quadscript');
        const getObjects = config.get('getObjects');
        if (getObjects == false) {
            config.update('getObjects', true, true).then((r)=> {
                vscode.window.showInformationMessage("[QuadScript] Enabled getting map objects. Reload the window to see changes.", "Reload").then(selected=> {
                    if (selected === 'Reload') {
                        vscode.commands.executeCommand('workbench.action.reloadWindow');
                    }
                });
                statusBarReloadButton.show()
            });
            statusBarObjectsButton.hide();
            statusBarReloadButton.tooltip = 'Reload window to show objects';
        } else {
            vscode.window.showErrorMessage("[QuadScript] Getting map objects is already enabled, but you may need to reload the window to see changes.");
        }
    }
    catch (e) {
        vscode.window.showErrorMessage("[QuadScript] Enabling objects failed. Error: " + e);
    }
}
function disableObjects() {
    try {
        const config = vscode.workspace.getConfiguration('quadscript');
        const getObjects = config.get('getObjects');
        if (getObjects == true) {
            config.update('getObjects', false, true).then((r)=> {
                vscode.window.showInformationMessage("[QuadScript] Disabled getting map objects. Reload the window to remove current objects.", "Reload").then(selected=> {
                    if (selected === 'Reload') {
                        vscode.commands.executeCommand('workbench.action.reloadWindow');
                    }
                });
                statusBarReloadButton.show();
            });
            statusBarObjectsButton.hide();
            statusBarReloadButton.tooltip = 'Reload window to remove objects';
        } else {
            vscode.window.showErrorMessage("[QuadScript] Getting map objects is already disabled, but you may need to reload the window to see changes.");
        }
    }
    catch (e) {
        vscode.window.showErrorMessage("[QuadScript] Disabling objects failed. Error: " + e);
    }
}

function loadObjects() {
    try {
        const config = vscode.workspace.getConfiguration('quadscript');
        const getObjects = config.get('getObjects');

        if (getObjects == true) {
            vscode.window.showWarningMessage('[QuadScript] Typing something now may cause the editor to crash. Please wait for map objects to load.');
            const root = vscode.workspace.workspaceFolders;

            if (root) {
                const rootPath = root[0].uri.toString(true);
                //vscode.window.showInformationMessage(rootPath);
                var objArray = new Array;

                function readTextFile() {
                    var name = (path.parse(vscode.window.activeTextEditor.document.fileName).name);
                    /*vscode.workspace.findFiles(name + '.map').then((d)=> {
                        vscode.window.showInformationMessage(d.toString());
                    });*/
                    checkMatchingMap();
                    
                    function checkMatchingMap() {
                        vscode.workspace.findFiles("*.map").then((d)=> {
                            var matchingMap = d.find(matchName);

                            function matchName(matchThis) {
                                var parsedName = (path.parse(matchThis.toString()).name)
                                return parsedName == name;
                            }
                            
                            if (matchingMap) {
                                var parsedName = (path.parse(matchingMap.toString()).name)
                                oc.appendLine(name + '.map');
                                oc.appendLine('--------------');
                                //vscode.window.showInformationMessage("A matching map exists. " + parsedName + " matches " + name);
                                vscode.workspace.openTextDocument(openPath).then((d)=> {
                                    //vscode.window.showInformationMessage("[Document Opened]: " + path.basename(d.fileName));
                                    var text = d.getText();
                                    var regex = /\"classname\"\s\"(\w+)\"(?:\r\n|[\r\n])\"name\"\s\"(\w+)\"/g;
                                    getMatches(text, regex);
                                });
                            } else {
                                vscode.window.showErrorMessage("[QuadScript] No matching map exists. No objects can be loaded.");
                            }
                        });
                    }
                    
                    var openPath = vscode.Uri.parse(rootPath + '/' + name + '.map');
                    //vscode.window.showInformationMessage(openPath.toString());
                }

                readTextFile();

                function getMatches(string, regex) {
                    let match;
                    while (match = regex.exec(string)) {
                        // capture group 1 = classname
                        // capture group 2 = name
                        // pushing name first because it's more important
                        objArray.push([match[2], match[1]]);
                    }
                    addObjects();
                }

                //objArray.push("amazing", "awesome", "great");
                var loop1 = function (i) {
                    vscode.languages.registerCompletionItemProvider('quadscript', {
                        provideCompletionItems: function () {
                            let compItem = new vscode.CompletionItem(objArray[i][0], vscode.CompletionItemKind.Variable);
                            compItem.insertText = ("$" + objArray[i][0]);
                            compItem.detail = (objArray[i][1]);
                            return [
                                compItem
                            ];
                        }
                    });
                    oc.appendLine(objArray[i][0] + ' : ' + objArray[i][1]);
                }

                function addObjects() {
                    for (var i = 0; i < objArray.length; i++) {
                        loop1(i);
                    }
                    vscode.window.showInformationMessage("[QuadScript] All " + objArray.length + " objects have been loaded.");
                }
                
            } else {
                vscode.window.showWarningMessage("[QuadScript] Getting map objects is enabled, but you don't have a folder opened. Objects will not be loaded.");
            }
        } else {
            //vscode.window.showInformationMessage('[QuadScript] Getting objects is currently disabled.');
        }
    }
    catch (e) {
        vscode.window.showErrorMessage('[QuadScript] Getting objects failed. Error: ' + e);
    }
}
exports.loadObjects = loadObjects;
exports.main = main;