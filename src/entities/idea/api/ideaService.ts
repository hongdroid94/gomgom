import { IdeaFormData, GeneratedIdea } from '../model/types';

const PERPLEXITY_API_TOKEN = import.meta.env.VITE_PERPLEXITY_API_TOKEN;

export const generateIdea = async (formData: IdeaFormData): Promise<GeneratedIdea> => {
    const prompt = `
        다음 조건으로 IT 서비스 아이디어를 만들어주세요:
        - 대상 국가: ${formData.country}
        - 규모: ${formData.scale}
        - 목적: ${formData.purpose}
        - 아이디어 주제: ${formData.subject}
        - 아이디어 설명: ${formData.description}

        반드시 다음 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요:
        {
            "subject": "아이디어 주제",
            "introduction": "아이디어 소개 (48자 이내)",
            "marketTrend": "시장 동향 (50자 이내)",
            "mainTarget": "주요 타깃 (50자 이내)",
            "businessModel": {
                "b2b": "B2B 모델 설명",
                "b2c": "B2C 모델 설명",
                "additionalService": "추가 서비스 설명"
            },
            "investment": {
                "initial": "초기 투자금",
                "expected": "수익 예상"
            },
            "helpfulResources": [
                "도움이 될만한 자료1",
                "도움이 될만한 자료2",
                "도움이 될만한 자료3"
            ]
        }
    `;

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                model: "sonar",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that responds only with JSON. Do not include any explanations, only provide a RFC8259 compliant JSON response."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.2,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API 응답 데이터:', data);
        
        const content = data.choices[0].message.content;
        console.log('응답 내용:', content);
        
        // JSON 문자열 추출 (혹시 모를 추가 텍스트 제거)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : content;
        
        try {
            // JSON 파싱 시도
            const parsedJson = JSON.parse(jsonString);
            console.log('파싱된 JSON:', parsedJson);
            
            // GeneratedIdea 형식에 맞게 변환
            const generatedIdea: GeneratedIdea = {
                subject: parsedJson.subject || '',
                introduction: parsedJson.introduction || '',
                marketTrend: parsedJson.marketTrend || '',
                mainTarget: parsedJson.mainTarget || '',
                businessModel: {
                    b2b: parsedJson.businessModel?.b2b || '',
                    b2c: parsedJson.businessModel?.b2c || '',
                    additionalService: parsedJson.businessModel?.additionalService || ''
                },
                investment: {
                    initial: parsedJson.investment?.initial || '',
                    expected: parsedJson.investment?.expected || ''
                },
                helpfulResources: Array.isArray(parsedJson.helpfulResources) 
                    ? parsedJson.helpfulResources 
                    : []
            };
            
            return generatedIdea;
        } catch (parseError) {
            console.error('JSON 파싱 실패:', parseError);
            // 파싱 실패 시 기존 방식으로 시도
            return parseGeneratedIdea(content);
        }
    } catch (error) {
        console.error('Failed to generate idea:', error);
        throw error;
    }
};

// 기존 파싱 함수는 백업으로 유지
const parseGeneratedIdea = (content: string): GeneratedIdea => {
    try {
        // 응답 텍스트를 줄 단위로 분리
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        
        // 각 섹션의 내용 추출
        const subject = lines.find(line => line.startsWith('1. 아이디어 주제:'))?.replace('1. 아이디어 주제:', '').trim() || '';
        const introduction = lines.find(line => line.startsWith('2. 아이디어 소개'))?.replace('2. 아이디어 소개 (48자 이내):', '').trim() || '';
        const marketTrend = lines.find(line => line.startsWith('3. 시장 동향'))?.replace('3. 시장 동향 (50자 이내):', '').trim() || '';
        const mainTarget = lines.find(line => line.startsWith('4. 주요 타깃'))?.replace('4. 주요 타깃 (50자 이내):', '').trim() || '';

        // 사업 모델 섹션 파싱
        const b2bLine = lines.find(line => line.includes('B2B:'))?.split('B2B:')[1]?.trim() || '';
        const b2cLine = lines.find(line => line.includes('B2C:'))?.split('B2C:')[1]?.trim() || '';
        const additionalServiceLine = lines.find(line => line.includes('추가 서비스:'))?.split('추가 서비스:')[1]?.trim() || '';

        // 투자 비용 섹션 파싱
        const initialInvestment = lines.find(line => line.includes('초기 투자금:'))?.split('초기 투자금:')[1]?.trim() || '';
        const expectedProfit = lines.find(line => line.includes('수익 예상:'))?.split('수익 예상:')[1]?.trim() || '';

        // 도움이 될 만한 자료 파싱
        const resourcesStartIndex = lines.findIndex(line => line.includes('도움이 될만한 자료와 사이트:'));
        const helpfulResources = resourcesStartIndex !== -1 
            ? lines.slice(resourcesStartIndex + 1).filter(line => line.startsWith('-')).map(line => line.replace('-', '').trim())
            : [];

        return {
            subject,
            introduction,
            marketTrend,
            mainTarget,
            businessModel: {
                b2b: b2bLine,
                b2c: b2cLine,
                additionalService: additionalServiceLine
            },
            investment: {
                initial: initialInvestment,
                expected: expectedProfit
            },
            helpfulResources
        };
    } catch (error) {
        console.error('Failed to parse generated idea:', error);
        throw error;
    }
}; 