# crystal UI README

The extension 'crystal UI' adds a background pic for your vscode.

## Features

1. press `ctrl+shift+p` , use the command `open crystal UI`
2. restart your vscode
3. change your theme to `'crystal UI'`

Then,your vscode will look like this:

![feature1](https://z131.xyz/img/feature1.jpg)

![feature2](https://z131.xyz/img/feature2.jpg)

It's beautiful,isn't it?  

This ext works by changing vscode's css file(to add a background,and it causes a alarm——just ignore it,I promise that this ext is harmless) and use a independent theme,which adds a opacity to your UI to show the background.

So if you want to turn it off,just choose another theme——this saves you from the trouble to reload vscode.**But remember to use the command `close crystal UI` to turn it off when you want to uninstall this ext!!**

## Some tips

This ext does not function unless you use the command `open crystal UI`. It may seems troublesome,but this avoids slowing down the vscode when it opens.

## Extension Settings

This extension contributes the following settings:

* `crystalUI.useDarkTheme`: whether use dark theme.Use light theme if set to falsu.
* `crystalUI.window.foreground`: if true,the background will float above the whole window. It may looks cool,but it make you hard to recognize the words in the editor. So I strongly recommand you set it to false.
* `crystalUI.window.backpic`: the **absolute** path of the background picture,default if set to *null*.
* `crystalUI.window.opacity`: the opacity of ui in crystal mode,including the titlebar,the sidebar and the activitybar.
* `crystalUI.window.listsOpacity`: the opacity of lists in crystal mode.
* `crystalUI.editor.backpic`: the absolute path of the editor's background,**default if set to '',no back pic if set to null**.(Max length is 3)
* `crystalUI.editor.bkgrdOpacity`: the opacity of editor's background.Need values between 0 and 1.(Max length is 3)
* `crystalUI.editor.bkgrdPosition`: the position of editor's background,the same format as 'background-position' in css.(Max length is 3)

## Release Notes

## [0.0.1] - 2019-01-08
### Added
- 2 commands to open/close this ext's function
- 4 settings

## [0.0.2] - 2019-01-10
### Added
- 1 setting to choose the light/dark theme
- editor background
- 3 settings about editor background
### Changed
- renamed the settings in v0.0.1

## [0.0.3] - 2019-4-6
### Changed
- changed the css style accroading to the new vsc edition

## [0.0.4] - 2019-4-6
### Changed
- fixed some bugs
-----------------------------------------------------------------------------------------------------------
$>\omega<$ enjoy it!