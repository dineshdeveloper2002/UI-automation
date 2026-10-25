import { test as base, expect } from '@playwright/test';
import { articleFixture } from '../pages';

type Fixtures = {
    article: articleFixture;
};

export const test = base.extend<Fixtures>({
    article: async ({ page }, use) => {
        await use(new articleFixture(page));
    }
});
