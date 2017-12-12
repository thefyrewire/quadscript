'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
// Create a connection for the server. The connection uses Node's IPC as a transport
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
// Create a simple text document manager. The text document manager
// supports full document sync only
let documents = new vscode_languageserver_1.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites. 
let workspaceRoot;
connection.onInitialize((params) => {
    workspaceRoot = params.rootPath;
    console.log("Language server initializing...\nWorkspace: " + workspaceRoot);
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});
// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition) => {
    // The pass parameter contains the position of the text document in 
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        /*
        - Events Main
        */
        {
            label: 'remove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'remove(): void',
            insertText: 'remove()'
        },
        {
            label: 'getName',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getName(): void',
            insertText: 'getName()'
        },
        {
            label: 'setName',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setName( string name ): void',
            insertText: 'setName(${0})',
            insertTextFormat: 2
        },
        {
            label: 'activate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'activate( entity activator ): void',
            insertText: 'activate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'activateTargets',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'activateTargets( entity activator ): void',
            insertText: 'activateTargets(${0})',
            insertTextFormat: 2
        },
        {
            label: 'numTargets',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'numTargets(): float',
            insertText: 'numTargets()'
        },
        {
            label: 'getTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTarget( float num ): entity',
            insertText: 'getTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'randomTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'randomTarget( string ignoreName ): entity',
            insertText: 'randomTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'bind',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'bind( entity master ): void',
            insertText: 'bind(${0})',
            insertTextFormat: 2
        },
        {
            label: 'bindPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'bindPosition( entity master ): void',
            insertText: 'bindPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'bindToJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'bindToJoint( entity master, string boneName, float rotateWithMaster ): void',
            insertText: 'bindToJoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'unbind',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'unbind(): void',
            documentation: 'Detach from master.',
            insertText: 'unbind()'
        },
        {
            label: 'removeBinds',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'removeBinds(): void',
            documentation: 'Remove all children.',
            insertText: 'removeBinds()'
        },
        {
            label: 'setOwner',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setOwner( entity owner ): void',
            insertText: 'setOwner(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setModel',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setModel( string modelName ): void',
            insertText: 'setModel(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setSkin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setSkin( string skinName ): void',
            insertText: 'setSkin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getWorldOrigin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getWorldOrigin(): vector',
            insertText: 'getWorldOrigin()'
        },
        {
            label: 'setWorldOrigin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setWorldOrigin( vector origin ): void',
            insertText: 'setWorldOrigin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getOrigin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getOrigin(): vector',
            insertText: 'getOrigin()'
        },
        {
            label: 'setOrigin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setOrigin( vector origin ): void',
            insertText: 'setOrigin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getAngles(): vector',
            insertText: 'getAngles()'
        },
        {
            label: 'setAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAngles( vector angles ): void',
            insertText: 'setAngles(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getLinearVelocity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getLinearVelocity(): vector',
            insertText: 'getLinearVelocity()'
        },
        {
            label: 'setLinearVelocity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setLinearVelocity( vector velocity ): void',
            insertText: 'setLinearVelocity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getAngularVelocity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getAngularVelocity(): vector',
            insertText: 'getAngularVelocity()'
        },
        {
            label: 'setAngularVelocity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAngularVelocity( vector velocity ): void',
            insertText: 'setAngularVelocity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getSize',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getSize(): vector',
            insertText: 'getSize()'
        },
        {
            label: 'setSize',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setSize( vector min, vector max ): void',
            insertText: 'setSize(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getMins',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getMins(): vector',
            insertText: 'getMins()'
        },
        {
            label: 'getMaxs',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getMaxs(): vector',
            insertText: 'getMaxs()'
        },
        {
            label: 'isHidden',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isHidden(): float',
            insertText: 'isHidden()'
        },
        {
            label: 'hide',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'hide(): void',
            insertText: 'hide()'
        },
        {
            label: 'show',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'show(): void',
            insertText: 'show()'
        },
        {
            label: 'touches',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'touches( entity other ): float',
            insertText: 'touches(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearSignal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearSignal( float signalNum ): void',
            insertText: 'clearSignal(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getShaderParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getShaderParm( float parm ): float',
            insertText: 'getShaderParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setShaderParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setShaderParm( float parm, float value ): void',
            insertText: 'setShaderParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setShaderParms',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setShaderParms( float parm0, float parm1, float parm2, float parm3 ): void',
            insertText: 'setShaderParms(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setColor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setColor( float red, float green, float blue ): void',
            insertText: 'setColor(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getColor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getColor(): vector',
            insertText: 'getColor()'
        },
        {
            label: 'cacheSoundShader',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'cacheSoundShader( string shaderName ): void',
            insertText: 'cacheSoundShader(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startSoundShader',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startSoundShader( string shaderName, float channel ): float',
            insertText: 'startSoundShader(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopSound( float channel, float netSync ): void',
            insertText: 'stopSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startSound( string sound, float channel, float netSync ): float',
            insertText: 'startSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fadeSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeSound( float channel, float newLevel, float fadeTime ): void',
            insertText: 'fadeSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setGuiParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setGuiParm( string key, string value): void',
            insertText: 'setGuiParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setGuiFloat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setGuiFloat( string key, float value ): void',
            insertText: 'setGuiFloat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setGui',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setGui( float guiNum, string gui ): void',
            insertText: 'setGui(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getNextKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getNextKey( string prefix, string lastMatch ): string',
            insertText: 'getNextKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setKey( string key, string value ): void',
            insertText: 'setKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getKey( string key ): string',
            insertText: 'getKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getIntKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getIntKey( string key ): float',
            insertText: 'getIntKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getFloatKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getFloatKey( string key ): float',
            insertText: 'getFloatKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getVectorKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getVectorKey( string key ): vector',
            insertText: 'getVectorKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getEntityKey',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEntityKey( string key ): entity',
            insertText: 'getEntityKey(${0})',
            insertTextFormat: 2
        },
        {
            label: 'restorePosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'restorePosition(): void',
            insertText: 'restorePosition()'
        },
        {
            label: 'distanceTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'distanceTo( entity other ): float',
            insertText: 'distanceTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'distanceToPoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'distanceToPoint( vector point ): float',
            insertText: 'distanceToPoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startFx',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startFx( string fx ): void',
            insertText: 'startFx(${0})',
            insertTextFormat: 2
        },
        {
            label: 'waitFrame',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'waitFrame(): void',
            insertText: 'waitFrame()'
        },
        {
            label: 'wait',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'wait( float time ): void',
            insertText: 'wait(${0})',
            insertTextFormat: 2
        },
        {
            label: 'hasFunction',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'hasFunction( string functionName ): float',
            insertText: 'hasFunction(${0})',
            insertTextFormat: 2
        },
        {
            label: 'callFunction',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'callFunction( string functionName ): void',
            insertText: 'callFunction(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setNeverDormant',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setNeverDormant( float enable ): void',
            insertText: 'setNeverDormant(${0})',
            insertTextFormat: 2
        },
        {
            label: 'terminate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'terminate( float threadNumber ): void',
            insertText: 'terminate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'pause',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'pause(): void',
            insertText: 'pause()'
        },
        {
            label: 'waitFor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'waitFor( entity mover ): void',
            insertText: 'waitFor(${0})',
            insertTextFormat: 2
        },
        {
            label: 'waitForThread',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'waitForThread( float threadNumber ): void',
            insertText: 'waitForThread(${0})',
            insertTextFormat: 2
        },
        {
            label: 'print',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'print( string text ): void',
            insertText: 'print(${0})',
            insertTextFormat: 2
        },
        {
            label: 'println',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'println( string text ): void',
            insertText: 'println(${0})',
            insertTextFormat: 2
        },
        {
            label: 'say',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'say( string text ): void',
            insertText: 'say(${0})',
            insertTextFormat: 2
        },
        {
            label: 'assert',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'assert( float condition ): void',
            insertText: 'assert(${0})',
            insertTextFormat: 2
        },
        {
            label: 'trigger',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'trigger( entity entityToTrigger ): void',
            insertText: 'trigger(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcvar',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setcvar( string name, string value ): void',
            insertText: 'setcvar(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getcvar',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getcvar( string name ): string',
            insertText: 'getcvar(${0})',
            insertTextFormat: 2
        },
        {
            label: 'random',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'random( float range ): float',
            insertText: 'random(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTime(): float',
            insertText: 'getTime()'
        },
        {
            label: 'killthread',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'killthread( string threadName ): void',
            insertText: 'killthread(${0})',
            insertTextFormat: 2
        },
        {
            label: 'threadname',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'threadname( string name ): void',
            insertText: 'threadname(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEntity( string name ): entity',
            insertText: 'getEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'spawn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'spawn( string classname ): entity',
            insertText: 'spawn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'respawn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'respawn(): void',
            insertText: 'respawn()'
        },
        {
            label: 'copySpawnArgs',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'copySpawnArgs( entity ent ): void',
            insertText: 'copySpawnArgs(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setSpawnArg',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setSpawnArg( string key, string value ): void',
            insertText: 'setSpawnArg(${0})',
            insertTextFormat: 2
        },
        {
            label: 'SpawnString',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'SpawnString( string key, string default ): string',
            insertText: 'SpawnString(${0})',
            insertTextFormat: 2
        },
        {
            label: 'SpawnFloat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'SpawnFloat( string key, float default ): float',
            insertText: 'SpawnFloat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'SpawnVector',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'SpawnVector( string key, vector default ): vector',
            insertText: 'SpawnVector(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearPersistantArgs',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearPersistantArgs(): void',
            insertText: 'clearPersistantArgs()'
        },
        {
            label: 'setPersistantArg',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setPersistantArg( string key, string value ): void',
            insertText: 'setPersistantArg(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getPersistantString',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPersistantString( string key ): string',
            insertText: 'getPersistantString(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getPersistantFloat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPersistantFloat( string key ): float',
            insertText: 'getPersistantFloat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getPersistantVector',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPersistantVector( string key ): vector',
            insertText: 'getPersistantVector(${0})',
            insertTextFormat: 2
        },
        {
            label: 'angToForward',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'angToForward( vector angles ): vector',
            insertText: 'angToForward(${0})',
            insertTextFormat: 2
        },
        {
            label: 'angToRight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'angToRight( vector angles ): vector',
            insertText: 'angToRight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'angToUp',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'angToUp( vector angles ): vector',
            insertText: 'angToUp(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'sin( float degrees ): float',
            insertText: 'sin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'cos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'cos( float degrees ): float',
            insertText: 'cos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sqrt',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'sqrt( float square ): float',
            insertText: 'sqrt(${0})',
            insertTextFormat: 2
        },
        {
            label: 'vecNormalize',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'vecNormalize( vector vec ): vector',
            insertText: 'vecNormalize(${0})',
            insertTextFormat: 2
        },
        {
            label: 'vecLength',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'vecLength( vector vec ): float',
            insertText: 'vecLength(${0})',
            insertTextFormat: 2
        },
        {
            label: 'DotProduct',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'DotProduct( vector vec1, vector vec2 ): float',
            insertText: 'DotProduct(${0})',
            insertTextFormat: 2
        },
        {
            label: 'CrossProduct',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'CrossProduct( vector vec1, vector vec2 ): vector',
            insertText: 'CrossProduct(${0})',
            insertTextFormat: 2
        },
        {
            label: 'VecToAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'VecToAngles( vector vec ): vector',
            insertText: 'VecToAngles(${0})',
            insertTextFormat: 2
        },
        {
            label: 'onSignal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'onSignal( float signalNum, entity ent, string functionName ): void',
            insertText: 'onSignal(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearSignalThread',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearSignalThread( float signalNum, entity ent ): void',
            insertText: 'clearSignalThread(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setCamera',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setCamera( entity cameraEnt ): void',
            insertText: 'setCamera(${0})',
            insertTextFormat: 2
        },
        {
            label: 'firstPerson',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'firstPerson(): void',
            insertText: 'firstPerson()'
        },
        {
            label: 'trace',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'trace( vector start, vector end, vector mins, vector maxs, float contents_mask, entity passEntity ): float',
            insertText: 'trace(${0})',
            insertTextFormat: 2
        },
        {
            label: 'tracePoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'tracePoint( vector start, vector end, float contents_mask, entity passEntity ): float',
            insertText: 'tracePoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getTraceFraction',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceFraction(): float',
            insertText: 'getTraceFraction()'
        },
        {
            label: 'getTraceEndPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceEndPos(): vector',
            insertText: 'getTraceEndPos()'
        },
        {
            label: 'getTraceNormal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceNormal(): vector',
            insertText: 'getTraceNormal()'
        },
        {
            label: 'getTraceEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceEntity(): entity',
            insertText: 'getTraceEntity()'
        },
        {
            label: 'getTraceJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceJoint(): string',
            insertText: 'getTraceJoint()'
        },
        {
            label: 'getTraceBody',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceBody(): string',
            insertText: 'getTraceBody()'
        },
        {
            label: 'fadeIn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeIn( vector color, float time ): void',
            insertText: 'fadeIn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fadeOut',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeOut( vector color, float time ): void',
            insertText: 'fadeOut(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fadeTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeTo( vector color, float alpha, float time ): void',
            insertText: 'fadeTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'music',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'music( string shaderName ): void',
            insertText: 'music(${0})',
            insertTextFormat: 2
        },
        {
            label: 'error',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'error( string text ): void',
            insertText: 'error(${0})',
            insertTextFormat: 2
        },
        {
            label: 'warning',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'warning( string text ): void',
            insertText: 'warning(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strLength',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strLength( string text ): float',
            insertText: 'strLength(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strLeft',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strLeft( string text, float num ): string',
            insertText: 'strLeft(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strRight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strRight( string text, float num ): string',
            insertText: 'strRight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strSkip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strSkip( string text, float num ): string',
            insertText: 'strSkip(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strMid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strMid( string text, float start, float num ): string',
            insertText: 'strMid(${0})',
            insertTextFormat: 2
        },
        {
            label: 'strToFloat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'strToFloat( string text ): float',
            insertText: 'strToFloat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'radiusDamage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'radiusDamage( vector origin, entity inflictor, entity attacker, entity ignore, string damageDefName, float dmgPower ): void',
            insertText: 'radiusDamage(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isClient',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isClient(): float',
            insertText: 'isClient()'
        },
        {
            label: 'isMultiplayer',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isMultiplayer(): float',
            insertText: 'isMultiplayer()'
        },
        {
            label: 'getFrameTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getFrameTime(): float',
            insertText: 'getFrameTime()'
        },
        {
            label: 'getTicsPerSecond',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTicsPerSecond(): float',
            insertText: 'getTicsPerSecond()'
        },
        {
            label: 'cacheSoundShader',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'cacheSoundShader( string shaderName ): void',
            insertText: 'cacheSoundShader(${0})',
            insertTextFormat: 2
        },
        {
            label: 'debugLine',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'debugLine( vector color, vector start, vector end, float lifetime ): void',
            insertText: 'debugLine(${0})',
            insertTextFormat: 2
        },
        {
            label: 'debugArrow',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'debugArrow( vector color, vector start, vector end, float size, float lifetime ): void',
            insertText: 'debugArrow(${0})',
            insertTextFormat: 2
        },
        {
            label: 'debugCircle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'debugCircle( vector color, vector origin, vector dir, float radius, float numSteps, float lifetime ): void',
            insertText: 'debugCircle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'debugBounds',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'debugBounds( vector color, vector mins, vector maxs, float lifetime ): void',
            insertText: 'debugBounds(${0})',
            insertTextFormat: 2
        },
        {
            label: 'drawText',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'drawText( string text, vector origin, float scale, vector color, float align, float lifetime ): void',
            insertText: 'drawText(${0})',
            insertTextFormat: 2
        },
        {
            label: 'influenceActive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'influenceActive(): float',
            insertText: 'influenceActive()'
        },
        {
            label: 'start',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'start(): void',
            insertText: 'start()'
        },
        {
            label: 'stop',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stop(): void',
            insertText: 'stop()'
        },
        {
            label: 'setShader',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setShader( string shader ): void',
            insertText: 'setShader(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getLightParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getLightParm( float parmNum ): float',
            insertText: 'getLightParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setLightParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setLightParm( float parmNum, float value ): void',
            insertText: 'setLightParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setLightParms',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setLightParms( float parm0, float parm1, float parm2, float parm3 ): void',
            insertText: 'setLightParms(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setRadiusXYZ',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setRadiusXYZ( float x, float y, float z ): void',
            insertText: 'setRadiusXYZ(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setRadius',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setRadius( float radius ): void',
            insertText: 'setRadius(${0})',
            insertTextFormat: 2
        },
        {
            label: 'On',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'On(): void',
            insertText: 'On()'
        },
        {
            label: 'Off',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'Off(): void',
            insertText: 'Off()'
        },
        {
            label: 'fadeOutLight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeOutLight( float time ): void',
            insertText: 'fadeOutLight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fadeInLight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fadeInLight( float time ): void',
            insertText: 'fadeInLight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'Toggle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'Toggle(): void',
            insertText: 'Toggle()'
        },
        {
            label: 'launchMissiles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'launchMissiles( string projectilename, string sound, string launchbone, string targetbone, float numshots, float framedelay ): void',
            insertText: 'launchMissiles(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startRagdoll',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startRagdoll(): void',
            insertText: 'startRagdoll()'
        },
        {
            label: 'leftFoot',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'leftFoot(): void',
            insertText: 'leftFoot()'
        },
        {
            label: 'rightFoot',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rightFoot(): void',
            insertText: 'rightFoot()'
        },
        {
            label: 'stopMoving',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopMoving(): void',
            insertText: 'stopMoving()'
        },
        {
            label: 'stopRotating',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopRotating(): void',
            insertText: 'stopRotating()'
        },
        {
            label: 'speed',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'speed( float speed ): void',
            insertText: 'speed(${0})',
            insertTextFormat: 2
        },
        {
            label: 'time',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'time( float time ): void',
            insertText: 'time(${0})',
            insertTextFormat: 2
        },
        {
            label: 'decelTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'decelTime( float time ): void',
            insertText: 'decelTime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'accelTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'accelTime( float time ): void',
            insertText: 'accelTime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveTo( entity targetEntity ): void',
            insertText: 'moveTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveToPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToPos( vector pos ): void',
            insertText: 'moveToPos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'move',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'move( float angle, float distance ): void',
            insertText: 'move(${0})',
            insertTextFormat: 2
        },
        {
            label: 'accelTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'accelTo( float speed, float time ): void',
            insertText: 'accelTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'decelTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'decelTo( float speed, float time ): void',
            insertText: 'decelTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rotateDownTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotateDownTo( float axis, float angle ): void',
            insertText: 'rotateDownTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rotateUpTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotateUpTo( float axis, float angle ): void',
            insertText: 'rotateUpTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rotateTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotateTo( vector angles ): void',
            insertText: 'rotateTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rotate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotate( vector angleSpeed ): void',
            insertText: 'rotate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rotateOnce',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotateOnce( vector angles ): void',
            insertText: 'rotateOnce(${0})',
            insertTextFormat: 2
        },
        {
            label: 'bob',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'bob( float speed, float phase, vector distance ): void',
            insertText: 'bob(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sway',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'sway( float speed, float phase, vector angles ): void',
            insertText: 'sway(${0})',
            insertTextFormat: 2
        },
        {
            label: 'openPortal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'openPortal(): void',
            insertText: 'openPortal()'
        },
        {
            label: 'closePortal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'closePortal(): void',
            insertText: 'closePortal()'
        },
        {
            label: 'accelSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'accelSound( string sound ): void',
            insertText: 'accelSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'decelSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'decelSound( string sound ): void',
            insertText: 'decelSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveSound( string sound ): void',
            insertText: 'moveSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enableSplineAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableSplineAngles(): void',
            insertText: 'enableSplineAngles()'
        },
        {
            label: 'disableSplineAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableSplineAngles(): void',
            insertText: 'disableSplineAngles()'
        },
        {
            label: 'removeInitialSplineAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'removeInitialSplineAngles(): void',
            insertText: 'removeInitialSplineAngles()'
        },
        {
            label: 'startSpline',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startSpline( entity spline ): void',
            insertText: 'startSpline(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopSpline',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopSpline(): void',
            insertText: 'stopSpline()'
        },
        {
            label: 'isMoving',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isMoving(): float',
            insertText: 'isMoving()'
        },
        {
            label: 'isRotating',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isRotating(): float',
            insertText: 'isRotating()'
        },
        {
            label: 'enable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enable(): void',
            insertText: 'enable()'
        },
        {
            label: 'disable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disable(): void',
            insertText: 'disable()'
        },
        {
            label: 'open',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'open(): void',
            insertText: 'open()'
        },
        {
            label: 'close',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'close(): void',
            insertText: 'close()'
        },
        {
            label: 'lock',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'lock( float locked ): void',
            insertText: 'lock(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isOpen',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isOpen(): float',
            insertText: 'isOpen()'
        },
        {
            label: 'isLocked',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isLocked(): float',
            insertText: 'isLocked()'
        },
        {
            label: 'setFingerAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setFingerAngle( float angle ): void',
            insertText: 'setFingerAngle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopFingers',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopFingers(): void',
            insertText: 'stopFingers()'
        },
        {
            label: 'becomeNonSolid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'becomeNonSolid(): void',
            insertText: 'becomeNonSolid()'
        },
        {
            label: 'isAtRest',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isAtRest(): float',
            insertText: 'isAtRest()'
        },
        {
            label: 'enableDamage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableDamage( float enable ): void',
            insertText: 'enableDamage(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getJointHandle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getJointHandle( string jointname ): float',
            insertText: 'getJointHandle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearAllJoints',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearAllJoints(): void',
            insertText: 'clearAllJoints()'
        },
        {
            label: 'clearJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearJoint( float jointnum ): void',
            insertText: 'clearJoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setJointPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setJointPos( float jointnum, float transform_type, vector pos ): void',
            insertText: 'setJointPos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setJointAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setJointAngle( float jointnum, float transform_type, vector angles ): void',
            insertText: 'setJointAngle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getJointPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getJointPos( float jointnum ): vector',
            insertText: 'getJointPos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getJointAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getJointAngle( float jointnum ): vector',
            insertText: 'getJointAngle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getOwner',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getOwner(): entity',
            insertText: 'getOwner()'
        },
        {
            label: 'nextWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'nextWeapon(): void',
            insertText: 'nextWeapon()'
        },
        {
            label: 'weaponState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponState( string stateFunction, float blendFrames ): void',
            insertText: 'weaponState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'useAmmo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'useAmmo( float amount ): void',
            insertText: 'useAmmo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'addToClip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'addToClip( float amount ): void',
            insertText: 'addToClip(${0})',
            insertTextFormat: 2
        },
        {
            label: 'ammoInClip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'ammoInClip(): float',
            insertText: 'ammoInClip()'
        },
        {
            label: 'ammoAvailable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'ammoAvailable(): float',
            insertText: 'ammoAvailable()'
        },
        {
            label: 'totalAmmoCount',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'totalAmmoCount(): float',
            insertText: 'totalAmmoCount()'
        },
        {
            label: 'clipSize',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clipSize(): float',
            insertText: 'clipSize()'
        },
        {
            label: 'isInvisible',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isInvisible(): float',
            insertText: 'isInvisible()'
        },
        {
            label: 'playAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'playAnim( float channel, string animName ): float',
            insertText: 'playAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'playCycle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'playCycle( float channel, string animName ): float',
            insertText: 'playCycle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'animDone',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'animDone( float channel, float blendOutFrames ): float',
            insertText: 'animDone(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setBlendFrames',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setBlendFrames( float channel, float blendFrame ): void',
            insertText: 'setBlendFrames(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getBlendFrames',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getBlendFrames( float channel ): float',
            insertText: 'getBlendFrames(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weaponReady',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponReady(): void',
            insertText: 'weaponReady()'
        },
        {
            label: 'weaponOutOfAmmo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponOutOfAmmo(): void',
            insertText: 'weaponOutOfAmmo()'
        },
        {
            label: 'weaponReloading',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponReloading(): void',
            insertText: 'weaponReloading()'
        },
        {
            label: 'weaponHolstered',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponHolstered(): void',
            insertText: 'weaponHolstered()'
        },
        {
            label: 'weaponRising',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponRising(): void',
            insertText: 'weaponRising()'
        },
        {
            label: 'weaponLowering',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponLowering(): void',
            insertText: 'weaponLowering()'
        },
        {
            label: 'flashlight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'flashlight( float enable ): void',
            insertText: 'flashlight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'launchProjectiles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'launchProjectiles( float num_projectiles, float spread, float fuseOffset, float launchPower, float dmgPower ): void',
            insertText: 'launchProjectiles(${0})',
            insertTextFormat: 2
        },
        {
            label: 'createProjectile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'createProjectile(): entity',
            insertText: 'createProjectile()'
        },
        {
            label: 'melee',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'melee(): float',
            insertText: 'melee()'
        },
        // Duplicate
        /*{
            label: 'setLightParm',
            kind: CompletionItemKind.Function,
            detail: 'setLightParm( float parmNum, float value ): void',
            insertText: 'setLightParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setLightParms',
            kind: CompletionItemKind.Function,
            detail: 'setLightParms( float parm0, float parm1, float parm2, float parm3 ): void',
            insertText: 'setLightParms(${0})',
            insertTextFormat: 2
        },*/
        {
            label: 'getWorldModel',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getWorldModel(): entity',
            insertText: 'getWorldModel()'
        },
        {
            label: 'getProjectileState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getProjectileState(): float',
            insertText: 'getProjectileState()'
        },
        {
            label: 'markUsed',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'markUsed(): void',
            insertText: 'markUsed()'
        },
        {
            label: 'SetConstraintPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'SetConstraintPosition( string constraintName, vector position ): void',
            insertText: 'SetConstraintPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enableEyeFocus',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableEyeFocus(): void',
            insertText: 'enableEyeFocus()'
        },
        {
            label: 'disableEyeFocus',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableEyeFocus(): void',
            insertText: 'disableEyeFocus()'
        },
        // Duplicate
        /*{
            label: 'leftFoot',
            kind: CompletionItemKind.Function,
            detail: 'leftFoot(): void',
            insertText: 'leftFoot()'
        },
        {
            label: 'rightFoot',
            kind: CompletionItemKind.Function,
            detail: 'rightFoot(): void',
            insertText: 'rightFoot()'
        },*/
        {
            label: 'stopAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopAnim( float channel, float frames ): void',
            insertText: 'stopAnim(${0})',
            insertTextFormat: 2
        },
        // Duplicate
        /*{
            label: 'playAnim',
            kind: CompletionItemKind.Function,
            detail: 'playAnim( float channel, string animName ): float',
            insertText: 'playAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'playCycle',
            kind: CompletionItemKind.Function,
            detail: 'playCycle( float channel, string animName ): float',
            insertText: 'playCycle(${0})',
            insertTextFormat: 2
        },*/
        {
            label: 'idleAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'idleAnim( float channel, string animName ): float',
            insertText: 'idleAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setSyncedAnimWeight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setSyncedAnimWeight( float channel, float animindex, float weight ): void',
            insertText: 'setSyncedAnimWeight(${0})',
            insertTextFormat: 2
        },
        // Duplicate
        /*{
            label: 'setBlendFrames',
            kind: CompletionItemKind.Function,
            detail: 'setBlendFrames( float channel, float blendFrame ): void',
            insertText: 'setBlendFrames(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getBlendFrames',
            kind: CompletionItemKind.Function,
            detail: 'getBlendFrames( float channel ): float',
            insertText: 'getBlendFrames(${0})',
            insertTextFormat: 2
        },*/
        {
            label: 'animState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'animState( float channel, string stateFunction, float blendFrame ): void',
            insertText: 'animState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getAnimState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getAnimState( float channel ): string',
            insertText: 'getAnimState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'inAnimState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'inAnimState( float channel, string stateFunc ): float',
            insertText: 'inAnimState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'finishAction',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'finishAction( string action ): void',
            insertText: 'finishAction(${0})',
            insertTextFormat: 2
        },
        // Duplicate
        /*{
            label: 'animDone',
            kind: CompletionItemKind.Function,
            detail: 'animDone( float channel, float blendOutFrames ): float',
            insertText: 'animDone(${0})',
            insertTextFormat: 2
        },*/
        {
            label: 'overrideAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'overrideAnim( float channel ): void',
            insertText: 'overrideAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'preventPain',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'preventPain( float duration ): void',
            insertText: 'preventPain(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enableAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableAnim( float channel, float blendFrames ): void',
            insertText: 'enableAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'disablePain',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disablePain(): void',
            insertText: 'disablePain()'
        },
        {
            label: 'enablePain',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enablePain(): void',
            insertText: 'enablePain()'
        },
        {
            label: 'getPainAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPainAnim(): string',
            insertText: 'getPainAnim()'
        },
        {
            label: 'setAnimPrefix',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAnimPrefix( string prefix ): void',
            insertText: 'setAnimPrefix(${0})',
            insertTextFormat: 2
        },
        {
            label: 'hasAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'hasAnim( float channel, string animName ): float',
            insertText: 'hasAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'checkAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'checkAnim( float channel, string animName ): void',
            insertText: 'checkAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'chooseAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'chooseAnim( float channel, string animName ): string',
            insertText: 'chooseAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'animLength',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'animLength( float channel, string animName ): float',
            insertText: 'animLength(${0})',
            insertTextFormat: 2
        },
        {
            label: 'animDistance',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'animDistance( float channel, string animName ): float',
            insertText: 'animDistance(${0})',
            insertTextFormat: 2
        },
        {
            label: 'hasEnemies',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'hasEnemies(): float',
            insertText: 'hasEnemies()'
        },
        {
            label: 'nextEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'nextEnemy( entity lastEnemy ): entity',
            insertText: 'nextEnemy(${0})',
            insertTextFormat: 2
        },
        {
            label: 'closestEnemyToPoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'closestEnemyToPoint( vector point ): entity',
            insertText: 'closestEnemyToPoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setNextState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setNextState( string stateFunc ): void',
            insertText: 'setNextState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setState( string stateFunc ): void',
            insertText: 'setState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getState(): string',
            insertText: 'getState()'
        },
        {
            label: 'getHead',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getHead(): entity',
            insertText: 'getHead()'
        },
        {
            label: 'getButtons',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getButtons(): float',
            insertText: 'getButtons()'
        },
        {
            label: 'getMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getMove(): vector',
            insertText: 'getMove()'
        },
        {
            label: 'getViewAngles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getViewAngles(): vector',
            insertText: 'getViewAngles()'
        },
        {
            label: 'enableWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableWeapon(): void',
            insertText: 'enableWeapon()'
        },
        {
            label: 'disableWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableWeapon(): void',
            insertText: 'disableWeapon()'
        },
        {
            label: 'getCurrentWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getCurrentWeapon(): string',
            insertText: 'getCurrentWeapon()'
        },
        {
            label: 'getPreviousWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPreviousWeapon(): string',
            insertText: 'getPreviousWeapon()'
        },
        {
            label: 'selectWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'selectWeapon( string weapon, float flash ): void',
            insertText: 'selectWeapon(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getWeaponEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getWeaponEntity(): entity',
            insertText: 'getWeaponEntity()'
        },
        {
            label: 'openPDA',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'openPDA(): void',
            insertText: 'openPDA()'
        },
        {
            label: 'inPDA',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'inPDA(): float',
            insertText: 'inPDA()'
        },
        {
            label: 'getIdealWeapon',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getIdealWeapon(): string',
            insertText: 'getIdealWeapon()'
        },
        {
            label: 'randomPath',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'randomPath(): entity',
            insertText: 'randomPath()'
        },
        {
            label: 'findEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'findEnemy( float onlyInFov ): entity',
            insertText: 'findEnemy(${0})',
            insertTextFormat: 2
        },
        {
            label: 'findEnemyAI',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'findEnemyAI( float onlyInFov ): entity',
            insertText: 'findEnemyAI(${0})',
            insertTextFormat: 2
        },
        {
            label: 'findEnemyInCombatNodes',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'findEnemyInCombatNodes(): entity',
            insertText: 'findEnemyInCombatNodes()'
        },
        {
            label: 'closestReachableEnemyOfEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'closestReachableEnemyOfEntity( entity team_mate ): entity',
            insertText: 'closestReachableEnemyOfEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'heardSound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'heardSound( float ignore_team ): entity',
            insertText: 'heardSound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setEnemy( entity enemy ): void',
            insertText: 'setEnemy(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearEnemy(): void',
            insertText: 'clearEnemy()'
        },
        {
            label: 'muzzleFlash',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'muzzleFlash( string jointname ): void',
            insertText: 'muzzleFlash(${0})',
            insertTextFormat: 2
        },
        {
            label: 'createMissile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'createMissile( string jointname ): entity',
            insertText: 'createMissile(${0})',
            insertTextFormat: 2
        },
        {
            label: 'attackMissile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'attackMissile( string jointname ): entity',
            insertText: 'attackMissile(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fireMissileAtTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'fireMissileAtTarget( string jointname, string targetname ): entity',
            insertText: 'fireMissileAtTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'launchMissile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'launchMissile( vector origin, vector angles ): entity',
            insertText: 'launchMissile(${0})',
            insertTextFormat: 2
        },
        {
            label: 'attackMelee',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'attackMelee( string damageDef ): float',
            insertText: 'attackMelee(${0})',
            insertTextFormat: 2
        },
        {
            label: 'directDamage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'directDamage( entity damageTarget, string damageDef ): void',
            insertText: 'directDamage(${0})',
            insertTextFormat: 2
        },
        {
            label: 'radiusDamageFromJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'radiusDamageFromJoint( string jointname, string damageDef ): void',
            insertText: 'radiusDamageFromJoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'attackBegin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'attackBegin( string damageDef ): void',
            insertText: 'attackBegin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'attackEnd',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'attackEnd(): void',
            insertText: 'attackEnd()'
        },
        {
            label: 'meleeAttackToJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'meleeAttackToJoint( string joint, string damageDef ): float',
            insertText: 'meleeAttackToJoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'randomPath',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'randomPath(): entity',
            insertText: 'randomPath()'
        },
        {
            label: 'canBecomeSolid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canBecomeSolid(): float',
            insertText: 'canBecomeSolid()'
        },
        {
            label: 'becomeSolid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'becomeSolid(): void',
            insertText: 'becomeSolid()'
        },
        {
            label: 'becomeNonSolid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'becomeNonSolid(): void',
            insertText: 'becomeNonSolid()'
        },
        {
            label: 'becomeRagdoll',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'becomeRagdoll(): float',
            insertText: 'becomeRagdoll()'
        },
        {
            label: 'stopRagdoll',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopRagdoll(): void',
            insertText: 'stopRagdoll()'
        },
        {
            label: 'setHealth',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setHealth( float health ): void',
            insertText: 'setHealth()'
        },
        {
            label: 'getHealth',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getHealth(): float',
            insertText: 'getHealth()'
        },
        {
            label: 'allowDamage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'allowDamage(): void',
            insertText: 'allowDamage()'
        },
        {
            label: 'ignoreDamage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'ignoreDamage(): void',
            insertText: 'ignoreDamage()'
        },
        {
            label: 'getCurrentYaw',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getCurrentYaw(): float',
            insertText: 'getCurrentYaw()'
        },
        {
            label: 'turnTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'turnTo( float yaw ): void',
            insertText: 'turnTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'turnToPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'turnToPos( vector pos ): void',
            insertText: 'turnToPos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'turnToEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'turnToEntity( entity ent ): void',
            insertText: 'turnToEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveStatus',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveStatus(): float',
            insertText: 'moveStatus()'
        },
        {
            label: 'stopMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopMove(): void',
            insertText: 'stopMove()'
        },
        {
            label: 'moveToCover',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToCover(): void',
            insertText: 'moveToCover()'
        },
        {
            label: 'moveToEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToEnemy(): void',
            insertText: 'moveToEnemy()'
        },
        {
            label: 'moveToEnemyHeight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToEnemyHeight(): void',
            insertText: 'moveToEnemyHeight()'
        },
        {
            label: 'moveOutOfRange',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveOutOfRange( entity ent, float range ): void',
            insertText: 'moveOutOfRange(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveToAttackPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToAttackPosition( entity ent, string attack_anim ): void',
            insertText: 'moveToAttackPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'wander',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'wander(): void',
            insertText: 'wander()'
        },
        {
            label: 'moveToEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToEntity( entity destination ): void',
            insertText: 'moveToEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'moveToPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToPosition( vector position ): void',
            insertText: 'moveToPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'slideTo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'slideTo( vector position, float time ): void',
            insertText: 'slideTo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'facingIdeal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'facingIdeal(): float',
            insertText: 'facingIdeal()'
        },
        {
            label: 'faceEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'faceEnemy(): void',
            insertText: 'faceEnemy()'
        },
        {
            label: 'faceEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'faceEntity( entity ent ): void',
            insertText: 'faceEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getCombatNode',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getCombatNode(): entity',
            insertText: 'getCombatNode()'
        },
        {
            label: 'enemyInCombatCone',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enemyInCombatCone( entity combatNode, float use_current_enemy_location ): float',
            insertText: 'enemyInCombatCone(${0})',
            insertTextFormat: 2
        },
        {
            label: 'waitMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'waitMove(): void',
            insertText: 'waitMove()'
        },
        {
            label: 'getJumpVelocity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getJumpVelocity( vector pos, float speed, float max_jump_height ): vector',
            insertText: 'getJumpVelocity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'entityInAttackCone',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'entityInAttackCone( entity ent ): float',
            insertText: 'entityInAttackCone(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canSee',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canSee( entity ent ): float',
            insertText: 'canSee(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enemyRange',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enemyRange(): float',
            insertText: 'enemyRange()'
        },
        {
            label: 'enemyRange2D',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enemyRange2D(): float',
            insertText: 'enemyRange2D()'
        },
        {
            label: 'setTalkTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setTalkTarget( entity target ): void',
            insertText: 'setTalkTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getTalkTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTalkTarget(): entity',
            insertText: 'getTalkTarget()'
        },
        {
            label: 'getEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEnemy(): entity',
            insertText: 'getEnemy()'
        },
        {
            label: 'getEnemyPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEnemyPos(): vector',
            insertText: 'getEnemyPos()'
        },
        {
            label: 'getEnemyEyePos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEnemyEyePos(): vector',
            insertText: 'getEnemyEyePos()'
        },
        {
            label: 'predictEnemyPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'predictEnemyPos( float time ): vector',
            insertText: 'predictEnemyPos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canHitEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canHitEnemy(): float',
            insertText: 'canHitEnemy()'
        },
        {
            label: 'canHitEnemyFromAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canHitEnemyFromAnim( string anim ): float',
            insertText: 'canHitEnemyFromAnim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canHitEnemyFromJoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canHitEnemyFromJoint( string jointname ): float',
            insertText: 'canHitEnemyFromJoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enemyPositionValid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enemyPositionValid(): float',
            insertText: 'enemyPositionValid()'
        },
        {
            label: 'chargeAttack',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'chargeAttack( string damageDef ): void',
            insertText: 'chargeAttack(${0})',
            insertTextFormat: 2
        },
        {
            label: 'testChargeAttack',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testChargeAttack(): float',
            insertText: 'testChargeAttack()'
        },
        {
            label: 'testAnimMoveTowardEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testAnimMoveTowardEnemy( string animname ): float',
            insertText: 'testAnimMoveTowardEnemy(${0})',
            insertTextFormat: 2
        },
        {
            label: 'testAnimMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testAnimMove( string animname ): float',
            insertText: 'testAnimMove(${0})',
            insertTextFormat: 2
        },
        {
            label: 'testMoveToPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testMoveToPosition( vector position ): float',
            insertText: 'testMoveToPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'testMeleeAttack',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testMeleeAttack(): float',
            insertText: 'testMeleeAttack()'
        },
        {
            label: 'testAnimAttack',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'testAnimAttack( string animname ): float',
            insertText: 'testAnimAttack(${0})',
            insertTextFormat: 2
        },
        {
            label: 'shrivel',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'shrivel( float time ): void',
            insertText: 'shrivel(${0})',
            insertTextFormat: 2
        },
        {
            label: 'preBurn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'preBurn(): void',
            insertText: 'preBurn()'
        },
        {
            label: 'burn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'burn(): void',
            insertText: 'burn()'
        },
        {
            label: 'clearBurn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearBurn(): void',
            insertText: 'clearBurn()'
        },
        {
            label: 'setSmokeVisibility',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setSmokeVisibility( float particle_num, float on ): void',
            insertText: 'setSmokeVisibility(${0})',
            insertTextFormat: 2
        },
        {
            label: 'numSmokeEmitters',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'numSmokeEmitters(): float',
            insertText: 'numSmokeEmitters()'
        },
        {
            label: 'waitAction',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'waitAction( string name ): void',
            insertText: 'waitAction(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopThinking',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopThinking(): void',
            insertText: 'stopThinking()'
        },
        {
            label: 'getTurnDelta',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTurnDelta(): float',
            insertText: 'getTurnDelta()'
        },
        {
            label: 'getMoveType',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getMoveType(): float',
            insertText: 'getMoveType()'
        },
        {
            label: 'setMoveType',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setMoveType( float movetype ): void',
            insertText: 'setMoveType(${0})',
            insertTextFormat: 2
        },
        {
            label: 'saveMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'saveMove(): void',
            insertText: 'saveMove()'
        },
        {
            label: 'restoreMove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'restoreMove(): void',
            insertText: 'restoreMove()'
        },
        {
            label: 'allowMovement',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'allowMovement( float allow ): void',
            insertText: 'allowMovement(${0})',
            insertTextFormat: 2
        },
        {
            label: 'enableClip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableClip(): void',
            insertText: 'enableClip()'
        },
        {
            label: 'disableClip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableClip(): void',
            insertText: 'disableClip()'
        },
        {
            label: 'enableGravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableGravity(): void',
            insertText: 'enableGravity()'
        },
        {
            label: 'disableGravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableGravity(): void',
            insertText: 'disableGravity()'
        },
        {
            label: 'enableAFPush',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'enableAFPush(): void',
            insertText: 'enableAFPush()'
        },
        {
            label: 'disableAFPush',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'disableAFPush(): void',
            insertText: 'disableAFPush()'
        },
        {
            label: 'setFlySpeed',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setFlySpeed( float speed ): void',
            insertText: 'setFlySpeed(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setFlyOffset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setFlyOffset( float offset ): void',
            insertText: 'setFlyOffset(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearFlyOffset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearFlyOffset(): void',
            insertText: 'clearFlyOffset()'
        },
        {
            label: 'getClosestHiddenTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getClosestHiddenTarget( string entity_type ): entity',
            insertText: 'getClosestHiddenTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getRandomTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getRandomTarget( string entity_type ): entity',
            insertText: 'getRandomTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'travelDistanceToPoint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'travelDistanceToPoint( vector destination ): float',
            insertText: 'travelDistanceToPoint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'travelDistanceToEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'travelDistanceToEntity( entity destination ): float',
            insertText: 'travelDistanceToEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'travelDistanceBetweenEntities',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'travelDistanceBetweenEntities( entity source, entity dest ): float',
            insertText: 'travelDistanceBetweenEntities(${0})',
            insertTextFormat: 2
        },
        {
            label: 'travelDistanceBetweenPoints',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'travelDistanceBetweenPoints( vector source, vector dest ): float',
            insertText: 'travelDistanceBetweenPoints(${0})',
            insertTextFormat: 2
        },
        {
            label: 'lookAt',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'lookAt( entity focusEntity, float duration ): void',
            insertText: 'lookAt(${0})',
            insertTextFormat: 2
        },
        {
            label: 'lookAtEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'lookAtEnemy( float duration ): void',
            insertText: 'lookAtEnemy(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setBoneMod',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setBoneMod( float allowBoneMod ): void',
            insertText: 'setBoneMod(${0})',
            insertTextFormat: 2
        },
        {
            label: 'kill',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'kill(): void',
            insertText: 'kill()'
        },
        {
            label: 'wakeOnFlashlight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'wakeOnFlashlight( float enable ): void',
            insertText: 'wakeOnFlashlight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setTalkState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setTalkState( float state ): void',
            insertText: 'setTalkState(${0})',
            insertTextFormat: 2
        },
        {
            label: 'locateEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'locateEnemy(): void',
            insertText: 'locateEnemy()'
        },
        {
            label: 'kickObstacles',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'kickObstacles( entity kickEnt, float force ): void',
            insertText: 'kickObstacles(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getObstacle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getObstacle(): entity',
            insertText: 'getObstacle()'
        },
        {
            label: 'pushPointIntoAAS',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'pushPointIntoAAS( vector pos ): vector',
            insertText: 'pushPointIntoAAS(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getTurnRate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTurnRate(): float',
            insertText: 'getTurnRate()'
        },
        {
            label: 'setTurnRate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setTurnRate( float rate ): void',
            insertText: 'setTurnRate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'animTurn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'animTurn( float angle ): void',
            insertText: 'animTurn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'allowHiddenMovement',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'allowHiddenMovement( float enable ): void',
            insertText: 'allowHiddenMovement(${0})',
            insertTextFormat: 2
        },
        {
            label: 'findActorsInBounds',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'findActorsInBounds( vector mins, vector maxs ): entity',
            insertText: 'findActorsInBounds(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canReachPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canReachPosition( vector pos ): float',
            insertText: 'canReachPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canReachEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canReachEntity( vector int ): float',
            insertText: 'canReachEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'canReachEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canReachEnemy(): float',
            insertText: 'canReachEnemy()'
        },
        {
            label: 'getReachableEntityPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getReachableEntityPosition( entity ent ): vector',
            insertText: 'getReachableEntityPosition(${0})',
            insertTextFormat: 2
        },
        {
            label: 'vagary_ChooseObjectToThrow',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'vagary_ChooseObjectToThrow( vector mins, vector maxs, float speed, float minDist, float offset ): entity',
            insertText: 'vagary_ChooseObjectToThrow(${0})',
            insertTextFormat: 2
        },
        {
            label: 'vagary_ThrowObjectAtEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'vagary_ThrowObjectAtEnemy( entity ent, float speed ): void',
            insertText: 'vagary_ThrowObjectAtEnemy(${0})',
            insertTextFormat: 2
        },
        /*
        - Events D3XP
        */
        {
            label: 'moveToPositionDirect',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'moveToPositionDirect( vector pos ): void',
            documentation: 'Walk to position, ignore obstacles.',
            insertText: 'moveToPositionDirect(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setAnimation',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAnimation( string animName ): void',
            documentation: 'Use this with idAnimated entities.',
            insertText: 'setAnimation(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getAnimationLength',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getAnimationLength(): float',
            insertText: 'getAnimationLength()'
        },
        {
            label: 'rotateVector',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'rotateVector( vector vec, vector ang ): vector',
            insertText: 'rotateVector(${0})',
            insertTextFormat: 2
        },
        {
            label: 'giveInventoryItem',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'giveInventoryItem( string item ): void',
            insertText: 'giveInventoryItem(${0})',
            insertTextFormat: 2
        },
        {
            label: 'randomInt',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'randomInt( float range ): float',
            documentation: 'Returns value from 0 to range, non-inclusive.',
            insertText: 'randomInt(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getGuiParm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getGuiParm( float guiNum, string key ): string',
            insertText: 'getGuiParm(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getGuiParmFloat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getGuiParmFloat( float guiNum, string key ): float',
            insertText: 'getGuiParmFloat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'guiNamedEvent',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'guiNamedEvent( float guiNum, string event ): void',
            insertText: 'guiNamedEvent(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setGuiStates',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setGuiStates(): void',
            insertText: 'setGuiStates()'
        },
        {
            label: 'removeInventoryItem',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'removeInventoryItem( string name ): void',
            insertText: 'removeInventoryItem(${0})',
            insertTextFormat: 2
        },
        // Duplicate
        /*{
            label: 'getIdealWeapon',
            kind: CompletionItemKind.Function,
            detail: 'getIdealWeapon(): string',
            insertText: 'getIdealWeapon()'
        },*/
        {
            label: 'setPowerupTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setPowerupTime( float powerup, float time ): void',
            insertText: 'setPowerupTime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isPowerupActive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isPowerupActive( float powerup ): float',
            insertText: 'isPowerupActive(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weaponAvailable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weaponAvailable( string name ): float',
            insertText: 'weaponAvailable(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startWarp',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startWarp(): void',
            insertText: 'startWarp()'
        },
        {
            label: 'stopHelltime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopHelltime( float mode ): void',
            insertText: 'stopHelltime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'toggleBloom',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'toggleBloom( float on ): void',
            insertText: 'toggleBloom(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setBloomParms',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setBloomParms( float speed, float intensity ): void',
            insertText: 'setBloomParms(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startWeaponSmoke',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startWeaponSmoke(): void',
            insertText: 'startWeaponSmoke()'
        },
        {
            label: 'stopWeaponSmoke',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopWeaponSmoke(): void',
            insertText: 'stopWeaponSmoke()'
        },
        {
            label: 'startWeaponParticle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startWeaponParticle( string name ): void',
            insertText: 'startWeaponParticle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopWeaponParticle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopWeaponParticle( string name ): void',
            insertText: 'stopWeaponParticle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startWeaponLight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startWeaponLight( string name ): void',
            insertText: 'startWeaponLight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'stopWeaponLight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopWeaponLight( string name ): void',
            insertText: 'stopWeaponLight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'ejectBrass',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'ejectBrass(): void',
            insertText: 'ejectBrass()'
        },
        {
            label: 'projectileCreateProjectile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'projectileCreateProjectile( entity owner, vector start, vector dir ): void',
            insertText: 'projectileCreateProjectile(${0})',
            insertTextFormat: 2
        },
        {
            label: 'projectileLaunchProjectile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'projectileLaunchProjectile( vector start, vector dir, vector pushVelocity ): void',
            insertText: 'projectileLaunchProjectile(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setGravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setGravity( float gravity ): void',
            insertText: 'setGravity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'asin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'asin( float a ): float',
            insertText: 'asin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'acos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'acos( float a ): float',
            insertText: 'acos(${0})',
            insertTextFormat: 2
        },
        {
            label: 'launchProjectilesEllipse',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'launchProjectilesEllipse( float num_projectiles, float spreada, float spreadb, float fuseOffset, float power ): void',
            insertText: 'launchProjectilesEllipse(${0})',
            insertTextFormat: 2
        },
        {
            label: 'launchPowerup',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'launchPowerup( string powerup, float duration, float useAmmo ): void',
            insertText: 'launchPowerup(${0})',
            insertTextFormat: 2
        },
        /*
        - Events Deck
        */
        {
            label: 'setDeckScript',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setDeckScript( entity ent ): void',
            documentation: 'Tell the game what object is the global deck script object. Called at game start.',
            insertText: 'setDeckScript(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_cls',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_cls(): void',
            documentation: 'Clear all output.',
            insertText: 'deck_cls()'
        },
        {
            label: 'deck_print',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_print( string text ): void',
            documentation: 'Print a line.',
            insertText: 'deck_print(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_printline',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_printline( string text ): void',
            documentation: 'Overwrite the last line.',
            insertText: 'deck_printline(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_split',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_split( float index, string text ): string',
            documentation: 'Split a string by whitespaces.\n\tindex = index of word\n\ttext = the entire raw string\nIf no word found at index, then return "".',
            insertText: 'deck_split(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_split2',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_split2( float index, string text, string divider ): string',
            documentation: 'Set a custom divider string. See deck_split.',
            insertText: 'deck_split2(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_split3',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[deck] deck_split3( float index, string text, string divider ): string',
            documentation: 'Same as deck_split2 but returns an unparsed string.',
            insertText: 'deck_split3(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_getArg',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'deck_getArg( string text ): string',
            documentation: 'Returns the argument passed in via parentheses (i.e. passing in door1.off(7.2) will return "7.2").',
            insertText: 'deck_getArg(${0})',
            insertTextFormat: 2
        },
        {
            label: 'deck_hasArg',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'deck_hasArg( string text, string functionName ): float',
            documentation: 'Verifies whether this is a valid argument.',
            insertText: 'deck_hasArg(${0})',
            insertTextFormat: 2
        },
        {
            label: 'callFunctionArg',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'callFunctionArg( string functionName, float arg ): void',
            documentation: 'Call a script function and pass an arg.\n\nWARNING! Is ultra wonky.',
            insertText: 'callFunctionArg(${0})',
            insertTextFormat: 2
        },
        /*
        - Events Player
        */
        {
            label: 'setFrobbable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setFrobbable( float enable ): void',
            documentation: 'Marks item as frobbable/unfrobbable',
            insertText: 'setFrobbable(${0})',
            insertTextFormat: 2
        },
        {
            label: 'usePicker',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'usePicker( entity ent ): float',
            documentation: 'Force player to pick up an object.',
            insertText: 'usePicker(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isHolding',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isHolding( entity ent ): float',
            documentation: 'Check if player is holding this ent.',
            insertText: 'isHolding(${0})',
            insertTextFormat: 2
        },
        {
            label: 'pressEnter',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'pressEnter(): void',
            documentation: 'Force press enter on deck.',
            insertText: 'pressEnter()'
        },
        {
            label: 'settext_obj',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'settext_obj( string text ): void',
            documentation: 'Objective text.',
            insertText: 'settext_obj(${0})',
            insertTextFormat: 2
        },
        {
            label: 'settext_alarms',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'settext_alarms( float amount ): void',
            documentation: 'Objective text.',
            insertText: 'settext_alarms(${0})',
            insertTextFormat: 2
        },
        {
            label: 'settext_missionclock',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'settext_missionclock( float amount ): void',
            documentation: 'Objective text.',
            insertText: 'settext_missionclock(${0})',
            insertTextFormat: 2
        },
        {
            label: 'viewlook',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'viewlook( vector targetPos, float time, float backwards, float staylocked ): void',
            documentation: 'Transition the camera to a new position.',
            insertText: 'viewlook(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clamberScripted',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clamberScripted( vector targetPos, float intensity, float movetime ): void',
            documentation: 'Scripted climb.\n\tintensity = how much to bobble the camera',
            insertText: 'clamberScripted(${0})',
            insertTextFormat: 2
        },
        {
            label: 'useVehicle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'useVehicle( entity vehicle, float board ): void',
            documentation: 'Board/disembark a vehicle.',
            insertText: 'useVehicle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setFrozen',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setFrozen( float value ): void',
            documentation: 'Stop player from moving/jumping/crouching.\n\t0 = can\'t move\n\t1 = +can\'t use weapons\n\t2 = +can\'t turn head',
            insertText: 'setFrozen(${0})',
            insertTextFormat: 2
        },
        {
            label: 'inDeck',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'inDeck(): float',
            documentation: 'Check if player is in deck or not.',
            insertText: 'inDeck()'
        },
        {
            label: 'stopPicker',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'stopPicker(): void',
            documentation: 'Force player to drop whatever is being carried.',
            insertText: 'stopPicker()'
        },
        {
            label: 'getAmmo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getAmmo( string name ): float',
            documentation: 'Get ammo count.',
            insertText: 'getAmmo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'spendAmmo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'spendAmmo( string name, float value ): float',
            documentation: 'Consume ammo.',
            insertText: 'spendAmmo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setAmmo',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAmmo( string name, float value ): void',
            documentation: 'Set absolute value for ammo.',
            insertText: 'setAmmo(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearPowerups',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearPowerups(): void',
            documentation: 'Clear powerups.',
            insertText: 'clearPowerups()'
        },
        {
            label: 'removeWeaponItem',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'removeWeaponItem( string weapon ): void',
            documentation: 'Remove weapon.',
            insertText: 'removeWeaponItem(${0})',
            insertTextFormat: 2
        },
        {
            label: 'useDeck',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'useDeck( entity ent, entity master ): void',
            documentation: 'Call when player wants to start typing on deck.',
            insertText: 'useDeck(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getEyePos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getEyePos(): vector',
            documentation: 'Get worldposition of eyeball.',
            insertText: 'getEyePos()'
        },
        {
            label: 'getPickerState',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPickerState(): float',
            documentation: 'Get state of player crosshair.\n\t0 = normal crosshair\n\t1 = frob finger available\n\t2 = holding something\n\t3 = just dropped object',
            insertText: 'getPickerState()'
        },
        {
            label: 'writesticky',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'writesticky( float value ): void',
            insertText: 'writesticky(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcasing',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setcasing( float value ): void',
            documentation: 'Set player in caser mode.',
            insertText: 'setcasing(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setviewangle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setviewangle( vector angle ): void',
            documentation: 'Force view angle to turn.',
            insertText: 'setviewangle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setplayerskin',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setplayerskin( string skinname ): void',
            documentation: 'Set skin.',
            insertText: 'setplayerskin(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setgodmode',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setgodmode( float value ): void',
            documentation: 'Sets god mode.',
            insertText: 'setgodmode(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sethipclock',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'sethipclock( float value ): void',
            documentation: 'Toggle hip clock.',
            insertText: 'sethipclock(${0})',
            insertTextFormat: 2
        },
        {
            label: 'toggleHaze',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'toggleHaze( float time, float value ): void',
            documentation: 'time = how long to play it\nvalue = intensity',
            insertText: 'toggleHaze(${0})',
            insertTextFormat: 2
        },
        {
            label: 'lerpviewangle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'lerpviewangle( vector pos, float time ): void',
            documentation: 'Lerp the viewangles.\n\tpos = xyz of the target object\n\ttime = milliseconds (1000 ms = 1 sec)',
            insertText: 'lerpviewangle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isInFOV',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isInFOV( vector pos ): float',
            documentation: 'Determine whether an xyz is within the player\'s FOV.',
            insertText: 'isInFOV(${0})',
            insertTextFormat: 2
        },
        {
            label: 'killDeckthreads',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'killDeckthreads(): void',
            documentation: 'Kill any threads in the deck is running.',
            insertText: 'killDeckthreads()'
        },
        {
            label: 'forcestand',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'forcestand(): void',
            documentation: 'Force the player to uncrouch & stand up.',
            insertText: 'forcestand()'
        },
        {
            label: 'forcegui',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'forcegui( string flag, float value ): void',
            documentation: 'Set a gui flag.',
            insertText: 'forcegui(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcanfrob',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setcanfrob( float value ): void',
            documentation: 'Toggle ability to frob things.',
            insertText: 'setcanfrob(${0})',
            insertTextFormat: 2
        },
        /*
        - Events World
        */
        {
            label: 'setPlacerAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setPlacerAngle( float value ): void',
            documentation: 'Gets/sets the placer\'s current rotation.',
            insertText: 'setPlacerAngle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getPlacerAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPlacerAngle(): vector',
            documentation: 'Gets/sets the placer\'s current rotation.',
            insertText: 'getPlacerAngle()'
        },
        {
            label: 'getPlacerAngleRaw',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPlacerAngleRaw(): vector',
            documentation: 'Gets/sets the placer\'s current rotation.',
            insertText: 'getPlacerAngleRaw()'
        },
        {
            label: 'getPlacerPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPlacerPos(): vector',
            insertText: 'getPlacerPos()'
        },
        {
            label: 'getPlacerValid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPlacerValid(): float',
            insertText: 'getPlacerValid()'
        },
        {
            label: 'getPlacerFloatPos',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getPlacerFloatPos(): vector',
            insertText: 'getPlacerFloatPos()'
        },
        {
            label: 'GetOriginalPosition',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'GetOriginalPosition(): vector',
            documentation: 'Func_mover and idmoveable.',
            insertText: 'GetOriginalPosition()'
        },
        {
            label: 'GetOriginalAngle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'GetOriginalAngle(): vector',
            documentation: 'Func_mover and idmoveable.',
            insertText: 'GetOriginalAngle()'
        },
        {
            label: 'setAFGravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAFGravity( vector newGravity ): void',
            documentation: 'Sets gravity on an articulated figure.',
            insertText: 'setAFGravity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setCamFov',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setCamFov( float fov ): void',
            documentation: 'idCameraView: set fov of camera.',
            insertText: 'setCamFov(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setCameraTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setCameraTarget( entity ent ): void',
            documentation: 'Assign a cameraTarget to an entity.',
            insertText: 'setCameraTarget(${0})',
            insertTextFormat: 2
        },
        {
            label: 'clearCameraTarget',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'clearCameraTarget(): void',
            insertText: 'clearCameraTarget()'
        },
        {
            label: 'getNearestEnemy',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getNearestEnemy(): entity',
            documentation: 'Get the nearest enemy.',
            insertText: 'getNearestEnemy()'
        },
        {
            label: 'canSeeEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'canSeeEntity( entity ent ): float',
            documentation: 'Check if this ent can see the other ent.',
            insertText: 'canSeeEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'floatRound',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'floatRound( float value, float decimalPlaces ): string',
            documentation: 'Truncate the decimal places of a float value.',
            insertText: 'floatRound(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getClassEntity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getClassEntity( string classname, float lastFound ): entity',
            documentation: 'Returns entity with the classname. Use lastFound to cycle to the next found entity.',
            insertText: 'getClassEntity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getIndex',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getIndex(): float',
            documentation: 'Returns the index number of the entity in the gameLocal.entities[] list.',
            insertText: 'getIndex()'
        },
        {
            label: 'camOff',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'camOff(): void',
            documentation: 'Camera event.',
            insertText: 'camOff()'
        },
        {
            label: 'camOn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'camOn(): void',
            documentation: 'Camera event.',
            insertText: 'camOn()'
        },
        {
            label: 'camreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'camreset(): void',
            documentation: 'Camera event.',
            insertText: 'camreset()'
        },
        {
            label: 'hudMessage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'hudMessage( string text ): void',
            documentation: 'Show a message on the hud.',
            insertText: 'hudMessage(${0})',
            insertTextFormat: 2
        },
        {
            label: 'debugMessage',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'debugMessage( string text ): void',
            documentation: 'Show a message on the hud.',
            insertText: 'debugMessage(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setAFActive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAFActive( float value ): void',
            documentation: 'Articulated Figures: toggles physics simulation.',
            insertText: 'setAFActive(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setAFRest',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setAFRest( float value ): void',
            documentation: 'Articulated Figures: come to physics rest.',
            insertText: 'setAFRest(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setNoclip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'setNoclip( float value ): void',
            documentation: 'Playercall: sets noclip.',
            insertText: 'setNoclip(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getNoclip',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getNoclip(): float',
            insertText: 'getNoclip()'
        },
        {
            label: 'getTraceSky',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getTraceSky(): float',
            documentation: 'Determines of the last trace call that touched the sky.',
            insertText: 'getTraceSky()'
        },
        {
            label: 'IsEnabled',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[trigger] IsEnabled(): float',
            documentation: 'Check if trigger is enabled.',
            insertText: 'IsEnabled()'
        },
        {
            label: 'triggeractivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[trigger] triggeractivate( float value ): void',
            documentation: 'Set whether trigger is active.',
            insertText: 'triggeractivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'SetWidth',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[beam] SetWidth( float width ): void',
            documentation: 'Set the width.',
            insertText: 'SetWidth(${0})',
            insertTextFormat: 2
        },
        {
            label: 'UpdatePeak',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[jumppad] UpdatePeak(): void',
            documentation: 'Update the peak point.',
            insertText: 'UpdatePeak()'
        },
        {
            label: 'activatepad',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[jumppad] activatepad( float value ): void',
            documentation: 'Toggle jumppad on/off.',
            insertText: 'activatepad(${0})',
            insertTextFormat: 2
        },
        {
            label: 'laseroff',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[laserwire] laseroff( float delay ): void',
            insertText: 'laseroff(${0})',
            insertTextFormat: 2
        },
        {
            label: 'laseron',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[laserwire] laseron(): void',
            insertText: 'laseron()'
        },
        {
            label: 'laserenable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[laserwire] laserenable( float value ): void',
            insertText: 'laserenable(${0})',
            insertTextFormat: 2
        },
        {
            label: 'fadeLight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[light] fadeLight( float time, vector newColor ): void',
            documentation: 'Fade light to a new color.',
            insertText: 'fadeLight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'IsOn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[light] IsOn(): float',
            documentation: 'Determines whether light is on or off.\n\t0 = off',
            insertText: 'IsOn()'
        },
        {
            label: 'resetlight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[light] resetlight( float time ): void',
            documentation: 'Fade light back to its original spawn color.',
            insertText: 'resetlight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isHidden',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isHidden(): float',
            documentation: 'VehicleSimple: check if hidden in alley.',
            insertText: 'isHidden()'
        },
        {
            label: 'getString',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] getString( string value ): string',
            documentation: 'Return localized string from english.lang. Send it the 5-digit localized integer.',
            insertText: 'getString(${0})',
            insertTextFormat: 2
        },
        {
            label: 'parseTime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] parseTime( float amount ): string',
            documentation: 'Give it seconds, returns a readable mm:ss.dd string.',
            insertText: 'parseTime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'parseTime2',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] parseTime2( float amount ): string',
            documentation: 'Give it seconds, returns a readable mm:ss string.',
            insertText: 'parseTime2(${0})',
            insertTextFormat: 2
        },
        {
            label: 'parseTimeMS',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] parseTimeMS( float amount ): string',
            documentation: 'Give it milliseconds, returns a readable mm:ss.dd string.',
            insertText: 'parseTimeMS(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getMapname',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] getMapname(): string',
            documentation: 'Get name of map that\'s currently running.',
            insertText: 'getMapname()'
        },
        {
            label: 'callMap',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] callMap( string functionName ): float',
            documentation: 'Call a function on the current map. Return 1 if successful.',
            insertText: 'callMap(${0})',
            insertTextFormat: 2
        },
        {
            label: 'lerp',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] lerp( float value1, float value2, float amount ): float',
            insertText: 'lerp(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getworldspawnint',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] getworldspawnint( string keyname ): float',
            documentation: 'Gets int value from worldspawn.',
            insertText: 'getworldspawnint(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcutscene',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] setcutscene( float value ): void',
            documentation: 'Set whether we\'re in a skippable scene. Press ESC to skip. Calls map function "skipcutscene".',
            insertText: 'setcutscene(${0})',
            insertTextFormat: 2
        },
        {
            label: 'spawndecal',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] spawndecal( vector pos, vector normal, float size, string material ): void',
            insertText: 'spawndecal(${0})',
            insertTextFormat: 2
        },
        {
            label: 'rundeckcommand',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] rundeckcommand( string value ): void',
            documentation: 'Jam command(s) into the deck queue.',
            insertText: 'rundeckcommand(${0})',
            insertTextFormat: 2
        },
        {
            label: 'callsavegame',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] callsavegame( float savetype ): void',
            documentation: 'Save game.\n\t0 = quicksave\n\t1 = savestation\n\t2 = autosave',
            insertText: 'callsavegame(${0})',
            insertTextFormat: 2
        },
        {
            label: 'killcctvs',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sys] killcctvs(): void',
            documentation: 'Kill all cctv connections.',
            insertText: 'killcctvs()'
        },
        {
            label: 'getMapIndex',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'getMapIndex(): string',
            documentation: 'Get campaign index # of map.',
            insertText: 'getMapIndex()'
        },
        {
            label: 'PanelDisconnect',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[func_panel] PanelDisconnect(): void',
            documentation: 'Disconnect any attached cables.',
            insertText: 'PanelDisconnect()'
        },
        {
            label: 'PanelReset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[func_panel] PanelReset(): void',
            documentation: 'Reset.',
            insertText: 'PanelReset()'
        },
        {
            label: 'setClipModel',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[entity] setClipModel( string clipmodelname ): void',
            documentation: 'Set clipmodel.',
            insertText: 'setClipModel(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setSolid',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[entity] setSolid( float value ): void',
            documentation: 'Sets solid/nonsolid.',
            insertText: 'setSolid(${0})',
            insertTextFormat: 2
        },
        {
            label: 'turretactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[turret] turretactivate( float value ): void',
            documentation: 'Activate/deactivate.',
            insertText: 'turretactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'turretisactive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[turret] turretisactive(): float',
            documentation: 'Returns whether it\'s on.',
            insertText: 'turretisactive()'
        },
        {
            label: 'portalactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[func_portal] portalactivate( float value ): void',
            insertText: 'portalactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'triggerpushactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[trigger_push] triggerpushactivate( float value ): void',
            insertText: 'triggerpushactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sentryactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentryactivate( float value ): void',
            documentation: 'Activate/deactivate sentry.',
            insertText: 'sentryactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'issentryactive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] issentryactive(): float',
            documentation: 'Get whether sentry is active.',
            insertText: 'issentryactive()'
        },
        {
            label: 'sentryturn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentryturn( float yaw ): void',
            insertText: 'sentryturn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sentrypitch',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentrypitch( float pitch ): void',
            insertText: 'sentrypitch(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sentryface',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentryface( float x, float y, float z ): void',
            insertText: 'sentryface(${0})',
            insertTextFormat: 2
        },
        {
            label: 'sentryfire',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentryfire(): void',
            insertText: 'sentryfire()'
        },
        {
            label: 'sentrystand',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentrystand(): void',
            insertText: 'sentrystand()'
        },
        {
            label: 'sentrygetlaser',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentrygetlaser(): vector',
            insertText: 'sentrygetlaser()'
        },
        {
            label: 'sentrykill',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[sentry] sentrykill(): void',
            insertText: 'sentrykill()'
        },
        {
            label: 'weevilforward',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevilforward( float distance ): void',
            insertText: 'weevilforward(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weevilturn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevilturn( float degrees ): void',
            insertText: 'weevilturn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weevilstop',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevilstop(): void',
            insertText: 'weevilstop()'
        },
        {
            label: 'weevilstand',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevilstand(): void',
            insertText: 'weevilstand()'
        },
        {
            label: 'weevillight',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevillight( float value ): void',
            insertText: 'weevillight(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weeviljump',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weeviljump(): void',
            insertText: 'weeviljump()'
        },
        {
            label: 'weevilgravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[weevil] weevilgravity( float value ): void',
            insertText: 'weevilgravity(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weevilgetgravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weevilgetgravity(): float',
            insertText: 'weevilgetgravity()'
        },
        {
            label: 'weevildoplug',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weevildoplug( float value, entity datajack ): void',
            insertText: 'weevildoplug(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isweevilplugconnected',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isweevilplugconnected(): float',
            insertText: 'isweevilplugconnected()'
        },
        {
            label: 'weevileyemove',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'weevileyemove( float pitch, float yaw, float reset ): float',
            insertText: 'weevileyemove(${0})',
            insertTextFormat: 2
        },
        {
            label: 'camturretactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[camturret] camturretactivate( float value ): void',
            insertText: 'camturretactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'keypadopen',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[keypad] keypadopen( float value ): void',
            documentation: 'Open/close the keypad.',
            insertText: 'keypadopen(${0})',
            insertTextFormat: 2
        },
        {
            label: 'startAnim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'startAnim(): void',
            documentation: 'idAnimated.',
            insertText: 'startAnim()'
        },
        {
            label: 'launcherkill',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[launcher] launcherkill(): void',
            insertText: 'launcherkill()'
        },
        {
            label: 'recordstart',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordstart( float index, float continuation ): void',
            insertText: 'recordstart(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordplay',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordplay( float index ): void',
            insertText: 'recordplay(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordstop',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordstop(): void',
            insertText: 'recordstop()'
        },
        {
            label: 'worldreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] worldreset(): void',
            documentation: 'Reset original positions of moveable things.',
            insertText: 'worldreset()'
        },
        {
            label: 'geteventcount',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] geteventcount( float index ): float',
            documentation: 'Get # of events in an operative\'s timeline.',
            insertText: 'geteventcount(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getlasteventtimestamp',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] getlasteventtimestamp( float index ): float',
            documentation: 'Get timestamp (i.e. 50.000000 = 50 seconds) of last event.',
            insertText: 'getlasteventtimestamp(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setrecordstarttime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] setrecordstarttime(): void',
            documentation: 'Set a record start time. Used for continuations.',
            insertText: 'setrecordstarttime()'
        },
        {
            label: 'moveplayertoghost',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] moveplayertoghost( float index ): void',
            insertText: 'moveplayertoghost(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordclear',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordclear( float index ): void',
            insertText: 'recordclear(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcomplete',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] setcomplete( float index, float value ): void',
            insertText: 'setcomplete(${0})',
            insertTextFormat: 2
        },
        {
            label: 'getcomplete',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] getcomplete( float index ): float',
            insertText: 'getcomplete(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordspawn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordspawn( string defName, float id, vector position, float yaw ): void',
            insertText: 'recordspawn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordunspawn',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordunspawn( float id ): void',
            insertText: 'recordunspawn(${0})',
            insertTextFormat: 2
        },
        {
            label: 'recordlaunchaim',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[worldmanager] recordlaunchaim( float id, vector dir, float force ): void',
            insertText: 'recordlaunchaim(${0})',
            insertTextFormat: 2
        },
        {
            label: 'onAlarm',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'onAlarm(): void',
            documentation: 'Trigger this when a security system (laserwire, door timer, etc.) is tripped.',
            insertText: 'onAlarm()'
        },
        {
            label: 'onSighted',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'onSighted(): void',
            documentation: 'Trigger this when a camturret sees the player.',
            insertText: 'onSighted()'
        },
        {
            label: 'onDefuse',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'onDefuse(): void',
            insertText: 'onDefuse()'
        },
        {
            label: 'onReset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'onReset(): void',
            documentation: 'Trigger this when a job is restarted.',
            insertText: 'onReset()'
        },
        {
            label: 'powersawreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[powersaw] powersawreset(): void',
            insertText: 'powersawreset()'
        },
        {
            label: 'powerscrewreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[powerscrew] powerscrewreset(): void',
            insertText: 'powerscrewreset()'
        },
        {
            label: 'screwreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[screw] screwreset(): void',
            insertText: 'screwreset()'
        },
        {
            label: 'glassreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[qglass] glassreset(): void',
            insertText: 'glassreset()'
        },
        {
            label: 'contractcamreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[contract cam] contractcamreset(): void',
            insertText: 'contractcamreset()'
        },
        {
            label: 'clockreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[clock] clockreset(): void',
            documentation: 'Reset clock to midnight.',
            insertText: 'clockreset()'
        },
        {
            label: 'clocksettime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[clock] clocksettime( float value ): void',
            documentation: 'Set clock to a value.',
            insertText: 'clocksettime(${0})',
            insertTextFormat: 2
        },
        {
            label: 'tablefoldreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[tablefold] tablefoldreset(): void',
            insertText: 'tablefoldreset()'
        },
        {
            label: 'staticactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[itemgate] staticactivate( float value ): void',
            insertText: 'staticactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'doorfoldingactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[door folding] doorfoldingactivate( float value ): void',
            insertText: 'doorfoldingactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'emitterenable',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[func_emitter] emitterenable( float value ): void',
            insertText: 'emitterenable(${0})',
            insertTextFormat: 2
        },
        {
            label: 'isemitterenabled',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'isemitterenabled(): float',
            insertText: 'isemitterenabled()'
        },
        {
            label: 'zeppelinactivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[zeppelin] zeppelinactivate( float value ): void',
            insertText: 'zeppelinactivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'datajackreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[datajack] datajackreset( float closeDoor ): void',
            insertText: 'datajackreset(${0})',
            insertTextFormat: 2
        },
        {
            label: 'weevilopendoor',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[datajack] weevilopendoor(): void',
            insertText: 'weevilopendoor()'
        },
        {
            label: 'getdatajackopenstate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[datajack] getdatajackopenstate(): float',
            insertText: 'getdatajackopenstate()'
        },
        {
            label: 'countdownreset',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[countdowntimer] countdownreset(): void',
            insertText: 'countdownreset()'
        },
        {
            label: 'countdownstart',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[countdowntimer] countdownstart(): void',
            insertText: 'countdownstart()'
        },
        {
            label: 'countdownhasTripped',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[countdowntimer] countdownhasTripped(): float',
            insertText: 'countdownhasTripped()'
        },
        {
            label: 'buttonswitcheractivate',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[buttonswitcher] buttonswitcheractivate( float value ): void',
            insertText: 'buttonswitcheractivate(${0})',
            insertTextFormat: 2
        },
        {
            label: 'updategravity',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[moveableitems] updategravity(): void',
            documentation: 'Force update of item\'s gravity. Check whether it\'s in a vacuum environment.',
            insertText: 'updategravity()'
        },
        {
            label: 'toggletrail',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[moveableitems] toggletrail( float value ): void',
            documentation: 'Toggle particle trail. Use def file "smoke_trail" and "repeatSmoke".',
            insertText: 'toggletrail(${0})',
            insertTextFormat: 2
        },
        {
            label: 'attractortoggle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[attractor] attractortoggle( float value ): void',
            documentation: 'Toggle on/off.',
            insertText: 'attractortoggle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'setcamerapointvisibility',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[camerapoint] setcamerapointvisibility( float value ): void',
            insertText: 'setcamerapointvisibility(${0})',
            insertTextFormat: 2
        },
        {
            label: 'vacuumtoggle',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[vacuum separator] vacuumtoggle( float value ): void',
            documentation: '1 = block things\n0 = remove block',
            insertText: 'vacuumtoggle(${0})',
            insertTextFormat: 2
        },
        {
            label: 'loopsetactive',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'loopsetactive( float value ): void',
            documentation: 'idanimloop.',
            insertText: 'loopsetactive(${0})',
            insertTextFormat: 2
        },
        {
            label: 'steam_addtimestat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[STEAM] steam_addtimestat( float value, float missionIndex ): float',
            insertText: 'steam_addtimestat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'steam_getglobalstat',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[STEAM] steam_getglobalstat( string statname ): float',
            insertText: 'steam_getglobalstat(${0})',
            insertTextFormat: 2
        },
        {
            label: 'steam_updatefriendtimes',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[STEAM] steam_updatefriendtimes( float missionIndex ): void',
            insertText: 'steam_updatefriendtimes(${0})',
            insertTextFormat: 2
        },
        {
            label: 'steam_setachievement',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: '[STEAM] steam_setachievement( string achievementname ): void',
            insertText: 'steam_setachievement(${0})',
            insertTextFormat: 2
        },
        /*
        - Doom Defs
        */
        {
            label: 'GAME_FPS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' GAME_FPS',
            documentation: ''
        },
        {
            label: 'GAME_FRAMETIME',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' GAME_FRAMETIME',
            documentation: ''
        },
        {
            label: 'NULL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' NULL',
            documentation: ''
        },
        {
            label: 'GRAVITY_DEFAULT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' GRAVITY_DEFAULT',
            documentation: ''
        },
        {
            label: 'JACKDISTANCE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JACKDISTANCE',
            documentation: ''
        },
        {
            label: 'SAFE_CAPTUREDISTANCE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SAFE_CAPTUREDISTANCE',
            documentation: ''
        },
        /*{
            label: 'TRUE',
            kind: CompletionItemKind.Keyword,
            detail: ' TRUE',
            documentation: ''
        },
        {
            label: 'FALSE',
            kind: CompletionItemKind.Keyword,
            detail: ' FALSE',
            documentation: ''
        },*/
        {
            label: 'true',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' true',
            documentation: ''
        },
        {
            label: 'false',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' false',
            documentation: ''
        },
        {
            label: 'UP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' UP',
            documentation: ''
        },
        {
            label: 'DOWN',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' DOWN',
            documentation: ''
        },
        {
            label: 'LEFT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' LEFT',
            documentation: ''
        },
        {
            label: 'RIGHT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' RIGHT',
            documentation: ''
        },
        {
            label: 'FORWARD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' FORWARD',
            documentation: ''
        },
        {
            label: 'BACK',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BACK',
            documentation: ''
        },
        {
            label: 'REL_UP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_UP',
            documentation: ''
        },
        {
            label: 'REL_DOWN',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_DOWN',
            documentation: ''
        },
        {
            label: 'REL_LEFT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_LEFT',
            documentation: ''
        },
        {
            label: 'REL_RIGHT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_RIGHT',
            documentation: ''
        },
        {
            label: 'REL_FORWARD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_FORWARD',
            documentation: ''
        },
        {
            label: 'REL_BACK',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' REL_BACK',
            documentation: ''
        },
        {
            label: 'EAST',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' EAST',
            documentation: ''
        },
        {
            label: 'NORTH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' NORTH',
            documentation: ''
        },
        {
            label: 'WEST',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' WEST',
            documentation: ''
        },
        {
            label: 'SOUTH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SOUTH',
            documentation: ''
        },
        {
            label: 'X_AXIS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' X_AXIS',
            documentation: ''
        },
        {
            label: 'Y_AXIS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' Y_AXIS',
            documentation: ''
        },
        {
            label: 'Z_AXIS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' Z_AXIS',
            documentation: ''
        },
        {
            label: 'YAW',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' YAW',
            documentation: ''
        },
        {
            label: 'PITCH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PITCH',
            documentation: ''
        },
        {
            label: 'ROLL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ROLL',
            documentation: ''
        },
        {
            label: 'M_PI',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' M_PI',
            documentation: ''
        },
        {
            label: 'DEG2RAD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' DEG2RAD( a )',
            documentation: '( (a) * (M_PI / 180.0f ) )',
            insertText: 'DEG2RAD(${0})',
            insertTextFormat: 2
        },
        {
            label: 'RAD2DEG',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' RAD2DEG( a )',
            documentation: '( (a) * (180.0f / M_PI ) )',
            insertText: 'RAD2DEG(${0})',
            insertTextFormat: 2
        },
        {
            label: 'ALL_PARTICLES',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ALL_PARTICLES',
            documentation: ''
        },
        {
            label: 'SIG_TOUCH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_TOUCH',
            documentation: ''
        },
        {
            label: 'SIG_USE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_USE',
            documentation: ''
        },
        {
            label: 'SIG_TRIGGER',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_TRIGGER',
            documentation: ''
        },
        {
            label: 'SIG_REMOVED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_REMOVED',
            documentation: ''
        },
        {
            label: 'SIG_DAMAGE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_DAMAGE',
            documentation: ''
        },
        {
            label: 'SIG_BLOCKED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_BLOCKED',
            documentation: ''
        },
        {
            label: 'SIG_MOVER_POS1',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_MOVER_POS1',
            documentation: ''
        },
        {
            label: 'SIG_MOVER_POS2',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_MOVER_POS2',
            documentation: ''
        },
        {
            label: 'SIG_MOVER_1TO2',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_MOVER_1TO2',
            documentation: ''
        },
        {
            label: 'SIG_MOVER_2TO1',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_MOVER_2TO1',
            documentation: ''
        },
        {
            label: 'SIG_DOOR_CLOSED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_DOOR_CLOSED',
            documentation: ''
        },
        {
            label: 'SIG_DOOR_OPEN',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_DOOR_OPEN',
            documentation: ''
        },
        {
            label: 'SIG_DOOR_OPENING',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_DOOR_OPENING',
            documentation: ''
        },
        {
            label: 'SIG_DOOR_CLOSING',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SIG_DOOR_CLOSING',
            documentation: ''
        },
        {
            label: 'BUTTON_ATTACK',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BUTTON_ATTACK',
            documentation: ''
        },
        {
            label: 'BUTTON_TALK',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BUTTON_TALK',
            documentation: ''
        },
        {
            label: 'BUTTON_WALKING',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BUTTON_WALKING',
            documentation: ''
        },
        {
            label: 'BUTTON_ANY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BUTTON_ANY',
            documentation: ''
        },
        {
            label: 'JOINTMOD_NONE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JOINTMOD_NONE',
            documentation: ''
        },
        {
            label: 'JOINTMOD_LOCAL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JOINTMOD_LOCAL',
            documentation: ''
        },
        {
            label: 'JOINTMOD_LOCAL_OVERRIDE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JOINTMOD_LOCAL_OVERRIDE',
            documentation: ''
        },
        {
            label: 'JOINTMOD_WORLD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JOINTMOD_WORLD',
            documentation: ''
        },
        {
            label: 'JOINTMOD_WORLD_OVERRIDE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' JOINTMOD_WORLD_OVERRIDE',
            documentation: ''
        },
        {
            label: 'BIT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BIT( num )',
            documentation: '( 1 << ( num ) )',
            insertText: 'BIT(${0})',
            insertTextFormat: 2
        },
        {
            label: 'SHADERPARM_RED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_RED',
            documentation: ''
        },
        {
            label: 'SHADERPARM_GREEN',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_GREEN',
            documentation: ''
        },
        {
            label: 'SHADERPARM_BLUE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_BLUE',
            documentation: ''
        },
        {
            label: 'SHADERPARM_ALPHA',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_ALPHA',
            documentation: ''
        },
        {
            label: 'SHADERPARM_TIMESCALE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_TIMESCALE',
            documentation: ''
        },
        {
            label: 'SHADERPARM_TIMEOFFSET',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_TIMEOFFSET',
            documentation: ''
        },
        {
            label: 'SHADERPARM_DIVERSITY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_DIVERSITY',
            documentation: ''
        },
        {
            label: 'SHADERPARM_MODE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_MODE',
            documentation: ''
        },
        {
            label: 'SHADERPARM_TIME_OF_DEATH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SHADERPARM_TIME_OF_DEATH',
            documentation: ''
        },
        {
            label: 'CONTENTS_SOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_SOLID',
            documentation: ''
        },
        {
            label: 'CONTENTS_OPAQUE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_OPAQUE',
            documentation: ''
        },
        {
            label: 'CONTENTS_WATER',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_WATER',
            documentation: ''
        },
        {
            label: 'CONTENTS_PLAYERCLIP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_PLAYERCLIP',
            documentation: ''
        },
        {
            label: 'CONTENTS_MONSTERCLIP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_MONSTERCLIP',
            documentation: ''
        },
        {
            label: 'CONTENTS_MOVEABLECLIP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_MOVEABLECLIP',
            documentation: ''
        },
        {
            label: 'CONTENTS_IKCLIP',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_IKCLIP',
            documentation: ''
        },
        {
            label: 'CONTENTS_BLOOD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_BLOOD',
            documentation: ''
        },
        {
            label: 'CONTENTS_BODY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_BODY',
            documentation: ''
        },
        {
            label: 'CONTENTS_PROJECTILE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_PROJECTILE',
            documentation: ''
        },
        {
            label: 'CONTENTS_CORPSE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_CORPSE',
            documentation: ''
        },
        {
            label: 'CONTENTS_RENDERMODEL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_RENDERMODEL',
            documentation: ''
        },
        {
            label: 'CONTENTS_TRIGGER',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_TRIGGER',
            documentation: ''
        },
        {
            label: 'CONTENTS_AAS_SOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_AAS_SOLID',
            documentation: ''
        },
        {
            label: 'CONTENTS_AAS_OBSTACLE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_AAS_OBSTACLE',
            documentation: ''
        },
        {
            label: 'CONTENTS_FLASHLIGHT_TRIGGER',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' CONTENTS_FLASHLIGHT_TRIGGER',
            documentation: ''
        },
        {
            label: 'MASK_ALL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_ALL',
            documentation: ''
        },
        {
            label: 'MASK_SOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_SOLID',
            documentation: ''
        },
        {
            label: 'MASK_MONSTERSOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_MONSTERSOLID',
            documentation: ''
        },
        {
            label: 'MASK_PLAYERSOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_PLAYERSOLID',
            documentation: ''
        },
        {
            label: 'MASK_DEADSOLID',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_DEADSOLID',
            documentation: ''
        },
        {
            label: 'MASK_WATER',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_WATER',
            documentation: ''
        },
        {
            label: 'MASK_OPAQUE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_OPAQUE',
            documentation: ''
        },
        {
            label: 'MASK_SHOT_RENDERMODEL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_SHOT_RENDERMODEL',
            documentation: ''
        },
        {
            label: 'MASK_SHOT_BOUNDINGBOX',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MASK_SHOT_BOUNDINGBOX',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_ANY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_ANY',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_VOICE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_VOICE',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_VOICE2',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_VOICE2',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_BODY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_BODY',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_BODY2',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_BODY2',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_BODY3',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_BODY3',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_WEAPON',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_WEAPON',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_ITEM',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_ITEM',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_HEART',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_HEART',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_PDA',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_PDA',
            documentation: ''
        },
        {
            label: 'SND_CHANNEL_DEMONIC',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' SND_CHANNEL_DEMONIC',
            documentation: ''
        },
        {
            label: 'ANIMCHANNEL_ALL',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ANIMCHANNEL_ALL',
            documentation: ''
        },
        {
            label: 'ANIMCHANNEL_TORSO',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ANIMCHANNEL_TORSO',
            documentation: ''
        },
        {
            label: 'ANIMCHANNEL_LEGS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ANIMCHANNEL_LEGS',
            documentation: ''
        },
        {
            label: 'ANIMCHANNEL_HEAD',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ANIMCHANNEL_HEAD',
            documentation: ''
        },
        {
            label: 'ANIMCHANNEL_EYELIDS',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ANIMCHANNEL_EYELIDS',
            documentation: ''
        },
        {
            label: 'PROJECTILE_SPAWNED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PROJECTILE_SPAWNED',
            documentation: ''
        },
        {
            label: 'PROJECTILE_CREATED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PROJECTILE_CREATED',
            documentation: ''
        },
        {
            label: 'PROJECTILE_LAUNCHED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PROJECTILE_LAUNCHED',
            documentation: ''
        },
        {
            label: 'PROJECTILE_FIZZLED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PROJECTILE_FIZZLED',
            documentation: ''
        },
        {
            label: 'PROJECTILE_EXPLODED',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' PROJECTILE_EXPLODED',
            documentation: ''
        },
        {
            label: 'eachFrame',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' eachFrame',
            documentation: ''
        },
        {
            label: 'waitUntil',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' waitUntil( x )',
            documentation: 'while( !( x ) ) { waitFrame(); }',
            insertText: 'waitUntil(${0})',
            insertTextFormat: 2
        },
        {
            label: 'BERSERK',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' BERSERK',
            documentation: ''
        },
        {
            label: 'INVISIBILITY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' INVISIBILITY',
            documentation: ''
        },
        {
            label: 'MEGAHEALTH',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' MEGAHEALTH',
            documentation: ''
        },
        {
            label: 'ADRENALINE',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ADRENALINE',
            documentation: ''
        },
        {
            label: 'INVULNERABILITY',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' INVULNERABILITY',
            documentation: ''
        },
        {
            label: 'HELLTIME',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' HELLTIME',
            documentation: ''
        },
        {
            label: 'ENVIROSUIT',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ENVIROSUIT',
            documentation: ''
        },
        {
            label: 'ENVIROTIME',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: ' ENVIROTIME',
            documentation: ''
        }
    ];
});
// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    return item;
});
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map