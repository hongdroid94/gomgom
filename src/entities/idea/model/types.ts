export interface IdeaFormData {
    country: string;
    scale: string;
    purpose: string;
    subject: string;
    description: string;
}

export interface InvestmentBreakdownItem {
    item: string;
    amount: string;
    description: string;
}

export interface InitialInvestment {
    total: string;
    breakdown: InvestmentBreakdownItem[];
}

export interface ResourceItem {
    title: string;
    description: string;
    url: string;
}

export interface GeneratedIdea {
    subject: string;
    introduction: string;
    marketTrend: string;
    mainTarget: string;
    businessModel: {
        b2b: string[];
        b2c: string[];
        additionalService: string[];
    };
    investment: {
        initial: InitialInvestment;
        expected: string;
    };
    helpfulResources: ResourceItem[];
} 