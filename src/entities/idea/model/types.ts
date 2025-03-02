export interface IdeaFormData {
    country: string;
    scale: string;
    purpose: string;
    subject: string;
    description: string;
}

export interface GeneratedIdea {
    subject: string;
    introduction: string;
    marketTrend: string;
    mainTarget: string;
    businessModel: {
        b2b: string;
        b2c: string;
        additionalService: string;
    };
    investment: {
        initial: string;
        expected: string;
    };
    helpfulResources: string[];
} 