export declare class PanRecognizer {
    private direction;
    private startX;
    private startY;
    private dirty;
    private threshold;
    private maxCosine;
    private angle;
    private isPan;
    constructor(direction: string, threshold: number, maxAngle: number);
    start(x: number, y: number): void;
    detect(x: number, y: number): boolean;
    isGesture(): number;
}
