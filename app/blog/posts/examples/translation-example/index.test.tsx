import { describe, expect, test, vi } from 'vitest';
import { getTranslation } from './index';
import type { TemplateParams } from './types';

const mocks = vi.hoisted(() => {
    const mockData = [
        ['key1', undefined, undefined, ''],
        ['key2', '', undefined, ''],
        ['key3', 'without params', undefined, 'without params'],
        ['key4', 'one ${param} param', { param: 'cool' }, 'one cool param'],
        [
            'key5',
            'two ${param1} different params ${param2}',
            { param1: 'x1', param2: 'x2' },
            'two x1 different params x2',
        ],
        ['key6', 'missing ${missed} parameter', undefined, 'missing ${missed} parameter'],
        ['key7', 'same ${param} param ${param}', { param: 'cool' }, 'same cool param cool'],
    ] as [string, string | undefined, TemplateParams, string][];

    return { mockData };
});

vi.mock('constants/i18n.constants', () => {
    return {
        LANGUAGES_RESOURCES: {
            en: mocks.mockData.reduce((result, [key, template]) => {
                return Object.assign({}, result, { [key]: template });
            }, {}),
        },
    };
});

describe('Translation function', () => {
    test.each(mocks.mockData)(
        'should match translation result',
        (key, _template, params, result) => {
            const translation = getTranslation(`en.${key}`, params);
            expect(translation).toEqual(result);
        }
    );
});
