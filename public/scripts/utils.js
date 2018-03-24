'use strict';
$(function(){

    $(document).on('click', '.saveButton', function (e) {
        e.preventDefault();
        const articleId = {
            id: $(this).attr('data-acticle-id')
        };
        console.log(articleId.id);
        $.ajax('/api/save-article', {
            type: 'PUT',
            data: articleId
        }).then(function (result) {
            console.log(result + 'updated!');
            location.reload();
        });
    });

    $(document).on('click', '.deleteButton', function (e) {
        e.preventDefault();
        const articleId = {
            id: $(this).attr('data-acticle-id')
        };
        
        $.ajax('/api/delete-article', {
            type: 'PUT',
            data: articleId
        }).then(function (result) {
            console.log(result + 'updated!');
            location.reload();
        });
    });

    $(document).on('click', '.btn-success', function (e) {
        e.preventDefault();
        
        $.ajax('/api/initial-scrape', {
            type: 'GET',
        }).then(function (result) {
            console.log(result + 'updated!');
            location.reload();
        });
    });
});