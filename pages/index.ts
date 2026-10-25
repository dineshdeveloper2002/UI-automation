import { Page } from "@playwright/test";
import { ArticlePage } from "./articlePage";

export class articleFixture {
    articlePage: ArticlePage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.articlePage = new ArticlePage(page);
    }
}