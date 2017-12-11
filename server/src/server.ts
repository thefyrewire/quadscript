/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import {
	IPCMessageReader, IPCMessageWriter, createConnection, IConnection, TextDocuments, TextDocument, 
	Diagnostic, DiagnosticSeverity, InitializeResult, TextDocumentPositionParams, CompletionItem, 
	CompletionItemKind
} from 'vscode-languageserver';

// Create a connection for the server. The connection uses Node's IPC as a transport
let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites. 
let workspaceRoot: string;
connection.onInitialize((params): InitializeResult => {
	workspaceRoot = params.rootPath;
	return {
		capabilities: {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			// Tell the client that the server support code complete
			completionProvider: {
				resolveProvider: true
			}
		}
	}
});
console.log(workspaceRoot);

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
	validateTextDocument(change.document);
});

// The settings interface describe the server relevant settings part
interface Settings {
	QuadScript: ExampleSettings;
}

// These are the example settings we defined in the client's package.json
// file
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// hold the maxNumberOfProblems setting
let maxNumberOfProblems: number;
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
	let settings = <Settings>change.settings;
	maxNumberOfProblems = settings.QuadScript.maxNumberOfProblems || 100;
	// Revalidate any open text documents
	documents.all().forEach(validateTextDocument);
});

function validateTextDocument(textDocument: TextDocument): void {
	let diagnostics: Diagnostic[] = [];
	let lines = textDocument.getText().split(/\r?\n/g);
	let problems = 0;
	function diagnoseText(word: string, correctWord: string): void {
		for (var i = 0; i < lines.length && problems < maxNumberOfProblems; i++) {
			let line = lines[i];
			let index = line.indexOf(word);
			let length = word.length;
			if (index >= 0) {
				problems++;
				diagnostics.push({
					severity: DiagnosticSeverity.Warning,
					range: {
						start: { line: i, character: index },
						end: { line: i, character: index + length }
					},
					message: `${line.substr(index, length)} should be spelled ${correctWord}`,
					source: 'ex'
				});
			}
		}
	}
	diagnoseText('typescript', 'TypeScript');
	diagnoseText('javascript', 'Javascript');
	diagnoseText('michael', 'Michael');
	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles((_change) => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
	// The pass parameter contains the position of the text document in 
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.
	return [
		{
			label: 'TypeScript',
			kind: CompletionItemKind.Text,
			data: 1
		},
		{
			label: 'JavaScript',
			kind: CompletionItemKind.Constructor,
			data: 2
		},
		{
			label: 'FyreScript',
			kind: CompletionItemKind.Keyword,
			data: 3
		},
		/*
		- Events Main 
		*/
		{
			label: 'remove',
			kind: CompletionItemKind.Function,
			detail: 'remove(): void',
			insertText: 'remove()'
		},
		{
			label: 'getName',
			kind: CompletionItemKind.Function,
			detail: 'getName(): void',
			insertText: 'getName()'
		},
		{
			label: 'setName',
			kind: CompletionItemKind.Function,
			detail: 'setName( string name ): void',
			insertText: 'setName(${0})',
			insertTextFormat: 2
		},
		{
			label: 'activate',
			kind: CompletionItemKind.Function,
			detail: 'activate( entity activator ): void',
			insertText: 'activate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'activateTargets',
			kind: CompletionItemKind.Function,
			detail: 'activateTargets( entity activator ): void',
			insertText: 'activateTargets(${0})',
			insertTextFormat: 2
		},
		{
			label: 'numTargets',
			kind: CompletionItemKind.Function,
			detail: 'numTargets(): float',
			insertText: 'numTargets()'
		},
		{
			label: 'getTarget',
			kind: CompletionItemKind.Function,
			detail: 'getTarget( float num ): entity',
			insertText: 'getTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'randomTarget',
			kind: CompletionItemKind.Function,
			detail: 'randomTarget( string ignoreName ): entity',
			insertText: 'randomTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'bind',
			kind: CompletionItemKind.Function,
			detail: 'bind( entity master ): void',
			insertText: 'bind(${0})',
			insertTextFormat: 2
		},
		{
			label: 'bindPosition',
			kind: CompletionItemKind.Function,
			detail: 'bindPosition( entity master ): void',
			insertText: 'bindPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'bindToJoint',
			kind: CompletionItemKind.Function,
			detail: 'bindToJoint( entity master, string boneName, float rotateWithMaster ): void',
			insertText: 'bindToJoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'unbind',
			kind: CompletionItemKind.Function,
			detail: 'unbind(): void',
			documentation: 'Detach from master.',
			insertText: 'unbind()'
		},
		{
			label: 'removeBinds',
			kind: CompletionItemKind.Function,
			detail: 'removeBinds(): void',
			documentation: 'Remove all children.',
			insertText: 'removeBinds()'
		},
		{
			label: 'setOwner',
			kind: CompletionItemKind.Function,
			detail: 'setOwner( entity owner ): void',
			insertText: 'setOwner(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setModel',
			kind: CompletionItemKind.Function,
			detail: 'setModel( string modelName ): void',
			insertText: 'setModel(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setSkin',
			kind: CompletionItemKind.Function,
			detail: 'setSkin( string skinName ): void',
			insertText: 'setSkin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getWorldOrigin',
			kind: CompletionItemKind.Function,
			detail: 'getWorldOrigin(): vector',
			insertText: 'getWorldOrigin()'
		},
		{
			label: 'setWorldOrigin',
			kind: CompletionItemKind.Function,
			detail: 'setWorldOrigin( vector origin ): void',
			insertText: 'setWorldOrigin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getOrigin',
			kind: CompletionItemKind.Function,
			detail: 'getOrigin(): vector',
			insertText: 'getOrigin()'
		},
		{
			label: 'setOrigin',
			kind: CompletionItemKind.Function,
			detail: 'setOrigin( vector origin ): void',
			insertText: 'setOrigin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getAngles',
			kind: CompletionItemKind.Function,
			detail: 'getAngles(): vector',
			insertText: 'getAngles()'
		},
		{
			label: 'setAngles',
			kind: CompletionItemKind.Function,
			detail: 'setAngles( vector angles ): void',
			insertText: 'setAngles(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getLinearVelocity',
			kind: CompletionItemKind.Function,
			detail: 'getLinearVelocity(): vector',
			insertText: 'getLinearVelocity()'
		},
		{
			label: 'setLinearVelocity',
			kind: CompletionItemKind.Function,
			detail: 'setLinearVelocity( vector velocity ): void',
			insertText: 'setLinearVelocity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getAngularVelocity',
			kind: CompletionItemKind.Function,
			detail: 'getAngularVelocity(): vector',
			insertText: 'getAngularVelocity()'
		},
		{
			label: 'setAngularVelocity',
			kind: CompletionItemKind.Function,
			detail: 'setAngularVelocity( vector velocity ): void',
			insertText: 'setAngularVelocity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getSize',
			kind: CompletionItemKind.Function,
			detail: 'getSize(): vector',
			insertText: 'getSize()'
		},
		{
			label: 'setSize',
			kind: CompletionItemKind.Function,
			detail: 'setSize( vector min, vector max ): void',
			insertText: 'setSize(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getMins',
			kind: CompletionItemKind.Function,
			detail: 'getMins(): vector',
			insertText: 'getMins()'
		},
		{
			label: 'getMaxs',
			kind: CompletionItemKind.Function,
			detail: 'getMaxs(): vector',
			insertText: 'getMaxs()'
		},
		{
			label: 'isHidden',
			kind: CompletionItemKind.Function,
			detail: 'isHidden(): float',
			insertText: 'isHidden()'
		},
		{
			label: 'hide',
			kind: CompletionItemKind.Function,
			detail: 'hide(): void',
			insertText: 'hide()'
		},
		{
			label: 'show',
			kind: CompletionItemKind.Function,
			detail: 'show(): void',
			insertText: 'show()'
		},
		{
			label: 'touches',
			kind: CompletionItemKind.Function,
			detail: 'touches( entity other ): float',
			insertText: 'touches(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearSignal',
			kind: CompletionItemKind.Function,
			detail: 'clearSignal( float signalNum ): void',
			insertText: 'clearSignal(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getShaderParm',
			kind: CompletionItemKind.Function,
			detail: 'getShaderParm( float parm ): float',
			insertText: 'getShaderParm(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setShaderParm',
			kind: CompletionItemKind.Function,
			detail: 'setShaderParm( float parm, float value ): void',
			insertText: 'setShaderParm(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setShaderParms',
			kind: CompletionItemKind.Function,
			detail: 'setShaderParms( float parm0, float parm1, float parm2, float parm3 ): void',
			insertText: 'setShaderParms(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setColor',
			kind: CompletionItemKind.Function,
			detail: 'setColor( float red, float green, float blue ): void',
			insertText: 'setColor(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getColor',
			kind: CompletionItemKind.Function,
			detail: 'getColor(): vector',
			insertText: 'getColor()'
		},
		{
			label: 'cacheSoundShader',
			kind: CompletionItemKind.Function,
			detail: 'cacheSoundShader( string shaderName ): void',
			insertText: 'cacheSoundShader(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startSoundShader',
			kind: CompletionItemKind.Function,
			detail: 'startSoundShader( string shaderName, float channel ): float',
			insertText: 'startSoundShader(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopSound',
			kind: CompletionItemKind.Function,
			detail: 'stopSound( float channel, float netSync ): void',
			insertText: 'stopSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startSound',
			kind: CompletionItemKind.Function,
			detail: 'startSound( string sound, float channel, float netSync ): float',
			insertText: 'startSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fadeSound',
			kind: CompletionItemKind.Function,
			detail: 'fadeSound( float channel, float newLevel, float fadeTime ): void',
			insertText: 'fadeSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setGuiParm',
			kind: CompletionItemKind.Function,
			detail: 'setGuiParm( string key, string value): void',
			insertText: 'setGuiParm(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setGuiFloat',
			kind: CompletionItemKind.Function,
			detail: 'setGuiFloat( string key, float value ): void',
			insertText: 'setGuiFloat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setGui',
			kind: CompletionItemKind.Function,
			detail: 'setGui( float guiNum, string gui ): void',
			insertText: 'setGui(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getNextKey',
			kind: CompletionItemKind.Function,
			detail: 'getNextKey( string prefix, string lastMatch ): string',
			insertText: 'getNextKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setKey',
			kind: CompletionItemKind.Function,
			detail: 'setKey( string key, string value ): void',
			insertText: 'setKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getKey',
			kind: CompletionItemKind.Function,
			detail: 'getKey( string key ): string',
			insertText: 'getKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getIntKey',
			kind: CompletionItemKind.Function,
			detail: 'getIntKey( string key ): float',
			insertText: 'getIntKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getFloatKey',
			kind: CompletionItemKind.Function,
			detail: 'getFloatKey( string key ): float',
			insertText: 'getFloatKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getVectorKey',
			kind: CompletionItemKind.Function,
			detail: 'getVectorKey( string key ): vector',
			insertText: 'getVectorKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getEntityKey',
			kind: CompletionItemKind.Function,
			detail: 'getEntityKey( string key ): entity',
			insertText: 'getEntityKey(${0})',
			insertTextFormat: 2
		},
		{
			label: 'restorePosition',
			kind: CompletionItemKind.Function,
			detail: 'restorePosition(): void',
			insertText: 'restorePosition()'
		},
		{
			label: 'distanceTo',
			kind: CompletionItemKind.Function,
			detail: 'distanceTo( entity other ): float',
			insertText: 'distanceTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'distanceToPoint',
			kind: CompletionItemKind.Function,
			detail: 'distanceToPoint( vector point ): float',
			insertText: 'distanceToPoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startFx',
			kind: CompletionItemKind.Function,
			detail: 'startFx( string fx ): void',
			insertText: 'startFx(${0})',
			insertTextFormat: 2
		},
		{
			label: 'waitFrame',
			kind: CompletionItemKind.Function,
			detail: 'waitFrame(): void',
			insertText: 'waitFrame()'
		},
		{
			label: 'wait',
			kind: CompletionItemKind.Function,
			detail: 'wait( float time ): void',
			insertText: 'wait(${0})',
			insertTextFormat: 2
		},
		{
			label: 'hasFunction',
			kind: CompletionItemKind.Function,
			detail: 'hasFunction( string functionName ): float',
			insertText: 'hasFunction(${0})',
			insertTextFormat: 2
		},
		{
			label: 'callFunction',
			kind: CompletionItemKind.Function,
			detail: 'callFunction( string functionName ): void',
			insertText: 'callFunction(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setNeverDormant',
			kind: CompletionItemKind.Function,
			detail: 'setNeverDormant( float enable ): void',
			insertText: 'setNeverDormant(${0})',
			insertTextFormat: 2
		},
		{
			label: 'terminate',
			kind: CompletionItemKind.Function,
			detail: 'terminate( float threadNumber ): void',
			insertText: 'terminate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'pause',
			kind: CompletionItemKind.Function,
			detail: 'pause(): void',
			insertText: 'pause()'
		},
		{
			label: 'waitFor',
			kind: CompletionItemKind.Function,
			detail: 'waitFor( entity mover ): void',
			insertText: 'waitFor(${0})',
			insertTextFormat: 2
		},
		{
			label: 'waitForThread',
			kind: CompletionItemKind.Function,
			detail: 'waitForThread( float threadNumber ): void',
			insertText: 'waitForThread(${0})',
			insertTextFormat: 2
		},
		{
			label: 'print',
			kind: CompletionItemKind.Function,
			detail: 'print( string text ): void',
			insertText: 'print(${0})',
			insertTextFormat: 2
		},
		{
			label: 'println',
			kind: CompletionItemKind.Function,
			detail: 'println( string text ): void',
			insertText: 'println(${0})',
			insertTextFormat: 2
		},
		{
			label: 'say',
			kind: CompletionItemKind.Function,
			detail: 'say( string text ): void',
			insertText: 'say(${0})',
			insertTextFormat: 2
		},
		{
			label: 'assert',
			kind: CompletionItemKind.Function,
			detail: 'assert( float condition ): void',
			insertText: 'assert(${0})',
			insertTextFormat: 2
		},
		{
			label: 'trigger',
			kind: CompletionItemKind.Function,
			detail: 'trigger( entity entityToTrigger ): void',
			insertText: 'trigger(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcvar',
			kind: CompletionItemKind.Function,
			detail: 'setcvar( string name, string value ): void',
			insertText: 'setcvar(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getcvar',
			kind: CompletionItemKind.Function,
			detail: 'getcvar( string name ): string',
			insertText: 'getcvar(${0})',
			insertTextFormat: 2
		},
		{
			label: 'random',
			kind: CompletionItemKind.Function,
			detail: 'random( float range ): float',
			insertText: 'random(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getTime',
			kind: CompletionItemKind.Function,
			detail: 'getTime(): float',
			insertText: 'getTime()'
		},
		{
			label: 'killthread',
			kind: CompletionItemKind.Function,
			detail: 'killthread( string threadName ): void',
			insertText: 'killthread(${0})',
			insertTextFormat: 2
		},
		{
			label: 'threadname',
			kind: CompletionItemKind.Function,
			detail: 'threadname( string name ): void',
			insertText: 'threadname(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getEntity',
			kind: CompletionItemKind.Function,
			detail: 'getEntity( string name ): entity',
			insertText: 'getEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'spawn',
			kind: CompletionItemKind.Function,
			detail: 'spawn( string classname ): entity',
			insertText: 'spawn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'respawn',
			kind: CompletionItemKind.Function,
			detail: 'respawn(): void',
			insertText: 'respawn()'
		},
		{
			label: 'copySpawnArgs',
			kind: CompletionItemKind.Function,
			detail: 'copySpawnArgs( entity ent ): void',
			insertText: 'copySpawnArgs(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setSpawnArg',
			kind: CompletionItemKind.Function,
			detail: 'setSpawnArg( string key, string value ): void',
			insertText: 'setSpawnArg(${0})',
			insertTextFormat: 2
		},
		{
			label: 'SpawnString',
			kind: CompletionItemKind.Function,
			detail: 'SpawnString( string key, string default ): string',
			insertText: 'SpawnString(${0})',
			insertTextFormat: 2
		},
		{
			label: 'SpawnFloat',
			kind: CompletionItemKind.Function,
			detail: 'SpawnFloat( string key, float default ): float',
			insertText: 'SpawnFloat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'SpawnVector',
			kind: CompletionItemKind.Function,
			detail: 'SpawnVector( string key, vector default ): vector',
			insertText: 'SpawnVector(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearPersistantArgs',
			kind: CompletionItemKind.Function,
			detail: 'clearPersistantArgs(): void',
			insertText: 'clearPersistantArgs()'
		},
		{
			label: 'setPersistantArg',
			kind: CompletionItemKind.Function,
			detail: 'setPersistantArg( string key, string value ): void',
			insertText: 'setPersistantArg(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getPersistantString',
			kind: CompletionItemKind.Function,
			detail: 'getPersistantString( string key ): string',
			insertText: 'getPersistantString(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getPersistantFloat',
			kind: CompletionItemKind.Function,
			detail: 'getPersistantFloat( string key ): float',
			insertText: 'getPersistantFloat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getPersistantVector',
			kind: CompletionItemKind.Function,
			detail: 'getPersistantVector( string key ): vector',
			insertText: 'getPersistantVector(${0})',
			insertTextFormat: 2
		},
		{
			label: 'angToForward',
			kind: CompletionItemKind.Function,
			detail: 'angToForward( vector angles ): vector',
			insertText: 'angToForward(${0})',
			insertTextFormat: 2
		},
		{
			label: 'angToRight',
			kind: CompletionItemKind.Function,
			detail: 'angToRight( vector angles ): vector',
			insertText: 'angToRight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'angToUp',
			kind: CompletionItemKind.Function,
			detail: 'angToUp( vector angles ): vector',
			insertText: 'angToUp(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sin',
			kind: CompletionItemKind.Function,
			detail: 'sin( float degrees ): float',
			insertText: 'sin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'cos',
			kind: CompletionItemKind.Function,
			detail: 'cos( float degrees ): float',
			insertText: 'cos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sqrt',
			kind: CompletionItemKind.Function,
			detail: 'sqrt( float square ): float',
			insertText: 'sqrt(${0})',
			insertTextFormat: 2
		},
		{
			label: 'vecNormalize',
			kind: CompletionItemKind.Function,
			detail: 'vecNormalize( vector vec ): vector',
			insertText: 'vecNormalize(${0})',
			insertTextFormat: 2
		},
		{
			label: 'vecLength',
			kind: CompletionItemKind.Function,
			detail: 'vecLength( vector vec ): float',
			insertText: 'vecLength(${0})',
			insertTextFormat: 2
		},
		{
			label: 'DotProduct',
			kind: CompletionItemKind.Function,
			detail: 'DotProduct( vector vec1, vector vec2 ): float',
			insertText: 'DotProduct(${0})',
			insertTextFormat: 2
		},
		{
			label: 'CrossProduct',
			kind: CompletionItemKind.Function,
			detail: 'CrossProduct( vector vec1, vector vec2 ): vector',
			insertText: 'CrossProduct(${0})',
			insertTextFormat: 2
		},
		{
			label: 'VecToAngles',
			kind: CompletionItemKind.Function,
			detail: 'VecToAngles( vector vec ): vector',
			insertText: 'VecToAngles(${0})',
			insertTextFormat: 2
		},
		{
			label: 'onSignal',
			kind: CompletionItemKind.Function,
			detail: 'onSignal( float signalNum, entity ent, string functionName ): void',
			insertText: 'onSignal(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearSignalThread',
			kind: CompletionItemKind.Function,
			detail: 'clearSignalThread( float signalNum, entity ent ): void',
			insertText: 'clearSignalThread(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setCamera',
			kind: CompletionItemKind.Function,
			detail: 'setCamera( entity cameraEnt ): void',
			insertText: 'setCamera(${0})',
			insertTextFormat: 2
		},
		{
			label: 'firstPerson',
			kind: CompletionItemKind.Function,
			detail: 'firstPerson(): void',
			insertText: 'firstPerson()'
		},
		{
			label: 'trace',
			kind: CompletionItemKind.Function,
			detail: 'trace( vector start, vector end, vector mins, vector maxs, float contents_mask, entity passEntity ): float',
			insertText: 'trace(${0})',
			insertTextFormat: 2
		},
		{
			label: 'tracePoint',
			kind: CompletionItemKind.Function,
			detail: 'tracePoint( vector start, vector end, float contents_mask, entity passEntity ): float',
			insertText: 'tracePoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getTraceFraction',
			kind: CompletionItemKind.Function,
			detail: 'getTraceFraction(): float',
			insertText: 'getTraceFraction()'
		},
		{
			label: 'getTraceEndPos',
			kind: CompletionItemKind.Function,
			detail: 'getTraceEndPos(): vector',
			insertText: 'getTraceEndPos()'
		},
		{
			label: 'getTraceNormal',
			kind: CompletionItemKind.Function,
			detail: 'getTraceNormal(): vector',
			insertText: 'getTraceNormal()'
		},
		{
			label: 'getTraceEntity',
			kind: CompletionItemKind.Function,
			detail: 'getTraceEntity(): entity',
			insertText: 'getTraceEntity()'
		},
		{
			label: 'getTraceJoint',
			kind: CompletionItemKind.Function,
			detail: 'getTraceJoint(): string',
			insertText: 'getTraceJoint()'
		},
		{
			label: 'getTraceBody',
			kind: CompletionItemKind.Function,
			detail: 'getTraceBody(): string',
			insertText: 'getTraceBody()'
		},
		{
			label: 'fadeIn',
			kind: CompletionItemKind.Function,
			detail: 'fadeIn( vector color, float time ): void',
			insertText: 'fadeIn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fadeOut',
			kind: CompletionItemKind.Function,
			detail: 'fadeOut( vector color, float time ): void',
			insertText: 'fadeOut(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fadeTo',
			kind: CompletionItemKind.Function,
			detail: 'fadeTo( vector color, float alpha, float time ): void',
			insertText: 'fadeTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'music',
			kind: CompletionItemKind.Function,
			detail: 'music( string shaderName ): void',
			insertText: 'music(${0})',
			insertTextFormat: 2
		},
		{
			label: 'error',
			kind: CompletionItemKind.Function,
			detail: 'error( string text ): void',
			insertText: 'error(${0})',
			insertTextFormat: 2
		},
		{
			label: 'warning',
			kind: CompletionItemKind.Function,
			detail: 'warning( string text ): void',
			insertText: 'warning(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strLength',
			kind: CompletionItemKind.Function,
			detail: 'strLength( string text ): float',
			insertText: 'strLength(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strLeft',
			kind: CompletionItemKind.Function,
			detail: 'strLeft( string text, float num ): string',
			insertText: 'strLeft(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strRight',
			kind: CompletionItemKind.Function,
			detail: 'strRight( string text, float num ): string',
			insertText: 'strRight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strSkip',
			kind: CompletionItemKind.Function,
			detail: 'strSkip( string text, float num ): string',
			insertText: 'strSkip(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strMid',
			kind: CompletionItemKind.Function,
			detail: 'strMid( string text, float start, float num ): string',
			insertText: 'strMid(${0})',
			insertTextFormat: 2
		},
		{
			label: 'strToFloat',
			kind: CompletionItemKind.Function,
			detail: 'strToFloat( string text ): float',
			insertText: 'strToFloat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'radiusDamage',
			kind: CompletionItemKind.Function,
			detail: 'radiusDamage( vector origin, entity inflictor, entity attacker, entity ignore, string damageDefName, float dmgPower ): void',
			insertText: 'radiusDamage(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isClient',
			kind: CompletionItemKind.Function,
			detail: 'isClient(): float',
			insertText: 'isClient()'
		},
		{
			label: 'isMultiplayer',
			kind: CompletionItemKind.Function,
			detail: 'isMultiplayer(): float',
			insertText: 'isMultiplayer()'
		},
		{
			label: 'getFrameTime',
			kind: CompletionItemKind.Function,
			detail: 'getFrameTime(): float',
			insertText: 'getFrameTime()'
		},
		{
			label: 'getTicsPerSecond',
			kind: CompletionItemKind.Function,
			detail: 'getTicsPerSecond(): float',
			insertText: 'getTicsPerSecond()'
		},
		{
			label: 'cacheSoundShader',
			kind: CompletionItemKind.Function,
			detail: 'cacheSoundShader( string shaderName ): void',
			insertText: 'cacheSoundShader(${0})',
			insertTextFormat: 2
		},
		{
			label: 'debugLine',
			kind: CompletionItemKind.Function,
			detail: 'debugLine( vector color, vector start, vector end, float lifetime ): void',
			insertText: 'debugLine(${0})',
			insertTextFormat: 2
		},
		{
			label: 'debugArrow',
			kind: CompletionItemKind.Function,
			detail: 'debugArrow( vector color, vector start, vector end, float size, float lifetime ): void',
			insertText: 'debugArrow(${0})',
			insertTextFormat: 2
		},
		{
			label: 'debugCircle',
			kind: CompletionItemKind.Function,
			detail: 'debugCircle( vector color, vector origin, vector dir, float radius, float numSteps, float lifetime ): void',
			insertText: 'debugCircle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'debugBounds',
			kind: CompletionItemKind.Function,
			detail: 'debugBounds( vector color, vector mins, vector maxs, float lifetime ): void',
			insertText: 'debugBounds(${0})',
			insertTextFormat: 2
		},
		{
			label: 'drawText',
			kind: CompletionItemKind.Function,
			detail: 'drawText( string text, vector origin, float scale, vector color, float align, float lifetime ): void',
			insertText: 'drawText(${0})',
			insertTextFormat: 2
		},
		{
			label: 'influenceActive',
			kind: CompletionItemKind.Function,
			detail: 'influenceActive(): float',
			insertText: 'influenceActive()'
		},
		{
			label: 'start',
			kind: CompletionItemKind.Function,
			detail: 'start(): void',
			insertText: 'start()'
		},
		{
			label: 'stop',
			kind: CompletionItemKind.Function,
			detail: 'stop(): void',
			insertText: 'stop()'
		},
		{
			label: 'setShader',
			kind: CompletionItemKind.Function,
			detail: 'setShader( string shader ): void',
			insertText: 'setShader(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getLightParm',
			kind: CompletionItemKind.Function,
			detail: 'getLightParm( float parmNum ): float',
			insertText: 'getLightParm(${0})',
			insertTextFormat: 2
		},
		{
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
		},
		{
			label: 'setRadiusXYZ',
			kind: CompletionItemKind.Function,
			detail: 'setRadiusXYZ( float x, float y, float z ): void',
			insertText: 'setRadiusXYZ(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setRadius',
			kind: CompletionItemKind.Function,
			detail: 'setRadius( float radius ): void',
			insertText: 'setRadius(${0})',
			insertTextFormat: 2
		},
		{
			label: 'On',
			kind: CompletionItemKind.Function,
			detail: 'On(): void',
			insertText: 'On()'
		},
		{
			label: 'Off',
			kind: CompletionItemKind.Function,
			detail: 'Off(): void',
			insertText: 'Off()'
		},
		{
			label: 'fadeOutLight',
			kind: CompletionItemKind.Function,
			detail: 'fadeOutLight( float time ): void',
			insertText: 'fadeOutLight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fadeInLight',
			kind: CompletionItemKind.Function,
			detail: 'fadeInLight( float time ): void',
			insertText: 'fadeInLight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'Toggle',
			kind: CompletionItemKind.Function,
			detail: 'Toggle(): void',
			insertText: 'Toggle()'
		},
		{
			label: 'launchMissiles',
			kind: CompletionItemKind.Function,
			detail: 'launchMissiles( string projectilename, string sound, string launchbone, string targetbone, float numshots, float framedelay ): void',
			insertText: 'launchMissiles(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startRagdoll',
			kind: CompletionItemKind.Function,
			detail: 'startRagdoll(): void',
			insertText: 'startRagdoll()'
		},
		{
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
		},
		{
			label: 'stopMoving',
			kind: CompletionItemKind.Function,
			detail: 'stopMoving(): void',
			insertText: 'stopMoving()'
		},
		{
			label: 'stopRotating',
			kind: CompletionItemKind.Function,
			detail: 'stopRotating(): void',
			insertText: 'stopRotating()'
		},
		{
			label: 'speed',
			kind: CompletionItemKind.Function,
			detail: 'speed( float speed ): void',
			insertText: 'speed(${0})',
			insertTextFormat: 2
		},
		{
			label: 'time',
			kind: CompletionItemKind.Function,
			detail: 'time( float time ): void',
			insertText: 'time(${0})',
			insertTextFormat: 2
		},
		{
			label: 'decelTime',
			kind: CompletionItemKind.Function,
			detail: 'decelTime( float time ): void',
			insertText: 'decelTime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'accelTime',
			kind: CompletionItemKind.Function,
			detail: 'accelTime( float time ): void',
			insertText: 'accelTime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveTo',
			kind: CompletionItemKind.Function,
			detail: 'moveTo( entity targetEntity ): void',
			insertText: 'moveTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveToPos',
			kind: CompletionItemKind.Function,
			detail: 'moveToPos( vector pos ): void',
			insertText: 'moveToPos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'move',
			kind: CompletionItemKind.Function,
			detail: 'move( float angle, float distance ): void',
			insertText: 'move(${0})',
			insertTextFormat: 2
		},
		{
			label: 'accelTo',
			kind: CompletionItemKind.Function,
			detail: 'accelTo( float speed, float time ): void',
			insertText: 'accelTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'decelTo',
			kind: CompletionItemKind.Function,
			detail: 'decelTo( float speed, float time ): void',
			insertText: 'decelTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rotateDownTo',
			kind: CompletionItemKind.Function,
			detail: 'rotateDownTo( float axis, float angle ): void',
			insertText: 'rotateDownTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rotateUpTo',
			kind: CompletionItemKind.Function,
			detail: 'rotateUpTo( float axis, float angle ): void',
			insertText: 'rotateUpTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rotateTo',
			kind: CompletionItemKind.Function,
			detail: 'rotateTo( vector angles ): void',
			insertText: 'rotateTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rotate',
			kind: CompletionItemKind.Function,
			detail: 'rotate( vector angleSpeed ): void',
			insertText: 'rotate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rotateOnce',
			kind: CompletionItemKind.Function,
			detail: 'rotateOnce( vector angles ): void',
			insertText: 'rotateOnce(${0})',
			insertTextFormat: 2
		},
		{
			label: 'bob',
			kind: CompletionItemKind.Function,
			detail: 'bob( float speed, float phase, vector distance ): void',
			insertText: 'bob(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sway',
			kind: CompletionItemKind.Function,
			detail: 'sway( float speed, float phase, vector angles ): void',
			insertText: 'sway(${0})',
			insertTextFormat: 2
		},
		{
			label: 'openPortal',
			kind: CompletionItemKind.Function,
			detail: 'openPortal(): void',
			insertText: 'openPortal()'
		},
		{
			label: 'closePortal',
			kind: CompletionItemKind.Function,
			detail: 'closePortal(): void',
			insertText: 'closePortal()'
		},
		{
			label: 'accelSound',
			kind: CompletionItemKind.Function,
			detail: 'accelSound( string sound ): void',
			insertText: 'accelSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'decelSound',
			kind: CompletionItemKind.Function,
			detail: 'decelSound( string sound ): void',
			insertText: 'decelSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveSound',
			kind: CompletionItemKind.Function,
			detail: 'moveSound( string sound ): void',
			insertText: 'moveSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enableSplineAngles',
			kind: CompletionItemKind.Function,
			detail: 'enableSplineAngles(): void',
			insertText: 'enableSplineAngles()'
		},
		{
			label: 'disableSplineAngles',
			kind: CompletionItemKind.Function,
			detail: 'disableSplineAngles(): void',
			insertText: 'disableSplineAngles()'
		},
		{
			label: 'removeInitialSplineAngles',
			kind: CompletionItemKind.Function,
			detail: 'removeInitialSplineAngles(): void',
			insertText: 'removeInitialSplineAngles()'
		},
		{
			label: 'startSpline',
			kind: CompletionItemKind.Function,
			detail: 'startSpline( entity spline ): void',
			insertText: 'startSpline(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopSpline',
			kind: CompletionItemKind.Function,
			detail: 'stopSpline(): void',
			insertText: 'stopSpline()'
		},
		{
			label: 'isMoving',
			kind: CompletionItemKind.Function,
			detail: 'isMoving(): float',
			insertText: 'isMoving()'
		},
		{
			label: 'isRotating',
			kind: CompletionItemKind.Function,
			detail: 'isRotating(): float',
			insertText: 'isRotating()'
		},
		{
			label: 'enable',
			kind: CompletionItemKind.Function,
			detail: 'enable(): void',
			insertText: 'enable()'
		},
		{
			label: 'disable',
			kind: CompletionItemKind.Function,
			detail: 'disable(): void',
			insertText: 'disable()'
		},
		{
			label: 'open',
			kind: CompletionItemKind.Function,
			detail: 'open(): void',
			insertText: 'open()'
		},
		{
			label: 'close',
			kind: CompletionItemKind.Function,
			detail: 'close(): void',
			insertText: 'close()'
		},
		{
			label: 'lock',
			kind: CompletionItemKind.Function,
			detail: 'lock( float locked ): void',
			insertText: 'lock(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isOpen',
			kind: CompletionItemKind.Function,
			detail: 'isOpen(): float',
			insertText: 'isOpen()'
		},
		{
			label: 'isLocked',
			kind: CompletionItemKind.Function,
			detail: 'isLocked(): float',
			insertText: 'isLocked()'
		},
		{
			label: 'setFingerAngle',
			kind: CompletionItemKind.Function,
			detail: 'setFingerAngle( float angle ): void',
			insertText: 'setFingerAngle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopFingers',
			kind: CompletionItemKind.Function,
			detail: 'stopFingers(): void',
			insertText: 'stopFingers()'
		},
		{
			label: 'becomeNonSolid',
			kind: CompletionItemKind.Function,
			detail: 'becomeNonSolid(): void',
			insertText: 'becomeNonSolid()'
		},
		{
			label: 'isAtRest',
			kind: CompletionItemKind.Function,
			detail: 'isAtRest(): float',
			insertText: 'isAtRest()'
		},
		{
			label: 'enableDamage',
			kind: CompletionItemKind.Function,
			detail: 'enableDamage( float enable ): void',
			insertText: 'enableDamage(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getJointHandle',
			kind: CompletionItemKind.Function,
			detail: 'getJointHandle( string jointname ): float',
			insertText: 'getJointHandle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearAllJoints',
			kind: CompletionItemKind.Function,
			detail: 'clearAllJoints(): void',
			insertText: 'clearAllJoints()'
		},
		{
			label: 'clearJoint',
			kind: CompletionItemKind.Function,
			detail: 'clearJoint( float jointnum ): void',
			insertText: 'clearJoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setJointPos',
			kind: CompletionItemKind.Function,
			detail: 'setJointPos( float jointnum, float transform_type, vector pos ): void',
			insertText: 'setJointPos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setJointAngle',
			kind: CompletionItemKind.Function,
			detail: 'setJointAngle( float jointnum, float transform_type, vector angles ): void',
			insertText: 'setJointAngle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getJointPos',
			kind: CompletionItemKind.Function,
			detail: 'getJointPos( float jointnum ): vector',
			insertText: 'getJointPos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getJointAngle',
			kind: CompletionItemKind.Function,
			detail: 'getJointAngle( float jointnum ): vector',
			insertText: 'getJointAngle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getOwner',
			kind: CompletionItemKind.Function,
			detail: 'getOwner(): entity',
			insertText: 'getOwner()'
		},
		{
			label: 'nextWeapon',
			kind: CompletionItemKind.Function,
			detail: 'nextWeapon(): void',
			insertText: 'nextWeapon()'
		},
		{
			label: 'weaponState',
			kind: CompletionItemKind.Function,
			detail: 'weaponState( string stateFunction, float blendFrames ): void',
			insertText: 'weaponState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'useAmmo',
			kind: CompletionItemKind.Function,
			detail: 'useAmmo( float amount ): void',
			insertText: 'useAmmo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'addToClip',
			kind: CompletionItemKind.Function,
			detail: 'addToClip( float amount ): void',
			insertText: 'addToClip(${0})',
			insertTextFormat: 2
		},
		{
			label: 'ammoInClip',
			kind: CompletionItemKind.Function,
			detail: 'ammoInClip(): float',
			insertText: 'ammoInClip()'
		},
		{
			label: 'ammoAvailable',
			kind: CompletionItemKind.Function,
			detail: 'ammoAvailable(): float',
			insertText: 'ammoAvailable()'
		},
		{
			label: 'totalAmmoCount',
			kind: CompletionItemKind.Function,
			detail: 'totalAmmoCount(): float',
			insertText: 'totalAmmoCount()'
		},
		{
			label: 'clipSize',
			kind: CompletionItemKind.Function,
			detail: 'clipSize(): float',
			insertText: 'clipSize()'
		},
		{
			label: 'isInvisible',
			kind: CompletionItemKind.Function,
			detail: 'isInvisible(): float',
			insertText: 'isInvisible()'
		},
		{
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
		},
		{
			label: 'animDone',
			kind: CompletionItemKind.Function,
			detail: 'animDone( float channel, float blendOutFrames ): float',
			insertText: 'animDone(${0})',
			insertTextFormat: 2
		},
		{
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
		},
		{
			label: 'weaponReady',
			kind: CompletionItemKind.Function,
			detail: 'weaponReady(): void',
			insertText: 'weaponReady()'
		},
		{
			label: 'weaponOutOfAmmo',
			kind: CompletionItemKind.Function,
			detail: 'weaponOutOfAmmo(): void',
			insertText: 'weaponOutOfAmmo()'
		},
		{
			label: 'weaponReloading',
			kind: CompletionItemKind.Function,
			detail: 'weaponReloading(): void',
			insertText: 'weaponReloading()'
		},
		{
			label: 'weaponHolstered',
			kind: CompletionItemKind.Function,
			detail: 'weaponHolstered(): void',
			insertText: 'weaponHolstered()'
		},
		{
			label: 'weaponRising',
			kind: CompletionItemKind.Function,
			detail: 'weaponRising(): void',
			insertText: 'weaponRising()'
		},
		{
			label: 'weaponLowering',
			kind: CompletionItemKind.Function,
			detail: 'weaponLowering(): void',
			insertText: 'weaponLowering()'
		},
		{
			label: 'flashlight',
			kind: CompletionItemKind.Function,
			detail: 'flashlight( float enable ): void',
			insertText: 'flashlight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'launchProjectiles',
			kind: CompletionItemKind.Function,
			detail: 'launchProjectiles( float num_projectiles, float spread, float fuseOffset, float launchPower, float dmgPower ): void',
			insertText: 'launchProjectiles(${0})',
			insertTextFormat: 2
		},
		{
			label: 'createProjectile',
			kind: CompletionItemKind.Function,
			detail: 'createProjectile(): entity',
			insertText: 'createProjectile()'
		},
		{
			label: 'melee',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'getWorldModel(): entity',
			insertText: 'getWorldModel()'
		},
		{
			label: 'getProjectileState',
			kind: CompletionItemKind.Function,
			detail: 'getProjectileState(): float',
			insertText: 'getProjectileState()'
		},
		{
			label: 'markUsed',
			kind: CompletionItemKind.Function,
			detail: 'markUsed(): void',
			insertText: 'markUsed()'
		},
		{
			label: 'SetConstraintPosition',
			kind: CompletionItemKind.Function,
			detail: 'SetConstraintPosition( string constraintName, vector position ): void',
			insertText: 'SetConstraintPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enableEyeFocus',
			kind: CompletionItemKind.Function,
			detail: 'enableEyeFocus(): void',
			insertText: 'enableEyeFocus()'
		},
		{
			label: 'disableEyeFocus',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'idleAnim( float channel, string animName ): float',
			insertText: 'idleAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setSyncedAnimWeight',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'animState( float channel, string stateFunction, float blendFrame ): void',
			insertText: 'animState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getAnimState',
			kind: CompletionItemKind.Function,
			detail: 'getAnimState( float channel ): string',
			insertText: 'getAnimState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'inAnimState',
			kind: CompletionItemKind.Function,
			detail: 'inAnimState( float channel, string stateFunc ): float',
			insertText: 'inAnimState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'finishAction',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'overrideAnim( float channel ): void',
			insertText: 'overrideAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'preventPain',
			kind: CompletionItemKind.Function,
			detail: 'preventPain( float duration ): void',
			insertText: 'preventPain(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enableAnim',
			kind: CompletionItemKind.Function,
			detail: 'enableAnim( float channel, float blendFrames ): void',
			insertText: 'enableAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'disablePain',
			kind: CompletionItemKind.Function,
			detail: 'disablePain(): void',
			insertText: 'disablePain()'
		},
		{
			label: 'enablePain',
			kind: CompletionItemKind.Function,
			detail: 'enablePain(): void',
			insertText: 'enablePain()'
		},
		{
			label: 'getPainAnim',
			kind: CompletionItemKind.Function,
			detail: 'getPainAnim(): string',
			insertText: 'getPainAnim()'
		},
		{
			label: 'setAnimPrefix',
			kind: CompletionItemKind.Function,
			detail: 'setAnimPrefix( string prefix ): void',
			insertText: 'setAnimPrefix(${0})',
			insertTextFormat: 2
		},
		{
			label: 'hasAnim',
			kind: CompletionItemKind.Function,
			detail: 'hasAnim( float channel, string animName ): float',
			insertText: 'hasAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'checkAnim',
			kind: CompletionItemKind.Function,
			detail: 'checkAnim( float channel, string animName ): void',
			insertText: 'checkAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'chooseAnim',
			kind: CompletionItemKind.Function,
			detail: 'chooseAnim( float channel, string animName ): string',
			insertText: 'chooseAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'animLength',
			kind: CompletionItemKind.Function,
			detail: 'animLength( float channel, string animName ): float',
			insertText: 'animLength(${0})',
			insertTextFormat: 2
		},
		{
			label: 'animDistance',
			kind: CompletionItemKind.Function,
			detail: 'animDistance( float channel, string animName ): float',
			insertText: 'animDistance(${0})',
			insertTextFormat: 2
		},
		{
			label: 'hasEnemies',
			kind: CompletionItemKind.Function,
			detail: 'hasEnemies(): float',
			insertText: 'hasEnemies()'
		},
		{
			label: 'nextEnemy',
			kind: CompletionItemKind.Function,
			detail: 'nextEnemy( entity lastEnemy ): entity',
			insertText: 'nextEnemy(${0})',
			insertTextFormat: 2
		},
		{
			label: 'closestEnemyToPoint',
			kind: CompletionItemKind.Function,
			detail: 'closestEnemyToPoint( vector point ): entity',
			insertText: 'closestEnemyToPoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setNextState',
			kind: CompletionItemKind.Function,
			detail: 'setNextState( string stateFunc ): void',
			insertText: 'setNextState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setState',
			kind: CompletionItemKind.Function,
			detail: 'setState( string stateFunc ): void',
			insertText: 'setState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getState',
			kind: CompletionItemKind.Function,
			detail: 'getState(): string',
			insertText: 'getState()'
		},
		{
			label: 'getHead',
			kind: CompletionItemKind.Function,
			detail: 'getHead(): entity',
			insertText: 'getHead()'
		},
		{
			label: 'getButtons',
			kind: CompletionItemKind.Function,
			detail: 'getButtons(): float',
			insertText: 'getButtons()'
		},
		{
			label: 'getMove',
			kind: CompletionItemKind.Function,
			detail: 'getMove(): vector',
			insertText: 'getMove()'
		},
		{
			label: 'getViewAngles',
			kind: CompletionItemKind.Function,
			detail: 'getViewAngles(): vector',
			insertText: 'getViewAngles()'
		},
		{
			label: 'enableWeapon',
			kind: CompletionItemKind.Function,
			detail: 'enableWeapon(): void',
			insertText: 'enableWeapon()'
		},
		{
			label: 'disableWeapon',
			kind: CompletionItemKind.Function,
			detail: 'disableWeapon(): void',
			insertText: 'disableWeapon()'
		},
		{
			label: 'getCurrentWeapon',
			kind: CompletionItemKind.Function,
			detail: 'getCurrentWeapon(): string',
			insertText: 'getCurrentWeapon()'
		},
		{
			label: 'getPreviousWeapon',
			kind: CompletionItemKind.Function,
			detail: 'getPreviousWeapon(): string',
			insertText: 'getPreviousWeapon()'
		},
		{
			label: 'selectWeapon',
			kind: CompletionItemKind.Function,
			detail: 'selectWeapon( string weapon, float flash ): void',
			insertText: 'selectWeapon(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getWeaponEntity',
			kind: CompletionItemKind.Function,
			detail: 'getWeaponEntity(): entity',
			insertText: 'getWeaponEntity()'
		},
		{
			label: 'openPDA',
			kind: CompletionItemKind.Function,
			detail: 'openPDA(): void',
			insertText: 'openPDA()'
		},
		{
			label: 'inPDA',
			kind: CompletionItemKind.Function,
			detail: 'inPDA(): float',
			insertText: 'inPDA()'
		},
		{
			label: 'getIdealWeapon',
			kind: CompletionItemKind.Function,
			detail: 'getIdealWeapon(): string',
			insertText: 'getIdealWeapon()'
		},
		{
			label: 'randomPath',
			kind: CompletionItemKind.Function,
			detail: 'randomPath(): entity',
			insertText: 'randomPath()'
		},
		{
			label: 'findEnemy',
			kind: CompletionItemKind.Function,
			detail: 'findEnemy( float onlyInFov ): entity',
			insertText: 'findEnemy(${0})',
			insertTextFormat: 2
		},
		{
			label: 'findEnemyAI',
			kind: CompletionItemKind.Function,
			detail: 'findEnemyAI( float onlyInFov ): entity',
			insertText: 'findEnemyAI(${0})',
			insertTextFormat: 2
		},
		{
			label: 'findEnemyInCombatNodes',
			kind: CompletionItemKind.Function,
			detail: 'findEnemyInCombatNodes(): entity',
			insertText: 'findEnemyInCombatNodes()'
		},
		{
			label: 'closestReachableEnemyOfEntity',
			kind: CompletionItemKind.Function,
			detail: 'closestReachableEnemyOfEntity( entity team_mate ): entity',
			insertText: 'closestReachableEnemyOfEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'heardSound',
			kind: CompletionItemKind.Function,
			detail: 'heardSound( float ignore_team ): entity',
			insertText: 'heardSound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setEnemy',
			kind: CompletionItemKind.Function,
			detail: 'setEnemy( entity enemy ): void',
			insertText: 'setEnemy(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearEnemy',
			kind: CompletionItemKind.Function,
			detail: 'clearEnemy(): void',
			insertText: 'clearEnemy()'
		},
		{
			label: 'muzzleFlash',
			kind: CompletionItemKind.Function,
			detail: 'muzzleFlash( string jointname ): void',
			insertText: 'muzzleFlash(${0})',
			insertTextFormat: 2
		},
		{
			label: 'createMissile',
			kind: CompletionItemKind.Function,
			detail: 'createMissile( string jointname ): entity',
			insertText: 'createMissile(${0})',
			insertTextFormat: 2
		},
		{
			label: 'attackMissile',
			kind: CompletionItemKind.Function,
			detail: 'attackMissile( string jointname ): entity',
			insertText: 'attackMissile(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fireMissileAtTarget',
			kind: CompletionItemKind.Function,
			detail: 'fireMissileAtTarget( string jointname, string targetname ): entity',
			insertText: 'fireMissileAtTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'launchMissile',
			kind: CompletionItemKind.Function,
			detail: 'launchMissile( vector origin, vector angles ): entity',
			insertText: 'launchMissile(${0})',
			insertTextFormat: 2
		},
		{
			label: 'attackMelee',
			kind: CompletionItemKind.Function,
			detail: 'attackMelee( string damageDef ): float',
			insertText: 'attackMelee(${0})',
			insertTextFormat: 2
		},
		{
			label: 'directDamage',
			kind: CompletionItemKind.Function,
			detail: 'directDamage( entity damageTarget, string damageDef ): void',
			insertText: 'directDamage(${0})',
			insertTextFormat: 2
		},
		{
			label: 'radiusDamageFromJoint',
			kind: CompletionItemKind.Function,
			detail: 'radiusDamageFromJoint( string jointname, string damageDef ): void',
			insertText: 'radiusDamageFromJoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'attackBegin',
			kind: CompletionItemKind.Function,
			detail: 'attackBegin( string damageDef ): void',
			insertText: 'attackBegin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'attackEnd',
			kind: CompletionItemKind.Function,
			detail: 'attackEnd(): void',
			insertText: 'attackEnd()'
		},
		{
			label: 'meleeAttackToJoint',
			kind: CompletionItemKind.Function,
			detail: 'meleeAttackToJoint( string joint, string damageDef ): float',
			insertText: 'meleeAttackToJoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'randomPath',
			kind: CompletionItemKind.Function,
			detail: 'randomPath(): entity',
			insertText: 'randomPath()'
		},
		{
			label: 'canBecomeSolid',
			kind: CompletionItemKind.Function,
			detail: 'canBecomeSolid(): float',
			insertText: 'canBecomeSolid()'
		},
		{
			label: 'becomeSolid',
			kind: CompletionItemKind.Function,
			detail: 'becomeSolid(): void',
			insertText: 'becomeSolid()'
		},
		{
			label: 'becomeNonSolid',
			kind: CompletionItemKind.Function,
			detail: 'becomeNonSolid(): void',
			insertText: 'becomeNonSolid()'
		},
		{
			label: 'becomeRagdoll',
			kind: CompletionItemKind.Function,
			detail: 'becomeRagdoll(): float',
			insertText: 'becomeRagdoll()'
		},
		{
			label: 'stopRagdoll',
			kind: CompletionItemKind.Function,
			detail: 'stopRagdoll(): void',
			insertText: 'stopRagdoll()'
		},
		{
			label: 'setHealth',
			kind: CompletionItemKind.Function,
			detail: 'setHealth( float health ): void',
			insertText: 'setHealth()'
		},
		{
			label: 'getHealth',
			kind: CompletionItemKind.Function,
			detail: 'getHealth(): float',
			insertText: 'getHealth()'
		},
		{
			label: 'allowDamage',
			kind: CompletionItemKind.Function,
			detail: 'allowDamage(): void',
			insertText: 'allowDamage()'
		},
		{
			label: 'ignoreDamage',
			kind: CompletionItemKind.Function,
			detail: 'ignoreDamage(): void',
			insertText: 'ignoreDamage()'
		},
		{
			label: 'getCurrentYaw',
			kind: CompletionItemKind.Function,
			detail: 'getCurrentYaw(): float',
			insertText: 'getCurrentYaw()'
		},
		{
			label: 'turnTo',
			kind: CompletionItemKind.Function,
			detail: 'turnTo( float yaw ): void',
			insertText: 'turnTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'turnToPos',
			kind: CompletionItemKind.Function,
			detail: 'turnToPos( vector pos ): void',
			insertText: 'turnToPos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'turnToEntity',
			kind: CompletionItemKind.Function,
			detail: 'turnToEntity( entity ent ): void',
			insertText: 'turnToEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveStatus',
			kind: CompletionItemKind.Function,
			detail: 'moveStatus(): float',
			insertText: 'moveStatus()'
		},
		{
			label: 'stopMove',
			kind: CompletionItemKind.Function,
			detail: 'stopMove(): void',
			insertText: 'stopMove()'
		},
		{
			label: 'moveToCover',
			kind: CompletionItemKind.Function,
			detail: 'moveToCover(): void',
			insertText: 'moveToCover()'
		},
		{
			label: 'moveToEnemy',
			kind: CompletionItemKind.Function,
			detail: 'moveToEnemy(): void',
			insertText: 'moveToEnemy()'
		},
		{
			label: 'moveToEnemyHeight',
			kind: CompletionItemKind.Function,
			detail: 'moveToEnemyHeight(): void',
			insertText: 'moveToEnemyHeight()'
		},
		{
			label: 'moveOutOfRange',
			kind: CompletionItemKind.Function,
			detail: 'moveOutOfRange( entity ent, float range ): void',
			insertText: 'moveOutOfRange(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveToAttackPosition',
			kind: CompletionItemKind.Function,
			detail: 'moveToAttackPosition( entity ent, string attack_anim ): void',
			insertText: 'moveToAttackPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'wander',
			kind: CompletionItemKind.Function,
			detail: 'wander(): void',
			insertText: 'wander()'
		},
		{
			label: 'moveToEntity',
			kind: CompletionItemKind.Function,
			detail: 'moveToEntity( entity destination ): void',
			insertText: 'moveToEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'moveToPosition',
			kind: CompletionItemKind.Function,
			detail: 'moveToPosition( vector position ): void',
			insertText: 'moveToPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'slideTo',
			kind: CompletionItemKind.Function,
			detail: 'slideTo( vector position, float time ): void',
			insertText: 'slideTo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'facingIdeal',
			kind: CompletionItemKind.Function,
			detail: 'facingIdeal(): float',
			insertText: 'facingIdeal()'
		},
		{
			label: 'faceEnemy',
			kind: CompletionItemKind.Function,
			detail: 'faceEnemy(): void',
			insertText: 'faceEnemy()'
		},
		{
			label: 'faceEntity',
			kind: CompletionItemKind.Function,
			detail: 'faceEntity( entity ent ): void',
			insertText: 'faceEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getCombatNode',
			kind: CompletionItemKind.Function,
			detail: 'getCombatNode(): entity',
			insertText: 'getCombatNode()'
		},
		{
			label: 'enemyInCombatCone',
			kind: CompletionItemKind.Function,
			detail: 'enemyInCombatCone( entity combatNode, float use_current_enemy_location ): float',
			insertText: 'enemyInCombatCone(${0})',
			insertTextFormat: 2
		},
		{
			label: 'waitMove',
			kind: CompletionItemKind.Function,
			detail: 'waitMove(): void',
			insertText: 'waitMove()'
		},
		{
			label: 'getJumpVelocity',
			kind: CompletionItemKind.Function,
			detail: 'getJumpVelocity( vector pos, float speed, float max_jump_height ): vector',
			insertText: 'getJumpVelocity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'entityInAttackCone',
			kind: CompletionItemKind.Function,
			detail: 'entityInAttackCone( entity ent ): float',
			insertText: 'entityInAttackCone(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canSee',
			kind: CompletionItemKind.Function,
			detail: 'canSee( entity ent ): float',
			insertText: 'canSee(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enemyRange',
			kind: CompletionItemKind.Function,
			detail: 'enemyRange(): float',
			insertText: 'enemyRange()'
		},
		{
			label: 'enemyRange2D',
			kind: CompletionItemKind.Function,
			detail: 'enemyRange2D(): float',
			insertText: 'enemyRange2D()'
		},
		{
			label: 'setTalkTarget',
			kind: CompletionItemKind.Function,
			detail: 'setTalkTarget( entity target ): void',
			insertText: 'setTalkTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getTalkTarget',
			kind: CompletionItemKind.Function,
			detail: 'getTalkTarget(): entity',
			insertText: 'getTalkTarget()'
		},
		{
			label: 'getEnemy',
			kind: CompletionItemKind.Function,
			detail: 'getEnemy(): entity',
			insertText: 'getEnemy()'
		},
		{
			label: 'getEnemyPos',
			kind: CompletionItemKind.Function,
			detail: 'getEnemyPos(): vector',
			insertText: 'getEnemyPos()'
		},
		{
			label: 'getEnemyEyePos',
			kind: CompletionItemKind.Function,
			detail: 'getEnemyEyePos(): vector',
			insertText: 'getEnemyEyePos()'
		},
		{
			label: 'predictEnemyPos',
			kind: CompletionItemKind.Function,
			detail: 'predictEnemyPos( float time ): vector',
			insertText: 'predictEnemyPos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canHitEnemy',
			kind: CompletionItemKind.Function,
			detail: 'canHitEnemy(): float',
			insertText: 'canHitEnemy()'
		},
		{
			label: 'canHitEnemyFromAnim',
			kind: CompletionItemKind.Function,
			detail: 'canHitEnemyFromAnim( string anim ): float',
			insertText: 'canHitEnemyFromAnim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canHitEnemyFromJoint',
			kind: CompletionItemKind.Function,
			detail: 'canHitEnemyFromJoint( string jointname ): float',
			insertText: 'canHitEnemyFromJoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enemyPositionValid',
			kind: CompletionItemKind.Function,
			detail: 'enemyPositionValid(): float',
			insertText: 'enemyPositionValid()'
		},
		{
			label: 'chargeAttack',
			kind: CompletionItemKind.Function,
			detail: 'chargeAttack( string damageDef ): void',
			insertText: 'chargeAttack(${0})',
			insertTextFormat: 2
		},
		{
			label: 'testChargeAttack',
			kind: CompletionItemKind.Function,
			detail: 'testChargeAttack(): float',
			insertText: 'testChargeAttack()'
		},
		{
			label: 'testAnimMoveTowardEnemy',
			kind: CompletionItemKind.Function,
			detail: 'testAnimMoveTowardEnemy( string animname ): float',
			insertText: 'testAnimMoveTowardEnemy(${0})',
			insertTextFormat: 2
		},
		{
			label: 'testAnimMove',
			kind: CompletionItemKind.Function,
			detail: 'testAnimMove( string animname ): float',
			insertText: 'testAnimMove(${0})',
			insertTextFormat: 2
		},
		{
			label: 'testMoveToPosition',
			kind: CompletionItemKind.Function,
			detail: 'testMoveToPosition( vector position ): float',
			insertText: 'testMoveToPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'testMeleeAttack',
			kind: CompletionItemKind.Function,
			detail: 'testMeleeAttack(): float',
			insertText: 'testMeleeAttack()'
		},
		{
			label: 'testAnimAttack',
			kind: CompletionItemKind.Function,
			detail: 'testAnimAttack( string animname ): float',
			insertText: 'testAnimAttack(${0})',
			insertTextFormat: 2
		},
		{
			label: 'shrivel',
			kind: CompletionItemKind.Function,
			detail: 'shrivel( float time ): void',
			insertText: 'shrivel(${0})',
			insertTextFormat: 2
		},
		{
			label: 'preBurn',
			kind: CompletionItemKind.Function,
			detail: 'preBurn(): void',
			insertText: 'preBurn()'
		},
		{
			label: 'burn',
			kind: CompletionItemKind.Function,
			detail: 'burn(): void',
			insertText: 'burn()'
		},
		{
			label: 'clearBurn',
			kind: CompletionItemKind.Function,
			detail: 'clearBurn(): void',
			insertText: 'clearBurn()'
		},
		{
			label: 'setSmokeVisibility',
			kind: CompletionItemKind.Function,
			detail: 'setSmokeVisibility( float particle_num, float on ): void',
			insertText: 'setSmokeVisibility(${0})',
			insertTextFormat: 2
		},
		{
			label: 'numSmokeEmitters',
			kind: CompletionItemKind.Function,
			detail: 'numSmokeEmitters(): float',
			insertText: 'numSmokeEmitters()'
		},
		{
			label: 'waitAction',
			kind: CompletionItemKind.Function,
			detail: 'waitAction( string name ): void',
			insertText: 'waitAction(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopThinking',
			kind: CompletionItemKind.Function,
			detail: 'stopThinking(): void',
			insertText: 'stopThinking()'
		},
		{
			label: 'getTurnDelta',
			kind: CompletionItemKind.Function,
			detail: 'getTurnDelta(): float',
			insertText: 'getTurnDelta()'
		},
		{
			label: 'getMoveType',
			kind: CompletionItemKind.Function,
			detail: 'getMoveType(): float',
			insertText: 'getMoveType()'
		},
		{
			label: 'setMoveType',
			kind: CompletionItemKind.Function,
			detail: 'setMoveType( float movetype ): void',
			insertText: 'setMoveType(${0})',
			insertTextFormat: 2
		},
		{
			label: 'saveMove',
			kind: CompletionItemKind.Function,
			detail: 'saveMove(): void',
			insertText: 'saveMove()'
		},
		{
			label: 'restoreMove',
			kind: CompletionItemKind.Function,
			detail: 'restoreMove(): void',
			insertText: 'restoreMove()'
		},
		{
			label: 'allowMovement',
			kind: CompletionItemKind.Function,
			detail: 'allowMovement( float allow ): void',
			insertText: 'allowMovement(${0})',
			insertTextFormat: 2
		},
		{
			label: 'enableClip',
			kind: CompletionItemKind.Function,
			detail: 'enableClip(): void',
			insertText: 'enableClip()'
		},
		{
			label: 'disableClip',
			kind: CompletionItemKind.Function,
			detail: 'disableClip(): void',
			insertText: 'disableClip()'
		},
		{
			label: 'enableGravity',
			kind: CompletionItemKind.Function,
			detail: 'enableGravity(): void',
			insertText: 'enableGravity()'
		},
		{
			label: 'disableGravity',
			kind: CompletionItemKind.Function,
			detail: 'disableGravity(): void',
			insertText: 'disableGravity()'
		},
		{
			label: 'enableAFPush',
			kind: CompletionItemKind.Function,
			detail: 'enableAFPush(): void',
			insertText: 'enableAFPush()'
		},
		{
			label: 'disableAFPush',
			kind: CompletionItemKind.Function,
			detail: 'disableAFPush(): void',
			insertText: 'disableAFPush()'
		},
		{
			label: 'setFlySpeed',
			kind: CompletionItemKind.Function,
			detail: 'setFlySpeed( float speed ): void',
			insertText: 'setFlySpeed(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setFlyOffset',
			kind: CompletionItemKind.Function,
			detail: 'setFlyOffset( float offset ): void',
			insertText: 'setFlyOffset(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearFlyOffset',
			kind: CompletionItemKind.Function,
			detail: 'clearFlyOffset(): void',
			insertText: 'clearFlyOffset()'
		},
		{
			label: 'getClosestHiddenTarget',
			kind: CompletionItemKind.Function,
			detail: 'getClosestHiddenTarget( string entity_type ): entity',
			insertText: 'getClosestHiddenTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getRandomTarget',
			kind: CompletionItemKind.Function,
			detail: 'getRandomTarget( string entity_type ): entity',
			insertText: 'getRandomTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'travelDistanceToPoint',
			kind: CompletionItemKind.Function,
			detail: 'travelDistanceToPoint( vector destination ): float',
			insertText: 'travelDistanceToPoint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'travelDistanceToEntity',
			kind: CompletionItemKind.Function,
			detail: 'travelDistanceToEntity( entity destination ): float',
			insertText: 'travelDistanceToEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'travelDistanceBetweenEntities',
			kind: CompletionItemKind.Function,
			detail: 'travelDistanceBetweenEntities( entity source, entity dest ): float',
			insertText: 'travelDistanceBetweenEntities(${0})',
			insertTextFormat: 2
		},
		{
			label: 'travelDistanceBetweenPoints',
			kind: CompletionItemKind.Function,
			detail: 'travelDistanceBetweenPoints( vector source, vector dest ): float',
			insertText: 'travelDistanceBetweenPoints(${0})',
			insertTextFormat: 2
		},
		{
			label: 'lookAt',
			kind: CompletionItemKind.Function,
			detail: 'lookAt( entity focusEntity, float duration ): void',
			insertText: 'lookAt(${0})',
			insertTextFormat: 2
		},
		{
			label: 'lookAtEnemy',
			kind: CompletionItemKind.Function,
			detail: 'lookAtEnemy( float duration ): void',
			insertText: 'lookAtEnemy(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setBoneMod',
			kind: CompletionItemKind.Function,
			detail: 'setBoneMod( float allowBoneMod ): void',
			insertText: 'setBoneMod(${0})',
			insertTextFormat: 2
		},
		{
			label: 'kill',
			kind: CompletionItemKind.Function,
			detail: 'kill(): void',
			insertText: 'kill()'
		},
		{
			label: 'wakeOnFlashlight',
			kind: CompletionItemKind.Function,
			detail: 'wakeOnFlashlight( float enable ): void',
			insertText: 'wakeOnFlashlight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setTalkState',
			kind: CompletionItemKind.Function,
			detail: 'setTalkState( float state ): void',
			insertText: 'setTalkState(${0})',
			insertTextFormat: 2
		},
		{
			label: 'locateEnemy',
			kind: CompletionItemKind.Function,
			detail: 'locateEnemy(): void',
			insertText: 'locateEnemy()'
		},
		{
			label: 'kickObstacles',
			kind: CompletionItemKind.Function,
			detail: 'kickObstacles( entity kickEnt, float force ): void',
			insertText: 'kickObstacles(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getObstacle',
			kind: CompletionItemKind.Function,
			detail: 'getObstacle(): entity',
			insertText: 'getObstacle()'
		},
		{
			label: 'pushPointIntoAAS',
			kind: CompletionItemKind.Function,
			detail: 'pushPointIntoAAS( vector pos ): vector',
			insertText: 'pushPointIntoAAS(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getTurnRate',
			kind: CompletionItemKind.Function,
			detail: 'getTurnRate(): float',
			insertText: 'getTurnRate()'
		},
		{
			label: 'setTurnRate',
			kind: CompletionItemKind.Function,
			detail: 'setTurnRate( float rate ): void',
			insertText: 'setTurnRate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'animTurn',
			kind: CompletionItemKind.Function,
			detail: 'animTurn( float angle ): void',
			insertText: 'animTurn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'allowHiddenMovement',
			kind: CompletionItemKind.Function,
			detail: 'allowHiddenMovement( float enable ): void',
			insertText: 'allowHiddenMovement(${0})',
			insertTextFormat: 2
		},
		{
			label: 'findActorsInBounds',
			kind: CompletionItemKind.Function,
			detail: 'findActorsInBounds( vector mins, vector maxs ): entity',
			insertText: 'findActorsInBounds(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canReachPosition',
			kind: CompletionItemKind.Function,
			detail: 'canReachPosition( vector pos ): float',
			insertText: 'canReachPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canReachEntity',
			kind: CompletionItemKind.Function,
			detail: 'canReachEntity( vector int ): float',
			insertText: 'canReachEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'canReachEnemy',
			kind: CompletionItemKind.Function,
			detail: 'canReachEnemy(): float',
			insertText: 'canReachEnemy()'
		},
		{
			label: 'getReachableEntityPosition',
			kind: CompletionItemKind.Function,
			detail: 'getReachableEntityPosition( entity ent ): vector',
			insertText: 'getReachableEntityPosition(${0})',
			insertTextFormat: 2
		},
		{
			label: 'vagary_ChooseObjectToThrow',
			kind: CompletionItemKind.Function,
			detail: 'vagary_ChooseObjectToThrow( vector mins, vector maxs, float speed, float minDist, float offset ): entity',
			insertText: 'vagary_ChooseObjectToThrow(${0})',
			insertTextFormat: 2
		},
		{
			label: 'vagary_ThrowObjectAtEnemy',
			kind: CompletionItemKind.Function,
			detail: 'vagary_ThrowObjectAtEnemy( entity ent, float speed ): void',
			insertText: 'vagary_ThrowObjectAtEnemy(${0})',
			insertTextFormat: 2
		},
		/*
		- Events D3XP 
		*/
		{
			label: 'moveToPositionDirect',
			kind: CompletionItemKind.Function,
			detail: 'moveToPositionDirect( vector pos ): void',
			documentation: 'Walk to position, ignore obstacles.',
			insertText: 'moveToPositionDirect(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setAnimation',
			kind: CompletionItemKind.Function,
			detail: 'setAnimation( string animName ): void',
			documentation: 'Use this with idAnimated entities.',
			insertText: 'setAnimation(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getAnimationLength',
			kind: CompletionItemKind.Function,
			detail: 'getAnimationLength(): float',
			insertText: 'getAnimationLength()'
		},
		{
			label: 'rotateVector',
			kind: CompletionItemKind.Function,
			detail: 'rotateVector( vector vec, vector ang ): vector',
			insertText: 'rotateVector(${0})',
			insertTextFormat: 2
		},
		{
			label: 'giveInventoryItem',
			kind: CompletionItemKind.Function,
			detail: 'giveInventoryItem( string item ): void',
			insertText: 'giveInventoryItem(${0})',
			insertTextFormat: 2
		},
		{
			label: 'randomInt',
			kind: CompletionItemKind.Function,
			detail: 'randomInt( float range ): float',
			documentation: 'Returns value from 0 to range, non-inclusive.',
			insertText: 'randomInt(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getGuiParm',
			kind: CompletionItemKind.Function,
			detail: 'getGuiParm( float guiNum, string key ): string',
			insertText: 'getGuiParm(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getGuiParmFloat',
			kind: CompletionItemKind.Function,
			detail: 'getGuiParmFloat( float guiNum, string key ): float',
			insertText: 'getGuiParmFloat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'guiNamedEvent',
			kind: CompletionItemKind.Function,
			detail: 'guiNamedEvent( float guiNum, string event ): void',
			insertText: 'guiNamedEvent(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setGuiStates',
			kind: CompletionItemKind.Function,
			detail: 'setGuiStates(): void',
			insertText: 'setGuiStates()'
		},
		{
			label: 'removeInventoryItem',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'setPowerupTime( float powerup, float time ): void',
			insertText: 'setPowerupTime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isPowerupActive',
			kind: CompletionItemKind.Function,
			detail: 'isPowerupActive( float powerup ): float',
			insertText: 'isPowerupActive(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weaponAvailable',
			kind: CompletionItemKind.Function,
			detail: 'weaponAvailable( string name ): float',
			insertText: 'weaponAvailable(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startWarp',
			kind: CompletionItemKind.Function,
			detail: 'startWarp(): void',
			insertText: 'startWarp()'
		},
		{
			label: 'stopHelltime',
			kind: CompletionItemKind.Function,
			detail: 'stopHelltime( float mode ): void',
			insertText: 'stopHelltime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'toggleBloom',
			kind: CompletionItemKind.Function,
			detail: 'toggleBloom( float on ): void',
			insertText: 'toggleBloom(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setBloomParms',
			kind: CompletionItemKind.Function,
			detail: 'setBloomParms( float speed, float intensity ): void',
			insertText: 'setBloomParms(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startWeaponSmoke',
			kind: CompletionItemKind.Function,
			detail: 'startWeaponSmoke(): void',
			insertText: 'startWeaponSmoke()'
		},
		{
			label: 'stopWeaponSmoke',
			kind: CompletionItemKind.Function,
			detail: 'stopWeaponSmoke(): void',
			insertText: 'stopWeaponSmoke()'
		},
		{
			label: 'startWeaponParticle',
			kind: CompletionItemKind.Function,
			detail: 'startWeaponParticle( string name ): void',
			insertText: 'startWeaponParticle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopWeaponParticle',
			kind: CompletionItemKind.Function,
			detail: 'stopWeaponParticle( string name ): void',
			insertText: 'stopWeaponParticle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startWeaponLight',
			kind: CompletionItemKind.Function,
			detail: 'startWeaponLight( string name ): void',
			insertText: 'startWeaponLight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'stopWeaponLight',
			kind: CompletionItemKind.Function,
			detail: 'stopWeaponLight( string name ): void',
			insertText: 'stopWeaponLight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'ejectBrass',
			kind: CompletionItemKind.Function,
			detail: 'ejectBrass(): void',
			insertText: 'ejectBrass()'
		},
		{
			label: 'projectileCreateProjectile',
			kind: CompletionItemKind.Function,
			detail: 'projectileCreateProjectile( entity owner, vector start, vector dir ): void',
			insertText: 'projectileCreateProjectile(${0})',
			insertTextFormat: 2
		},
		{
			label: 'projectileLaunchProjectile',
			kind: CompletionItemKind.Function,
			detail: 'projectileLaunchProjectile( vector start, vector dir, vector pushVelocity ): void',
			insertText: 'projectileLaunchProjectile(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setGravity',
			kind: CompletionItemKind.Function,
			detail: 'setGravity( float gravity ): void',
			insertText: 'setGravity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'asin',
			kind: CompletionItemKind.Function,
			detail: 'asin( float a ): float',
			insertText: 'asin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'acos',
			kind: CompletionItemKind.Function,
			detail: 'acos( float a ): float',
			insertText: 'acos(${0})',
			insertTextFormat: 2
		},
		{
			label: 'launchProjectilesEllipse',
			kind: CompletionItemKind.Function,
			detail: 'launchProjectilesEllipse( float num_projectiles, float spreada, float spreadb, float fuseOffset, float power ): void',
			insertText: 'launchProjectilesEllipse(${0})',
			insertTextFormat: 2
		},
		{
			label: 'launchPowerup',
			kind: CompletionItemKind.Function,
			detail: 'launchPowerup( string powerup, float duration, float useAmmo ): void',
			insertText: 'launchPowerup(${0})',
			insertTextFormat: 2
		},
		/*
		- Events Deck
		*/
		{
			label: 'setDeckScript',
			kind: CompletionItemKind.Function,
			detail: 'setDeckScript( entity ent ): void',
			documentation: 'Tell the game what object is the global deck script object. Called at game start.',
			insertText: 'setDeckScript(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_cls',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_cls(): void',
			documentation: 'Clear all output.',
			insertText: 'deck_cls()'
		},
		{
			label: 'deck_print',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_print( string text ): void',
			documentation: 'Print a line.',
			insertText: 'deck_print(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_printline',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_printline( string text ): void',
			documentation: 'Overwrite the last line.',
			insertText: 'deck_printline(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_split',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_split( float index, string text ): string',
			documentation: 'Split a string by whitespaces.\n\tindex = index of word\n\ttext = the entire raw string\nIf no word found at index, then return "".',
			insertText: 'deck_split(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_split2',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_split2( float index, string text, string divider ): string',
			documentation: 'Set a custom divider string. See deck_split.',
			insertText: 'deck_split2(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_split3',
			kind: CompletionItemKind.Function,
			detail: '[deck] deck_split3( float index, string text, string divider ): string',
			documentation: 'Same as deck_split2 but returns an unparsed string.',
			insertText: 'deck_split3(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_getArg',
			kind: CompletionItemKind.Function,
			detail: 'deck_getArg( string text ): string',
			documentation: 'Returns the argument passed in via parentheses (i.e. passing in door1.off(7.2) will return "7.2").',
			insertText: 'deck_getArg(${0})',
			insertTextFormat: 2
		},
		{
			label: 'deck_hasArg',
			kind: CompletionItemKind.Function,
			detail: 'deck_hasArg( string text, string functionName ): float',
			documentation: 'Verifies whether this is a valid argument.',
			insertText: 'deck_hasArg(${0})',
			insertTextFormat: 2
		},
		{
			label: 'callFunctionArg',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'setFrobbable( float enable ): void',
			documentation: 'Marks item as frobbable/unfrobbable',
			insertText: 'setFrobbable(${0})',
			insertTextFormat: 2
		},
		{
			label: 'usePicker',
			kind: CompletionItemKind.Function,
			detail: 'usePicker( entity ent ): float',
			documentation: 'Force player to pick up an object.',
			insertText: 'usePicker(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isHolding',
			kind: CompletionItemKind.Function,
			detail: 'isHolding( entity ent ): float',
			documentation: 'Check if player is holding this ent.',
			insertText: 'isHolding(${0})',
			insertTextFormat: 2
		},
		{
			label: 'pressEnter',
			kind: CompletionItemKind.Function,
			detail: 'pressEnter(): void',
			documentation: 'Force press enter on deck.',
			insertText: 'pressEnter()'
		},
		{
			label: 'settext_obj',
			kind: CompletionItemKind.Function,
			detail: 'settext_obj( string text ): void',
			documentation: 'Objective text.',
			insertText: 'settext_obj(${0})',
			insertTextFormat: 2
		},
		{
			label: 'settext_alarms',
			kind: CompletionItemKind.Function,
			detail: 'settext_alarms( float amount ): void',
			documentation: 'Objective text.',
			insertText: 'settext_alarms(${0})',
			insertTextFormat: 2
		},
		{
			label: 'settext_missionclock',
			kind: CompletionItemKind.Function,
			detail: 'settext_missionclock( float amount ): void',
			documentation: 'Objective text.',
			insertText: 'settext_missionclock(${0})',
			insertTextFormat: 2
		},
		{
			label: 'viewlook',
			kind: CompletionItemKind.Function,
			detail: 'viewlook( vector targetPos, float time, float backwards, float staylocked ): void',
			documentation: 'Transition the camera to a new position.',
			insertText: 'viewlook(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clamberScripted',
			kind: CompletionItemKind.Function,
			detail: 'clamberScripted( vector targetPos, float intensity, float movetime ): void',
			documentation: 'Scripted climb.\n\tintensity = how much to bobble the camera',
			insertText: 'clamberScripted(${0})',
			insertTextFormat: 2
		},
		{
			label: 'useVehicle',
			kind: CompletionItemKind.Function,
			detail: 'useVehicle( entity vehicle, float board ): void',
			documentation: 'Board/disembark a vehicle.',
			insertText: 'useVehicle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setFrozen',
			kind: CompletionItemKind.Function,
			detail: 'setFrozen( float value ): void',
			documentation: 'Stop player from moving/jumping/crouching.\n\t0 = can\'t move\n\t1 = +can\'t use weapons\n\t2 = +can\'t turn head',
			insertText: 'setFrozen(${0})',
			insertTextFormat: 2
		},
		{
			label: 'inDeck',
			kind: CompletionItemKind.Function,
			detail: 'inDeck(): float',
			documentation: 'Check if player is in deck or not.',
			insertText: 'inDeck()'
		},
		{
			label: 'stopPicker',
			kind: CompletionItemKind.Function,
			detail: 'stopPicker(): void',
			documentation: 'Force player to drop whatever is being carried.',
			insertText: 'stopPicker()'
		},
		{
			label: 'getAmmo',
			kind: CompletionItemKind.Function,
			detail: 'getAmmo( string name ): float',
			documentation: 'Get ammo count.',
			insertText: 'getAmmo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'spendAmmo',
			kind: CompletionItemKind.Function,
			detail: 'spendAmmo( string name, float value ): float',
			documentation: 'Consume ammo.',
			insertText: 'spendAmmo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setAmmo',
			kind: CompletionItemKind.Function,
			detail: 'setAmmo( string name, float value ): void',
			documentation: 'Set absolute value for ammo.',
			insertText: 'setAmmo(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearPowerups',
			kind: CompletionItemKind.Function,
			detail: 'clearPowerups(): void',
			documentation: 'Clear powerups.',
			insertText: 'clearPowerups()'
		},
		{
			label: 'removeWeaponItem',
			kind: CompletionItemKind.Function,
			detail: 'removeWeaponItem( string weapon ): void',
			documentation: 'Remove weapon.',
			insertText: 'removeWeaponItem(${0})',
			insertTextFormat: 2
		},
		{
			label: 'useDeck',
			kind: CompletionItemKind.Function,
			detail: 'useDeck( entity ent, entity master ): void',
			documentation: 'Call when player wants to start typing on deck.',
			insertText: 'useDeck(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getEyePos',
			kind: CompletionItemKind.Function,
			detail: 'getEyePos(): vector',
			documentation: 'Get worldposition of eyeball.',
			insertText: 'getEyePos()'
		},
		{
			label: 'getPickerState',
			kind: CompletionItemKind.Function,
			detail: 'getPickerState(): float',
			documentation: 'Get state of player crosshair.\n\t0 = normal crosshair\n\t1 = frob finger available\n\t2 = holding something\n\t3 = just dropped object',
			insertText: 'getPickerState()'
		},
		{
			label: 'writesticky',
			kind: CompletionItemKind.Function,
			detail: 'writesticky( float value ): void',
			insertText: 'writesticky(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcasing',
			kind: CompletionItemKind.Function,
			detail: 'setcasing( float value ): void',
			documentation: 'Set player in caser mode.',
			insertText: 'setcasing(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setviewangle',
			kind: CompletionItemKind.Function,
			detail: 'setviewangle( vector angle ): void',
			documentation: 'Force view angle to turn.',
			insertText: 'setviewangle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setplayerskin',
			kind: CompletionItemKind.Function,
			detail: 'setplayerskin( string skinname ): void',
			documentation: 'Set skin.',
			insertText: 'setplayerskin(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setgodmode',
			kind: CompletionItemKind.Function,
			detail: 'setgodmode( float value ): void',
			documentation: 'Sets god mode.',
			insertText: 'setgodmode(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sethipclock',
			kind: CompletionItemKind.Function,
			detail: 'sethipclock( float value ): void',
			documentation: 'Toggle hip clock.',
			insertText: 'sethipclock(${0})',
			insertTextFormat: 2
		},
		{
			label: 'toggleHaze',
			kind: CompletionItemKind.Function,
			detail: 'toggleHaze( float time, float value ): void',
			documentation: 'time = how long to play it\nvalue = intensity',
			insertText: 'toggleHaze(${0})',
			insertTextFormat: 2
		},
		{
			label: 'lerpviewangle',
			kind: CompletionItemKind.Function,
			detail: 'lerpviewangle( vector pos, float time ): void',
			documentation: 'Lerp the viewangles.\n\tpos = xyz of the target object\n\ttime = milliseconds (1000 ms = 1 sec)',
			insertText: 'lerpviewangle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isInFOV',
			kind: CompletionItemKind.Function,
			detail: 'isInFOV( vector pos ): float',
			documentation: 'Determine whether an xyz is within the player\'s FOV.',
			insertText: 'isInFOV(${0})',
			insertTextFormat: 2
		},
		{
			label: 'killDeckthreads',
			kind: CompletionItemKind.Function,
			detail: 'killDeckthreads(): void',
			documentation: 'Kill any threads in the deck is running.',
			insertText: 'killDeckthreads()'
		},
		{
			label: 'forcestand',
			kind: CompletionItemKind.Function,
			detail: 'forcestand(): void',
			documentation: 'Force the player to uncrouch & stand up.',
			insertText: 'forcestand()'
		},
		{
			label: 'forcegui',
			kind: CompletionItemKind.Function,
			detail: 'forcegui( string flag, float value ): void',
			documentation: 'Set a gui flag.',
			insertText: 'forcegui(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcanfrob',
			kind: CompletionItemKind.Function,
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
			kind: CompletionItemKind.Function,
			detail: 'setPlacerAngle( float value ): void',
			documentation: 'Gets/sets the placer\'s current rotation.',
			insertText: 'setPlacerAngle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getPlacerAngle',
			kind: CompletionItemKind.Function,
			detail: 'getPlacerAngle(): vector',
			documentation: 'Gets/sets the placer\'s current rotation.',
			insertText: 'getPlacerAngle()'
		},
		{
			label: 'getPlacerAngleRaw',
			kind: CompletionItemKind.Function,
			detail: 'getPlacerAngleRaw(): vector',
			documentation: 'Gets/sets the placer\'s current rotation.',
			insertText: 'getPlacerAngleRaw()'
		},
		{
			label: 'getPlacerPos',
			kind: CompletionItemKind.Function,
			detail: 'getPlacerPos(): vector',
			insertText: 'getPlacerPos()'
		},
		{
			label: 'getPlacerValid',
			kind: CompletionItemKind.Function,
			detail: 'getPlacerValid(): float',
			insertText: 'getPlacerValid()'
		},
		{
			label: 'getPlacerFloatPos',
			kind: CompletionItemKind.Function,
			detail: 'getPlacerFloatPos(): vector',
			insertText: 'getPlacerFloatPos()'
		},
		{
			label: 'GetOriginalPosition',
			kind: CompletionItemKind.Function,
			detail: 'GetOriginalPosition(): vector',
			documentation: 'Func_mover and idmoveable.',
			insertText: 'GetOriginalPosition()'
		},
		{
			label: 'GetOriginalAngle',
			kind: CompletionItemKind.Function,
			detail: 'GetOriginalAngle(): vector',
			documentation: 'Func_mover and idmoveable.',
			insertText: 'GetOriginalAngle()'
		},
		{
			label: 'setAFGravity',
			kind: CompletionItemKind.Function,
			detail: 'setAFGravity( vector newGravity ): void',
			documentation: 'Sets gravity on an articulated figure.',
			insertText: 'setAFGravity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setCamFov',
			kind: CompletionItemKind.Function,
			detail: 'setCamFov( float fov ): void',
			documentation: 'idCameraView: set fov of camera.',
			insertText: 'setCamFov(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setCameraTarget',
			kind: CompletionItemKind.Function,
			detail: 'setCameraTarget( entity ent ): void',
			documentation: 'Assign a cameraTarget to an entity.',
			insertText: 'setCameraTarget(${0})',
			insertTextFormat: 2
		},
		{
			label: 'clearCameraTarget',
			kind: CompletionItemKind.Function,
			detail: 'clearCameraTarget(): void',
			insertText: 'clearCameraTarget()'
		},
		{
			label: 'getNearestEnemy',
			kind: CompletionItemKind.Function,
			detail: 'getNearestEnemy(): entity',
			documentation: 'Get the nearest enemy.',
			insertText: 'getNearestEnemy()'
		},
		{
			label: 'canSeeEntity',
			kind: CompletionItemKind.Function,
			detail: 'canSeeEntity( entity ent ): float',
			documentation: 'Check if this ent can see the other ent.',
			insertText: 'canSeeEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'floatRound',
			kind: CompletionItemKind.Function,
			detail: 'floatRound( float value, float decimalPlaces ): string',
			documentation: 'Truncate the decimal places of a float value.',
			insertText: 'floatRound(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getClassEntity',
			kind: CompletionItemKind.Function,
			detail: 'getClassEntity( string classname, float lastFound ): entity',
			documentation: 'Returns entity with the classname. Use lastFound to cycle to the next found entity.',
			insertText: 'getClassEntity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getIndex',
			kind: CompletionItemKind.Function,
			detail: 'getIndex(): float',
			documentation: 'Returns the index number of the entity in the gameLocal.entities[] list.',
			insertText: 'getIndex()'
		},
		{
			label: 'camOff',
			kind: CompletionItemKind.Function,
			detail: 'camOff(): void',
			documentation: 'Camera event.',
			insertText: 'camOff()'
		},
		{
			label: 'camOn',
			kind: CompletionItemKind.Function,
			detail: 'camOn(): void',
			documentation: 'Camera event.',
			insertText: 'camOn()'
		},
		{
			label: 'camreset',
			kind: CompletionItemKind.Function,
			detail: 'camreset(): void',
			documentation: 'Camera event.',
			insertText: 'camreset()'
		},
		{
			label: 'hudMessage',
			kind: CompletionItemKind.Function,
			detail: 'hudMessage( string text ): void',
			documentation: 'Show a message on the hud.',
			insertText: 'hudMessage(${0})',
			insertTextFormat: 2
		},
		{
			label: 'debugMessage',
			kind: CompletionItemKind.Function,
			detail: 'debugMessage( string text ): void',
			documentation: 'Show a message on the hud.',
			insertText: 'debugMessage(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setAFActive',
			kind: CompletionItemKind.Function,
			detail: 'setAFActive( float value ): void',
			documentation: 'Articulated Figures: toggles physics simulation.',
			insertText: 'setAFActive(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setAFRest',
			kind: CompletionItemKind.Function,
			detail: 'setAFRest( float value ): void',
			documentation: 'Articulated Figures: come to physics rest.',
			insertText: 'setAFRest(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setNoclip',
			kind: CompletionItemKind.Function,
			detail: 'setNoclip( float value ): void',
			documentation: 'Playercall: sets noclip.',
			insertText: 'setNoclip(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getNoclip',
			kind: CompletionItemKind.Function,
			detail: 'getNoclip(): float',
			insertText: 'getNoclip()'
		},
		{
			label: 'getTraceSky',
			kind: CompletionItemKind.Function,
			detail: 'getTraceSky(): float',
			documentation: 'Determines of the last trace call that touched the sky.',
			insertText: 'getTraceSky()'
		},
		{
			label: 'IsEnabled',
			kind: CompletionItemKind.Function,
			detail: '[trigger] IsEnabled(): float',
			documentation: 'Check if trigger is enabled.',
			insertText: 'IsEnabled()'
		},
		{
			label: 'triggeractivate',
			kind: CompletionItemKind.Function,
			detail: '[trigger] triggeractivate( float value ): void',
			documentation: 'Set whether trigger is active.',
			insertText: 'triggeractivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'SetWidth',
			kind: CompletionItemKind.Function,
			detail: '[beam] SetWidth( float width ): void',
			documentation: 'Set the width.',
			insertText: 'SetWidth(${0})',
			insertTextFormat: 2
		},
		{
			label: 'UpdatePeak',
			kind: CompletionItemKind.Function,
			detail: '[jumppad] UpdatePeak(): void',
			documentation: 'Update the peak point.',
			insertText: 'UpdatePeak()'
		},
		{
			label: 'activatepad',
			kind: CompletionItemKind.Function,
			detail: '[jumppad] activatepad( float value ): void',
			documentation: 'Toggle jumppad on/off.',
			insertText: 'activatepad(${0})',
			insertTextFormat: 2
		},
		{
			label: 'laseroff',
			kind: CompletionItemKind.Function,
			detail: '[laserwire] laseroff( float delay ): void',
			insertText: 'laseroff(${0})',
			insertTextFormat: 2
		},
		{
			label: 'laseron',
			kind: CompletionItemKind.Function,
			detail: '[laserwire] laseron(): void',
			insertText: 'laseron()'
		},
		{
			label: 'laserenable',
			kind: CompletionItemKind.Function,
			detail: '[laserwire] laserenable( float value ): void',
			insertText: 'laserenable(${0})',
			insertTextFormat: 2
		},
		{
			label: 'fadeLight',
			kind: CompletionItemKind.Function,
			detail: '[light] fadeLight( float time, vector newColor ): void',
			documentation: 'Fade light to a new color.',
			insertText: 'fadeLight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'IsOn',
			kind: CompletionItemKind.Function,
			detail: '[light] IsOn(): float',
			documentation: 'Determines whether light is on or off.\n\t0 = off',
			insertText: 'IsOn()'
		},
		{
			label: 'resetlight',
			kind: CompletionItemKind.Function,
			detail: '[light] resetlight( float time ): void',
			documentation: 'Fade light back to its original spawn color.',
			insertText: 'resetlight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isHidden',
			kind: CompletionItemKind.Function,
			detail: 'isHidden(): float',
			documentation: 'VehicleSimple: check if hidden in alley.',
			insertText: 'isHidden()'
		},
		{
			label: 'getString',
			kind: CompletionItemKind.Function,
			detail: '[sys] getString( string value ): string',
			documentation: 'Return localized string from english.lang. Send it the 5-digit localized integer.',
			insertText: 'getString(${0})',
			insertTextFormat: 2
		},
		{
			label: 'parseTime',
			kind: CompletionItemKind.Function,
			detail: '[sys] parseTime( float amount ): string',
			documentation: 'Give it seconds, returns a readable mm:ss.dd string.',
			insertText: 'parseTime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'parseTime2',
			kind: CompletionItemKind.Function,
			detail: '[sys] parseTime2( float amount ): string',
			documentation: 'Give it seconds, returns a readable mm:ss string.',
			insertText: 'parseTime2(${0})',
			insertTextFormat: 2
		},
		{
			label: 'parseTimeMS',
			kind: CompletionItemKind.Function,
			detail: '[sys] parseTimeMS( float amount ): string',
			documentation: 'Give it milliseconds, returns a readable mm:ss.dd string.',
			insertText: 'parseTimeMS(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getMapname',
			kind: CompletionItemKind.Function,
			detail: '[sys] getMapname(): string',
			documentation: 'Get name of map that\'s currently running.',
			insertText: 'getMapname()'
		},
		{
			label: 'callMap',
			kind: CompletionItemKind.Function,
			detail: '[sys] callMap( string functionName ): float',
			documentation: 'Call a function on the current map. Return 1 if successful.',
			insertText: 'callMap(${0})',
			insertTextFormat: 2
		},
		{
			label: 'lerp',
			kind: CompletionItemKind.Function,
			detail: '[sys] lerp( float value1, float value2, float amount ): float',
			insertText: 'lerp(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getworldspawnint',
			kind: CompletionItemKind.Function,
			detail: '[sys] getworldspawnint( string keyname ): float',
			documentation: 'Gets int value from worldspawn.',
			insertText: 'getworldspawnint(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcutscene',
			kind: CompletionItemKind.Function,
			detail: '[sys] setcutscene( float value ): void',
			documentation: 'Set whether we\'re in a skippable scene. Press ESC to skip. Calls map function "skipcutscene".',
			insertText: 'setcutscene(${0})',
			insertTextFormat: 2
		},
		{
			label: 'spawndecal',
			kind: CompletionItemKind.Function,
			detail: '[sys] spawndecal( vector pos, vector normal, float size, string material ): void',
			insertText: 'spawndecal(${0})',
			insertTextFormat: 2
		},
		{
			label: 'rundeckcommand',
			kind: CompletionItemKind.Function,
			detail: '[sys] rundeckcommand( string value ): void',
			documentation: 'Jam command(s) into the deck queue.',
			insertText: 'rundeckcommand(${0})',
			insertTextFormat: 2
		},
		{
			label: 'callsavegame',
			kind: CompletionItemKind.Function,
			detail: '[sys] callsavegame( float savetype ): void',
			documentation: 'Save game.\n\t0 = quicksave\n\t1 = savestation\n\t2 = autosave',
			insertText: 'callsavegame(${0})',
			insertTextFormat: 2
		},
		{
			label: 'killcctvs',
			kind: CompletionItemKind.Function,
			detail: '[sys] killcctvs(): void',
			documentation: 'Kill all cctv connections.',
			insertText: 'killcctvs()'
		},
		{
			label: 'getMapIndex',
			kind: CompletionItemKind.Function,
			detail: 'getMapIndex(): string',
			documentation: 'Get campaign index # of map.',
			insertText: 'getMapIndex()'
		},
		{
			label: 'PanelDisconnect',
			kind: CompletionItemKind.Function,
			detail: '[func_panel] PanelDisconnect(): void',
			documentation: 'Disconnect any attached cables.',
			insertText: 'PanelDisconnect()'
		},
		{
			label: 'PanelReset',
			kind: CompletionItemKind.Function,
			detail: '[func_panel] PanelReset(): void',
			documentation: 'Reset.',
			insertText: 'PanelReset()'
		},
		{
			label: 'setClipModel',
			kind: CompletionItemKind.Function,
			detail: '[entity] setClipModel( string clipmodelname ): void',
			documentation: 'Set clipmodel.',
			insertText: 'setClipModel(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setSolid',
			kind: CompletionItemKind.Function,
			detail: '[entity] setSolid( float value ): void',
			documentation: 'Sets solid/nonsolid.',
			insertText: 'setSolid(${0})',
			insertTextFormat: 2
		},
		{
			label: 'turretactivate',
			kind: CompletionItemKind.Function,
			detail: '[turret] turretactivate( float value ): void',
			documentation: 'Activate/deactivate.',
			insertText: 'turretactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'turretisactive',
			kind: CompletionItemKind.Function,
			detail: '[turret] turretisactive(): float',
			documentation: 'Returns whether it\'s on.',
			insertText: 'turretisactive()'
		},
		{
			label: 'portalactivate',
			kind: CompletionItemKind.Function,
			detail: '[func_portal] portalactivate( float value ): void',
			insertText: 'portalactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'triggerpushactivate',
			kind: CompletionItemKind.Function,
			detail: '[trigger_push] triggerpushactivate( float value ): void',
			insertText: 'triggerpushactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sentryactivate',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentryactivate( float value ): void',
			documentation: 'Activate/deactivate sentry.',
			insertText: 'sentryactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'issentryactive',
			kind: CompletionItemKind.Function,
			detail: '[sentry] issentryactive(): float',
			documentation: 'Get whether sentry is active.',
			insertText: 'issentryactive()'
		},
		{
			label: 'sentryturn',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentryturn( float yaw ): void',
			insertText: 'sentryturn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sentrypitch',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentrypitch( float pitch ): void',
			insertText: 'sentrypitch(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sentryface',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentryface( float x, float y, float z ): void',
			insertText: 'sentryface(${0})',
			insertTextFormat: 2
		},
		{
			label: 'sentryfire',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentryfire(): void',
			insertText: 'sentryfire()'
		},
		{
			label: 'sentrystand',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentrystand(): void',
			insertText: 'sentrystand()'
		},
		{
			label: 'sentrygetlaser',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentrygetlaser(): vector',
			insertText: 'sentrygetlaser()'
		},
		{
			label: 'sentrykill',
			kind: CompletionItemKind.Function,
			detail: '[sentry] sentrykill(): void',
			insertText: 'sentrykill()'
		},
		{
			label: 'weevilforward',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevilforward( float distance ): void',
			insertText: 'weevilforward(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weevilturn',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevilturn( float degrees ): void',
			insertText: 'weevilturn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weevilstop',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevilstop(): void',
			insertText: 'weevilstop()'
		},
		{
			label: 'weevilstand',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevilstand(): void',
			insertText: 'weevilstand()'
		},
		{
			label: 'weevillight',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevillight( float value ): void',
			insertText: 'weevillight(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weeviljump',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weeviljump(): void',
			insertText: 'weeviljump()'
		},
		{
			label: 'weevilgravity',
			kind: CompletionItemKind.Function,
			detail: '[weevil] weevilgravity( float value ): void',
			insertText: 'weevilgravity(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weevilgetgravity',
			kind: CompletionItemKind.Function,
			detail: 'weevilgetgravity(): float',
			insertText: 'weevilgetgravity()'
		},
		{
			label: 'weevildoplug',
			kind: CompletionItemKind.Function,
			detail: 'weevildoplug( float value, entity datajack ): void',
			insertText: 'weevildoplug(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isweevilplugconnected',
			kind: CompletionItemKind.Function,
			detail: 'isweevilplugconnected(): float',
			insertText: 'isweevilplugconnected()'
		},
		{
			label: 'weevileyemove',
			kind: CompletionItemKind.Function,
			detail: 'weevileyemove( float pitch, float yaw, float reset ): float',
			insertText: 'weevileyemove(${0})',
			insertTextFormat: 2
		},
		{
			label: 'camturretactivate',
			kind: CompletionItemKind.Function,
			detail: '[camturret] camturretactivate( float value ): void',
			insertText: 'camturretactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'keypadopen',
			kind: CompletionItemKind.Function,
			detail: '[keypad] keypadopen( float value ): void',
			documentation: 'Open/close the keypad.',
			insertText: 'keypadopen(${0})',
			insertTextFormat: 2
		},
		{
			label: 'startAnim',
			kind: CompletionItemKind.Function,
			detail: 'startAnim(): void',
			documentation: 'idAnimated.',
			insertText: 'startAnim()'
		},
		{
			label: 'launcherkill',
			kind: CompletionItemKind.Function,
			detail: '[launcher] launcherkill(): void',
			insertText: 'launcherkill()'
		},
		{
			label: 'recordstart',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordstart( float index, float continuation ): void',
			insertText: 'recordstart(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordplay',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordplay( float index ): void',
			insertText: 'recordplay(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordstop',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordstop(): void',
			insertText: 'recordstop()'
		},
		{
			label: 'worldreset',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] worldreset(): void',
			documentation: 'Reset original positions of moveable things.',
			insertText: 'worldreset()'
		},
		{
			label: 'geteventcount',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] geteventcount( float index ): float',
			documentation: 'Get # of events in an operative\'s timeline.',
			insertText: 'geteventcount(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getlasteventtimestamp',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] getlasteventtimestamp( float index ): float',
			documentation: 'Get timestamp (i.e. 50.000000 = 50 seconds) of last event.',
			insertText: 'getlasteventtimestamp(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setrecordstarttime',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] setrecordstarttime(): void',
			documentation: 'Set a record start time. Used for continuations.',
			insertText: 'setrecordstarttime()'
		},
		{
			label: 'moveplayertoghost',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] moveplayertoghost( float index ): void',
			insertText: 'moveplayertoghost(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordclear',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordclear( float index ): void',
			insertText: 'recordclear(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcomplete',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] setcomplete( float index, float value ): void',
			insertText: 'setcomplete(${0})',
			insertTextFormat: 2
		},
		{
			label: 'getcomplete',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] getcomplete( float index ): float',
			insertText: 'getcomplete(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordspawn',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordspawn( string defName, float id, vector position, float yaw ): void',
			insertText: 'recordspawn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordunspawn',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordunspawn( float id ): void',
			insertText: 'recordunspawn(${0})',
			insertTextFormat: 2
		},
		{
			label: 'recordlaunchaim',
			kind: CompletionItemKind.Function,
			detail: '[worldmanager] recordlaunchaim( float id, vector dir, float force ): void',
			insertText: 'recordlaunchaim(${0})',
			insertTextFormat: 2
		},
		{
			label: 'onAlarm',
			kind: CompletionItemKind.Function,
			detail: 'onAlarm(): void',
			documentation: 'Trigger this when a security system (laserwire, door timer, etc.) is tripped.',
			insertText: 'onAlarm()'
		},
		{
			label: 'onSighted',
			kind: CompletionItemKind.Function,
			detail: 'onSighted(): void',
			documentation: 'Trigger this when a camturret sees the player.',
			insertText: 'onSighted()'
		},
		{
			label: 'onDefuse',
			kind: CompletionItemKind.Function,
			detail: 'onDefuse(): void',
			insertText: 'onDefuse()'
		},
		{
			label: 'onReset',
			kind: CompletionItemKind.Function,
			detail: 'onReset(): void',
			documentation: 'Trigger this when a job is restarted.',
			insertText: 'onReset()'
		},
		{
			label: 'powersawreset',
			kind: CompletionItemKind.Function,
			detail: '[powersaw] powersawreset(): void',
			insertText: 'powersawreset()'
		},
		{
			label: 'powerscrewreset',
			kind: CompletionItemKind.Function,
			detail: '[powerscrew] powerscrewreset(): void',
			insertText: 'powerscrewreset()'
		},
		{
			label: 'screwreset',
			kind: CompletionItemKind.Function,
			detail: '[screw] screwreset(): void',
			insertText: 'screwreset()'
		},
		{
			label: 'glassreset',
			kind: CompletionItemKind.Function,
			detail: '[qglass] glassreset(): void',
			insertText: 'glassreset()'
		},
		{
			label: 'contractcamreset',
			kind: CompletionItemKind.Function,
			detail: '[contract cam] contractcamreset(): void',
			insertText: 'contractcamreset()'
		},
		{
			label: 'clockreset',
			kind: CompletionItemKind.Function,
			detail: '[clock] clockreset(): void',
			documentation: 'Reset clock to midnight.',
			insertText: 'clockreset()'
		},
		{
			label: 'clocksettime',
			kind: CompletionItemKind.Function,
			detail: '[clock] clocksettime( float value ): void',
			documentation: 'Set clock to a value.',
			insertText: 'clocksettime(${0})',
			insertTextFormat: 2
		},
		{
			label: 'tablefoldreset',
			kind: CompletionItemKind.Function,
			detail: '[tablefold] tablefoldreset(): void',
			insertText: 'tablefoldreset()'
		},
		{
			label: 'staticactivate',
			kind: CompletionItemKind.Function,
			detail: '[itemgate] staticactivate( float value ): void',
			insertText: 'staticactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'doorfoldingactivate',
			kind: CompletionItemKind.Function,
			detail: '[door folding] doorfoldingactivate( float value ): void',
			insertText: 'doorfoldingactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'emitterenable',
			kind: CompletionItemKind.Function,
			detail: '[func_emitter] emitterenable( float value ): void',
			insertText: 'emitterenable(${0})',
			insertTextFormat: 2
		},
		{
			label: 'isemitterenabled',
			kind: CompletionItemKind.Function,
			detail: 'isemitterenabled(): float',
			insertText: 'isemitterenabled()'
		},
		{
			label: 'zeppelinactivate',
			kind: CompletionItemKind.Function,
			detail: '[zeppelin] zeppelinactivate( float value ): void',
			insertText: 'zeppelinactivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'datajackreset',
			kind: CompletionItemKind.Function,
			detail: '[datajack] datajackreset( float closeDoor ): void',
			insertText: 'datajackreset(${0})',
			insertTextFormat: 2
		},
		{
			label: 'weevilopendoor',
			kind: CompletionItemKind.Function,
			detail: '[datajack] weevilopendoor(): void',
			insertText: 'weevilopendoor()'
		},
		{
			label: 'getdatajackopenstate',
			kind: CompletionItemKind.Function,
			detail: '[datajack] getdatajackopenstate(): float',
			insertText: 'getdatajackopenstate()'
		},
		{
			label: 'countdownreset',
			kind: CompletionItemKind.Function,
			detail: '[countdowntimer] countdownreset(): void',
			insertText: 'countdownreset()'
		},
		{
			label: 'countdownstart',
			kind: CompletionItemKind.Function,
			detail: '[countdowntimer] countdownstart(): void',
			insertText: 'countdownstart()'
		},
		{
			label: 'countdownhasTripped',
			kind: CompletionItemKind.Function,
			detail: '[countdowntimer] countdownhasTripped(): float',
			insertText: 'countdownhasTripped()'
		},
		{
			label: 'buttonswitcheractivate',
			kind: CompletionItemKind.Function,
			detail: '[buttonswitcher] buttonswitcheractivate( float value ): void',
			insertText: 'buttonswitcheractivate(${0})',
			insertTextFormat: 2
		},
		{
			label: 'updategravity',
			kind: CompletionItemKind.Function,
			detail: '[moveableitems] updategravity(): void',
			documentation: 'Force update of item\'s gravity. Check whether it\'s in a vacuum environment.',
			insertText: 'updategravity()'
		},
		{
			label: 'toggletrail',
			kind: CompletionItemKind.Function,
			detail: '[moveableitems] toggletrail( float value ): void',
			documentation: 'Toggle particle trail. Use def file "smoke_trail" and "repeatSmoke".',
			insertText: 'toggletrail(${0})',
			insertTextFormat: 2
		},
		{
			label: 'attractortoggle',
			kind: CompletionItemKind.Function,
			detail: '[attractor] attractortoggle( float value ): void',
			documentation: 'Toggle on/off.',
			insertText: 'attractortoggle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'setcamerapointvisibility',
			kind: CompletionItemKind.Function,
			detail: '[camerapoint] setcamerapointvisibility( float value ): void',
			insertText: 'setcamerapointvisibility(${0})',
			insertTextFormat: 2
		},
		{
			label: 'vacuumtoggle',
			kind: CompletionItemKind.Function,
			detail: '[vacuum separator] vacuumtoggle( float value ): void',
			documentation: '1 = block things\n0 = remove block',
			insertText: 'vacuumtoggle(${0})',
			insertTextFormat: 2
		},
		{
			label: 'loopsetactive',
			kind: CompletionItemKind.Function,
			detail: 'loopsetactive( float value ): void',
			documentation: 'idanimloop.',
			insertText: 'loopsetactive(${0})',
			insertTextFormat: 2
		},
		{
			label: 'steam_addtimestat',
			kind: CompletionItemKind.Function,
			detail: '[STEAM] steam_addtimestat( float value, float missionIndex ): float',
			insertText: 'steam_addtimestat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'steam_getglobalstat',
			kind: CompletionItemKind.Function,
			detail: '[STEAM] steam_getglobalstat( string statname ): float',
			insertText: 'steam_getglobalstat(${0})',
			insertTextFormat: 2
		},
		{
			label: 'steam_updatefriendtimes',
			kind: CompletionItemKind.Function,
			detail: '[STEAM] steam_updatefriendtimes( float missionIndex ): void',
			insertText: 'steam_updatefriendtimes(${0})',
			insertTextFormat: 2
		},
		{
			label: 'steam_setachievement',
			kind: CompletionItemKind.Function,
			detail: '[STEAM] steam_setachievement( string achievementname ): void',
			insertText: 'steam_setachievement(${0})',
			insertTextFormat: 2
		},
		/*
		- Doom Defs
		*/
		{
			label: 'GAME_FPS',
			kind: CompletionItemKind.Keyword,
			detail: ' GAME_FPS',
			documentation: ''
		},
		{
			label: 'GAME_FRAMETIME',
			kind: CompletionItemKind.Keyword,
			detail: ' GAME_FRAMETIME',
			documentation: ''
		},
		{
			label: 'NULL',
			kind: CompletionItemKind.Keyword,
			detail: ' NULL',
			documentation: ''
		},
		{
			label: 'GRAVITY_DEFAULT',
			kind: CompletionItemKind.Keyword,
			detail: ' GRAVITY_DEFAULT',
			documentation: ''
		},
		{
			label: 'JACKDISTANCE',
			kind: CompletionItemKind.Keyword,
			detail: ' JACKDISTANCE',
			documentation: ''
		},
		{
			label: 'SAFE_CAPTUREDISTANCE',
			kind: CompletionItemKind.Keyword,
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
			kind: CompletionItemKind.Keyword,
			detail: ' true',
			documentation: ''
		},
		{
			label: 'false',
			kind: CompletionItemKind.Keyword,
			detail: ' false',
			documentation: ''
		},
		{
			label: 'UP',
			kind: CompletionItemKind.Keyword,
			detail: ' UP',
			documentation: ''
		},
		{
			label: 'DOWN',
			kind: CompletionItemKind.Keyword,
			detail: ' DOWN',
			documentation: ''
		},
		{
			label: 'LEFT',
			kind: CompletionItemKind.Keyword,
			detail: ' LEFT',
			documentation: ''
		},
		{
			label: 'RIGHT',
			kind: CompletionItemKind.Keyword,
			detail: ' RIGHT',
			documentation: ''
		},
		{
			label: 'FORWARD',
			kind: CompletionItemKind.Keyword,
			detail: ' FORWARD',
			documentation: ''
		},
		{
			label: 'BACK',
			kind: CompletionItemKind.Keyword,
			detail: ' BACK',
			documentation: ''
		},
		{
			label: 'REL_UP',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_UP',
			documentation: ''
		},
		{
			label: 'REL_DOWN',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_DOWN',
			documentation: ''
		},
		{
			label: 'REL_LEFT',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_LEFT',
			documentation: ''
		},
		{
			label: 'REL_RIGHT',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_RIGHT',
			documentation: ''
		},
		{
			label: 'REL_FORWARD',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_FORWARD',
			documentation: ''
		},
		{
			label: 'REL_BACK',
			kind: CompletionItemKind.Keyword,
			detail: ' REL_BACK',
			documentation: ''
		},
		{
			label: 'EAST',
			kind: CompletionItemKind.Keyword,
			detail: ' EAST',
			documentation: ''
		},
		{
			label: 'NORTH',
			kind: CompletionItemKind.Keyword,
			detail: ' NORTH',
			documentation: ''
		},
		{
			label: 'WEST',
			kind: CompletionItemKind.Keyword,
			detail: ' WEST',
			documentation: ''
		},
		{
			label: 'SOUTH',
			kind: CompletionItemKind.Keyword,
			detail: ' SOUTH',
			documentation: ''
		},
		{
			label: 'X_AXIS',
			kind: CompletionItemKind.Keyword,
			detail: ' X_AXIS',
			documentation: ''
		},
		{
			label: 'Y_AXIS',
			kind: CompletionItemKind.Keyword,
			detail: ' Y_AXIS',
			documentation: ''
		},
		{
			label: 'Z_AXIS',
			kind: CompletionItemKind.Keyword,
			detail: ' Z_AXIS',
			documentation: ''
		},
		{
			label: 'YAW',
			kind: CompletionItemKind.Keyword,
			detail: ' YAW',
			documentation: ''
		},
		{
			label: 'PITCH',
			kind: CompletionItemKind.Keyword,
			detail: ' PITCH',
			documentation: ''
		},
		{
			label: 'ROLL',
			kind: CompletionItemKind.Keyword,
			detail: ' ROLL',
			documentation: ''
		},
		{
			label: 'M_PI',
			kind: CompletionItemKind.Keyword,
			detail: ' M_PI',
			documentation: ''
		},
		{
			label: 'DEG2RAD',
			kind: CompletionItemKind.Keyword,
			detail: ' DEG2RAD( a )',
			documentation: '( (a) * (M_PI / 180.0f ) )',
			insertText: 'DEG2RAD(${0})',
			insertTextFormat: 2
		},
		{
			label: 'RAD2DEG',
			kind: CompletionItemKind.Keyword,
			detail: ' RAD2DEG( a )',
			documentation: '( (a) * (180.0f / M_PI ) )',
			insertText: 'RAD2DEG(${0})',
			insertTextFormat: 2
		},
		{
			label: 'ALL_PARTICLES',
			kind: CompletionItemKind.Keyword,
			detail: ' ALL_PARTICLES',
			documentation: ''
		},
		{
			label: 'SIG_TOUCH',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_TOUCH',
			documentation: ''
		},
		{
			label: 'SIG_USE',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_USE',
			documentation: ''
		},
		{
			label: 'SIG_TRIGGER',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_TRIGGER',
			documentation: ''
		},
		{
			label: 'SIG_REMOVED',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_REMOVED',
			documentation: ''
		},
		{
			label: 'SIG_DAMAGE',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_DAMAGE',
			documentation: ''
		},
		{
			label: 'SIG_BLOCKED',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_BLOCKED',
			documentation: ''
		},
		{
			label: 'SIG_MOVER_POS1',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_MOVER_POS1',
			documentation: ''
		},
		{
			label: 'SIG_MOVER_POS2',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_MOVER_POS2',
			documentation: ''
		},
		{
			label: 'SIG_MOVER_1TO2',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_MOVER_1TO2',
			documentation: ''
		},
		{
			label: 'SIG_MOVER_2TO1',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_MOVER_2TO1',
			documentation: ''
		},
		{
			label: 'SIG_DOOR_CLOSED',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_DOOR_CLOSED',
			documentation: ''
		},
		{
			label: 'SIG_DOOR_OPEN',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_DOOR_OPEN',
			documentation: ''
		},
		{
			label: 'SIG_DOOR_OPENING',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_DOOR_OPENING',
			documentation: ''
		},
		{
			label: 'SIG_DOOR_CLOSING',
			kind: CompletionItemKind.Keyword,
			detail: ' SIG_DOOR_CLOSING',
			documentation: ''
		},
		{
			label: 'BUTTON_ATTACK',
			kind: CompletionItemKind.Keyword,
			detail: ' BUTTON_ATTACK',
			documentation: ''
		},
		{
			label: 'BUTTON_TALK',
			kind: CompletionItemKind.Keyword,
			detail: ' BUTTON_TALK',
			documentation: ''
		},
		{
			label: 'BUTTON_WALKING',
			kind: CompletionItemKind.Keyword,
			detail: ' BUTTON_WALKING',
			documentation: ''
		},
		{
			label: 'BUTTON_ANY',
			kind: CompletionItemKind.Keyword,
			detail: ' BUTTON_ANY',
			documentation: ''
		},
		{
			label: 'JOINTMOD_NONE',
			kind: CompletionItemKind.Keyword,
			detail: ' JOINTMOD_NONE',
			documentation: ''
		},
		{
			label: 'JOINTMOD_LOCAL',
			kind: CompletionItemKind.Keyword,
			detail: ' JOINTMOD_LOCAL',
			documentation: ''
		},
		{
			label: 'JOINTMOD_LOCAL_OVERRIDE',
			kind: CompletionItemKind.Keyword,
			detail: ' JOINTMOD_LOCAL_OVERRIDE',
			documentation: ''
		},
		{
			label: 'JOINTMOD_WORLD',
			kind: CompletionItemKind.Keyword,
			detail: ' JOINTMOD_WORLD',
			documentation: ''
		},
		{
			label: 'JOINTMOD_WORLD_OVERRIDE',
			kind: CompletionItemKind.Keyword,
			detail: ' JOINTMOD_WORLD_OVERRIDE',
			documentation: ''
		},
		{
			label: 'BIT',
			kind: CompletionItemKind.Keyword,
			detail: ' BIT( num )',
			documentation: '( 1 << ( num ) )',
			insertText: 'BIT(${0})',
			insertTextFormat: 2
		},
		{
			label: 'SHADERPARM_RED',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_RED',
			documentation: ''
		},
		{
			label: 'SHADERPARM_GREEN',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_GREEN',
			documentation: ''
		},
		{
			label: 'SHADERPARM_BLUE',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_BLUE',
			documentation: ''
		},
		{
			label: 'SHADERPARM_ALPHA',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_ALPHA',
			documentation: ''
		},
		{
			label: 'SHADERPARM_TIMESCALE',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_TIMESCALE',
			documentation: ''
		},
		{
			label: 'SHADERPARM_TIMEOFFSET',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_TIMEOFFSET',
			documentation: ''
		},
		{
			label: 'SHADERPARM_DIVERSITY',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_DIVERSITY',
			documentation: ''
		},
		{
			label: 'SHADERPARM_MODE',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_MODE',
			documentation: ''
		},
		{
			label: 'SHADERPARM_TIME_OF_DEATH',
			kind: CompletionItemKind.Keyword,
			detail: ' SHADERPARM_TIME_OF_DEATH',
			documentation: ''
		},
		{
			label: 'CONTENTS_SOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_SOLID',
			documentation: ''
		},
		{
			label: 'CONTENTS_OPAQUE',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_OPAQUE',
			documentation: ''
		},
		{
			label: 'CONTENTS_WATER',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_WATER',
			documentation: ''
		},
		{
			label: 'CONTENTS_PLAYERCLIP',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_PLAYERCLIP',
			documentation: ''
		},
		{
			label: 'CONTENTS_MONSTERCLIP',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_MONSTERCLIP',
			documentation: ''
		},
		{
			label: 'CONTENTS_MOVEABLECLIP',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_MOVEABLECLIP',
			documentation: ''
		},
		{
			label: 'CONTENTS_IKCLIP',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_IKCLIP',
			documentation: ''
		},
		{
			label: 'CONTENTS_BLOOD',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_BLOOD',
			documentation: ''
		},
		{
			label: 'CONTENTS_BODY',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_BODY',
			documentation: ''
		},
		{
			label: 'CONTENTS_PROJECTILE',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_PROJECTILE',
			documentation: ''
		},
		{
			label: 'CONTENTS_CORPSE',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_CORPSE',
			documentation: ''
		},
		{
			label: 'CONTENTS_RENDERMODEL',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_RENDERMODEL',
			documentation: ''
		},
		{
			label: 'CONTENTS_TRIGGER',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_TRIGGER',
			documentation: ''
		},
		{
			label: 'CONTENTS_AAS_SOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_AAS_SOLID',
			documentation: ''
		},
		{
			label: 'CONTENTS_AAS_OBSTACLE',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_AAS_OBSTACLE',
			documentation: ''
		},
		{
			label: 'CONTENTS_FLASHLIGHT_TRIGGER',
			kind: CompletionItemKind.Keyword,
			detail: ' CONTENTS_FLASHLIGHT_TRIGGER',
			documentation: ''
		},
		{
			label: 'MASK_ALL',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_ALL',
			documentation: ''
		},
		{
			label: 'MASK_SOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_SOLID',
			documentation: ''
		},
		{
			label: 'MASK_MONSTERSOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_MONSTERSOLID',
			documentation: ''
		},
		{
			label: 'MASK_PLAYERSOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_PLAYERSOLID',
			documentation: ''
		},
		{
			label: 'MASK_DEADSOLID',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_DEADSOLID',
			documentation: ''
		},
		{
			label: 'MASK_WATER',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_WATER',
			documentation: ''
		},
		{
			label: 'MASK_OPAQUE',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_OPAQUE',
			documentation: ''
		},
		{
			label: 'MASK_SHOT_RENDERMODEL',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_SHOT_RENDERMODEL',
			documentation: ''
		},
		{
			label: 'MASK_SHOT_BOUNDINGBOX',
			kind: CompletionItemKind.Keyword,
			detail: ' MASK_SHOT_BOUNDINGBOX',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_ANY',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_ANY',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_VOICE',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_VOICE',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_VOICE2',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_VOICE2',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_BODY',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_BODY',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_BODY2',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_BODY2',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_BODY3',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_BODY3',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_WEAPON',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_WEAPON',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_ITEM',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_ITEM',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_HEART',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_HEART',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_PDA',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_PDA',
			documentation: ''
		},
		{
			label: 'SND_CHANNEL_DEMONIC',
			kind: CompletionItemKind.Keyword,
			detail: ' SND_CHANNEL_DEMONIC',
			documentation: ''
		},
		{
			label: 'ANIMCHANNEL_ALL',
			kind: CompletionItemKind.Keyword,
			detail: ' ANIMCHANNEL_ALL',
			documentation: ''
		},
		{
			label: 'ANIMCHANNEL_TORSO',
			kind: CompletionItemKind.Keyword,
			detail: ' ANIMCHANNEL_TORSO',
			documentation: ''
		},
		{
			label: 'ANIMCHANNEL_LEGS',
			kind: CompletionItemKind.Keyword,
			detail: ' ANIMCHANNEL_LEGS',
			documentation: ''
		},
		{
			label: 'ANIMCHANNEL_HEAD',
			kind: CompletionItemKind.Keyword,
			detail: ' ANIMCHANNEL_HEAD',
			documentation: ''
		},
		{
			label: 'ANIMCHANNEL_EYELIDS',
			kind: CompletionItemKind.Keyword,
			detail: ' ANIMCHANNEL_EYELIDS',
			documentation: ''
		},
		{
			label: 'PROJECTILE_SPAWNED',
			kind: CompletionItemKind.Keyword,
			detail: ' PROJECTILE_SPAWNED',
			documentation: ''
		},
		{
			label: 'PROJECTILE_CREATED',
			kind: CompletionItemKind.Keyword,
			detail: ' PROJECTILE_CREATED',
			documentation: ''
		},
		{
			label: 'PROJECTILE_LAUNCHED',
			kind: CompletionItemKind.Keyword,
			detail: ' PROJECTILE_LAUNCHED',
			documentation: ''
		},
		{
			label: 'PROJECTILE_FIZZLED',
			kind: CompletionItemKind.Keyword,
			detail: ' PROJECTILE_FIZZLED',
			documentation: ''
		},
		{
			label: 'PROJECTILE_EXPLODED',
			kind: CompletionItemKind.Keyword,
			detail: ' PROJECTILE_EXPLODED',
			documentation: ''
		},
		{
			label: 'eachFrame',
			kind: CompletionItemKind.Keyword,
			detail: ' eachFrame',
			documentation: ''
		},
		{
			label: 'waitUntil',
			kind: CompletionItemKind.Keyword,
			detail: ' waitUntil( x )',
			documentation: 'while( !( x ) ) { waitFrame(); }',
			insertText: 'waitUntil(${0})',
			insertTextFormat: 2
		},
		{
			label: 'BERSERK',
			kind: CompletionItemKind.Keyword,
			detail: ' BERSERK',
			documentation: ''
		},
		{
			label: 'INVISIBILITY',
			kind: CompletionItemKind.Keyword,
			detail: ' INVISIBILITY',
			documentation: ''
		},
		{
			label: 'MEGAHEALTH',
			kind: CompletionItemKind.Keyword,
			detail: ' MEGAHEALTH',
			documentation: ''
		},
		{
			label: 'ADRENALINE',
			kind: CompletionItemKind.Keyword,
			detail: ' ADRENALINE',
			documentation: ''
		},
		{
			label: 'INVULNERABILITY',
			kind: CompletionItemKind.Keyword,
			detail: ' INVULNERABILITY',
			documentation: ''
		},
		{
			label: 'HELLTIME',
			kind: CompletionItemKind.Keyword,
			detail: ' HELLTIME',
			documentation: ''
		},
		{
			label: 'ENVIROSUIT',
			kind: CompletionItemKind.Keyword,
			detail: ' ENVIROSUIT',
			documentation: ''
		},
		{
			label: 'ENVIROTIME',
			kind: CompletionItemKind.Keyword,
			detail: ' ENVIROTIME',
			documentation: ''
		}
	]
});

// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
	if (item.data === 1) {
		item.detail = 'TypeScript details',
			item.documentation = 'TypeScript documentation'
	} else if (item.data === 2) {
		item.detail = 'JavaScript details',
			item.documentation = 'JavaScript documentation'
	} else if (item.data === 3) {
		item.detail = 'FyreScript details',
			item.documentation = 'FyreScript documentation'
	}
	return item;
});

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`);
});
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Listen on the connection
connection.listen();
