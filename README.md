# QuadScript Language

This extension aims to integrate the Quadrilateral Cowboy scripting language (DoomScript) into Visual Studio Code.

## Features

* Syntax Highlighting
* Snippets
* Autocomplete
* Object Loading

Hover info, signature help and diagnostics are being explored.

### Syntax Highlighting

Highlighting of key events as defined in *doom_events.script* and definitions in *doom_defs.script* makes the code easier to read and navigate. Keywords missing? Let me know with an [issue](https://github.com/thefyrewire/quadscript/issues)!

To take full advantage of the syntax highlighting, use the QuadScript Theme `(File > Preferences > Color Theme)`. The color theme will continue to be adjusted and balanced, as well as other themes being made compatible.

![Syntax Highlighting](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_syntax.gif)

### Code Snippets

Some basic snippets are available. You can also type **namespace** when creating a new file to bring up the basic tutorial code for initialising a map. You can reference this [here](https://steamcommunity.com/sharedfiles/filedetails/?id=701335671). Some more advanced snippets are coming soon!

![Code Snippets](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_snippets.gif)

### Autocomplete

Autocomplete is supported (**on save**) for all *doom_events.script* functions and *doom_defs.script* keyword definitions.

![Autocomplete](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_autocomplete.gif)

### Object Loading

The extension can now load entity information from the corresponding map file to provide a handy list of objects right inside the editor, as well as their classname. This is disabled by default, therefore, to use this feature:

1. Start VS Code
2. Open the folder where the map and script files are located: `File > Open Folder`
3. In the Explorer pane, open the script file
4. If you haven't already, install the extension (see below)
5. Open the command palette:
    * Windows/Linux: `Ctrl + Shift + P`
    * Mac: `Cmd + Shift + P`
6. Search for and select `QuadScript: Map Objects - Enable`
    * Alternatively you can enable and disable object loading using the status bar button in the bottom left
7. Reload when prompted
8. Upon your script file opening, you should wait a few seconds for the extension to load, and then for the item list to be populated. You'll a see a notification when this is complete!

**Note:**

* To prevent intensive processing, the extension will not continually check for and update the item list. This is also because at this time completion items cannot be removed or edited, which complicates things
* Therefore, to refresh the object list, just click on the `Reload` button in the status bar at the bottom
* Similarly, to see objects for a different script file (in the same folder), you can simply open that file and press `Reload`
* If you want to open a map/script file in a different folder, you'll need to open that folder first (`File > Open Folder`)

![Object Loading](https://github.com/thefyrewire/quadscript/raw/master/images/quadscript_object-loading.gif)

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