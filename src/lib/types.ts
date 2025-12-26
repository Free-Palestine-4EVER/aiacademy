// Course and User Types for the AI Course Platform
// Designed to be Firebase-ready

export type CourseType = 'web' | 'mobile' | 'bundle' | 'image-editing';

export type PaymentStatus = 'pending' | 'paid' | 'rejected';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phone?: string;
    createdAt: Date;
    isAdmin: boolean;
    // Course access
    courseAccess: CourseType[];
    paymentStatus: PaymentStatus;
    // Optional: which course they requested
    requestedCourse?: CourseType;
    whatsappContacted?: boolean;
}

export interface CourseModule {
    id: string;
    courseType: CourseType; // 'web', 'mobile', or 'bundle' (bundle includes both)
    moduleNumber: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    moduleId: string;
    lessonNumber: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    videoUrl?: string; // YouTube, Vimeo, or direct URL
    videoDuration?: number; // in seconds
    content?: string; // Markdown content
    resources?: Resource[];
    challenge?: Challenge;
}

export interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'code' | 'link' | 'file';
    url: string;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    hints?: string[];
}

export interface UserProgress {
    odId: string;
    lessonId: string;
    completed: boolean;
    watchedSeconds?: number;
    completedAt?: Date;
}

export interface CourseInfo {
    type: CourseType;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    price: number;
    originalPrice?: number;
    currency: string;
    features: string[];
    featuresAr: string[];
    totalLessons: number;
    totalDuration: string; // e.g. "12 hours"
}

// New Year Sale ends January 1, 2025
export const PROMO_END_DATE = new Date('2025-01-01T23:59:59');

// Course pricing config
export const COURSES: Record<CourseType, CourseInfo> = {
    web: {
        type: 'web',
        title: 'Web Development with AI',
        titleAr: 'تطوير الويب مع الذكاء الاصطناعي',
        description: 'Master building websites and web apps using AI tools',
        descriptionAr: 'أتقن بناء المواقع وتطبيقات الويب باستخدام أدوات الذكاء الاصطناعي',
        price: 100, // Promo price
        originalPrice: 300, // Regular price
        currency: 'JOD',
        features: [
            'Complete Web Development Curriculum',
            '10+ Real-World Projects',
            'AI Tools Mastery (Cursor, Copilot)',
            'Lifetime Access',
            'Community Access',
            '15-min 1-on-1 Coaching Call',
            'Certificate of Completion',
        ],
        featuresAr: [
            'منهج تطوير ويب كامل',
            '+١٠ مشاريع حقيقية',
            'إتقان أدوات AI (Cursor, Copilot)',
            'وصول مدى الحياة',
            'وصول للمجتمع',
            '١٥ دقيقة مكالمة تدريب خاصة',
            'شهادة إتمام',
        ],
        totalLessons: 25,
        totalDuration: '12 hours',
    },
    mobile: {
        type: 'mobile',
        title: 'Mobile App Development with AI',
        titleAr: 'تطوير تطبيقات الموبايل مع الذكاء الاصطناعي',
        description: 'Build iOS and Android apps using AI-powered tools',
        descriptionAr: 'ابنِ تطبيقات iOS و Android باستخدام أدوات مدعومة بالذكاء الاصطناعي',
        price: 300, // Promo price
        originalPrice: 500, // Regular price
        currency: 'JOD',
        features: [
            'Complete Mobile App Curriculum',
            '5+ Mobile App Projects',
            'React Native Mastery',
            'Lifetime Access',
            'Community Access',
            '15-min 1-on-1 Coaching Call',
            'Certificate of Completion',
        ],
        featuresAr: [
            'منهج تطبيقات موبايل كامل',
            '+٥ مشاريع تطبيقات',
            'إتقان React Native',
            'وصول مدى الحياة',
            'وصول للمجتمع',
            '١٥ دقيقة مكالمة تدريب خاصة',
            'شهادة إتمام',
        ],
        totalLessons: 20,
        totalDuration: '10 hours',
    },
    bundle: {
        type: 'bundle',
        title: 'Complete Bundle (Web + Mobile)',
        titleAr: 'الحزمة الكاملة (ويب + موبايل)',
        description: 'Get everything: Web, Mobile, and bonus content',
        descriptionAr: 'احصل على كل شيء: ويب، موبايل، ومحتوى إضافي',
        price: 350, // Promo price
        originalPrice: 650, // Regular price
        currency: 'JOD',
        features: [
            'Web Development Course',
            'Mobile Development Course',
            '1-Hour 1-on-1 Coaching Call',
            'Monetization Masterclass',
            'Priority Support',
            'All Future Updates',
        ],
        featuresAr: [
            'دورة تطوير الويب',
            'دورة تطوير التطبيقات',
            'ساعة مكالمة تدريب خاصة',
            'دورة إتقان التسويق',
            'دعم أولوي',
            'كل التحديثات المستقبلية',
        ],
        totalLessons: 50,
        totalDuration: '25 hours',
    },
    'image-editing': {
        type: 'image-editing',
        title: 'AI Image Editing',
        titleAr: 'تحرير الصور بالذكاء الاصطناعي',
        description: 'Master professional image editing using AI tools',
        descriptionAr: 'أتقن تحرير الصور الاحترافي باستخدام أدوات الذكاء الاصطناعي',
        price: 20,
        currency: 'JOD',
        features: [
            'AI Image Editing Tools',
            'Photo Enhancement Techniques',
            'Social Media Graphics',
            'Lifetime Access',
            'Certificate of Completion',
        ],
        featuresAr: [
            'أدوات تحرير الصور بالذكاء الاصطناعي',
            'تقنيات تحسين الصور',
            'رسومات وسائل التواصل الاجتماعي',
            'وصول مدى الحياة',
            'شهادة إتمام',
        ],
        totalLessons: 10,
        totalDuration: '4 hours',
    },
};

// WhatsApp number for payments
export const WHATSAPP_NUMBER = '+41766633924';

export const getWhatsAppLink = (courseType: CourseType, userName?: string) => {
    const course = COURSES[courseType];
    const message = encodeURIComponent(
        `Hi! I want to enroll in the ${course.title} course (${course.price} ${course.currency}).${userName ? ` My name is ${userName}.` : ''}`
    );
    return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`;
};
