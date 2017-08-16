export declare const PLATFORM_CONFIGS: PlatformConfig[];
export declare function detectPlatforms(url: string, userAgent: string, platforms: PlatformConfig[], defaultPlatform: string): PlatformConfig[];
export declare function isPlatformMatch(url: string, userAgent: string, platformName: string, userAgentAtLeastHas: string[], userAgentMustNotHave: string[]): boolean;
export interface PlatformConfig {
    name: string;
    isMatch?: {
        (url: string, userAgent: string): boolean;
    };
    settings?: any;
}
