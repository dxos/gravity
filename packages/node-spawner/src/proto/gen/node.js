/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.dxos = (function() {

    /**
     * Namespace dxos.
     * @exports dxos
     * @namespace
     */
    var dxos = {};

    dxos.node = (function() {

        /**
         * Namespace node.
         * @memberof dxos
         * @namespace
         */
        var node = {};

        node.NodeCommand = (function() {

            /**
             * Properties of a NodeCommand.
             * @memberof dxos.node
             * @interface INodeCommand
             * @property {google.protobuf.IAny|null} [command] NodeCommand command
             */

            /**
             * Constructs a new NodeCommand.
             * @memberof dxos.node
             * @classdesc Represents a NodeCommand.
             * @implements INodeCommand
             * @constructor
             * @param {dxos.node.INodeCommand=} [properties] Properties to set
             */
            function NodeCommand(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NodeCommand command.
             * @member {google.protobuf.IAny|null|undefined} command
             * @memberof dxos.node.NodeCommand
             * @instance
             */
            NodeCommand.prototype.command = null;

            /**
             * Creates a new NodeCommand instance using the specified properties.
             * @function create
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {dxos.node.INodeCommand=} [properties] Properties to set
             * @returns {dxos.node.NodeCommand} NodeCommand instance
             */
            NodeCommand.create = function create(properties) {
                return new NodeCommand(properties);
            };

            /**
             * Encodes the specified NodeCommand message. Does not implicitly {@link dxos.node.NodeCommand.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {dxos.node.INodeCommand} message NodeCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                    $root.google.protobuf.Any.encode(message.command, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified NodeCommand message, length delimited. Does not implicitly {@link dxos.node.NodeCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {dxos.node.INodeCommand} message NodeCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NodeCommand message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.NodeCommand} NodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeCommand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.NodeCommand();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.command = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NodeCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.NodeCommand} NodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NodeCommand message.
             * @function verify
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NodeCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.command != null && message.hasOwnProperty("command")) {
                    var error = $root.google.protobuf.Any.verify(message.command);
                    if (error)
                        return "command." + error;
                }
                return null;
            };

            /**
             * Creates a NodeCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.NodeCommand} NodeCommand
             */
            NodeCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.NodeCommand)
                    return object;
                var message = new $root.dxos.node.NodeCommand();
                if (object.command != null) {
                    if (typeof object.command !== "object")
                        throw TypeError(".dxos.node.NodeCommand.command: object expected");
                    message.command = $root.google.protobuf.Any.fromObject(object.command);
                }
                return message;
            };

            /**
             * Creates a plain object from a NodeCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.NodeCommand
             * @static
             * @param {dxos.node.NodeCommand} message NodeCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NodeCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.command = null;
                if (message.command != null && message.hasOwnProperty("command"))
                    object.command = $root.google.protobuf.Any.toObject(message.command, options);
                return object;
            };

            /**
             * Converts this NodeCommand to JSON.
             * @function toJSON
             * @memberof dxos.node.NodeCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NodeCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NodeCommand;
        })();

        node.EventCommand = (function() {

            /**
             * Properties of an EventCommand.
             * @memberof dxos.node
             * @interface IEventCommand
             * @property {string|null} [event] EventCommand event
             */

            /**
             * Constructs a new EventCommand.
             * @memberof dxos.node
             * @classdesc Represents an EventCommand.
             * @implements IEventCommand
             * @constructor
             * @param {dxos.node.IEventCommand=} [properties] Properties to set
             */
            function EventCommand(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EventCommand event.
             * @member {string} event
             * @memberof dxos.node.EventCommand
             * @instance
             */
            EventCommand.prototype.event = "";

            /**
             * Creates a new EventCommand instance using the specified properties.
             * @function create
             * @memberof dxos.node.EventCommand
             * @static
             * @param {dxos.node.IEventCommand=} [properties] Properties to set
             * @returns {dxos.node.EventCommand} EventCommand instance
             */
            EventCommand.create = function create(properties) {
                return new EventCommand(properties);
            };

            /**
             * Encodes the specified EventCommand message. Does not implicitly {@link dxos.node.EventCommand.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.EventCommand
             * @static
             * @param {dxos.node.IEventCommand} message EventCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EventCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.event);
                return writer;
            };

            /**
             * Encodes the specified EventCommand message, length delimited. Does not implicitly {@link dxos.node.EventCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.EventCommand
             * @static
             * @param {dxos.node.IEventCommand} message EventCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EventCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EventCommand message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.EventCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.EventCommand} EventCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EventCommand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.EventCommand();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.event = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an EventCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.EventCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.EventCommand} EventCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EventCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an EventCommand message.
             * @function verify
             * @memberof dxos.node.EventCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EventCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.event != null && message.hasOwnProperty("event"))
                    if (!$util.isString(message.event))
                        return "event: string expected";
                return null;
            };

            /**
             * Creates an EventCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.EventCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.EventCommand} EventCommand
             */
            EventCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.EventCommand)
                    return object;
                var message = new $root.dxos.node.EventCommand();
                if (object.event != null)
                    message.event = String(object.event);
                return message;
            };

            /**
             * Creates a plain object from an EventCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.EventCommand
             * @static
             * @param {dxos.node.EventCommand} message EventCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EventCommand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.event = "";
                if (message.event != null && message.hasOwnProperty("event"))
                    object.event = message.event;
                return object;
            };

            /**
             * Converts this EventCommand to JSON.
             * @function toJSON
             * @memberof dxos.node.EventCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EventCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EventCommand;
        })();

        node.SnapshotCommand = (function() {

            /**
             * Properties of a SnapshotCommand.
             * @memberof dxos.node
             * @interface ISnapshotCommand
             */

            /**
             * Constructs a new SnapshotCommand.
             * @memberof dxos.node
             * @classdesc Represents a SnapshotCommand.
             * @implements ISnapshotCommand
             * @constructor
             * @param {dxos.node.ISnapshotCommand=} [properties] Properties to set
             */
            function SnapshotCommand(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new SnapshotCommand instance using the specified properties.
             * @function create
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {dxos.node.ISnapshotCommand=} [properties] Properties to set
             * @returns {dxos.node.SnapshotCommand} SnapshotCommand instance
             */
            SnapshotCommand.create = function create(properties) {
                return new SnapshotCommand(properties);
            };

            /**
             * Encodes the specified SnapshotCommand message. Does not implicitly {@link dxos.node.SnapshotCommand.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {dxos.node.ISnapshotCommand} message SnapshotCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SnapshotCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified SnapshotCommand message, length delimited. Does not implicitly {@link dxos.node.SnapshotCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {dxos.node.ISnapshotCommand} message SnapshotCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SnapshotCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SnapshotCommand message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.SnapshotCommand} SnapshotCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SnapshotCommand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.SnapshotCommand();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SnapshotCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.SnapshotCommand} SnapshotCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SnapshotCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SnapshotCommand message.
             * @function verify
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SnapshotCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a SnapshotCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.SnapshotCommand} SnapshotCommand
             */
            SnapshotCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.SnapshotCommand)
                    return object;
                return new $root.dxos.node.SnapshotCommand();
            };

            /**
             * Creates a plain object from a SnapshotCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.SnapshotCommand
             * @static
             * @param {dxos.node.SnapshotCommand} message SnapshotCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SnapshotCommand.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this SnapshotCommand to JSON.
             * @function toJSON
             * @memberof dxos.node.SnapshotCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SnapshotCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SnapshotCommand;
        })();

        node.NodeEvent = (function() {

            /**
             * Properties of a NodeEvent.
             * @memberof dxos.node
             * @interface INodeEvent
             * @property {number|null} [timestamp] NodeEvent timestamp
             * @property {google.protobuf.IAny|null} [event] NodeEvent event
             */

            /**
             * Constructs a new NodeEvent.
             * @memberof dxos.node
             * @classdesc Represents a NodeEvent.
             * @implements INodeEvent
             * @constructor
             * @param {dxos.node.INodeEvent=} [properties] Properties to set
             */
            function NodeEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NodeEvent timestamp.
             * @member {number} timestamp
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.timestamp = 0;

            /**
             * NodeEvent event.
             * @member {google.protobuf.IAny|null|undefined} event
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.event = null;

            /**
             * Creates a new NodeEvent instance using the specified properties.
             * @function create
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {dxos.node.INodeEvent=} [properties] Properties to set
             * @returns {dxos.node.NodeEvent} NodeEvent instance
             */
            NodeEvent.create = function create(properties) {
                return new NodeEvent(properties);
            };

            /**
             * Encodes the specified NodeEvent message. Does not implicitly {@link dxos.node.NodeEvent.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {dxos.node.INodeEvent} message NodeEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.timestamp);
                if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                    $root.google.protobuf.Any.encode(message.event, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified NodeEvent message, length delimited. Does not implicitly {@link dxos.node.NodeEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {dxos.node.INodeEvent} message NodeEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NodeEvent message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.NodeEvent} NodeEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.NodeEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.timestamp = reader.uint32();
                        break;
                    case 2:
                        message.event = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NodeEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.NodeEvent} NodeEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NodeEvent message.
             * @function verify
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NodeEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp))
                        return "timestamp: integer expected";
                if (message.event != null && message.hasOwnProperty("event")) {
                    var error = $root.google.protobuf.Any.verify(message.event);
                    if (error)
                        return "event." + error;
                }
                return null;
            };

            /**
             * Creates a NodeEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.NodeEvent} NodeEvent
             */
            NodeEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.NodeEvent)
                    return object;
                var message = new $root.dxos.node.NodeEvent();
                if (object.timestamp != null)
                    message.timestamp = object.timestamp >>> 0;
                if (object.event != null) {
                    if (typeof object.event !== "object")
                        throw TypeError(".dxos.node.NodeEvent.event: object expected");
                    message.event = $root.google.protobuf.Any.fromObject(object.event);
                }
                return message;
            };

            /**
             * Creates a plain object from a NodeEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.NodeEvent
             * @static
             * @param {dxos.node.NodeEvent} message NodeEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NodeEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.timestamp = 0;
                    object.event = null;
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = message.timestamp;
                if (message.event != null && message.hasOwnProperty("event"))
                    object.event = $root.google.protobuf.Any.toObject(message.event, options);
                return object;
            };

            /**
             * Converts this NodeEvent to JSON.
             * @function toJSON
             * @memberof dxos.node.NodeEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NodeEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NodeEvent;
        })();

        node.LogEvent = (function() {

            /**
             * Properties of a LogEvent.
             * @memberof dxos.node
             * @interface ILogEvent
             * @property {string|null} [event] LogEvent event
             */

            /**
             * Constructs a new LogEvent.
             * @memberof dxos.node
             * @classdesc Represents a LogEvent.
             * @implements ILogEvent
             * @constructor
             * @param {dxos.node.ILogEvent=} [properties] Properties to set
             */
            function LogEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LogEvent event.
             * @member {string} event
             * @memberof dxos.node.LogEvent
             * @instance
             */
            LogEvent.prototype.event = "";

            /**
             * Creates a new LogEvent instance using the specified properties.
             * @function create
             * @memberof dxos.node.LogEvent
             * @static
             * @param {dxos.node.ILogEvent=} [properties] Properties to set
             * @returns {dxos.node.LogEvent} LogEvent instance
             */
            LogEvent.create = function create(properties) {
                return new LogEvent(properties);
            };

            /**
             * Encodes the specified LogEvent message. Does not implicitly {@link dxos.node.LogEvent.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.LogEvent
             * @static
             * @param {dxos.node.ILogEvent} message LogEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.event);
                return writer;
            };

            /**
             * Encodes the specified LogEvent message, length delimited. Does not implicitly {@link dxos.node.LogEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.LogEvent
             * @static
             * @param {dxos.node.ILogEvent} message LogEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LogEvent message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.LogEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.LogEvent} LogEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LogEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.LogEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.event = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LogEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.LogEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.LogEvent} LogEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LogEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LogEvent message.
             * @function verify
             * @memberof dxos.node.LogEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LogEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.event != null && message.hasOwnProperty("event"))
                    if (!$util.isString(message.event))
                        return "event: string expected";
                return null;
            };

            /**
             * Creates a LogEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.LogEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.LogEvent} LogEvent
             */
            LogEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.LogEvent)
                    return object;
                var message = new $root.dxos.node.LogEvent();
                if (object.event != null)
                    message.event = String(object.event);
                return message;
            };

            /**
             * Creates a plain object from a LogEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.LogEvent
             * @static
             * @param {dxos.node.LogEvent} message LogEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LogEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.event = "";
                if (message.event != null && message.hasOwnProperty("event"))
                    object.event = message.event;
                return object;
            };

            /**
             * Converts this LogEvent to JSON.
             * @function toJSON
             * @memberof dxos.node.LogEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LogEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LogEvent;
        })();

        node.SnapshotEvent = (function() {

            /**
             * Properties of a SnapshotEvent.
             * @memberof dxos.node
             * @interface ISnapshotEvent
             * @property {string|null} [data] SnapshotEvent data
             */

            /**
             * Constructs a new SnapshotEvent.
             * @memberof dxos.node
             * @classdesc Represents a SnapshotEvent.
             * @implements ISnapshotEvent
             * @constructor
             * @param {dxos.node.ISnapshotEvent=} [properties] Properties to set
             */
            function SnapshotEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SnapshotEvent data.
             * @member {string} data
             * @memberof dxos.node.SnapshotEvent
             * @instance
             */
            SnapshotEvent.prototype.data = "";

            /**
             * Creates a new SnapshotEvent instance using the specified properties.
             * @function create
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {dxos.node.ISnapshotEvent=} [properties] Properties to set
             * @returns {dxos.node.SnapshotEvent} SnapshotEvent instance
             */
            SnapshotEvent.create = function create(properties) {
                return new SnapshotEvent(properties);
            };

            /**
             * Encodes the specified SnapshotEvent message. Does not implicitly {@link dxos.node.SnapshotEvent.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {dxos.node.ISnapshotEvent} message SnapshotEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SnapshotEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.data);
                return writer;
            };

            /**
             * Encodes the specified SnapshotEvent message, length delimited. Does not implicitly {@link dxos.node.SnapshotEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {dxos.node.ISnapshotEvent} message SnapshotEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SnapshotEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SnapshotEvent message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.SnapshotEvent} SnapshotEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SnapshotEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.SnapshotEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SnapshotEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.SnapshotEvent} SnapshotEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SnapshotEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SnapshotEvent message.
             * @function verify
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SnapshotEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!$util.isString(message.data))
                        return "data: string expected";
                return null;
            };

            /**
             * Creates a SnapshotEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.SnapshotEvent} SnapshotEvent
             */
            SnapshotEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.SnapshotEvent)
                    return object;
                var message = new $root.dxos.node.SnapshotEvent();
                if (object.data != null)
                    message.data = String(object.data);
                return message;
            };

            /**
             * Creates a plain object from a SnapshotEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.SnapshotEvent
             * @static
             * @param {dxos.node.SnapshotEvent} message SnapshotEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SnapshotEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.data = "";
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = message.data;
                return object;
            };

            /**
             * Converts this SnapshotEvent to JSON.
             * @function toJSON
             * @memberof dxos.node.SnapshotEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SnapshotEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SnapshotEvent;
        })();

        return node;
    })();

    return dxos;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
