import { SetupContext } from 'vue';
export declare type EventHandler = (e: MouseEvent | TouchEvent) => any;
export declare type MouseEvents = {
    [event: string]: {
        event: string;
        passive?: boolean;
        capture?: boolean;
        once?: boolean;
        stop?: boolean;
        prevent?: boolean;
        button?: number;
        result?: any;
    };
};
export declare type MouseEventsMap = {
    [event: string]: EventHandler | EventHandler[];
};
export declare function getEventMap(suffix: string): {
    [x: string]: {
        event: string;
        prevent?: undefined;
        result?: undefined;
    } | {
        event: string;
        prevent: boolean;
        result: boolean;
    };
};
export default function useMouse(ctx: SetupContext): {
    getDefaultMouseEventHandlers: (suffix: string, getEvent: EventHandler) => MouseEventsMap;
};
