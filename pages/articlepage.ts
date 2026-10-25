import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export interface ArticleData {
    articletitle: string;
    description: string;
    articleContent: string;
    tags: string;
}

export class ArticlePage extends BasePage {
    articleTitle: Locator;
    articleAbout: Locator;
    articleContent: Locator;
    articleTags: Locator;
    publishArticle: Locator;

    constructor(page: Page) {
        super(page);
        this.articleTitle = this.page.getByPlaceholder('Article Title');
        this.articleAbout = this.page.getByPlaceholder("What's this article about?");
        this.articleContent = this.page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = this.page.getByPlaceholder('Enter tags');
        this.publishArticle = this.page.getByRole('button', { name: 'Publish Article' });
    }

    async addNewArticle(data: ArticleData) {
        await this.articleTitle.fill(data.articletitle);
        await this.articleAbout.fill(data.description);
        await this.articleContent.fill(data.articleContent);
        await this.articleTags.fill(data.tags);
        await this.publishArticle.click();
    }

    async editArticle(data: ArticleData) {
        await this.publishArticle.click();
    }

    async deleteArticle({ articleName }: { articleName: string }) {
        await this.publishArticle.click();
    }
}