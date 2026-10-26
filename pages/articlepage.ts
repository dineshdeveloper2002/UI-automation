import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export interface ArticleData {
    articletitle: string;
    description: string;
    articleContent: string;
    tags: string;
}

export class ArticlePage extends BasePage {
    readonly newArticleLink: Locator;
    readonly homeLink: Locator;
    readonly popularTagsSidebar: Locator;
    readonly articleTitle: Locator;
    readonly articleAbout: Locator;
    readonly articleContent: Locator;
    readonly articleTags: Locator;
    readonly publishArticle: Locator;
    readonly articleHeading: Locator;
    readonly articleBody: Locator;
    readonly editArticleButton: Locator;
    readonly deleteArticleButton: Locator;
    readonly articleTagsBlock: Locator

    constructor(page: Page) {
        super(page);
        this.newArticleLink = this.page.getByRole('link', { name: 'New Article' });
        this.homeLink = this.page.getByRole('link', { name: 'Home' });
        this.popularTagsSidebar = this.page.locator('.sidebar');
        this.articleTitle = this.page.getByPlaceholder('Article Title');
        this.articleAbout = this.page.getByPlaceholder("What's this article about?");
        this.articleContent = this.page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = this.page.getByPlaceholder('Enter tags');
        this.publishArticle = this.page.getByRole('button', { name: 'Publish Article' });
        this.articleHeading = this.page.locator('h1');
        this.articleBody = this.page.locator('.article-content');
        this.editArticleButton = this.page.getByRole('link', { name: 'Edit Article' }).first();
        this.deleteArticleButton = this.page.getByRole('button', { name: 'Delete Article' }).first();
        this.articleTagsBlock = this.page.locator('.article-content ul li')
    }

    async navigateToPage(url: string) {
        await this.page.goto(url)
    }
    async addNewArticle(data: ArticleData) {
        await this.newArticleLink.click();
        await this.page.waitForURL(/editor/);
        await this.articleTitle.fill(data.articletitle);
        await this.articleAbout.fill(data.description);
        await this.articleContent.fill(data.articleContent);
        await this.articleTags.fill(data.tags);
        await this.articleTags.press('Enter');
        await this.publishArticle.click();
        await this.page.waitForURL(/article/);
        await this.articleHeading.waitFor({ state: 'visible' });
    }

    async editArticle(data: ArticleData) {
        await this.editArticleButton.click();
        await this.page.waitForURL(/editor/);
        await this.page.waitForLoadState('networkidle');
        await this.articleTitle.fill(data.articletitle);
        await this.articleAbout.fill(data.description);
        await this.articleContent.fill(data.articleContent);
        await this.articleTags.fill(data.tags);
        await this.articleTags.press('Enter');
        await this.publishArticle.click();
        await this.page.waitForURL(/article/);
        await this.articleHeading.waitFor({ state: 'visible' });
    }

    async deleteArticle() {
        await this.deleteArticleButton.click();
    }
}