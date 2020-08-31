import * as $protobuf from "protobufjs";
/** Namespace dxos. */
export namespace dxos {

    /** Namespace node. */
    namespace node {

        /** Properties of a NodeCommand. */
        interface INodeCommand {

            /** NodeCommand event */
            event?: (dxos.node.IEventCommand|null);

            /** NodeCommand snapshot */
            snapshot?: (dxos.node.ISnapshotCommand|null);

            /** NodeCommand destroy */
            destroy?: (dxos.node.IDestroyCommand|null);
        }

        /** Represents a NodeCommand. */
        class NodeCommand implements INodeCommand {

            /**
             * Constructs a new NodeCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.INodeCommand);

            /** NodeCommand event. */
            public event?: (dxos.node.IEventCommand|null);

            /** NodeCommand snapshot. */
            public snapshot?: (dxos.node.ISnapshotCommand|null);

            /** NodeCommand destroy. */
            public destroy?: (dxos.node.IDestroyCommand|null);

            /** NodeCommand command. */
            public command?: ("event"|"snapshot"|"destroy");

            /**
             * Creates a new NodeCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NodeCommand instance
             */
            public static create(properties?: dxos.node.INodeCommand): dxos.node.NodeCommand;

            /**
             * Encodes the specified NodeCommand message. Does not implicitly {@link dxos.node.NodeCommand.verify|verify} messages.
             * @param message NodeCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.INodeCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NodeCommand message, length delimited. Does not implicitly {@link dxos.node.NodeCommand.verify|verify} messages.
             * @param message NodeCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.INodeCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NodeCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.NodeCommand;

            /**
             * Decodes a NodeCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NodeCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.NodeCommand;

            /**
             * Verifies a NodeCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NodeCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NodeCommand
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.NodeCommand;

            /**
             * Creates a plain object from a NodeCommand message. Also converts values to other types if specified.
             * @param message NodeCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.NodeCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NodeCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EventCommand. */
        interface IEventCommand {

            /** EventCommand event */
            event?: (string|null);
        }

        /** Represents an EventCommand. */
        class EventCommand implements IEventCommand {

            /**
             * Constructs a new EventCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.IEventCommand);

            /** EventCommand event. */
            public event: string;

            /**
             * Creates a new EventCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EventCommand instance
             */
            public static create(properties?: dxos.node.IEventCommand): dxos.node.EventCommand;

            /**
             * Encodes the specified EventCommand message. Does not implicitly {@link dxos.node.EventCommand.verify|verify} messages.
             * @param message EventCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.IEventCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EventCommand message, length delimited. Does not implicitly {@link dxos.node.EventCommand.verify|verify} messages.
             * @param message EventCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.IEventCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EventCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EventCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.EventCommand;

            /**
             * Decodes an EventCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EventCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.EventCommand;

            /**
             * Verifies an EventCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EventCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EventCommand
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.EventCommand;

            /**
             * Creates a plain object from an EventCommand message. Also converts values to other types if specified.
             * @param message EventCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.EventCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EventCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SnapshotCommand. */
        interface ISnapshotCommand {
        }

        /** Represents a SnapshotCommand. */
        class SnapshotCommand implements ISnapshotCommand {

            /**
             * Constructs a new SnapshotCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.ISnapshotCommand);

            /**
             * Creates a new SnapshotCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SnapshotCommand instance
             */
            public static create(properties?: dxos.node.ISnapshotCommand): dxos.node.SnapshotCommand;

            /**
             * Encodes the specified SnapshotCommand message. Does not implicitly {@link dxos.node.SnapshotCommand.verify|verify} messages.
             * @param message SnapshotCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.ISnapshotCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SnapshotCommand message, length delimited. Does not implicitly {@link dxos.node.SnapshotCommand.verify|verify} messages.
             * @param message SnapshotCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.ISnapshotCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SnapshotCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SnapshotCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.SnapshotCommand;

            /**
             * Decodes a SnapshotCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SnapshotCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.SnapshotCommand;

            /**
             * Verifies a SnapshotCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SnapshotCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SnapshotCommand
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.SnapshotCommand;

            /**
             * Creates a plain object from a SnapshotCommand message. Also converts values to other types if specified.
             * @param message SnapshotCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.SnapshotCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SnapshotCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DestroyCommand. */
        interface IDestroyCommand {
        }

        /** Represents a DestroyCommand. */
        class DestroyCommand implements IDestroyCommand {

            /**
             * Constructs a new DestroyCommand.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.IDestroyCommand);

            /**
             * Creates a new DestroyCommand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DestroyCommand instance
             */
            public static create(properties?: dxos.node.IDestroyCommand): dxos.node.DestroyCommand;

            /**
             * Encodes the specified DestroyCommand message. Does not implicitly {@link dxos.node.DestroyCommand.verify|verify} messages.
             * @param message DestroyCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.IDestroyCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DestroyCommand message, length delimited. Does not implicitly {@link dxos.node.DestroyCommand.verify|verify} messages.
             * @param message DestroyCommand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.IDestroyCommand, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DestroyCommand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DestroyCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.DestroyCommand;

            /**
             * Decodes a DestroyCommand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DestroyCommand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.DestroyCommand;

            /**
             * Verifies a DestroyCommand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DestroyCommand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DestroyCommand
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.DestroyCommand;

            /**
             * Creates a plain object from a DestroyCommand message. Also converts values to other types if specified.
             * @param message DestroyCommand
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.DestroyCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DestroyCommand to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a NodeEvent. */
        interface INodeEvent {

            /** NodeEvent timestamp */
            timestamp?: (number|null);

            /** NodeEvent ready */
            ready?: (dxos.node.IReadyEvent|null);

            /** NodeEvent log */
            log?: (dxos.node.ILogEvent|null);

            /** NodeEvent snapshot */
            snapshot?: (dxos.node.ISnapshotEvent|null);

            /** NodeEvent metricsUpdate */
            metricsUpdate?: (dxos.node.IMetricsUpdateEvent|null);
        }

        /** Represents a NodeEvent. */
        class NodeEvent implements INodeEvent {

            /**
             * Constructs a new NodeEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.INodeEvent);

            /** NodeEvent timestamp. */
            public timestamp: number;

            /** NodeEvent ready. */
            public ready?: (dxos.node.IReadyEvent|null);

            /** NodeEvent log. */
            public log?: (dxos.node.ILogEvent|null);

            /** NodeEvent snapshot. */
            public snapshot?: (dxos.node.ISnapshotEvent|null);

            /** NodeEvent metricsUpdate. */
            public metricsUpdate?: (dxos.node.IMetricsUpdateEvent|null);

            /** NodeEvent event. */
            public event?: ("ready"|"log"|"snapshot"|"metricsUpdate");

            /**
             * Creates a new NodeEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NodeEvent instance
             */
            public static create(properties?: dxos.node.INodeEvent): dxos.node.NodeEvent;

            /**
             * Encodes the specified NodeEvent message. Does not implicitly {@link dxos.node.NodeEvent.verify|verify} messages.
             * @param message NodeEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.INodeEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NodeEvent message, length delimited. Does not implicitly {@link dxos.node.NodeEvent.verify|verify} messages.
             * @param message NodeEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.INodeEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NodeEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NodeEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.NodeEvent;

            /**
             * Decodes a NodeEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NodeEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.NodeEvent;

            /**
             * Verifies a NodeEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NodeEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NodeEvent
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.NodeEvent;

            /**
             * Creates a plain object from a NodeEvent message. Also converts values to other types if specified.
             * @param message NodeEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.NodeEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NodeEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ReadyEvent. */
        interface IReadyEvent {
        }

        /** Represents a ReadyEvent. */
        class ReadyEvent implements IReadyEvent {

            /**
             * Constructs a new ReadyEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.IReadyEvent);

            /**
             * Creates a new ReadyEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReadyEvent instance
             */
            public static create(properties?: dxos.node.IReadyEvent): dxos.node.ReadyEvent;

            /**
             * Encodes the specified ReadyEvent message. Does not implicitly {@link dxos.node.ReadyEvent.verify|verify} messages.
             * @param message ReadyEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.IReadyEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReadyEvent message, length delimited. Does not implicitly {@link dxos.node.ReadyEvent.verify|verify} messages.
             * @param message ReadyEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.IReadyEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReadyEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ReadyEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.ReadyEvent;

            /**
             * Decodes a ReadyEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ReadyEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.ReadyEvent;

            /**
             * Verifies a ReadyEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReadyEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReadyEvent
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.ReadyEvent;

            /**
             * Creates a plain object from a ReadyEvent message. Also converts values to other types if specified.
             * @param message ReadyEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.ReadyEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReadyEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LogEvent. */
        interface ILogEvent {

            /** LogEvent eventName */
            eventName?: (string|null);

            /** LogEvent details */
            details?: (string|null);
        }

        /** Represents a LogEvent. */
        class LogEvent implements ILogEvent {

            /**
             * Constructs a new LogEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.ILogEvent);

            /** LogEvent eventName. */
            public eventName: string;

            /** LogEvent details. */
            public details: string;

            /**
             * Creates a new LogEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LogEvent instance
             */
            public static create(properties?: dxos.node.ILogEvent): dxos.node.LogEvent;

            /**
             * Encodes the specified LogEvent message. Does not implicitly {@link dxos.node.LogEvent.verify|verify} messages.
             * @param message LogEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.ILogEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LogEvent message, length delimited. Does not implicitly {@link dxos.node.LogEvent.verify|verify} messages.
             * @param message LogEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.ILogEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LogEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LogEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.LogEvent;

            /**
             * Decodes a LogEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LogEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.LogEvent;

            /**
             * Verifies a LogEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LogEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LogEvent
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.LogEvent;

            /**
             * Creates a plain object from a LogEvent message. Also converts values to other types if specified.
             * @param message LogEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.LogEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LogEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SnapshotEvent. */
        interface ISnapshotEvent {

            /** SnapshotEvent data */
            data?: (string|null);
        }

        /** Represents a SnapshotEvent. */
        class SnapshotEvent implements ISnapshotEvent {

            /**
             * Constructs a new SnapshotEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.ISnapshotEvent);

            /** SnapshotEvent data. */
            public data: string;

            /**
             * Creates a new SnapshotEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SnapshotEvent instance
             */
            public static create(properties?: dxos.node.ISnapshotEvent): dxos.node.SnapshotEvent;

            /**
             * Encodes the specified SnapshotEvent message. Does not implicitly {@link dxos.node.SnapshotEvent.verify|verify} messages.
             * @param message SnapshotEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.ISnapshotEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SnapshotEvent message, length delimited. Does not implicitly {@link dxos.node.SnapshotEvent.verify|verify} messages.
             * @param message SnapshotEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.ISnapshotEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SnapshotEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SnapshotEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.SnapshotEvent;

            /**
             * Decodes a SnapshotEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SnapshotEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.SnapshotEvent;

            /**
             * Verifies a SnapshotEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SnapshotEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SnapshotEvent
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.SnapshotEvent;

            /**
             * Creates a plain object from a SnapshotEvent message. Also converts values to other types if specified.
             * @param message SnapshotEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.SnapshotEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SnapshotEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MetricsUpdateEvent. */
        interface IMetricsUpdateEvent {

            /** MetricsUpdateEvent key */
            key?: (string|null);

            /** MetricsUpdateEvent value */
            value?: (dxos.node.MetricsUpdateEvent.IValue|null);
        }

        /** Represents a MetricsUpdateEvent. */
        class MetricsUpdateEvent implements IMetricsUpdateEvent {

            /**
             * Constructs a new MetricsUpdateEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: dxos.node.IMetricsUpdateEvent);

            /** MetricsUpdateEvent key. */
            public key: string;

            /** MetricsUpdateEvent value. */
            public value?: (dxos.node.MetricsUpdateEvent.IValue|null);

            /**
             * Creates a new MetricsUpdateEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MetricsUpdateEvent instance
             */
            public static create(properties?: dxos.node.IMetricsUpdateEvent): dxos.node.MetricsUpdateEvent;

            /**
             * Encodes the specified MetricsUpdateEvent message. Does not implicitly {@link dxos.node.MetricsUpdateEvent.verify|verify} messages.
             * @param message MetricsUpdateEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: dxos.node.IMetricsUpdateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MetricsUpdateEvent message, length delimited. Does not implicitly {@link dxos.node.MetricsUpdateEvent.verify|verify} messages.
             * @param message MetricsUpdateEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: dxos.node.IMetricsUpdateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MetricsUpdateEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MetricsUpdateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.MetricsUpdateEvent;

            /**
             * Decodes a MetricsUpdateEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MetricsUpdateEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.MetricsUpdateEvent;

            /**
             * Verifies a MetricsUpdateEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MetricsUpdateEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MetricsUpdateEvent
             */
            public static fromObject(object: { [k: string]: any }): dxos.node.MetricsUpdateEvent;

            /**
             * Creates a plain object from a MetricsUpdateEvent message. Also converts values to other types if specified.
             * @param message MetricsUpdateEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: dxos.node.MetricsUpdateEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MetricsUpdateEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace MetricsUpdateEvent {

            /** Properties of a Value. */
            interface IValue {

                /** Value int */
                int?: (number|null);

                /** Value string */
                string?: (string|null);

                /** Value bool */
                bool?: (boolean|null);
            }

            /** Represents a Value. */
            class Value implements IValue {

                /**
                 * Constructs a new Value.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: dxos.node.MetricsUpdateEvent.IValue);

                /** Value int. */
                public int: number;

                /** Value string. */
                public string: string;

                /** Value bool. */
                public bool: boolean;

                /** Value value. */
                public value?: ("int"|"string"|"bool");

                /**
                 * Creates a new Value instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Value instance
                 */
                public static create(properties?: dxos.node.MetricsUpdateEvent.IValue): dxos.node.MetricsUpdateEvent.Value;

                /**
                 * Encodes the specified Value message. Does not implicitly {@link dxos.node.MetricsUpdateEvent.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: dxos.node.MetricsUpdateEvent.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link dxos.node.MetricsUpdateEvent.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: dxos.node.MetricsUpdateEvent.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dxos.node.MetricsUpdateEvent.Value;

                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dxos.node.MetricsUpdateEvent.Value;

                /**
                 * Verifies a Value message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Value
                 */
                public static fromObject(object: { [k: string]: any }): dxos.node.MetricsUpdateEvent.Value;

                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @param message Value
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: dxos.node.MetricsUpdateEvent.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Value to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}