# crystal UI README

The extension 'crystal UI' adds a background pic for your vscode.

## Features

1. press `ctrl+shift+p` , use the command `open crystal UI`
2. restart your vscode
3. change your theme to `'crystal UI'`

Then,your vscode will look like this:

![feature2](https://s2.ax1x.com/2019/04/18/ESh7vT.md.png)

It's beautiful,isn't it?  

You can choose your own pictures as the window background and editor background,for example:

![feature3](https://s2.ax1x.com/2019/04/18/ESho80.md.png)


**Warrning**

**All paths in the setting must use '/' instead of '\\\\'**

If you don't like the editor background,just use a empty arry:

![feature4](https://s2.ax1x.com/2019/04/18/EShICq.png)

Also,you can put the picture as a foreground.But if you do so,the editor background will be hided:

![feature5](https://s2.ax1x.com/2019/04/18/ES45ee.md.png)

## Some tips

This ext works by changing vscode's css file(to add a background,and it causes a alarm——just ignore it,I promise that this ext is harmless) and use a independent theme,which adds a opacity to your UI to show the background.

So if you want to turn it off,just choose another theme——this saves you from the trouble to reload vscode.**But remember to use the command `close crystal UI` to turn it off when you want to uninstall this ext!!**

This ext does not function unless you use the command `open crystal UI`. It may seems troublesome,but this avoids slowing down the vscode when it opens.

## Extension Settings

This extension contributes the following settings:

* `crystalUI.window.foreground`: if true,the background will float above the whole window. It may looks cool,but it make you hard to recognize the words in the editor. So I strongly recommand you set it to false.
* `crystalUI.window.backpic`: the **absolute** path of the background picture,default if set to *null*.
* `crystalUI.window.opacity`: the opacity of ui in crystal mode,including the titlebar,the sidebar and the activitybar.
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

## [0.0.5] - 2019-4-18
### Changed
- rewrote readme
- now we have a light theme and a dark theme
### Removed
- some unnecessary functions
-----------------------------------------------------------------------------------------------------------
$>\omega<$ enjoy it!