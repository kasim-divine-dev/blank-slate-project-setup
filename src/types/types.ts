
interface Service {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    overview: {
        title: string;
        content: string;
        highlights: string[];
    };
    services: Array<{
        name: string;
        description: string;
        features: string[];
        image: string;
    }>;
    technologies: Array<{
        category: string;
        items: string[];
    }>;
    process: Array<{
        step: number;
        title: string;
        description: string;
    }>;
    pricing: {
        starting: string;
        popular: string;
        enterprise: string;
        note: string;
    };
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    cta: {
        title: string;
        description: string;
        buttonText: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string;
        localKeywords: string[];
    };
}


export type { Service };