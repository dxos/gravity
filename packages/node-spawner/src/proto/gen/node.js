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
             * @property {dxos.node.IEventCommand|null} [event] NodeCommand event
             * @property {dxos.node.ISnapshotCommand|null} [snapshot] NodeCommand snapshot
             * @property {dxos.node.IDestroyCommand|null} [destroy] NodeCommand destroy
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
             * NodeCommand event.
             * @member {dxos.node.IEventCommand|null|undefined} event
             * @memberof dxos.node.NodeCommand
             * @instance
             */
            NodeCommand.prototype.event = null;

            /**
             * NodeCommand snapshot.
             * @member {dxos.node.ISnapshotCommand|null|undefined} snapshot
             * @memberof dxos.node.NodeCommand
             * @instance
             */
            NodeCommand.prototype.snapshot = null;

            /**
             * NodeCommand destroy.
             * @member {dxos.node.IDestroyCommand|null|undefined} destroy
             * @memberof dxos.node.NodeCommand
             * @instance
             */
            NodeCommand.prototype.destroy = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * NodeCommand command.
             * @member {"event"|"snapshot"|"destroy"|undefined} command
             * @memberof dxos.node.NodeCommand
             * @instance
             */
            Object.defineProperty(NodeCommand.prototype, "command", {
                get: $util.oneOfGetter($oneOfFields = ["event", "snapshot", "destroy"]),
                set: $util.oneOfSetter($oneOfFields)
            });

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
                if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                    $root.dxos.node.EventCommand.encode(message.event, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.snapshot != null && Object.hasOwnProperty.call(message, "snapshot"))
                    $root.dxos.node.SnapshotCommand.encode(message.snapshot, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.destroy != null && Object.hasOwnProperty.call(message, "destroy"))
                    $root.dxos.node.DestroyCommand.encode(message.destroy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
                        message.event = $root.dxos.node.EventCommand.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.snapshot = $root.dxos.node.SnapshotCommand.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.destroy = $root.dxos.node.DestroyCommand.decode(reader, reader.uint32());
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
                var properties = {};
                if (message.event != null && message.hasOwnProperty("event")) {
                    properties.command = 1;
                    {
                        var error = $root.dxos.node.EventCommand.verify(message.event);
                        if (error)
                            return "event." + error;
                    }
                }
                if (message.snapshot != null && message.hasOwnProperty("snapshot")) {
                    if (properties.command === 1)
                        return "command: multiple values";
                    properties.command = 1;
                    {
                        var error = $root.dxos.node.SnapshotCommand.verify(message.snapshot);
                        if (error)
                            return "snapshot." + error;
                    }
                }
                if (message.destroy != null && message.hasOwnProperty("destroy")) {
                    if (properties.command === 1)
                        return "command: multiple values";
                    properties.command = 1;
                    {
                        var error = $root.dxos.node.DestroyCommand.verify(message.destroy);
                        if (error)
                            return "destroy." + error;
                    }
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
                if (object.event != null) {
                    if (typeof object.event !== "object")
                        throw TypeError(".dxos.node.NodeCommand.event: object expected");
                    message.event = $root.dxos.node.EventCommand.fromObject(object.event);
                }
                if (object.snapshot != null) {
                    if (typeof object.snapshot !== "object")
                        throw TypeError(".dxos.node.NodeCommand.snapshot: object expected");
                    message.snapshot = $root.dxos.node.SnapshotCommand.fromObject(object.snapshot);
                }
                if (object.destroy != null) {
                    if (typeof object.destroy !== "object")
                        throw TypeError(".dxos.node.NodeCommand.destroy: object expected");
                    message.destroy = $root.dxos.node.DestroyCommand.fromObject(object.destroy);
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
                if (message.event != null && message.hasOwnProperty("event")) {
                    object.event = $root.dxos.node.EventCommand.toObject(message.event, options);
                    if (options.oneofs)
                        object.command = "event";
                }
                if (message.snapshot != null && message.hasOwnProperty("snapshot")) {
                    object.snapshot = $root.dxos.node.SnapshotCommand.toObject(message.snapshot, options);
                    if (options.oneofs)
                        object.command = "snapshot";
                }
                if (message.destroy != null && message.hasOwnProperty("destroy")) {
                    object.destroy = $root.dxos.node.DestroyCommand.toObject(message.destroy, options);
                    if (options.oneofs)
                        object.command = "destroy";
                }
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

        node.DestroyCommand = (function() {

            /**
             * Properties of a DestroyCommand.
             * @memberof dxos.node
             * @interface IDestroyCommand
             */

            /**
             * Constructs a new DestroyCommand.
             * @memberof dxos.node
             * @classdesc Represents a DestroyCommand.
             * @implements IDestroyCommand
             * @constructor
             * @param {dxos.node.IDestroyCommand=} [properties] Properties to set
             */
            function DestroyCommand(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new DestroyCommand instance using the specified properties.
             * @function create
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {dxos.node.IDestroyCommand=} [properties] Properties to set
             * @returns {dxos.node.DestroyCommand} DestroyCommand instance
             */
            DestroyCommand.create = function create(properties) {
                return new DestroyCommand(properties);
            };

            /**
             * Encodes the specified DestroyCommand message. Does not implicitly {@link dxos.node.DestroyCommand.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {dxos.node.IDestroyCommand} message DestroyCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DestroyCommand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified DestroyCommand message, length delimited. Does not implicitly {@link dxos.node.DestroyCommand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {dxos.node.IDestroyCommand} message DestroyCommand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DestroyCommand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DestroyCommand message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.DestroyCommand} DestroyCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DestroyCommand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.DestroyCommand();
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
             * Decodes a DestroyCommand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.DestroyCommand} DestroyCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DestroyCommand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DestroyCommand message.
             * @function verify
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DestroyCommand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a DestroyCommand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.DestroyCommand} DestroyCommand
             */
            DestroyCommand.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.DestroyCommand)
                    return object;
                return new $root.dxos.node.DestroyCommand();
            };

            /**
             * Creates a plain object from a DestroyCommand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.DestroyCommand
             * @static
             * @param {dxos.node.DestroyCommand} message DestroyCommand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DestroyCommand.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this DestroyCommand to JSON.
             * @function toJSON
             * @memberof dxos.node.DestroyCommand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DestroyCommand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DestroyCommand;
        })();

        node.NodeEvent = (function() {

            /**
             * Properties of a NodeEvent.
             * @memberof dxos.node
             * @interface INodeEvent
             * @property {number|null} [timestamp] NodeEvent timestamp
             * @property {dxos.node.IReadyEvent|null} [ready] NodeEvent ready
             * @property {dxos.node.ILogEvent|null} [log] NodeEvent log
             * @property {dxos.node.ISnapshotEvent|null} [snapshot] NodeEvent snapshot
             * @property {dxos.node.IMetricsUpdateEvent|null} [metricsUpdate] NodeEvent metricsUpdate
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
             * NodeEvent ready.
             * @member {dxos.node.IReadyEvent|null|undefined} ready
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.ready = null;

            /**
             * NodeEvent log.
             * @member {dxos.node.ILogEvent|null|undefined} log
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.log = null;

            /**
             * NodeEvent snapshot.
             * @member {dxos.node.ISnapshotEvent|null|undefined} snapshot
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.snapshot = null;

            /**
             * NodeEvent metricsUpdate.
             * @member {dxos.node.IMetricsUpdateEvent|null|undefined} metricsUpdate
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            NodeEvent.prototype.metricsUpdate = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * NodeEvent event.
             * @member {"ready"|"log"|"snapshot"|"metricsUpdate"|undefined} event
             * @memberof dxos.node.NodeEvent
             * @instance
             */
            Object.defineProperty(NodeEvent.prototype, "event", {
                get: $util.oneOfGetter($oneOfFields = ["ready", "log", "snapshot", "metricsUpdate"]),
                set: $util.oneOfSetter($oneOfFields)
            });

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
                if (message.ready != null && Object.hasOwnProperty.call(message, "ready"))
                    $root.dxos.node.ReadyEvent.encode(message.ready, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.log != null && Object.hasOwnProperty.call(message, "log"))
                    $root.dxos.node.LogEvent.encode(message.log, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.snapshot != null && Object.hasOwnProperty.call(message, "snapshot"))
                    $root.dxos.node.SnapshotEvent.encode(message.snapshot, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.metricsUpdate != null && Object.hasOwnProperty.call(message, "metricsUpdate"))
                    $root.dxos.node.MetricsUpdateEvent.encode(message.metricsUpdate, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
                        message.ready = $root.dxos.node.ReadyEvent.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.log = $root.dxos.node.LogEvent.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.snapshot = $root.dxos.node.SnapshotEvent.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.metricsUpdate = $root.dxos.node.MetricsUpdateEvent.decode(reader, reader.uint32());
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
                var properties = {};
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp))
                        return "timestamp: integer expected";
                if (message.ready != null && message.hasOwnProperty("ready")) {
                    properties.event = 1;
                    {
                        var error = $root.dxos.node.ReadyEvent.verify(message.ready);
                        if (error)
                            return "ready." + error;
                    }
                }
                if (message.log != null && message.hasOwnProperty("log")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.dxos.node.LogEvent.verify(message.log);
                        if (error)
                            return "log." + error;
                    }
                }
                if (message.snapshot != null && message.hasOwnProperty("snapshot")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.dxos.node.SnapshotEvent.verify(message.snapshot);
                        if (error)
                            return "snapshot." + error;
                    }
                }
                if (message.metricsUpdate != null && message.hasOwnProperty("metricsUpdate")) {
                    if (properties.event === 1)
                        return "event: multiple values";
                    properties.event = 1;
                    {
                        var error = $root.dxos.node.MetricsUpdateEvent.verify(message.metricsUpdate);
                        if (error)
                            return "metricsUpdate." + error;
                    }
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
                if (object.ready != null) {
                    if (typeof object.ready !== "object")
                        throw TypeError(".dxos.node.NodeEvent.ready: object expected");
                    message.ready = $root.dxos.node.ReadyEvent.fromObject(object.ready);
                }
                if (object.log != null) {
                    if (typeof object.log !== "object")
                        throw TypeError(".dxos.node.NodeEvent.log: object expected");
                    message.log = $root.dxos.node.LogEvent.fromObject(object.log);
                }
                if (object.snapshot != null) {
                    if (typeof object.snapshot !== "object")
                        throw TypeError(".dxos.node.NodeEvent.snapshot: object expected");
                    message.snapshot = $root.dxos.node.SnapshotEvent.fromObject(object.snapshot);
                }
                if (object.metricsUpdate != null) {
                    if (typeof object.metricsUpdate !== "object")
                        throw TypeError(".dxos.node.NodeEvent.metricsUpdate: object expected");
                    message.metricsUpdate = $root.dxos.node.MetricsUpdateEvent.fromObject(object.metricsUpdate);
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
                if (options.defaults)
                    object.timestamp = 0;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = message.timestamp;
                if (message.ready != null && message.hasOwnProperty("ready")) {
                    object.ready = $root.dxos.node.ReadyEvent.toObject(message.ready, options);
                    if (options.oneofs)
                        object.event = "ready";
                }
                if (message.log != null && message.hasOwnProperty("log")) {
                    object.log = $root.dxos.node.LogEvent.toObject(message.log, options);
                    if (options.oneofs)
                        object.event = "log";
                }
                if (message.snapshot != null && message.hasOwnProperty("snapshot")) {
                    object.snapshot = $root.dxos.node.SnapshotEvent.toObject(message.snapshot, options);
                    if (options.oneofs)
                        object.event = "snapshot";
                }
                if (message.metricsUpdate != null && message.hasOwnProperty("metricsUpdate")) {
                    object.metricsUpdate = $root.dxos.node.MetricsUpdateEvent.toObject(message.metricsUpdate, options);
                    if (options.oneofs)
                        object.event = "metricsUpdate";
                }
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

        node.ReadyEvent = (function() {

            /**
             * Properties of a ReadyEvent.
             * @memberof dxos.node
             * @interface IReadyEvent
             */

            /**
             * Constructs a new ReadyEvent.
             * @memberof dxos.node
             * @classdesc Represents a ReadyEvent.
             * @implements IReadyEvent
             * @constructor
             * @param {dxos.node.IReadyEvent=} [properties] Properties to set
             */
            function ReadyEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new ReadyEvent instance using the specified properties.
             * @function create
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {dxos.node.IReadyEvent=} [properties] Properties to set
             * @returns {dxos.node.ReadyEvent} ReadyEvent instance
             */
            ReadyEvent.create = function create(properties) {
                return new ReadyEvent(properties);
            };

            /**
             * Encodes the specified ReadyEvent message. Does not implicitly {@link dxos.node.ReadyEvent.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {dxos.node.IReadyEvent} message ReadyEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadyEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified ReadyEvent message, length delimited. Does not implicitly {@link dxos.node.ReadyEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {dxos.node.IReadyEvent} message ReadyEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadyEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReadyEvent message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.ReadyEvent} ReadyEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadyEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.ReadyEvent();
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
             * Decodes a ReadyEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.ReadyEvent} ReadyEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadyEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReadyEvent message.
             * @function verify
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReadyEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a ReadyEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.ReadyEvent} ReadyEvent
             */
            ReadyEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.ReadyEvent)
                    return object;
                return new $root.dxos.node.ReadyEvent();
            };

            /**
             * Creates a plain object from a ReadyEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.ReadyEvent
             * @static
             * @param {dxos.node.ReadyEvent} message ReadyEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReadyEvent.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ReadyEvent to JSON.
             * @function toJSON
             * @memberof dxos.node.ReadyEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReadyEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ReadyEvent;
        })();

        node.LogEvent = (function() {

            /**
             * Properties of a LogEvent.
             * @memberof dxos.node
             * @interface ILogEvent
             * @property {string|null} [eventName] LogEvent eventName
             * @property {string|null} [details] LogEvent details
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
             * LogEvent eventName.
             * @member {string} eventName
             * @memberof dxos.node.LogEvent
             * @instance
             */
            LogEvent.prototype.eventName = "";

            /**
             * LogEvent details.
             * @member {string} details
             * @memberof dxos.node.LogEvent
             * @instance
             */
            LogEvent.prototype.details = "";

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
                if (message.eventName != null && Object.hasOwnProperty.call(message, "eventName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.eventName);
                if (message.details != null && Object.hasOwnProperty.call(message, "details"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.details);
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
                        message.eventName = reader.string();
                        break;
                    case 2:
                        message.details = reader.string();
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
                if (message.eventName != null && message.hasOwnProperty("eventName"))
                    if (!$util.isString(message.eventName))
                        return "eventName: string expected";
                if (message.details != null && message.hasOwnProperty("details"))
                    if (!$util.isString(message.details))
                        return "details: string expected";
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
                if (object.eventName != null)
                    message.eventName = String(object.eventName);
                if (object.details != null)
                    message.details = String(object.details);
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
                if (options.defaults) {
                    object.eventName = "";
                    object.details = "";
                }
                if (message.eventName != null && message.hasOwnProperty("eventName"))
                    object.eventName = message.eventName;
                if (message.details != null && message.hasOwnProperty("details"))
                    object.details = message.details;
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

        node.MetricsUpdateEvent = (function() {

            /**
             * Properties of a MetricsUpdateEvent.
             * @memberof dxos.node
             * @interface IMetricsUpdateEvent
             * @property {string|null} [key] MetricsUpdateEvent key
             * @property {dxos.node.MetricsUpdateEvent.IValue|null} [value] MetricsUpdateEvent value
             */

            /**
             * Constructs a new MetricsUpdateEvent.
             * @memberof dxos.node
             * @classdesc Represents a MetricsUpdateEvent.
             * @implements IMetricsUpdateEvent
             * @constructor
             * @param {dxos.node.IMetricsUpdateEvent=} [properties] Properties to set
             */
            function MetricsUpdateEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MetricsUpdateEvent key.
             * @member {string} key
             * @memberof dxos.node.MetricsUpdateEvent
             * @instance
             */
            MetricsUpdateEvent.prototype.key = "";

            /**
             * MetricsUpdateEvent value.
             * @member {dxos.node.MetricsUpdateEvent.IValue|null|undefined} value
             * @memberof dxos.node.MetricsUpdateEvent
             * @instance
             */
            MetricsUpdateEvent.prototype.value = null;

            /**
             * Creates a new MetricsUpdateEvent instance using the specified properties.
             * @function create
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {dxos.node.IMetricsUpdateEvent=} [properties] Properties to set
             * @returns {dxos.node.MetricsUpdateEvent} MetricsUpdateEvent instance
             */
            MetricsUpdateEvent.create = function create(properties) {
                return new MetricsUpdateEvent(properties);
            };

            /**
             * Encodes the specified MetricsUpdateEvent message. Does not implicitly {@link dxos.node.MetricsUpdateEvent.verify|verify} messages.
             * @function encode
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {dxos.node.IMetricsUpdateEvent} message MetricsUpdateEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetricsUpdateEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    $root.dxos.node.MetricsUpdateEvent.Value.encode(message.value, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MetricsUpdateEvent message, length delimited. Does not implicitly {@link dxos.node.MetricsUpdateEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {dxos.node.IMetricsUpdateEvent} message MetricsUpdateEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MetricsUpdateEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MetricsUpdateEvent message from the specified reader or buffer.
             * @function decode
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dxos.node.MetricsUpdateEvent} MetricsUpdateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetricsUpdateEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.MetricsUpdateEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.value = $root.dxos.node.MetricsUpdateEvent.Value.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MetricsUpdateEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dxos.node.MetricsUpdateEvent} MetricsUpdateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MetricsUpdateEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MetricsUpdateEvent message.
             * @function verify
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MetricsUpdateEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.value != null && message.hasOwnProperty("value")) {
                    var error = $root.dxos.node.MetricsUpdateEvent.Value.verify(message.value);
                    if (error)
                        return "value." + error;
                }
                return null;
            };

            /**
             * Creates a MetricsUpdateEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dxos.node.MetricsUpdateEvent} MetricsUpdateEvent
             */
            MetricsUpdateEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.dxos.node.MetricsUpdateEvent)
                    return object;
                var message = new $root.dxos.node.MetricsUpdateEvent();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.value != null) {
                    if (typeof object.value !== "object")
                        throw TypeError(".dxos.node.MetricsUpdateEvent.value: object expected");
                    message.value = $root.dxos.node.MetricsUpdateEvent.Value.fromObject(object.value);
                }
                return message;
            };

            /**
             * Creates a plain object from a MetricsUpdateEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dxos.node.MetricsUpdateEvent
             * @static
             * @param {dxos.node.MetricsUpdateEvent} message MetricsUpdateEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MetricsUpdateEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = "";
                    object.value = null;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = $root.dxos.node.MetricsUpdateEvent.Value.toObject(message.value, options);
                return object;
            };

            /**
             * Converts this MetricsUpdateEvent to JSON.
             * @function toJSON
             * @memberof dxos.node.MetricsUpdateEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MetricsUpdateEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            MetricsUpdateEvent.Value = (function() {

                /**
                 * Properties of a Value.
                 * @memberof dxos.node.MetricsUpdateEvent
                 * @interface IValue
                 * @property {number|null} [int] Value int
                 * @property {string|null} [string] Value string
                 * @property {boolean|null} [bool] Value bool
                 */

                /**
                 * Constructs a new Value.
                 * @memberof dxos.node.MetricsUpdateEvent
                 * @classdesc Represents a Value.
                 * @implements IValue
                 * @constructor
                 * @param {dxos.node.MetricsUpdateEvent.IValue=} [properties] Properties to set
                 */
                function Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Value int.
                 * @member {number} int
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @instance
                 */
                Value.prototype.int = 0;

                /**
                 * Value string.
                 * @member {string} string
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @instance
                 */
                Value.prototype.string = "";

                /**
                 * Value bool.
                 * @member {boolean} bool
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @instance
                 */
                Value.prototype.bool = false;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Value value.
                 * @member {"int"|"string"|"bool"|undefined} value
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @instance
                 */
                Object.defineProperty(Value.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["int", "string", "bool"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Value instance using the specified properties.
                 * @function create
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {dxos.node.MetricsUpdateEvent.IValue=} [properties] Properties to set
                 * @returns {dxos.node.MetricsUpdateEvent.Value} Value instance
                 */
                Value.create = function create(properties) {
                    return new Value(properties);
                };

                /**
                 * Encodes the specified Value message. Does not implicitly {@link dxos.node.MetricsUpdateEvent.Value.verify|verify} messages.
                 * @function encode
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {dxos.node.MetricsUpdateEvent.IValue} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.int != null && Object.hasOwnProperty.call(message, "int"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int);
                    if (message.string != null && Object.hasOwnProperty.call(message, "string"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.string);
                    if (message.bool != null && Object.hasOwnProperty.call(message, "bool"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.bool);
                    return writer;
                };

                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link dxos.node.MetricsUpdateEvent.Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {dxos.node.MetricsUpdateEvent.IValue} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dxos.node.MetricsUpdateEvent.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dxos.node.MetricsUpdateEvent.Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            message.int = reader.int32();
                            break;
                        case 3:
                            message.string = reader.string();
                            break;
                        case 4:
                            message.bool = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dxos.node.MetricsUpdateEvent.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Value message.
                 * @function verify
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.int != null && message.hasOwnProperty("int")) {
                        properties.value = 1;
                        if (!$util.isInteger(message.int))
                            return "int: integer expected";
                    }
                    if (message.string != null && message.hasOwnProperty("string")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        if (!$util.isString(message.string))
                            return "string: string expected";
                    }
                    if (message.bool != null && message.hasOwnProperty("bool")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        if (typeof message.bool !== "boolean")
                            return "bool: boolean expected";
                    }
                    return null;
                };

                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dxos.node.MetricsUpdateEvent.Value} Value
                 */
                Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.dxos.node.MetricsUpdateEvent.Value)
                        return object;
                    var message = new $root.dxos.node.MetricsUpdateEvent.Value();
                    if (object.int != null)
                        message.int = object.int | 0;
                    if (object.string != null)
                        message.string = String(object.string);
                    if (object.bool != null)
                        message.bool = Boolean(object.bool);
                    return message;
                };

                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @static
                 * @param {dxos.node.MetricsUpdateEvent.Value} message Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.int != null && message.hasOwnProperty("int")) {
                        object.int = message.int;
                        if (options.oneofs)
                            object.value = "int";
                    }
                    if (message.string != null && message.hasOwnProperty("string")) {
                        object.string = message.string;
                        if (options.oneofs)
                            object.value = "string";
                    }
                    if (message.bool != null && message.hasOwnProperty("bool")) {
                        object.bool = message.bool;
                        if (options.oneofs)
                            object.value = "bool";
                    }
                    return object;
                };

                /**
                 * Converts this Value to JSON.
                 * @function toJSON
                 * @memberof dxos.node.MetricsUpdateEvent.Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Value;
            })();

            return MetricsUpdateEvent;
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
