<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {

//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


/** =======================================
 * CATEGORY PAGES HERE
 * ========================================
 */
Route::get('/', [App\Http\Controllers\WelcomePageController::class, 'index'])->name('welcome');

Route::get('/load-categories', [App\Http\Controllers\OpenController::class, 'loadCategories'])->name('load.categories');


Route::middleware('auth')->group(function () {

    Route::post('/posts-comments/{id}', [App\Http\Controllers\PostCommentController::class, 'postCommentStore'])->name('posts.comments-store');
    Route::get('/get-posts-comments/{id}', [App\Http\Controllers\PostCommentController::class, 'getComments'])->name('posts.get-comments');

    Route::get('/my-account', [App\Http\Controllers\Auth\MyAccountController::class, 'index']);
    Route::patch('/my-account-update', [App\Http\Controllers\Auth\MyAccountController::class, 'update']);

    Route::get('/change-password', [App\Http\Controllers\Auth\ChangePasswordController::class, 'index']);
    Route::post('/change-password', [App\Http\Controllers\Auth\ChangePasswordController::class, 'changePassword']);

});


Route::prefix('admin')->middleware('auth', 'admin')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Route::get('/admin/articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'index'])->name('admin.articles.index');
    // Route::get('/admin/articles/create', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');
    // Route::get('/admin/get-articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');

    Route::resource('/categories', App\Http\Controllers\Admin\AdminCategoryController::class);
    Route::get('/get-categories', [App\Http\Controllers\Admin\AdminCategoryController::class, 'getData'])->name('admin.categories-get-data');


    Route::resource('/sections', App\Http\Controllers\Admin\AdminSectionController::class);
    Route::get('/get-sections', [App\Http\Controllers\Admin\AdminSectionController::class, 'getData'])->name('sections.get-data');
    Route::get('/load-sections', [App\Http\Controllers\Admin\AdminSectionController::class, 'loadData'])->name('sections.load');

    Route::resource('/authors', App\Http\Controllers\Admin\AdminAuthorController::class);
    Route::get('/get-authors', [App\Http\Controllers\Admin\AdminAuthorController::class, 'getData'])->name('authors.getdata');
    Route::get('/load-authors', [App\Http\Controllers\Admin\AdminAuthorController::class, 'loadData'])->name('authors.load');

    Route::resource('/statuses', App\Http\Controllers\Admin\AdminStatusController::class);
    Route::get('/get-statuses', [App\Http\Controllers\Admin\AdminStatusController::class, 'getData']);
    Route::get('/load-statuses', [App\Http\Controllers\Admin\AdminStatusController::class, 'loadData']);

    Route::resource('/quarters', App\Http\Controllers\Admin\AdminQuarterController::class);
    Route::get('/get-quarters', [App\Http\Controllers\Admin\AdminQuarterController::class, 'getData']);
    Route::get('/load-quarters', [App\Http\Controllers\Admin\AdminQuarterController::class, 'loadData']);


   // Route::resource('/pages', App\Http\Controllers\Admin\AdminPageController::class);
    //Route::get('/get-pages', [App\Http\Controllers\Admin\AdminPageController::class, 'getData'])->name('admin.pages-get-data');

    /** ====================PAGES======================== */
    Route::resource('/pages/banners', App\Http\Controllers\Admin\Pages\AdminBannerController::class);
    Route::get('/pages/get-banners', [App\Http\Controllers\Admin\Pages\AdminBannerController::class, 'getData'])->name('admin.pages.banners-get-data');
    Route::post('/pages/temp-upload', [App\Http\Controllers\Admin\Pages\AdminBannerController::class, 'tempUpload'])->name('admin.pages.banners-temp-upload');
    Route::post('/pages/temp-remove/{filename}', [App\Http\Controllers\Admin\Pages\AdminBannerController::class, 'removeUpload'])->name('admin.pages.banners-temp-remove');

    Route::resource('/pages/dostvs', App\Http\Controllers\Admin\Pages\AdminDostvController::class);
    Route::get('/pages/get-dostvs', [App\Http\Controllers\Admin\Pages\AdminDostvController::class, 'getData'])->name('admin.pages.dostv-get-data');

    Route::resource('/pages/featured-videos', App\Http\Controllers\Admin\Pages\AdminFeaturedVideosController::class);
    Route::get('/pages/get-featured-videos', [App\Http\Controllers\Admin\Pages\AdminFeaturedVideosController::class, 'getData'])->name('admin.pages.featured-videos-get-data');
    /** ====================PAGES======================== */


    Route::resource('/posts', App\Http\Controllers\Admin\AdminPostController::class);
    Route::get('/get-posts', [App\Http\Controllers\Admin\AdminPostController::class, 'getData'])->name('admin.posts-getdata');

    Route::post('/temp-upload', [App\Http\Controllers\Admin\AdminPostController::class, 'tempUpload'])->name('posts.temp-upload');
    Route::post('/temp-remove/{filename}', [App\Http\Controllers\Admin\AdminPostController::class, 'removeUpload'])->name('posts.temp-remove');
    Route::post('/image-remove/{id}/{filename}', [App\Http\Controllers\Admin\AdminPostController::class, 'imageRemove'])->name('posts.image-remove');

    Route::post('/posts-trash/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'trash'])->name('posts.trash');
    Route::post('/posts-publish/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'publish'])->name('posts.published');
    Route::post('/posts-archive/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'archive'])->name('posts.archived');
    Route::post('/posts-draft/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'draft'])->name('posts.draft');
    Route::post('/posts-pending/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'pending'])->name('posts.pending');
    Route::post('/posts-submit-for-publishing/{id}', [App\Http\Controllers\Admin\AdminPostController::class, 'submit'])->name('posts.submit-for-publishing');

    Route::resource('/trashes', App\Http\Controllers\Admin\AdminTrashController::class);
    Route::get('/get-trashes', [App\Http\Controllers\Admin\AdminTrashController::class, 'getData'])->name('trashes.get-data');

    Route::resource('/post-archives', App\Http\Controllers\Admin\AdminPostArchiveController::class)->names([
        'index' => 'posts.archives'
    ]);
    Route::get('/get-post-archives', [App\Http\Controllers\Admin\AdminPostArchiveController::class, 'getData'])->name('archives-post-get-data');



    Route::resource('/users', App\Http\Controllers\Admin\AdminUserController::class);
    Route::get('/get-users', [App\Http\Controllers\Admin\AdminUserController::class, 'getData'])->name('users.getdata');
    Route::post('/users-change-password/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'changePassword'])->name('users.change-password');
    Route::post('/change-password/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'changePassword'])->name('users.change-password');


    Route::resource('/roles', App\Http\Controllers\Admin\AdminRoleController::class);
    Route::get('/get-roles', [App\Http\Controllers\Admin\AdminRoleController::class, 'getData'])->name('roles.getdata');

    Route::resource('/permissions', App\Http\Controllers\Admin\AdminPermissionController::class);
    Route::get('/get-permissions', [App\Http\Controllers\Admin\AdminPermissionController::class, 'getData'])->name('permissions.getdata');

    Route::resource('/role-has-permissions', App\Http\Controllers\Admin\AdminRoleHasPermissionController::class);
    Route::get('/get-role-has-permissions', [App\Http\Controllers\Admin\AdminRoleHasPermissionController::class, 'getData'])->name('role-has-permissions.getdata');

});



/** THIS ROUTE IS FOR PUBLISHER */
Route::prefix('publisher')->middleware('auth', 'publisher')->group(function () {

    Route::get('/dashboard', [App\Http\Controllers\Publisher\PublisherDashboardController::class, 'index'])->name('dashboard-index');

    Route::get('/posts', [App\Http\Controllers\Publisher\PublisherPostController::class, 'index'])->name('publisher.post-index');;
    Route::patch('/posts/{id}', [App\Http\Controllers\Publisher\PublisherPostController::class, 'update'])->name('publisher.post-update');;

    Route::get('/posts-form-view/{id}', [App\Http\Controllers\Publisher\PublisherPostController::class, 'formView'])->name('publisher.post-form-view');
    Route::get('/get-posts', [App\Http\Controllers\Publisher\PublisherPostController::class, 'getData'])->name('publisher.post-get-data');


    Route::post('/posts-publish/{id}', [App\Http\Controllers\Publisher\PublisherPostController::class, 'postPublish'])->name('publisher.post-publish');
    Route::post('/posts-unpublish/{id}', [App\Http\Controllers\Publisher\PublisherPostController::class, 'postUnpublish'])->name('publisher.post-unpublish');
    Route::post('/posts-return-to-author/{id}', [App\Http\Controllers\Publisher\PublisherPostController::class, 'postReturnToAuthor'])->name('publisher.post-return-to-author');

    Route::get('/post-publish', [App\Http\Controllers\Publisher\PublisherPostPublishController::class, 'index']);
    Route::get('/get-post-publish', [App\Http\Controllers\Publisher\PublisherPostPublishController::class, 'getData'])->name('author.post-publish-get-data');

    Route::get('/post-unpublish', [App\Http\Controllers\Publisher\PublisherPostUnpublishController::class, 'index']);
    Route::get('/get-post-unpublish', [App\Http\Controllers\Publisher\PublisherPostUnpublishController::class, 'getData'])->name('author.post-unpublish-get-data');
});

/** THIS ROUTE IS FOR AUTHOR */
Route::prefix('author')->middleware('auth', 'author')->group(function () {

    Route::get('/dashboard', [App\Http\Controllers\Author\AuthorDashboardController::class, 'index'])->name('author.dashboard-index');


    Route::get('/posts', [App\Http\Controllers\Author\AuthorPostController::class, 'index'])->name('author.post-index');
    Route::get('/posts/create', [App\Http\Controllers\Author\AuthorPostController::class, 'create'])->name('author.post-create');
    Route::post('/posts', [App\Http\Controllers\Author\AuthorPostController::class, 'store'])->name('author.post-store');
    Route::get('/posts/{id}/edit', [App\Http\Controllers\Author\AuthorPostController::class, 'edit'])->name('author.post-edit');
    Route::patch('/posts/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'update'])->name('author.post-update');
    //Route::get('/posts/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'show'])->name('author.post-show');
    Route::delete('/posts/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'destroy'])->name('author.post-destroy');
   // Route::resource('/posts', App\Http\Controllers\Author\AuthorPostController::class);
    Route::get('/get-posts', [App\Http\Controllers\Author\AuthorPostController::class, 'getData'])->name('posts.get-data');

    Route::post('/posts-trash/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'trash'])->name('posts.trash');
    Route::post('/temp-upload', [App\Http\Controllers\Author\AuthorPostController::class, 'tempUpload'])->name('posts.temp-upload');
    Route::post('/temp-remove/{filename}', [App\Http\Controllers\Author\AuthorPostController::class, 'removeUpload'])->name('posts.temp-remove');
    Route::post('/image-remove/{id}/{filename}', [App\Http\Controllers\Author\AuthorPostController::class, 'imageRemove'])->name('posts.image-remove');

    Route::post('/posts-published/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'postPublished'])->name('posts.published');
    Route::post('/posts-archived/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'postArchived'])->name('posts.archived');
    Route::post('/posts-draft/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'postDraft'])->name('posts.draft');
    Route::post('/posts-pending/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'postPending'])->name('posts.pending');

    Route::post('/posts-submit-for-publishing/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'postSubmitForPublishing'])->name('posts.submit-for-publishing');

    //Route::get('/get-posts-comments/{id}', [App\Http\Controllers\Author\AuthorPostController::class, 'getComments'])->name('posts.get-comments');

    Route::get('/post-publish', [App\Http\Controllers\Author\AuthorPostPublishController::class, 'index']);
    Route::get('/get-post-publish', [App\Http\Controllers\Author\AuthorPostPublishController::class, 'getData'])->name('author.post-trash-get-data');

    Route::get('/post-trashes', [App\Http\Controllers\Author\AuthorPostTrashController::class, 'index']);
    Route::get('/get-post-trashes', [App\Http\Controllers\Author\AuthorPostTrashController::class, 'getData'])->name('author.post-trash-get-data');

});
/** END AUTHOR */





require __DIR__.'/auth.php';


// logout auth (use for debuggin only)
Route::get('/applogout', function(Request $req){

    Auth::guard('web')->logout();
    $req->session()->invalidate();

    $req->session()->regenerateToken();

    return redirect('/');
});

