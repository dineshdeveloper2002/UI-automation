import { expect } from '@playwright/test';
import { test } from '../fixtures';
import articleData from '../testdata/articledata.json';

const randomNumber = Math.floor(Math.random() * 1000);
test.describe('Articles Suite', () => {

    test.beforeEach(async ({ article, page }) => {

        await article.articlePage.navigateToPage('/');
        await page.waitForLoadState('networkidle');
        await expect(article.articlePage.newArticleLink).toBeVisible();
        await expect(article.articlePage.homeLink).toBeVisible();
        await expect(article.articlePage.popularTagsSidebar).toBeVisible();
    });

    //add article
    test('Add article', async ({ article }) => {
        const article1 = articleData.articles[0];
        const uniqueTitle = `${article1.articletitle} ${randomNumber}`;
        await article.articlePage.addNewArticle({
            ...article1,
            articletitle: uniqueTitle
        });

        // assertions on the created article detail page
        await expect(article.articlePage.articleHeading).toBeVisible();
        await expect(article.articlePage.articleHeading).toHaveText(uniqueTitle);
        await expect(article.articlePage.articleBody).toBeVisible();
        await expect(article.articlePage.articleBody).toContainText(article1.articleContent);
    });

    //add and edit article
    test('Edit article', async ({ article }) => {
        const initialData = articleData.articles[1];
        const initialTitle = `${initialData.articletitle} ${randomNumber}`;
        await article.articlePage.addNewArticle({
            ...initialData,
            articletitle: initialTitle
        });
        await expect(article.articlePage.articleHeading).toBeVisible();
        await expect(article.articlePage.articleHeading).toHaveText(initialTitle);
        await expect(article.articlePage.editArticleButton).toBeVisible();

        const editData = articleData.editArticle;
        const updatedTitle = `${editData.articletitle} ${randomNumber}`;

        //edit article
        await article.articlePage.editArticle({
            ...editData,
            articletitle: updatedTitle
        });

        await expect(article.articlePage.articleHeading).toBeVisible();
        await expect(article.articlePage.articleHeading).toHaveText(updatedTitle);
        await expect(article.articlePage.articleBody).toBeVisible();
        await expect(article.articlePage.articleBody).toContainText(editData.articleContent);
        await expect(article.articlePage.editArticleButton).toBeVisible();
    });

    //add and delete article
    test('Delete article', async ({ article, page }) => {
        const deleteData = articleData.articles[0];
        const deleteTitle = `${deleteData.articletitle} ${randomNumber + 1}`;
        await article.articlePage.addNewArticle({
            ...deleteData,
            articletitle: deleteTitle
        });
        await expect(article.articlePage.articleHeading).toBeVisible();
        await expect(article.articlePage.articleHeading).toHaveText(deleteTitle);
        await expect(article.articlePage.deleteArticleButton).toBeVisible();

        //delete article
        await article.articlePage.deleteArticle();
        await expect(page).toHaveURL(new RegExp(process.env.BASE_URL || 'https://conduit.bondaracademy.com'));

        //assertions on home page after deletion
        await expect(article.articlePage.newArticleLink).toBeVisible();
        await expect(article.articlePage.homeLink).toBeVisible();
        await expect(article.articlePage.popularTagsSidebar).toBeVisible();
        await expect(page.getByText(deleteTitle)).not.toBeVisible();
    });

});