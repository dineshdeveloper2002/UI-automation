import { expect } from '@playwright/test';
import { test } from '../fixtures';
import articleData from '../testdata/articledata.json';

const randomNumber = Math.floor(Math.random() * 1000);
test.describe('Articles Suite', () => {

    test.beforeEach(async ({ article }) => {
        await article.articlePage.navigateToPage('/');
    });

    //add article
    test('Add article', async ({ article }) => {
        const article1 = articleData.articles[0];
        const uniqueTitle = `${article1.articletitle} ${randomNumber}`;
        await article.articlePage.addNewArticle({
            ...article1,
            articletitle: uniqueTitle
        });
        await expect(article.articlePage.articleHeading).toHaveText(uniqueTitle);
        await expect(article.articlePage.articleBody).toContainText(article1.articleContent);
    });

    //add an edit article
    test('Edit article', async ({ article }) => {
        const initialData = articleData.articles[1];
        const initialTitle = `${initialData.articletitle} ${randomNumber}`;
        await article.articlePage.addNewArticle({
            ...initialData,
            articletitle: initialTitle
        });
        await expect(article.articlePage.articleHeading).toHaveText(initialTitle);

        const editData = articleData.editArticle;
        const updatedTitle = `${editData.articletitle} ${randomNumber}`;

        //edit article
        await article.articlePage.editArticle({
            ...editData,
            articletitle: updatedTitle
        });

        await expect(article.articlePage.articleHeading).toHaveText(updatedTitle);
        await expect(article.articlePage.articleBody).toContainText(editData.articleContent);
    });

    //add and delete article
    test.only('Delete article', async ({ article, page }) => {
        const deleteData = articleData.articles[0];
        const deleteTitle = `${deleteData.articletitle} ${randomNumber + 1}`;
        await article.articlePage.addNewArticle({
            ...deleteData,
            articletitle: deleteTitle
        });
        await expect(article.articlePage.articleHeading).toHaveText(deleteTitle);

        //delete article
        await article.articlePage.deleteArticle();
        await expect(page).toHaveURL(new RegExp(process.env.BASE_URL || 'https://conduit.bondaracademy.com'));
    });

});