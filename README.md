# QuadScript Language

This extension aims to integrate the Quadrilateral Cowboy scripting language (DoomScript) into Visual Studio Code.

## Features

Currently only syntax highlighting, snippets and autocomplete are supported, however hover info, signature help and diagnostics are being explored.

### Syntax Highlighting

Highlighting of key events as defined in *doom_events.script* and definitions in *doom_defs.script* makes the code easier to read and navigate. Keywords missing? Let me know with an [issue](https://github.com/thefyrewire/quadscript/issues)!

To take full advantage of the syntax highlighting, use the QuadScript Theme `(File > Preferences > Color Theme)`. The color theme will continue to be adjusted and balanced, as well as other themes being made compatible.

![Syntax Highlighting](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_syntax.gif)

### Code Snippets

Some basic snippets are available. You can also type **namespace** when creating a new file to bring up the basic tutorial code for initilising a map. You can reference this [here](https://steamcommunity.com/sharedfiles/filedetails/?id=701335671).

Some more advanced snippets are coming soon!

![Code Snippets](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_snippets.gif)

### Autocomplete

Autocomplete is supported (**on save**) for all *doom_events.script* functions and *doom_defs.script* keyword definitions.

![Autocomplete](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_autocomplete.gif)

## Installation

* Download and install [VS Code](https://code.visualstudio.com/)
* Launch VS Code and open the command palette:
    * Windows/Linux: `Ctrl + Shift + P`
    * Mac: `Cmd + Shift + P`
* Search for and select `Extensions : Install Extensions`
* Search for and select `QuadScript` in the Marketplace
* Install the extension
* Reload VS Code

## Manual Installation

If installing over the marketplace isn't possible:

* Download and install [VS Code](https://code.visualstudio.com/)
* Download the [master.zip](https://github.com/thefyrewire/quadscript/archive/master.zip)
* Navigate to the VS Code extensions folder:
    * Windows: `%USERPROFILE%/.vscode/extensions`
    * Mac/Linux: `$HOME/.vscode/extensions`
* In the extensions folder, create a folder called `thefyrewire.quadscript`
* Extract the contents of master.zip here

## Links

* [Quadrilateral Cowboy](http://store.steampowered.com/app/240440/Quadrilateral_Cowboy/)
* [Blendo Games](http://blendogames.com/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [QuadScript GitHub Project](https://github.com/thefyrewire/quadscript)
* [Questions, Bugs & Suggestions](https://github.com/thefyrewire/quadscript/issues/)
* [Twitter](https://twitter.com/MikeyHay)

## Author

Authored and maintained by **thefyrewire**.