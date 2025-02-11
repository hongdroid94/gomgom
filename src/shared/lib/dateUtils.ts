import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// 예시코드 : 추후 필요한 로직만 작성하기

// 플러그인 확장
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// 날짜 타입 정의
type DateType = string | number | Date | dayjs.Dayjs;

// 날짜를 특정 포맷으로 변환하는 함수
const defaultFormat = 'YYYY-MM-DD HH:mm:ss';
const formatDate = (date: DateType, format: string = defaultFormat): string => {
    return dayjs(date).format(format);
};

// 입력된 날짜로부터 상대적인 시간을 반환하는 함수 (예: '3시간 전')
const fromNow = (date: DateType): string => {
    return dayjs(date).fromNow();
};

// 입력된 날짜까지 남은 시간을 반환하는 함수
const toNow = (date: DateType): string => {
    return dayjs(date).toNow();
};

// 첫 번째 날짜가 두 번째 날짜보다 이전인지 확인하는 함수
const isBefore = (date1: DateType, date2: DateType): boolean => {
    return dayjs(date1).isBefore(dayjs(date2));
};

// 첫 번째 날짜가 두 번째 날짜보다 이후인지 확인하는 함수
const isAfter = (date1: DateType, date2: DateType): boolean => {
    return dayjs(date1).isAfter(dayjs(date2));
};

// 현재 시간을 특정 포맷으로 반환하는 함수
const getCurrentTime = (format: string = defaultFormat): string => {
    return dayjs().format(format);
};

// 날짜를 UTC 기준으로 변환하는 함수
const convertToUTC = (date: DateType): string => {
    return dayjs(date).utc().format();
};

// 특정 타임존으로 변환하는 함수 (기본값: 아시아/서울)
const convertToTimezone = (date: DateType, tz: string = 'Asia/Seoul'): string => {
    return dayjs(date).tz(tz).format();
};

export {
    formatDate,
    fromNow,
    toNow,
    isBefore,
    isAfter,
    getCurrentTime,
    convertToUTC,
    convertToTimezone,
};
