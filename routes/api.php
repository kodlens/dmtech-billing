<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('apiToken')->group(function() {
    
    Route::prefix('settings')->group(function () {
        Route::get('/load-categories', [App\Http\Controllers\Api\ApiCategoryController::class, 'loadCategories']);
    });

    
    Route::get('/pages/load-banner', [App\Http\Controllers\Api\MainBannerController::class, 'loadBanner']);

    Route::get('header-menu', [App\Http\Controllers\Api\HeaderAndFooterMenuController::class, 'header'])->name('menu.header');
    Route::get('footer-menu', [App\Http\Controllers\Api\HeaderAndFooterMenuController::class, 'footer'])->name('menu.footer');
    Route::get('header-and-footer', [App\Http\Controllers\Api\HeaderAndFooterMenuController::class, 'getHeaderAndFooter'])->name('menu.headerfooter');

    Route::get('/load-articles', [App\Http\Controllers\Api\ApiArticleController::class, 'loadArticles']);
    
    
    Route::prefix('articles')->group(function () {

        /**this fetch article will fetch an article base on slug. Display the selected article */
        Route::get('/fetch-article/{slug}', [App\Http\Controllers\Api\ApiArticleController::class, 'fetchArticle']);

        Route::get('/load-featured-articles', [App\Http\Controllers\Api\ApiArticleController::class, 'loadFeaturedArticles']);

        Route::get('/load-latest-articles', [App\Http\Controllers\Api\ApiArticleController::class, 'loadLatestArticles']);

    });
    
 


});

