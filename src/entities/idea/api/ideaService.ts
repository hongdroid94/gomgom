import {IdeaFormData, GeneratedIdea} from '../model/types';

const PERPLEXITY_API_TOKEN = import.meta.env.VITE_PERPLEXITY_API_TOKEN;

export const generateIdea = async (formData: IdeaFormData): Promise<GeneratedIdea> => {
    const prompt = `
        다음 조건으로 IT 서비스 아이디어를 만들어주세요:
        - 대상 국가: ${formData.country}
        - 규모: ${formData.scale}
        - 목적: ${formData.purpose}
        - 아이디어 주제: ${formData.subject}
        - 아이디어 설명: ${formData.description}

        아이디어는 실현 가능하고 구체적이며 혁신적이어야 합니다. 시장 조사와 트렌드를 반영하여 현실적인 비즈니스 모델을 제시해주세요.
        
        반드시 다음 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요:
        {
            "subject": "아이디어 주제 (명확하고 간결하게)",
            "introduction": "아이디어 소개 (48자 이내, 핵심 가치와 차별점 포함)",
            "marketTrend": "시장 동향 (50자 이내, 최신 트렌드와 시장 규모 언급)",
            "mainTarget": "주요 타깃 (50자 이내, 구체적인 페르소나와 니즈 설명)",
            "businessModel": {
                "b2b": [
                    "B2B 모델 항목 1 (구체적인 수익 모델과 가치 제안)",
                    "B2B 모델 항목 2 (파트너십 전략이나 확장 가능성)"
                ],
                "b2c": [
                    "B2C 모델 항목 1 (소비자 가치 제안과 수익화 방안)",
                    "B2C 모델 항목 2 (사용자 경험과 마케팅 전략)"
                ],
                "additionalService": [
                    "추가 서비스 항목 1 (주 서비스와의 시너지 효과)",
                    "추가 서비스 항목 2 (미래 확장 가능성)"
                ]
            },
            "investment": {
                "initial": {
                    "total": "총 초기 투자금 (구체적인 금액)",
                    "breakdown": [
                        {"item": "개발 비용", "amount": "금액", "description": "필요한 이유"},
                        {"item": "마케팅 비용", "amount": "금액", "description": "필요한 이유"},
                        {"item": "인력 비용", "amount": "금액", "description": "필요한 이유"},
                        {"item": "기타 비용", "amount": "금액", "description": "필요한 이유"}
                    ]
                },
                "expected": "수익 예상 (ROI와 손익분기점 시점 포함)"
            },
            "helpfulResources": [
                {"title": "자료 제목 1", "description": "자료 설명", "url": "https://example.com/resource1"},
                {"title": "자료 제목 2", "description": "자료 설명", "url": "https://example.com/resource2"},
                {"title": "자료 제목 3", "description": "자료 설명", "url": "https://example.com/resource3"},
                {"title": "자료 제목 4", "description": "자료 설명", "url": "https://example.com/resource4"}
            ]
        }
        
        각 항목은 구체적이고 실행 가능한 내용으로 작성해주세요. 특히 사업 모델과 투자 비용은 현실적인 수치와 전략을 포함해야 합니다.
        도움이 될만한 자료는 실제 존재하는 웹사이트 링크를 포함하고, 각 자료가 어떻게 도움이 될지 간략히 설명해주세요.
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
                        content: "You are a helpful assistant that responds only with JSON. You are an expert in business development, startup ideas, and market analysis. Provide detailed, realistic, and innovative business ideas with concrete details."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.3,
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
            
            // GeneratedIdea 타입도 업데이트해야 함
            return {
                subject: parsedJson.subject || '',
                introduction: parsedJson.introduction || '',
                marketTrend: parsedJson.marketTrend || '',
                mainTarget: parsedJson.mainTarget || '',
                businessModel: {
                    b2b: Array.isArray(parsedJson.businessModel?.b2b) 
                        ? parsedJson.businessModel.b2b 
                        : [],
                    b2c: Array.isArray(parsedJson.businessModel?.b2c) 
                        ? parsedJson.businessModel.b2c 
                        : [],
                    additionalService: Array.isArray(parsedJson.businessModel?.additionalService) 
                        ? parsedJson.businessModel.additionalService 
                        : []
                },
                investment: {
                    initial: parsedJson.investment?.initial || {},
                    expected: parsedJson.investment?.expected || ''
                },
                helpfulResources: Array.isArray(parsedJson.helpfulResources) 
                    ? parsedJson.helpfulResources 
                    : []
            };
        } catch (parseError) {
            console.error('JSON 파싱 실패:', parseError);
            throw new Error('응답 데이터 파싱에 실패했습니다.');
        }
    } catch (error) {
        console.error('Failed to generate idea:', error);
        throw error;
    }
};